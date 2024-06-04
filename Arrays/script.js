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

const displayMovements = function(movements) {
  containerMovements.innerHTML = ''; // html return everything including the html/ but here is used as a setter.

  movements.forEach(function(mov, i){
    const type = mov > 0 ?"deposit" : "withdrawal"


    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1}</div>
      
      <div class="movements__value">${mov}</div>
  </div>

    `;

    containerMovements.insertAdjacentHTML("afterbegin",html)
      //any new child element will appear before the child elements that there were. 
      



  });
};


displayMovements(account1.movements)

//creating username functionality 
// using for each as it mutates and creates the side effect that we are looking for the functionality 
const createUsernames = function(accs){
  accs.forEach(function(acc){
    acc.username = acc.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0]) //map was used to create a new array to simplify the name creation
    .join('');
  })



  /*const username = user
    .toLowerCase()
    .split(' ')
    .map(name => name [0]) //this is returning with an arrow function 
    .join('')
  return username;*/

};

createUsernames(accounts);
console.log(accounts);



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES



//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// Why array have methods? Methods are simply functions that we can call on objects 
//they are functions attached to objects. That means that arrays themselves are also objects. 
//these arrays methods are simply functions that we attach to arrays in all JS. 

//let arr = ['a', 'b', 'c', 'd', 'e'];

//first method- slice
//console.log(arr.slice(2)); 
// this doesnt not mutate the original array, it makes copy of the array with the extracted parts
//console.log(arr.slice(2,4));
//console.log(arr.slice(-2));
//console.log(arr.slice(-1));
//console.log(arr.slice(1,-2))
//slice method to create a shallow copy of anny array
//console.log(arr.slice()); //this is for chaining- multiple methods together
//console.log([...arr]);


//second method- splice
//it mutates the original array, otherwise its almost the same as slice

//console.log(arr.splice(2));
//console.log(arr);
//splice is used to remove elements from arrays
//arr.splice(-1);
//console.log(arr);
//arr.splice(1,2);
//console.log(arr);


//third method - Reverse

//Reverse also mutates the array

/*
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

*/



// ---  Looping arrays for EACH --- 


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//if we want to print a message for each movement we need to loop over
// positive values- deposits, negative value-withdrawals

//for (const movement of movements){
for(const [i, movement] of movements.entries()){  // here we will get i as a counter and then it will count eah transaction
  if (movement >0){
    console.log(`Movement ${i+1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i+1}: You withdrew ${Math.abs(movement)}`);
  }
}

//how to use the for each method to achieve something similar, but slightly easier
/* forEach is higher order function, which requires call back function in order to tell it what to do
for eah method will call the function, forEach method loops over the array and in each adoration it will execute
this callback function, as it calls the function for each adoration it will pass over the current elements as argument
*/

movements.forEach(function(mov, i, arr){ // mov= movement, i-index, arr-array
  if (mov >0){
    console.log(`Movement ${i+1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i+1}: You withdrew ${Math.abs(mov)}`);
  }
})
// below is how the forEach pass the element of the array
// You give instructions with the function 

// 0:function(200)
// 1:function(450)
// 2:function(400)

// in the for each method is a lot easier to get into the current index- for each passed the current element, index and the entire array that we are looping, hence we can specify it in the parameter list

//NB continue and break statements do not work in a forEach method.
//forEach will always loop over the entire array, if you want to break-> for of loop





//--- FOREACH WITH MAPS AND SETS ---

// MAP FOR_EACH
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, map){
  console.log(`${key}: ${value}`)
})

//SET FOR_EACH

//in the last one we will see that the key is exactly the same as a value
// a set doesnt have keys, and it doesnt have indexes,

const currenciesUnique = new Set(['USD','GBP', 'USD','EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function(value, key, map){
  console.log(`${key}: ${value}`)
})

//most common methods in arrays: map, filter and reduce

//map method-used to move over arrays, is similar to the forEach method, creates brand new array from the original one
// basically returns new array containing the results of applying an operation on all original array elements.

//filter method- used for filtering elements in the original array which satisfy certain condition.
// returns a new array containing the array elements that passed the specified test condition

//reduce method- reduces all array elements down to one single value (adding all elements together)
//there is no new array in this method only the reduced value.

// --- Map Method ---

const movementsEuro = [200, 450, -400, 3000, -650, -130, 70, 1300]

const eurToUsd = 1.1;

const convertedMovements = movementsEuro.map(function(mov){
  return mov * eurToUsd; //here we use a function to solve the problem
})
console.log(movementsEuro);
console.log(convertedMovements);

//same method but with for of loop

const movementsUSDfor = [];
for (const mov of movementsEuro) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);
//here we loop over one array and manually create a new one

//we can simplify the callback function with an arrow

/*
const convertedMovements = movementsEuro.mapfunction(mov => mov * eurToUsd); 
*/

 const movementsDescriptions = movements.map((mov, i , arr) =>{
  if (mov >0){
    return `Movement ${i+1}: You deposited ${mov}`;
  } else {
    return `Movement ${i+1}: You withdrew ${Math.abs(mov)}`;
  }
})
//converting console logs into return functions, 
//totally possible to have two or more return functions

const movementsDescriptionsv2 = movements.map((mov, i) => `Movement ${i + 1}: You ${mov > 0 ? 'deposited': 'withdrew'} ${Math.abs(mov)}`)
console.log(movementsDescriptionsv2);
//the map method calls the function for each of the array elements in the movement array 
// and since we are using only - mov and i- mov>current array element and i>current array index
// map method does not create side effect, but instead we created a new array. 
