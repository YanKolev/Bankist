'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2024-06-20T17:01:17.194Z',
    '2024-06-21T23:36:17.929Z',
    '2024-06-22T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function(date){

  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2-date1) /(1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date (acc.movementsDates[i]);
    const displayDate = formatMovementDate(date);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

// FAKE ALWAYS LOGGED IN 
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;
/*
//setting up the date for the app
const now2 = new Date();
const day = `${now2.getDate()}`.padStart(2, 0);
const month = `${now2.getMonth() +1}`.padStart(2, 0);
const year =now2.getFullYear();
const hour = now2.getHours();
const min = now2.getMinutes();
labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

//day/month/year
*/


btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Create current date and time
    const now2 = new Date();
    const day = `${now2.getDate()}`.padStart(2, 0);
    const month = `${now2.getMonth() +1}`.padStart(2, 0);
    const year =now2.getFullYear();
    const hour = `${now2.getHours()}`.padStart(2, 0);
    const min = `${now2.getMinutes()}`.padStart(2, 0);
    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    //Add loan date
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// Converting and checking numbers

// In javascript all numbers are represented as floating point numbers, always as decimals regardless if we write them as integers or decimals
console.log(23 === 23.0)
//Numbers are always stored in binary format- only composed of 0s and 1s

//1 Base 10 - 0 to 9
// Binary base 2(numbers) -> 0 and 1

//strange errors
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);

//Conversion Strings to numbers
console.log(Number('23')); // converting string to a number
console.log(+'23'); // easier way, because when JS sees the plus operator it will do type coercion

//Parsing

//console.log(Number.pasrseInt('30px', 10)) //in order for this to work we need the string to start with a number and JS, will read and try to figure out the number that we put and place it as a number
console.log(Number.parseInt('e23', 10)) //it will print NaN- not a number as it cant detect it properly
// parseInt- is for parse integer, so we can add second condition, best practice it would be to be 10 to avoid bugs

console.log(Number.parseFloat('2.5rem')) //prints 2.5
console.log(Number.parseInt('2.5rem')) // prints 2 (it stops at the decimal)


//if Value is NaN
console.log(Number.isNaN(20)) //isNAN- is it not a number-> with 20 it will be false, as 20 is false NAN- and its TRUE number
console.log(Number.isNaN('20')) // it will also say false, its just regular value
console.log(Number.isNaN(+'20x')) //it will be true- as its not a number
console.log(Number.isNaN(23/0)) // it will result in Infinity, division by 0 is not allowed


//there is a better method-> we could use isFinite
//Best way of checking if value is number

console.log(Number.isFinite(20)); //we will get TRUE/ the opposite of isNAN
console.log(Number.isFinite('20')) // False
console.log(Number.isFinite(+'20x')) // False
console.log(Number.isFinite(23 / 0)) // False

//Or to check for integers you can use: 

console.log(Number.isInteger(23))
console.log(Number.isInteger(23.0))
console.log(Number.isInteger(23 / 0))




// --- Math and Rounding ---

//square root
console.log(Math.sqrt(25)); //5
console.log(25 **(1/2)); //5
console.log(8 **(1 / 3)); //2

console.log(Math.max(5,18, 23, 11, 2)) //returns 23- as it returs the maximum number
//.max- makes type coercion and it does not parsing- 
console.log(Math.max(5,18, '23', 11, 2)) //string 23 will be type coerced and outcome is 23
console.log(Math.max(5,18, '23px', 11, 2)) //it will not PARSE IT, result will be NaN

//as we have max, we have min also: 
console.log(Math.min(5,18, 23, 11, 2)) 


//if you want to calculate the area of a circle with radius of 10px
console.log(Math.PI * Number.parseFloat('10px') ** 2)

//random generation with the math method
console.log(Math.trunc(Math.random() * 6)+1);

//formula to generate random integers between 2 values: 
const randomInt = (min, max) => Math.trunc(Math.random() * (min-max) +1) + min;
// 0 .....1 -> 0 ... (max -min) -> min...max
console.log(randomInt(10,20));

//rounding integers
console.log(Math.trunc(23.3));

//- round- it will round to the nearest integer
console.log(Math.round(23.3)) // result will be 23
console.log(Math.round(23.9)) // result will be 24

//-ceil- Always rounding up
console.log(Math.ceil(23.3)); //24 
console.log(Math.ceil(23.9)); //24

//-floor- Always rounding down
console.log(Math.floor(23.3)); //23
console.log(Math.floor(23.9)); //23

//All of the types do type coercion so even if its a string it will convert it to a integer

//However if you compare trunc and floor, while using a negative number, results will be different
console.log(Math.trunc(-23.3)); //trunc will cut off at -23
console.log(Math.floor(-23.3)); //floor will round down to -24, as rounding works the other way around with negative numbers

//floor works a bit better than trunc, as it can be used in all situation, even with negative outputs
const randomIntv2 = (min, max) => Math.floor(Math.random() * (min-max) + 1) + min;

//rounding decimal point numbers

console.log((2.7).toFixed(0)) //it will convert to string 3
console.log((2.7).toFixed(3))
console.log((2.345).toFixed(2)) //string 2.35
console.log(+(2.345).toFixed(2)) // number 2.35

// Remainder Operator 
// remainder operator simply returns the remainder of a division

console.log(5 % 2); //1 is the remainder
console.log(5 / 2); //5 = 2+2+1 
console.log(8 % 3); //2
console.log(8 /3); //8= 2 * 3 + 2

//number is even, if  its divisible by 2
console.log(6 % 2)

//function for checking if number is even or odd

const isEven = n => n % 2 === 0;
console.log(isEven(8))
console.log(isEven(23))
console.log(isEven(51))

labelBalance.addEventListener('click', function (){
  [...document.querySelectorAll('.movements_row')].
  forEach(function(row, i){
    // 0, 2, 4, 6
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    // 0, 3, 6, 9
    if (i % 3 === 0) row.style.backgroundColor = 'blue'
  })

});

// Numeric Separators from ES2021// using only numbers in code. DO NOT USE NUMBER AS A STRING (from API)

const diameter = 287_460_000_000;
//when facing a big number you can use underscore to pause numbers like that-> 1000 separator

const priceCents = 345_99; 

const transferfee = 15_00;

// --- BIGINT ---

//numbers are represented internally in JS as 64 bits, 64s 1s and 0es, only 53 are used to store the digits themselves
// the rest are for storing the position of the deimal point nad the sign, hence its a limit how big number can be

console.log(2 ** 53 - 1) // the biggest number that JS can safely represent, 
// 2(base of 2->since we are working with 0 and 1 ) to the power of 53 -1, minus one is becuase we are starting from 0
console.log(Number.MAX_SAFE_INTEGER); //saved in the memory and any integer that is bigger is not safe 

//from ES 2020- BIG INT primitive has been added to be able to store as big numbers as we can
console.log(4234234242623623423423423423423423n)
//with the n at back you are able to display the number or  use the big Int function 
console.log(BigInt(4234234242))

//Operations with bigint (most of the operations work fine with big int)
console.log(10000n + 10000n);


//you can not mix bigint with regular number
const huge = 324234234234234234234234234234
const num = 23
console.log(huge * num) // it will not going to work so u need to correct it in v2
//v2
//console.log(huge * BigInt(num)) // you need to convert the num into big int so JS can regognize it


// NB!!!! Math operation will not work with BIGINT
// NB!!!! there are 2 exceptions- comparison operator and plus operator when working with strings

console.log(20n > 15); //true
console.log(20n === 20); //false
console.log(20n == 20); //true- as it will make type coercion and transform it

//string concatinations 
console.log(huge + 'is REALLY BIG');

//Divisions
console.log(10n /3n); //3n it will return closest big int, cuts the decimal part off


// --- Creating Dates --- 

//create a date- 4 ways of creating them in JS, all use new date constructor function, but can accept different parameters

//use the new date
const now = new Date();
console.log(now);//getting current date and time 

//is to parse the date from a date string
console.log(new Date('Jun 23 2024 13:21:15'));
//we can also write a strin ourselves 
console.log(new Date('December 24, 2015'));
//it can be quite unreliable to make one by hand-> HOWEVER if its made by JS itself it can pretty safe

console.log(new Date(account1.movementsDates[0])); //taken from the object of the project 
//Z means UTC at the end 

console.log(new Date(2037, 10, 19, 15, 23, 57)); // we have 10, but it shows the number in console as November, 
//that means the month in JS is 0 based. 

//JS autocorrects the date, we will make that Nov 31(doesnt exist and it will autocorrect to the next day) 
console.log(new Date(2037, 10, 31)); // It will print 1 Dec on the console

//we can pass into the date costructor funtion the miliseconds, past since the begging of Unix time 

console.log(new Date(0));// it will show the Origigal date of Unix Creation

//how to convert to miliseonds
console.log( new Date (3 * 24 * 60 * 60 * 1000)); //3 days, 24 hours 60min, 60 sec, 1000 miliseconds
// it will return jan 4 1970 

console.log( '------------------------');

// The Dates that we created are in fact just another special type of object and they have their own methods, like arrays, maps or strings

//Working with Dates
/*
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear()); //ALWAYS USE GET FULL YEAR!!!! 
console.log(future.getMonth()); //ALWAYS REMEMBER THAT MONTHS ARE 0 BASED
console.log(future.getDate());
console.log(future.getDay());// ITS THE DAY OF THE WEEK-> 0 is SUNDAY ( 4 is Thursday)
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); // international string format
console.log(future.getTime()); //showing the miliseconds since jan 1st 1970 and the one that we put

*/

//we can reverse the timestamp
console.log(new Date(2142253380000));

//current timestamp
console.log(Date.now());

//future.setFullYear(2040);
//console.log(future);

// Operations with dates 

//we can do calculations with dates, we can subtrack one date from another date to calculate how many days. 
//we can use the timestamps and perform the calculations with them 

const future = new Date(2037, 10, 19, 15, 23);
//console.log(Number(future));
console.log(+future) // converst timestamp with miliseconds and back 

//function that takes in 2 dates and gonna return the number of days that pass between the days

const calcDaysPassed = (date1, date2) => Math.abs(date2-date1) /(1000 * 60 * 60 * 24);

const days1 =calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24)); //result should be 10 as its only 10 days that passed between the time

console.log(days1);
