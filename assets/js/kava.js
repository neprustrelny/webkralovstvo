/* kralovstvo_stranka/kava.js
   Guided funnel s tromi krokmi a pravdivým checkoutom.
*/

(() => {
  const ORDER_EMAIL = "ahoj@kralovstvo.sk";
  const ORDER_SUBJECT = "Objednávka – Káva Koloniál";

  const BUNDLES = [
    {
      id: "degustacny",
      title: "Degustačný box",
      subtitle: "Mix chutí pre prvé zoznámenie",
      bullets: ["3× balenie", "darčekový vibe", "ručne pripravíme"],
      note: "Cena dohodou po potvrdení",
      cartItem: {
        id: "bundle-degustacny",
        name: "Degustačný box",
        variant: "balík",
        price: null,
      },
    },
    {
      id: "balicek3x250",
      title: "3× 250 g",
      subtitle: "Domov, kancelária alebo darček",
      bullets: ["3 rôzne druhy", "rýchle vybavenie", "ideálne na darovanie"],
      note: "Dohodneme presné zrná",
      cartItem: {
        id: "bundle-3x250",
        name: "Balík 3×250 g",
        variant: "balík",
        price: null,
      },
    },
    {
      id: "vlastny",
      title: "Vlastná skladba",
      subtitle: "Klikaj produkty nižšie",
      bullets: ["úplná voľnosť", "mix podľa chuti", "kopíruje reálny stav"],
      note: "Vyplň si košík podľa seba",
      scrollTo: "#productGrid",
    },
  ];

  const PRODUCTS = [
    { id: "kolonial-blend-250", name: "Koloniál Blend", variant: "250 g", price: 7.9 },
    { id: "etiopia-sidamo-250", name: "Etiopia Sidamo", variant: "250 g", price: 8.9 },
    { id: "guatemala-huehue-250", name: "Guatemala Huehuetenango", variant: "250 g", price: 8.9 },
    { id: "peru-aromas-250", name: "Peru Aromas del Valle", variant: "250 g", price: 9.9 },
    { id: "brasil-santos-250", name: "Brasil Santos", variant: "250 g", price: 7.9 },
    { id: "india-kaapi-250", name: "India Kaapi Royal", variant: "250 g", price: 7.9 },
  ];

  const CART_KEY = "kralovstvo_cart_v2";
  /** @type {Record<string, {id:string,name:string,variant:string,price:number|null,qty:number}>} */
  let cart = {};

  const $ = (sel) => document.querySelector(sel);
  const fmtEUR = (n) => `${Number(n || 0).toFixed(2).replace(".", ",")} €`;

  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      cart = raw ? JSON.parse(raw) : {};
      if (!cart || typeof cart !== "object") cart = {};
    } catch {
      cart = {};
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }

  const cartItems = () => Object.values(cart);
  const cartCount = () => cartItems().reduce((acc, it) => acc + (it.qty || 0), 0);
  const cartTotal = () =>
    cartItems().reduce((acc, it) => acc + (it.price ? it.price * (it.qty || 0) : 0), 0);

  function addToCart(item) {
    if (!item || !item.id) return;
    if (!cart[item.id]) {
      cart[item.id] = { ...item, qty: 0 };
    }
    cart[item.id].qty += 1;
    saveCart();
    renderCart();
    notify(`${item.name} pridané do košíka.`);
    focusCart();
  }

  function setQty(id, qty) {
    if (!cart[id]) return;
    const next = Math.max(0, Number(qty || 0));
    if (next === 0) delete cart[id];
    else cart[id].qty = next;
    saveCart();
    renderCart();
  }

  function clearCart() {
    cart = {};
    saveCart();
    renderCart();
    notify("Košík bol vymazaný.");
  }

  function notify(msg) {
    const bar = $("#cartBarMessage");
    if (bar) bar.textContent = msg;
  }

  function setCartOverlay(visible) {
    const overlay = $("#cartOverlay");
    if (!overlay) return;
    if (visible) {
      overlay.hidden = false;
      overlay.classList.add("is-visible");
    } else {
      overlay.classList.remove("is-visible");
      overlay.hidden = true;
    }
  }

  function toggleCartBar(show) {
    const bar = $("#cartBar");
    if (!bar) return;
    if (!show) {
      bar.hidden = true;
      return;
    }
    bar.hidden = false;
  }

  function updateCartBar() {
    const countEl = $("#cartBarCount");
    const totalEl = $("#cartBarTotal");
    const count = cartCount();
    const total = fmtEUR(cartTotal());
    if (countEl) countEl.textContent = String(count);
    if (totalEl) totalEl.textContent = total;
    toggleCartBar(count > 0);
  }

  function renderBundles() {
    const grid = $("#bundleGrid");
    if (!grid) return;
    grid.innerHTML = "";

    BUNDLES.forEach((bundle) => {
      const card = document.createElement("article");
      card.className = "bundle-card";
      const bullets = bundle.bullets.map((b) => `<li>${b}</li>`).join("");
      const button = bundle.scrollTo
        ? `<button class="btn btn-secondary" type="button" data-bundle-scroll="${bundle.scrollTo}">Prejsť na produkty</button>`
        : `<button class="btn btn-secondary" type="button" data-bundle-id="${bundle.id}">Pridať balík</button>`;

      card.innerHTML = `
        <div class="bundle-head">
          <h3>${bundle.title}</h3>
          <p class="bundle-sub">${bundle.subtitle}</p>
        </div>
        <ul class="bundle-bullets">${bullets}</ul>
        <div class="bundle-foot">
          <p class="bundle-price">${bundle.note || ""}</p>
          <div class="bundle-actions">${button}</div>
        </div>
      `;
      grid.appendChild(card);
    });

    grid.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const bundleId = target.getAttribute("data-bundle-id");
      const scrollTarget = target.getAttribute("data-bundle-scroll");

      if (scrollTarget) {
        document.querySelector(scrollTarget)?.scrollIntoView({ behavior: "smooth" });
        return;
      }

      if (!bundleId) return;
      const bundle = BUNDLES.find((b) => b.id === bundleId);
      if (!bundle || !bundle.cartItem) return;
      addToCart(bundle.cartItem);
    });
  }

  function renderProducts() {
    const grid = $("#productGrid");
    if (!grid) return;
    grid.innerHTML = "";

    PRODUCTS.forEach((product) => {
      const card = document.createElement("article");
      card.className = "product-card";
      card.innerHTML = `
        <div class="product-body">
          <h3>${product.name}</h3>
          <p class="product-variant">${product.variant}</p>
        </div>
        <div class="product-foot">
          <strong class="product-price">${fmtEUR(product.price)}</strong>
          <button class="btn btn-secondary" type="button" data-add="${product.id}" aria-label="Pridať ${product.name} ${product.variant}">+</button>
        </div>
      `;
      grid.appendChild(card);
    });

    grid.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const id = target.getAttribute("data-add");
      if (!id) return;
      const product = PRODUCTS.find((p) => p.id === id);
      if (product) addToCart(product);
    });
  }

  function renderCart() {
    const wrap = $("#cartItems");
    const totalEl = $("#cartTotal");
    if (!wrap || !totalEl) return;

    const items = cartItems();
    if (!items.length) {
      wrap.innerHTML = `<p class="cart-empty">Košík je zatiaľ prázdny.</p>`;
    } else {
      wrap.innerHTML = items
        .map((it) => {
          const priceLabel = it.price ? fmtEUR(it.price * it.qty) : "dohodou";
          return `
            <div class="cart-row">
              <div class="cart-row-main">
                <strong>${it.name}</strong>
                <span class="cart-row-sub">${it.variant}</span>
              </div>
              <div class="cart-row-actions">
                <button class="cart-btn" type="button" data-dec="${it.id}" aria-label="Odobrať ${it.name} ${it.variant}">−</button>
                <span class="cart-qty">${it.qty}</span>
                <button class="cart-btn" type="button" data-inc="${it.id}" aria-label="Pridať ${it.name} ${it.variant}">+</button>
              </div>
              <div class="cart-row-price">${priceLabel}</div>
            </div>
          `;
        })
        .join("");
    }

    wrap.onclick = (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const inc = target.getAttribute("data-inc");
      const dec = target.getAttribute("data-dec");
      if (inc && cart[inc]) setQty(inc, cart[inc].qty + 1);
      if (dec && cart[dec]) setQty(dec, cart[dec].qty - 1);
    };

    totalEl.textContent = fmtEUR(cartTotal());
    updateCartBar();
  }

  function focusCart() {
    const cartSection = document.getElementById("krok2");
    const panel = document.getElementById("cartPanel");
    if (!panel) return;

    if (window.matchMedia("(max-width: 960px)").matches) {
      panel.classList.add("is-open");
      setCartOverlay(true);
    } else {
      cartSection?.scrollIntoView({ behavior: "smooth" });
    }
  }

  function closeCartPanel() {
    const panel = document.getElementById("cartPanel");
    if (panel) panel.classList.remove("is-open");
    setCartOverlay(false);
  }

  function handleEscapeClose(event) {
    if (event.key !== "Escape") return;
    const panel = document.getElementById("cartPanel");
    const overlay = document.getElementById("cartOverlay");
    const panelOpen = panel?.classList.contains("is-open");
    const overlayVisible = overlay ? !overlay.hidden : false;
    if (panelOpen || overlayVisible) {
      closeCartPanel();
    }
  }

  function buildCartSummary() {
    const items = cartItems();
    if (!items.length) return "Košík je prázdny.";
    const lines = items.map((it) => {
      const price = it.price ? fmtEUR(it.price) : "dohodou";
      return `- ${it.name} (${it.variant}) × ${it.qty} – ${price}`;
    });
    lines.push(`Orientačný súčet: ${fmtEUR(cartTotal())}`);
    return lines.join("\n");
  }

  function openMail(subject, body) {
    const href = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  }

  function setupCartBar() {
    const barBtn = $("#cartBarButton");
    if (barBtn) {
      barBtn.addEventListener("click", () => {
        if (cartCount() === 0) {
          notify("Najprv pridaj aspoň jednu kávu.");
          return;
        }
        focusCart();
      });
    }

    const closeBtn = $("#cartPanelClose");
    if (closeBtn) closeBtn.addEventListener("click", closeCartPanel);
  }

  function setupStepObserver() {
    const sections = Array.from(document.querySelectorAll(".step-section"));
    const steps = Array.from(document.querySelectorAll(".stepper .step"));
    if (!sections.length || !steps.length) return;

    const updateActive = (id) => {
      steps.forEach((step) => {
        step.classList.toggle("active", step.dataset.step === id);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) updateActive(visible.target.id);
      },
      { threshold: 0.35 },
    );

    sections.forEach((section) => observer.observe(section));
  }

  function setupActions() {
    const clearBtn = $("#clearCartButton");
    if (clearBtn) clearBtn.addEventListener("click", clearCart);

    const continueBtn = $("#continueShoppingButton");
    if (continueBtn) {
      continueBtn.addEventListener("click", () => {
        closeCartPanel();
        document.querySelector("#krok1")?.scrollIntoView({ behavior: "smooth" });
      });
    }

    const checkoutForm = $("#checkoutForm");
    if (checkoutForm) {
      checkoutForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (cartCount() === 0) {
          notify("Najprv pridaj niečo do košíka.");
          focusCart();
          return;
        }

        const name = $("#customerName")?.value.trim();
        const contact = $("#customerContact")?.value.trim();
        const delivery = $("#deliveryType")?.value;
        const note = $("#customerNote")?.value.trim();

        if (!name || !contact || !delivery) {
          notify("Prosím doplň meno, kontakt a spôsob.");
          return;
        }

        const summary = buildCartSummary();
        const lines = [
          summary,
          "",
          `Meno: ${name}`,
          `Kontakt: ${contact}`,
          `Spôsob: ${delivery}`,
        ];
        if (note) lines.push(`Poznámka: ${note}`);
        lines.push("", "Prosím pošlite platobný link / potvrdenie vyzdvihnutia.");
        openMail(ORDER_SUBJECT, lines.join("\n"));
      });
    }

    const cartPanel = $("#cartPanel");
    if (cartPanel) {
      cartPanel.addEventListener("click", (event) => {
        if (!(event.target instanceof HTMLElement)) return;
        if (event.target.id === "cartPanel") closeCartPanel();
      });
    }

    const overlay = $("#cartOverlay");
    if (overlay) overlay.addEventListener("click", closeCartPanel);
    document.addEventListener("keydown", handleEscapeClose);
  }

  function init() {
    renderBundles();
    renderProducts();
    loadCart();
    renderCart();
    setupCartBar();
    setupActions();
    setupStepObserver();
    notify("Pridávaj položky a pošli objednávku v kroku 3.");
  }

  document.addEventListener("DOMContentLoaded", init);
})();
