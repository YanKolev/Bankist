'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// Why array have methods? Methods are simply functions that we can call on objects 
//they are functions attached to objects. That means that arrays themselves are also objects. 
//these arrays methods are simply functions that we attach to arrays in all JS. 

let arr = ['a', 'b', 'c', 'd', 'e'];

//first method- slice
console.log(arr.slice(2)); 
// this doesnt not mutate the original array, it makes copy of the array with the extracted parts
console.log(arr.slice(2,4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1,-2))
//slice method to create a shallow copy of anny array
console.log(arr.slice()); //this is for chaining- multiple methods together
console.log([...arr]);


//second method- splice
//it mutates the original array, otherwise its almost the same as slice

console.log(arr.splice(2));
console.log(arr);
//splice is used to remove elements from arrays
arr.splice(-1);
console.log(arr);
arr.splice(1,2);
console.log(arr);


//third method - Reverse

//Reverse also mutates the array

arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h','g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

//fourth method- Concat

//used to concatanate 2 arrays, DOES NOT MUTATE ORIGINAL ARRAYS
const letters = arr.concat(arr2); // we have to speccify the second array
//first array will be the one on which the method is called- arr, and the second in brackets-> one that we pass into the method.
//variation is :
console.log([...arr, ...arr2]) // alternative to concat method


//fifth method - Join

console.log(letters.join('-'));

//All 5 methods can be used also with- push, unshift, pop, shift, indexof, includes
// also keep track on the on the MDN documents.



// -- At method/ introduced in ES 2022

const arr3 = [23, 11, 64];
console.log(arr3[0]);
console.log(arr3.at(0)); 
// the new at method is used in particular cases
//lets say we needed to get the last element of an array but we do not know the lenght of the array

//usually we will write it like: 
console.log(arr3[arr3.length - 1]);

//KEEP IN MIND THAT ARRAYS ARE 0 INDEX BASED

//another solution is slice method- to get a copy of it
console.log(arr3.slice(-1)[0]); // we add -1 to get the last element, and getting it out we add [0]

//new at method makes it easier

console.log(arr3.at(-1));
//at method starts to count from the right side of the array

//if you want to count or method chaining AT is quite helpful to use instead of old ways
//if you want a quick way to get a value- u can use the bracket notation

//at method also works on strings 
console.log('jonas'.at[0]);