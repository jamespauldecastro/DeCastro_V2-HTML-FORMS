// get the form element.
const orderForm = document.querySelector('.order-form');

// get the input elements.
const firstNameInput = document.getElementById('fname');
const lastNameInput = document.getElementById('lname');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');

// get the place order and cancel buttons..
const placeOrderButton = document.querySelector('.place-order');
const cancelButton = document.querySelector('.cancel');

// function to validate the inputs.
const validateInputs = () => {
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();
  const age = ageInput.value;

  // check if any input is empty.
  if (!firstName || !lastName || !email || !age) {
    alert('Please fill in all fields');
    return false;
  }

  // check if age is between 18 and 99.
  if (age < 18 || age > 99) {
    alert('Please enter a valid age between 18 and 99');
    return false;
  }

  // check if email is valid.
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email.match(emailRegex)) {
    alert('Please enter a valid email address');
    return false;
  }

  return true;
};

// function to clear all inputs.
const clearInputs = () => {
  firstNameInput.value = '';
  lastNameInput.value = '';
  emailInput.value = '';
  ageInput.value = '';
};

// event listener for place order button.
placeOrderButton.addEventListener('click', (e) => {
  e.preventDefault();

  if (validateInputs()) {
    alert('Order placed successfully!');
  }
});

// event listener for cancel button.
cancelButton.addEventListener('click', (e) => {
  e.preventDefault();

  clearInputs();
});