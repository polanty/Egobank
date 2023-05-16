const signUpBtn = document.querySelector(".formbtn");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const accountPin = document.getElementById("accountpin");
const accountPinCheck = document.getElementById("accountpincheck");
const accountOperations = document.querySelectorAll(
  ".account__Operations--content"
);
const accountOperationsbtn = document.querySelectorAll(".operation__tab");
const operationTabParent = document.querySelector(".account__Operations--tabs");
const accountMovementCont = document.querySelector(".account__movements");
const accountSignInbtn = document.querySelector(".login__signin");
const accountUserNameValue = document.querySelector(".login__username");
const accountPinValue = document.querySelector(".login__pin");

account1 = {
  firstName: "Adedeji",
  lastName: "Oyin",
  accountNumber: 45312890,
  transactions: [102, -209, 1288, 50, -400, -200],
  pin: 5544,
};

account2 = {
  firstName: "Adedoyin",
  lastName: "Samson",
  accountNumber: 42782990,
  transactions: [2900, -200, 2100, 580, -4700, -310],
  pin: 6789,
};

account3 = {
  firstName: "Ryan",
  lastName: "Smith",
  accountNumber: 45312370,
  transactions: [976, -200, 154, 7800, -400, -710],
  pin: 3241,
};

account4 = {
  firstName: "Adedeji",
  lastName: "Oyin",
  accountNumber: 490277260,
  transactions: [2000, -100, 2100, 8550, -4000, -200],
  pin: 8901,
};

//representation of some sort of postgredatabase
const accountList = [account1, account2, account3, account4];

//returns whatever you decide to program as the username
const computeUsername = function (account) {
  const { firstName } = account;
  return firstName;
};

const logAccountTransacations = function (account) {
  //make sure the parent element is empty
  accountMovementCont.innerHTML = "";

  //looping through all transaction in the array
  account.transactions.forEach((transaction, index) => {
    const accountClass =
      transaction > 1
        ? "account__movements-type--deposit"
        : "account__movements-type--withdrawal";
    const transactionClass = transaction > 1 ? "deposit" : "withdrawal";

    //hmtl template of each transaction
    const transactionBlocks = `
      <div class="account__movements-row">
      <div
        class= "account__movements-type ${accountClass}"
      >
        ${index + 1} ${transactionClass}
      </div>
      <div class="account__movements-date">3 days ago</div>
      <div class="account__movements-value">${transaction} $</div>
    </div>
    <div class="account__transaction-description">
      <p class="transaction__details transaction__details-${transactionClass}">
        You Just ${transaction > 1 ? "Received" : "sent"} ${Math.abs(
      transaction
    )} ${transaction > 1 ? "from" : "to"} Ade on 21st oct, 2020 with trasaction
        Id 56789900
      </p>
      <p class="transaction__dates">
        Wednesday, December 30, 2022 22:40:0
      </p>
    </div>
      `;

    accountMovementCont.insertAdjacentHTML("beforeend", transactionBlocks);
  });
};

const totalBalance = function (account) {
  let initialValue = 0;
  const sumWithInitial = account.transactions.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );

  return sumWithInitial;
};
//logAccountTransacations(account1);

let surName = lastName.value;
let myUserName;
let myAccountPinValue;
let currentAccount;

//Implementing the Login from each account
accountSignInbtn.addEventListener("click", function (e) {
  e.preventDefault();
  myUserName = accountUserNameValue.value;
  myAccountPinValue = +accountPinValue.value;

  //i have to find the index of the account itself

  currentAccount = accountList.find(
    (account) => account.firstName.toLowerCase() === myUserName.toLowerCase()
  );

  console.log(currentAccount);
  //display the account details if the condition of the username and pin matches
  if (currentAccount && currentAccount.pin === myAccountPinValue) {
    //empty the input field after its suceesful
    accountUserNameValue.value = "";
    accountPinValue.value = "";

    const welcomeMessage = document.querySelector(".login__message");
    const totalBalanceText = document.querySelector(".account__balance-value");
    welcomeMessage.textContent = `Welcome ${
      myUserName.charAt(0).toUpperCase() + myUserName.slice(1)
    }`;
    totalBalanceText.textContent = `Available Balance is : ${totalBalance(
      currentAccount
    )}$`;

    logAccountTransacations(currentAccount);
  } else {
    //empty the input field after its suceesful
    console.log("ERROR ACCOUNT");
  }
});

// signUpBtn.addEventListener("click", function (e) {
//   e.preventDefault();

//   let name = firstName.value;
//   let surname = lastName.value;

//   const custormerDetails = {
//     name,
//     surname,
//   };

//   console.log(custormerDetails);
// });

// loop through all the tabs and remove the active class from them
//console.log(accountOperationsbtn, accountOperations);

operationTabParent.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operation__tab");
  //Guard clause
  if (!clicked) return;

  // remove all active from content
  accountOperationsbtn.forEach((tab) =>
    tab.classList.remove("operation__tab--active")
  );
  //add active to the classlist
  clicked.classList.add("operation__tab--active");

  //activate the content area
  accountOperations.forEach((tab) =>
    tab.classList.remove("account__Operations--active")
  );

  console.log(clicked.dataset.tab);
  document
    .querySelector(`.account__Operations--${clicked.dataset.tab}`)
    .classList.add("account__Operations--active");
});

//display the transaction description bellow the transaction

accountMovementCont.addEventListener("click", function (e) {
  //grab the account movement element sibling
  const clicked = e.target.closest(".account__movements-row");
  //Guard clause
  if (!clicked) return;

  //grab the account description and toggle the active class
  clicked.nextElementSibling.classList.toggle("active");
});
