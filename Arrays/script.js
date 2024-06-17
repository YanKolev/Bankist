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

//the sorting funtionality is set intially to false as we want to show how the movements are actually going
//once e hit the button of sort it ill sort them out


const displayMovements = function(movements, sort = false) {
  containerMovements.innerHTML = ''; // html return everything including the html/ but here is used as a setter.

  //slice is used to make a copy of he array so we can apply the function and sort it
  const movs = sort ? movements.slice().sort((a, b => a-b)): movements;

  movements.forEach(function(mov, i){
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html); // any new child element will appear before the child elements that there were.
  });
};

// Display balance function with movements and reduce method.
const calcDisplayBalance = function(acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

// Creating display summary function (incomes, outcomes, interest)
const calcDisplaySummary = function(acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * acc.interestRate / 100)
    .filter(int => int >= 1) // In case there is a new rule if the bank decides to exclude interest lower than 1
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// Creating username functionality using forEach as it mutates and creates the side effect that we are looking for the functionality
const createUsernames = function(accs) {
  accs.forEach(function(acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0]) // Map was used to create a new array to simplify the name creation
      .join('');
  });
};

createUsernames(accounts);
console.log(accounts);

// Function for updating UI
const updateUI = function(acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function(e) {
  // Prevent form from submitting
  e.preventDefault();
  console.log('LOGIN');

  // In order to log the user, we need to find the account from the accounts array
  // Username's from the user that input it
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // Clear the input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI call
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

// Implementing a loan feature
btnLoan.addEventListener('click', function(e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

// Closing account feature -> means to delete that acc object from the accounts array
// To delete an element from the array we use a splice method

// First we need to check if the credentials are correct and then proceed with the deletion
btnClose.addEventListener('click', function(e) {
  e.preventDefault();

  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    accounts.splice(index, 1); // Splice it will mutate the array and delete

    // In order to "delete the account we will need to log it out and hide the UI"
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

// Both find and findIndex method get access to current index and the current entire array.
// Both were added in ES6, so they will not work in old browsers.


//with this we are addding the sort functionality button, but when we click it it only sorts once
//we are unable to 'revert' the sort of the account to its previous method, hence we need to have the following: 
// by using a State variable which will monitor if we are currently sorting the array or not, 
//needs to live outside of the function

let sorted = false;

btnSort.addEventListener('click', function(e){
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;

})



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

//const eurToUsd = 1.1;

//const convertedMovements = movementsEuro.map(function(mov){
//  return mov * eurToUsd; //here we use a function to solve the problem
//})
//console.log(movementsEuro);
//console.log(convertedMovements);

//same method but with for of loop

/*
const movementsUSDfor = [];
for (const mov of movementsEuro) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

*/

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



// ---- Filter Method ----

const deposits = movements.filter(function(mov){
  return mov > 0;

})
console.log(movements);
console.log(deposits);

//for of loop variant of the filter method. verbose variant
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

/*const withdrawals = movements.filter(function(mov){
  return mov < 0;
})
console.log(withdrawals); */

//arrowfunction variant
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals)


// ---- Reduce Method ---- 
// reduce method- basically to boil down all the elements within an array to a single value

console.log(movements);

//acc- accumulator is like a snowball
const balance = movements.reduce(function(acc, cur, i, arr){
  console.log(`Iteration ${i}: ${acc}`); 
  return acc + cur// in each loop adoration we return the updated accuulator + the current value
}, 0) // the 0 if from where we start counting,
console.log(balance)


//arrow function variant
const balanceArr = movements.reduce((acc,cur)=>acc+cur,0);
console.log(balanceArr);


//for loop version 
// in order to make the loop we need external variable- let in order to correctly loop it 

let balance2 = 0;
for(const mov of movements) balance2 +=mov;
console.log(balance2)

//maximum value of the movements array (3000) we can use reduce to boil it down
const max = movements.reduce((acc, mov)=> {
  if (acc >mov)
    return acc;//to keep the value of the accumulator
  else
    return mov;
},movements[0])
console.log(max);

// chaining method of all the combined 3 methods- map, filter and reduce


const eurToUsd = 1.1;
console.log(movements);

// data pipeline
//the best way to troubleshoot an array with steps like that is check after every method in case the result is strange
const totalDepositsUSD = movements
.filter(mov=> mov >0) // in order to check if the filte is working correctly, u will have to check the parameter thatyou get access to in the call back function

/*.map(mov,i , arr) => {
  console.log(arr);
   return mov * eurToUsd;
})*/
.map(mov => mov* eurToUsd)
.reduce((acc, mov)=>acc +mov); // we are filtering only the deposits on this  and then we can convert it to USD
//all 3 methodss chained here.
console.log(totalDepositsUSD);

//--- Find method ---

// The find method, also accepts callback function ->Like the other arrays it loops over the array when the method is called
//find retrieves an element of the array, 
//it retrieves the first element that satisfies the condition, 
//DOES NOT MAKES A NEW ARRAY 


const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

// Find method is a bit similar to the filter methods, but there are fundamental differences: 
// Filter- returns all the elements that match the condition,
// Find- only returns the first one. 
// Second BIG DIFFERENCE: Filter method returns a new array: FIND RETURNS ONLY THE ELEMENT

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jesica Davis');
 //when we loop over the accounts, each account is an element
console.log(account);





//             ---SOME AND EVERY METHODS---


//here it checks only for equality 
console.log(movements);
console.log(movements.includes(-130));
//we can test ith the inludes method if a an array includes a certain value, however we can only fully test for equality
// if we want to test for a condition we can use the SOME method.


// we can specify a condition here
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits); // with the we can check if the re are any deposits( if its higher than 0 is a deposit) it returns either TRUE/ FALSE


// EVERY Method
//only returns true if ALL of the elements in the array satisfy the condition that you put in the call back function
// every element has to pass it, hence its name 

console.log(movements.every(mov => mov >0));
console.log(account4.movements.every(mov => mov > 0)); // only in this account all the movements are passing the conditions

//Separate callback 

const deposit = mov => mov >0; // this is will be used as a function
console.log(movements.some(deposit));
console.log(movements.every(deposit)); // we can use the const callback in all different scenarios, whichever we need. 
console.log(movements.filter(deposit));





// --- Flat and FlatMap methods ---

const arr = [[1,2,3], [4,5,6], 7,8];
//nested array that has elements even outside
//Flat method- no call back function- > removes nested arrays and makes into one, flattens it

console.log(arr.flat());

//array with even deeper nested-> flat method only goes one level deep when flattening an array
const arrDeep = [[[1,2],3], [4,[5,6]], 7,8];
console.log(arrDeep.flat()); 
// u can adjust the number of levels while providing  number in the argument
console.log(arrDeep.flat(2));

const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements); // it will create a nested struture with all the values in 1 array 


//chaining
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc +mov, 0);
console.log(overallBalance);


// --- flatMap --- 


// basically combines flat and map method at the same time in one method

const overallBalance2 = accounts
  .flatMap(acc => acc.movements) // map method that in the end flattens the result--> only goes 1 level deep,  if you need to go down deeper -> you will need to seprate them 
  .reduce((acc, mov) => acc +mov, 0);
console.log(overallBalance2);


// --- Sorting Array ---


// we are going to use the build in JS sort method. 

//strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

//Numbers
console.log(movements);
//console.log(movements.sort()); - does not work

//Rules of sort callbak function
//return < 0 , A, B (keep order)
//return > 0 , B, A (switch order)

//Ascending order sort
movements.sort((a, b) => {
  if (a > b)
    return 1;
  if (b > a)
    return -1;
});

//we can simplify the the method by makeing it as it follows
//movements.sort((a, b)=> a-b);

//Descending order sort
movements.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});

//movements.sort((a, b)=> b-a);

console.log(movements);


// --- Creating and filling arrays --- 

console.log([1, 2, 3, 4, 5, 6, 7]);
//console.log(new Array[1, 2, 3, 4, 5, 6, 7]);

// we can generate arrays automatically

// by using array constructor function and pass only 1 argumet- 7 

const x = new Array(7); // when one argument is passed it creates a new empty argument with that lenght  
console.log(x)
//this output does not create a new array- it creates a new array with 7 empty elements of it
// we can not use this x array for pretty much anything. 


// Empty arrays + fill method
x.fill(1);
console.log(x)

arr.fill(23, 4,6) // 23 is the parameter and the 4 and 6 are the positions


//Array.from  function we are using it on the Array constructure
//Array here is a function and on this function object we are calling the from method
const y = Array.from({length: 7}, () => 1);
console.log(y);

const z = Array.from({length:7}, (_, i)=> i+ 1); // we use _ in order to show that this is a throw away parameter

console.log(z);

const dicez = Array.from({length:100}, (_,i)=>i+1); //exerise
console.log(dicez);