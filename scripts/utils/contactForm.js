function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  //   document.querySelector("#main").style.backgroundColor: rgba(255, 255, 255, 0.8);
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

// Pour éviter que la page se recharge lors du clic "submit"
const theForm = document.querySelector("#theForm");
theForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

//#region REGEXP TOOLS
// Validation Nom & Prénom
function validateName(name) {
  return /^[a-zA-ZÀ-ú -]{2,45}$/.test(String(name).trim());
  // entre a et z (min ou maj) ac/ss accent, de 2 à 45 caractères
  // .test permet de tester la Regexp
  // .trim permet de supp les espaces
}

// Validation Email
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
//#endregion

//#region NAMES verification

//First Name verication
const firstName = document.querySelector("#firstname");
const firstNameMsgError = document.querySelector(".firstNameData span");
let fistNameOK = false;

firstName.addEventListener("input", function (e) {
  if (!validateName(e.target.value)) {
    //on pourrait remplacer e.target par fisrtName
    firstNameMsgError.style.display = "block";
    firstName.style.border = "2px solid lightcoral";
  } else {
    firstNameMsgError.style.display = "none";
    firstName.style.border = "none";
    fistNameOK = true;
  }
});

// Last Name verification
const lastName = document.querySelector("#lastname");
let lastNameOK = false;

lastName.addEventListener("input", function (e) {
  if (!validateName(e.target.value)) {
    lastName.closest("div").querySelector(".msgError").style.display = "block";
    lastName.style.border = "2px solid lightcoral";
  } else {
    lastName.closest("div").querySelector(".msgError").style.display = "none";
    lastName.style.border = "none";
    lastNameOK = true;
  }
});
//#endregion

//#region EMAIL verification
const email = document.querySelector("#email");
let emailOK = false;

email.addEventListener("input", function (e) {
  if (!validateEmail(email.value)) {
    email.closest("div").querySelector(".msgError").style.display = "block";
    email.style.border = "2px solid lightcoral";
  } else {
    email.closest("div").querySelector(".msgError").style.display = "none";
    email.style.border = "none";
    emailOK = true;
  }
});
//#endregion

// Validation du formulaire
function formValidated() {
  const rmctEcran = document.querySelector(".remerciement");
  rmctEcran.style.display = "block";
}

//  SUBMIT - LAST verification
theForm.addEventListener("submit", function (e) {
  if (!(fistNameOK && lastNameOK && emailOK)) {
    // ==> if (! (true)) ==> if false
    console.log("missing");
    return;
  }
  formValidated();
});
