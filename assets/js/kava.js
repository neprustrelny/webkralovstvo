(() => {
  const ORDER_EMAIL = "neprustrelny.marek@gmail.com";
  const ORDER_SUBJECT = "Kava Kolonial - poziadavka";

  const PRICE_TIERS = {
    premium: { "150 g": 7.9, "250 g": 9.9, "500 g": 14.9, "1 kg": 29.0 },
    standard: { "150 g": 6.9, "250 g": 8.9, "500 g": 13.9, "1 kg": 27.0 },
    value: { "150 g": 5.9, "250 g": 7.9, "500 g": 12.9, "1 kg": 25.0 },
  };

  const COFFEE_BEANS = [
    { id: "bali-paradise-valley", name: "Bali Paradise Valley", prices: PRICE_TIERS.premium },
    { id: "bolivia-altura-extra-organicka", name: "Bolívia Altura Extra (organická)", prices: PRICE_TIERS.premium },
    { id: "brasil-santos", name: "Brasil Santos", prices: PRICE_TIERS.value },
    { id: "brasil-doce-cerrado-diamantina", name: "Brasil Doce Cerrado Diamantina", prices: PRICE_TIERS.standard },
    { id: "burundi-aa-full-washed-scr-15", name: "Burundi AA Full Washed scr. 15", prices: PRICE_TIERS.standard },
    { id: "colombia-supremo", name: "Colombia Supremo", prices: PRICE_TIERS.standard },
    { id: "costa-rica-la-pastora-tarazzu", name: "Costa Rica La Pastora Tarazzu", prices: PRICE_TIERS.standard },
    { id: "cuba-serrano-lavado", name: "Cuba Serrano Lavado", prices: PRICE_TIERS.premium },
    { id: "dominikska-republika-barahona-a", name: "Dominikánska republika Barahona A", prices: PRICE_TIERS.standard },
    { id: "ecuador", name: "Ecuador", prices: PRICE_TIERS.premium },
    { id: "el-salvador-shg-la-majada", name: "El Salvador SHG La Majada", prices: PRICE_TIERS.standard },
    { id: "etiopia-sidamo", name: "Etiopia Sidamo", prices: PRICE_TIERS.standard },
    { id: "etiopia-gedab-banko-gotiti-sca-875", name: "Etiopia Gedab Banko Gotiti (výberová káva, SCA 87,5)", prices: PRICE_TIERS.premium },
    { id: "guatemalla-shb-ep-huehuetenango", name: "Guatemalla SHB EP Huehuetenango", prices: PRICE_TIERS.standard },
    { id: "honduras-marcala", name: "Honduras Marcala", prices: PRICE_TIERS.standard },
    { id: "india-bababudangiri", name: "India Bababudangiri", prices: PRICE_TIERS.standard },
    { id: "india-kaapi-royal-robusta", name: "India Kaapi Royal (robusta)", prices: PRICE_TIERS.value },
    { id: "kenya-imara", name: "Kenya Imara", prices: PRICE_TIERS.standard },
    { id: "kolonial-blend-75-25", name: "Koloniál Blend (75%Arabica, 25% Robusta)", prices: PRICE_TIERS.value },
    { id: "kongo-kivu-melenge", name: "Kongo Kivu Melenge", prices: PRICE_TIERS.value },
    { id: "mexico-finca-el-flamingo", name: "Mexico Finca El Flamingo", prices: PRICE_TIERS.standard },
    { id: "mexico-sh-gep-pluma-hidalgo-sca84", name: "Mexico SH GEP Pluma Hidalgo (výberová káva - SCA 84)", prices: PRICE_TIERS.premium },
    { id: "panama-shb-boquete-casa-ruiz", name: "Panama SHB Boquete Casa Ruiz", prices: PRICE_TIERS.standard },
    { id: "papua-new-guinea-sigri-a-plantation", name: "Papua New Guinea Sigri A Plantation", prices: PRICE_TIERS.standard },
    { id: "peru-aromas-del-valle-sca-8475", name: "Peru Aromas del Valle (výberová káva, SCA 84,75)", prices: PRICE_TIERS.premium },
    { id: "peru-shb-grade-1-organicka", name: "Peru SHB Grade 1 (organická)", prices: PRICE_TIERS.value },
    { id: "rwanda-nyamasheke-women-coffee", name: "Rwanda Nyamasheke Women Coffee", prices: PRICE_TIERS.value },
    { id: "salvador-la-majada", name: "Salvador La Majada", prices: PRICE_TIERS.standard },
    { id: "tanzania-burka-estate-ab", name: "Tanzánia Burka Estate AB", prices: PRICE_TIERS.standard },
    { id: "uganda-bufumabu-farmers-aa-organicka-sca85", name: "Uganda Bufumabu Farmers AA (organická, SCA 85 bodov)", prices: PRICE_TIERS.value },
    { id: "venezuela-santa-cruz-de-mora-sca855", name: "Venezuela Santa Cruz de Mora (výberová káva SCA 85,5)", prices: PRICE_TIERS.premium },
    { id: "zambia-kachipapa-farm", name: "Zambia Kachipapa Farm", prices: PRICE_TIERS.standard },
  ];

  const REQUEST_LABELS = {
    drink: "Kávu na pitie",
    home: "Kávu domov",
    gift: "Darčekový balík",
  };

  const state = {
    type: null,
    size: null,
    itemName: null,
    itemId: null,
    price: null,
    quantity: 1,
    lastDetailStep: "1",
  };

  const INITIAL_COFFEE_COUNT = 4;
  let visibleCoffeeCount = INITIAL_COFFEE_COUNT;

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  const fmtEUR = (value) => `${Number(value || 0).toFixed(2).replace(".", ",")} €`;

  function scrollToWizardStep(step) {
    if (!(step instanceof HTMLElement)) return;
    const headerHeight = $(".site-header")?.getBoundingClientRect().height || 0;
    const targetTop = step.getBoundingClientRect().top + window.scrollY - headerHeight - 24;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
  }

  function stepNumber(stepName) {
    if (stepName === "1") return 1;
    if (stepName === "summary") return 3;
    return 2;
  }

  function updateProgress(stepName) {
    const currentNumber = stepNumber(stepName);
    $$("[data-step-indicator]").forEach((item) => {
      const itemNumber = Number(item.getAttribute("data-step-indicator"));
      item.classList.toggle("is-active", itemNumber === currentNumber);
      item.classList.toggle("is-done", itemNumber < currentNumber);
    });
  }

  function showStep(stepName, scroll = true) {
    const target = $(`[data-wizard-step="${stepName}"]`);
    if (!(target instanceof HTMLElement)) return;

    $$("[data-wizard-step]").forEach((step) => {
      step.hidden = step !== target;
    });

    updateProgress(stepName);

    if (scroll) {
      window.requestAnimationFrame(() => scrollToWizardStep(target));
    }
  }

  function resetState() {
    state.type = null;
    state.size = null;
    state.itemName = null;
    state.itemId = null;
    state.price = null;
    state.quantity = 1;
    state.lastDetailStep = "1";
    visibleCoffeeCount = INITIAL_COFFEE_COUNT;
    $$("#coffeeList, #summaryList").forEach((element) => {
      element.innerHTML = "";
    });
    $("#summaryTotal")?.setAttribute("hidden", "");
    $("#customerName") && ($("#customerName").value = "");
    $("#customerContact") && ($("#customerContact").value = "");
    $("#customerNote") && ($("#customerNote").value = "");
    updateSendLink();
  }

  function describeCoffee(bean) {
    const lower = bean.name.toLowerCase();
    if (lower.includes("blend")) return "Vyvážená káva vhodná na bežné pitie aj espresso.";
    if (lower.includes("robusta")) return "Výraznejšia káva s pevnejším telom.";
    if (lower.includes("etiopia") || lower.includes("kenya") || lower.includes("rwanda")) {
      return "Sviežejší profil pre ľudí, ktorí majú radi ovocnejšie tóny.";
    }
    if (lower.includes("brasil") || lower.includes("colombia")) {
      return "Pokojnejší profil s čokoládovejším alebo orechovým dojmom.";
    }
    return "Káva podľa aktuálnej dostupnosti, vhodná na doladenie po správe.";
  }

  function availableCoffees() {
    if (!state.size) return [];
    return COFFEE_BEANS.filter((bean) => Number.isFinite(bean.prices[state.size]));
  }

  function renderCoffeeList() {
    const list = $("#coffeeList");
    const selectedSizeNote = $("#selectedSizeNote");
    if (!(list instanceof HTMLElement)) return;

    if (selectedSizeNote) {
      selectedSizeNote.textContent = `Vybraná gramáž: ${state.size}. Ceny sú orientačné pre túto voľbu.`;
    }

    const coffees = availableCoffees();
    const visible = coffees.slice(0, visibleCoffeeCount);

    list.innerHTML = visible
      .map((bean) => {
        const price = bean.prices[state.size];
        return `
          <article class="coffee-card">
            <div>
              <h3>${bean.name}</h3>
              <p>${describeCoffee(bean)}</p>
            </div>
            <p class="coffee-price">${fmtEUR(price)} / ${state.size}</p>
            <button class="btn btn-primary" type="button" data-select-coffee="${bean.id}">Pridať</button>
          </article>
        `;
      })
      .join("");

    if (coffees.length > visibleCoffeeCount) {
      list.insertAdjacentHTML(
        "beforeend",
        `<button class="btn btn-secondary show-more-coffee" type="button" id="showMoreCoffee">Zobraziť viac káv</button>`,
      );
    }
  }

  function setRequestType(type) {
    state.type = type;
    state.size = null;
    state.itemName = null;
    state.itemId = null;
    state.price = null;
    state.quantity = 1;
    visibleCoffeeCount = INITIAL_COFFEE_COUNT;

    if (type === "drink") {
      state.lastDetailStep = "drink";
      showStep("drink");
      return;
    }

    if (type === "home") {
      state.lastDetailStep = "home-size";
      showStep("home-size");
      return;
    }

    if (type === "gift") {
      state.lastDetailStep = "gift";
      showStep("gift");
    }
  }

  function selectBeanSize(size) {
    state.type = "home";
    state.size = size;
    state.itemName = null;
    state.itemId = null;
    state.price = null;
    state.lastDetailStep = "home-coffee";
    visibleCoffeeCount = INITIAL_COFFEE_COUNT;
    renderCoffeeList();
    showStep("home-coffee");
  }

  function selectCoffee(beanId) {
    const bean = COFFEE_BEANS.find((item) => item.id === beanId);
    if (!bean || !state.size) return;

    state.type = "home";
    state.itemId = bean.id;
    state.itemName = bean.name;
    state.price = bean.prices[state.size] ?? null;
    state.quantity = 1;
    state.lastDetailStep = "home-coffee";
    showSummary();
  }

  function createDrinkRequest() {
    state.type = "drink";
    state.size = null;
    state.itemName = "Káva na pitie";
    state.itemId = null;
    state.price = null;
    state.quantity = 1;
    state.lastDetailStep = "drink";
    showSummary();
  }

  function selectGift(choice) {
    state.type = "gift";
    state.size = null;
    state.itemName = choice;
    state.itemId = null;
    state.price = null;
    state.quantity = 1;
    state.lastDetailStep = "gift";
    showSummary();
  }

  function summaryRows() {
    const rows = [["Typ požiadavky", REQUEST_LABELS[state.type] || "Káva"]];
    if (state.size) rows.push(["Gramáž", state.size]);
    if (state.itemName) rows.push([state.type === "gift" ? "Balík" : "Výber", state.itemName]);
    rows.push(["Množstvo", `${state.quantity} ks`]);
    if (Number.isFinite(state.price)) rows.push(["Orientačná suma", fmtEUR(state.price * state.quantity)]);
    return rows;
  }

  function updateSendLink() {
    const sendButton = $("#sendRequestButton");
    if (!(sendButton instanceof HTMLAnchorElement)) return;

    const name = $("#customerName")?.value.trim() || "";
    const contact = $("#customerContact")?.value.trim() || "";
    const note = $("#customerNote")?.value.trim() || "";
    const rows = summaryRows();
    const lines = [
      "Dobrý deň,",
      "",
      "prosím o kávu cez Koloniál.",
      "",
      ...rows.map(([label, value]) => `${label}: ${value}`),
      "",
      `Meno: ${name}`,
      `Kontakt: ${contact}`,
      `Poznámka: ${note}`,
      "",
      "Ďakujem.",
    ];

    sendButton.href = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(ORDER_SUBJECT)}&body=${encodeURIComponent(lines.join("\n"))}`;
  }

  function showSummary() {
    const summary = $("#summaryList");
    const total = $("#summaryTotal");
    if (!(summary instanceof HTMLElement)) return;

    summary.innerHTML = summaryRows()
      .map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`)
      .join("");

    if (total) {
      if (Number.isFinite(state.price)) {
        total.textContent = `Orientačne spolu: ${fmtEUR(state.price * state.quantity)}`;
        total.hidden = false;
      } else {
        total.hidden = true;
      }
    }

    updateSendLink();
    showStep("summary");
  }

  function bindEvents() {
    $("[data-wizard-step='1']")?.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-request-type]");
      if (!(trigger instanceof HTMLElement)) return;
      setRequestType(trigger.getAttribute("data-request-type"));
    });

    $("[data-wizard-step='home-size']")?.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-bean-size]");
      if (!(trigger instanceof HTMLElement)) return;
      selectBeanSize(trigger.getAttribute("data-bean-size"));
    });

    $("#coffeeList")?.addEventListener("click", (event) => {
      const more = event.target.closest("#showMoreCoffee");
      if (more) {
        visibleCoffeeCount = availableCoffees().length;
        renderCoffeeList();
        return;
      }

      const trigger = event.target.closest("[data-select-coffee]");
      if (!(trigger instanceof HTMLElement)) return;
      selectCoffee(trigger.getAttribute("data-select-coffee"));
    });

    $("[data-create-request='drink']")?.addEventListener("click", createDrinkRequest);

    $("[data-wizard-step='gift']")?.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-gift-choice]");
      if (!(trigger instanceof HTMLElement)) return;
      selectGift(trigger.getAttribute("data-gift-choice"));
    });

    $$("[data-back-step]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.getAttribute("data-back-step");
        if (target === "last") {
          showStep(state.lastDetailStep || "1");
          return;
        }
        if (target === "1") resetState();
        showStep(target || "1");
      });
    });

    $("#startAgainButton")?.addEventListener("click", () => {
      resetState();
      showStep("1");
    });

    ["customerName", "customerContact", "customerNote"].forEach((id) => {
      $(`#${id}`)?.addEventListener("input", updateSendLink);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindEvents();
    resetState();
    showStep("1", false);
  });
})();
