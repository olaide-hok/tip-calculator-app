// Select DOM elements
const billField = document.getElementById("bill"); // bill input field
const numOfPeople = document.getElementById("numOfPeople"); // number of people input field
const numOfPeopleErrorText = document.getElementById("numOfPeopleErrorText"); // number of people error label
const tipAmountPerPerson = document.getElementById("tipAmountPerPerson"); // tip amount per person result field
const totalPerPerson = document.getElementById("totalPerPerson"); // total amount per person result field
const resetBtn = document.getElementById("resetBtn"); // reset button
const btnWrapper = document.querySelector(".btn-wrapper"); // the button wrapper and the custom input field
const customTipInput = document.getElementById("customTip");

// Helper functions
calculateTipPerPerson = (percentTip, numOfPeople) => {
  return (percentTip / numOfPeople).toFixed(2);
};

calculateTotalPerPerson = (bill, percentTip, people) => {
  const billPerPerson = bill / people;
  const tipPerPerson = percentTip / people;
  return (billPerPerson + tipPerPerson).toFixed(2);
};

// Check if the number of people is greater than zero
const isGtZero = () => parseInt(numOfPeople.value) > 0;

// Update error message and visibility
const updateError = (isNumOfPeopleGtZero) => {
  if (!isNumOfPeopleGtZero) {
    numOfPeopleErrorText.classList.remove("d-none");
    numOfPeopleErrorText.classList.add("error");
    numOfPeople.classList.add("error");
  } else {
    numOfPeopleErrorText.classList.add("d-none");
    numOfPeopleErrorText.classList.remove("error");
    numOfPeople.classList.remove("error");
  }
};

const calculateAndDisplayTip = (tipPercentage) => {
  if (!isGtZero()) {
    updateError(isGtZero());
    return;
  }

  const bill = parseFloat(billField.value);
  if (isNaN(bill)) return;

  const people = parseInt(numOfPeople.value);
  const percentTip = tipPercentage * 0.01 * bill;

  tipAmountPerPerson.textContent = calculateTipPerPerson(percentTip, people);
  totalPerPerson.textContent = calculateTotalPerPerson(
    bill,
    percentTip,
    people,
  );
};

// Add event listeners to all buttons
btnWrapper.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    customTipInput.value = "";
    // Extract the percentage value from the button's text content
    const tipValue = button.textContent.replace("%", ""); // Remove the '%' sign
    calculateAndDisplayTip(parseFloat(tipValue));
  });
});

// Add event listener for the Enter key on the custom input field
customTipInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    // Log the custom tip value
    const customTipValue = parseFloat(customTipInput.value.trim());
    if (!isNaN(customTipValue)) {
      calculateAndDisplayTip(customTipValue);
    }
  }
});

// Check if the number of people entered is greater than zero.
numOfPeople.addEventListener("input", () => {
  updateError(isGtZero());
});

resetBtn.addEventListener("click", () => {
  billField.value = "";
  numOfPeople.value = "";
  customTipInput.value = "";
  tipAmountPerPerson.textContent = "0.00";
  totalPerPerson.textContent = "0.00";
});
