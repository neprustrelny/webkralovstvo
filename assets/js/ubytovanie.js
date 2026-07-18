(() => {
  const form = document.getElementById('reservation-form');
  if (!(form instanceof HTMLFormElement)) return;

  const fields = {
    name: document.getElementById('name'),
    phone: document.getElementById('phone'),
    email: document.getElementById('email'),
    guests: document.getElementById('guests'),
    arrival: document.getElementById('arrival'),
    departure: document.getElementById('departure'),
    message: document.getElementById('message'),
    privacyConsent: document.getElementById('privacy-consent'),
  };

  const submitButton = form.querySelector('button[type="submit"]');
  const staySummary = document.getElementById('stay-summary');
  const formErrorStatus = document.getElementById('form-error-status');
  const successPanel = document.getElementById('form-success');
  const sendAnotherButton = document.getElementById('send-another-request');
  const messageCount = document.getElementById('message-count');

  const requiredElements = [
    ...Object.values(fields),
    submitButton,
    staySummary,
    formErrorStatus,
    successPanel,
    sendAnotherButton,
    messageCount,
  ];

  if (requiredElements.some((element) => !(element instanceof HTMLElement))) return;

  form.setAttribute('novalidate', '');

  const formatDateInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const parseDateValue = (value) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    if (
      date.getUTCFullYear() !== year ||
      date.getUTCMonth() !== month - 1 ||
      date.getUTCDate() !== day
    ) {
      return null;
    }
    return date;
  };

  const formatDisplayDate = (value) => {
    const date = parseDateValue(value);
    if (!date) return '–';
    return new Intl.DateTimeFormat('sk-SK', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(date);
  };

  const addDays = (value, days) => {
    const date = parseDateValue(value);
    if (!date) return '';
    date.setUTCDate(date.getUTCDate() + days);
    return [
      date.getUTCFullYear(),
      String(date.getUTCMonth() + 1).padStart(2, '0'),
      String(date.getUTCDate()).padStart(2, '0'),
    ].join('-');
  };

  const countNights = (arrivalValue, departureValue) => {
    const arrivalDate = parseDateValue(arrivalValue);
    const departureDate = parseDateValue(departureValue);
    if (!arrivalDate || !departureDate) return 0;
    return Math.round((departureDate.getTime() - arrivalDate.getTime()) / 86400000);
  };

  const today = formatDateInput(new Date());

  const setDateMinimums = () => {
    fields.arrival.min = today;
    fields.departure.min = addDays(fields.arrival.value || today, 1);
  };

  const errorElementFor = (field) => document.getElementById(`${field.id}-error`);

  const setFieldError = (field, message = '') => {
    const errorElement = errorElementFor(field);
    field.setAttribute('aria-invalid', String(Boolean(message)));
    if (!errorElement) return;
    errorElement.textContent = message;
    errorElement.hidden = !message;
  };

  const getFieldError = (field) => {
    if (field === fields.name && !field.value.trim()) {
      return 'Vyplňte meno a priezvisko.';
    }

    if (field === fields.phone && !field.value.trim()) {
      return 'Zadajte telefónne číslo.';
    }

    if (field === fields.email && field.value.trim() && field.validity.typeMismatch) {
      return 'Zadajte platnú e-mailovú adresu.';
    }

    if (field === fields.arrival) {
      if (!field.value) return 'Vyberte dátum príchodu.';
      if (!parseDateValue(field.value) || field.value < today) {
        return 'Dátum príchodu nemôže byť v minulosti.';
      }
    }

    if (field === fields.departure) {
      if (!field.value) return 'Vyberte dátum odchodu.';
      if (
        !parseDateValue(field.value) ||
        !parseDateValue(fields.arrival.value) ||
        countNights(fields.arrival.value, field.value) <= 0
      ) {
        return 'Dátum odchodu musí byť neskorší ako dátum príchodu.';
      }
    }

    if (field === fields.guests) {
      const guests = Number(field.value);
      if (!field.value || !Number.isFinite(guests) || guests < 1) {
        return 'Zadajte počet osôb.';
      }
    }

    if (field === fields.message && field.value.length > 1000) {
      return 'Poznámka môže mať najviac 1 000 znakov.';
    }

    if (field === fields.privacyConsent && !field.checked) {
      return 'Potvrďte súhlas so spracovaním údajov.';
    }

    return '';
  };

  const validateField = (field) => {
    const message = getFieldError(field);
    setFieldError(field, message);
    return !message;
  };

  const summaryValue = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  };

  const getStayData = () => {
    const nights = countNights(fields.arrival.value, fields.departure.value);
    const guests = Number(fields.guests.value);
    return {
      arrival: formatDisplayDate(fields.arrival.value),
      departure: formatDisplayDate(fields.departure.value),
      nights,
      guests: Number.isFinite(guests) && guests >= 1 ? String(guests) : '–',
    };
  };

  const updateStaySummary = () => {
    const nights = countNights(fields.arrival.value, fields.departure.value);
    const datesAreValid =
      Boolean(fields.arrival.value) &&
      fields.arrival.value >= today &&
      Boolean(fields.departure.value) &&
      nights > 0;

    staySummary.hidden = !datesAreValid;
    if (!datesAreValid) return;

    const data = getStayData();
    summaryValue('summary-arrival', data.arrival);
    summaryValue('summary-departure', data.departure);
    summaryValue('summary-nights', String(data.nights));
    summaryValue('summary-guests', data.guests);
  };

  const updateMessageCount = () => {
    messageCount.textContent = `${fields.message.value.length} / 1000`;
  };

  const clearFormError = () => {
    formErrorStatus.hidden = true;
  };

  const resetInterface = () => {
    Object.values(fields).forEach((field) => setFieldError(field));
    clearFormError();
    updateMessageCount();
    setDateMinimums();
    updateStaySummary();
  };

  setDateMinimums();
  updateMessageCount();

  [fields.name, fields.phone, fields.email, fields.message].forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validateField(field);
      if (field === fields.message) updateMessageCount();
      clearFormError();
    });
  });

  fields.arrival.addEventListener('change', () => {
    setDateMinimums();
    validateField(fields.arrival);
    if (fields.departure.value) validateField(fields.departure);
    updateStaySummary();
    clearFormError();
  });

  fields.departure.addEventListener('change', () => {
    validateField(fields.departure);
    updateStaySummary();
    clearFormError();
  });

  fields.guests.addEventListener('input', () => {
    if (fields.guests.getAttribute('aria-invalid') === 'true') validateField(fields.guests);
    updateStaySummary();
    clearFormError();
  });

  fields.privacyConsent.addEventListener('change', () => {
    validateField(fields.privacyConsent);
    clearFormError();
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearFormError();

    const validationOrder = [
      fields.name,
      fields.phone,
      fields.email,
      fields.guests,
      fields.arrival,
      fields.departure,
      fields.message,
      fields.privacyConsent,
    ];
    const invalidFields = validationOrder.filter((field) => !validateField(field));

    if (invalidFields.length) {
      invalidFields[0].focus();
      updateStaySummary();
      return;
    }

    const submittedStay = getStayData();
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Odosielam…';

    try {
      const body = new URLSearchParams();
      new FormData(form).forEach((value, key) => body.append(key, String(value)));

      const response = await fetch(window.location.pathname, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!response.ok) throw new Error(`Form submission failed: ${response.status}`);

      form.reset();
      resetInterface();
      summaryValue('success-arrival', submittedStay.arrival);
      summaryValue('success-departure', submittedStay.departure);
      summaryValue('success-nights', String(submittedStay.nights));
      summaryValue('success-guests', submittedStay.guests);
      form.hidden = true;
      successPanel.hidden = false;
      successPanel.focus();
    } catch (_error) {
      formErrorStatus.hidden = false;
      formErrorStatus.focus();
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });

  sendAnotherButton.addEventListener('click', () => {
    form.reset();
    resetInterface();
    successPanel.hidden = true;
    form.hidden = false;
    fields.name.focus();
  });
})();
