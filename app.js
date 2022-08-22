"use strict";

//** Form **
const form = document.querySelector("[name='card-form']");

//** Inputs **
const cardNameInput = document.querySelector("#card__name");
const cardNumberInput = document.querySelector("#card__number");
const monthInput = document.querySelector("#card__month");
const yearInput = document.querySelector("#card__year");
const cardCvc = document.querySelector("#card__cvc");
const inputs = document.querySelectorAll("input");

//** Card display **
const cardHolder = document.querySelector(".card__holder");
const cardNumDisplay = document.querySelector(".card__num");
const monthExpiry = document.querySelector(".month-expiry");
const yearExpiry = document.querySelector(".year-expiry");
const cardBackCvc = document.querySelector(".card__back--cvc");

//** Submit button **
const btnSubmit = document.querySelector(".btn__submit");
const successBtn = document.querySelector(".btn-scuccess");

//** Success message **
const successMsg = document.querySelector(".success");

//** Error messages **
const nameError = document.querySelector("#name--error");
const numberError = document.querySelector("#number--error");
const monthError = document.querySelector("#month--error");
const yearError = document.querySelector("#year--error");
const cvcError = document.querySelector("#cvc--error");

const date = new Date();
const currentYear = date.getFullYear().toString().slice(-2);
const month = date.getMonth() + 1;
console.log(month);

const cleaveCardNumber = new Cleave("#card__number", {
  creditCard: true,
});

const cleaveMonth = new Cleave("#card__month", {
  date: true,
  datePattern: ["m"],
});

cardNameInput.focus();

//** Input validation functions **

function errorConditionals() {
  if (cardNameInput.value === "") {
    nameError.textContent = nameError.dataset.error;
    cardNameInput.classList.add("outline", "error");
  } else if (cardNameInput.value.length < 3) {
    cardNameInput.classList.add("outline", "error");
    nameError.textContent = "Name is too short";
  } else {
    nameError.textContent = "";
    cardNameInput.classList.remove("outline", "error");
  }

  if (cardNumberInput.value === "") {
    numberError.textContent = numberError.dataset.error;
    cardNumberInput.classList.add("outline", "error");
  } else if (cardNumberInput.value.length < 19) {
    cardNumberInput.classList.add("outline", "error");
    numberError.textContent = "Not enough numbers";
  } else if (cardNumberInput.value.length === 19) {
    numberError.textContent = "";
    cardNumberInput.classList.remove("outline", "error");
  }

  if (monthInput.value === "") {
    monthError.textContent = monthError.dataset.error;
    monthInput.classList.add("outline", "error");
  } else if (monthInput.value <= month && yearInput.value === currentYear) {
    // monthError.textContent = "Expired Card!";
    monthInput.classList.add("outline", "error");
  } else {
    monthError.textContent = "";
    monthInput.classList.remove("outline", "error");
  }

  if (yearInput.value === "") {
    yearInput.classList.add("outline", "error");
  } else if (yearInput.value <= currentYear || yearInput.value < 10 || monthInput.value <= month) {
    console.log(currentYear);
    yearInput.classList.add("outline", "error");
    yearError.textContent = "Expired Card!";
  } else {
    yearError.textContent = "";
    yearInput.classList.remove("outline", "error");
  }

  if (cardCvc.value === "") {
    cvcError.textContent = cvcError.dataset.error;
    cardCvc.classList.add("outline", "error");
  } else if (cardCvc.value.length < 3) {
    cardCvc.classList.add("outline", "error");
    cvcError.textContent = "Cvc too short!";
  } else {
    cvcError.textContent = "";
    cardCvc.classList.remove("outline", "error");
  }
}

//** Keyup functions **

cardNameInput.addEventListener("keyup", function () {
  cardHolder.textContent = cardNameInput.value;
  if (cardNameInput.value) {
    cardNameInput.style.textTransform = "capitalize";
    cardNameInput.classList.remove("outline", "error");
    nameError.textContent = "";
  }
});

cardNumberInput.addEventListener("keyup", function () {
  cardNumDisplay.textContent = cardNumberInput.value;
  if (cardNumberInput.value !== "" && cardNumberInput.value.length === 19) {
    cardNumberInput.classList.remove("outline", "error");
    numberError.textContent = "";
  }
});

monthInput.addEventListener("keyup", function () {
  monthExpiry.textContent = monthInput.value;
  if (monthInput.value) {
    monthInput.classList.remove("outline", "error");
    monthError.textContent = "";
  }
});

yearInput.addEventListener("keyup", function () {
  yearExpiry.textContent = yearInput.value;
  if (yearInput.value) {
    yearInput.classList.remove("outline", "error");
    yearError.textContent = "";
  }
});

cardCvc.addEventListener("keyup", function () {
  cardBackCvc.textContent = cardCvc.value;
  if (cardCvc.value) {
    cardCvc.classList.remove("outline", "error");
    cvcError.textContent = "";
  }
});

//** Form Submit **

function isFormValid() {
  let submit = true;
  inputs.forEach((input) => {
    if (input.classList.contains("error")) {
      submit = false;
    }
  });

  return submit;
}

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  errorConditionals();

  console.log(typeof cardNameInput.value);

  if (isFormValid() === true && successMsg.classList.contains("hide")) {
    form.style.opacity = "0";
    successMsg.classList.remove("hide");
    successMsg.classList.add("show");
  }
});

successBtn.addEventListener("click", () => {
  window.location.href = window.location.href;
});
