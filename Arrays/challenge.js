/* 

Coding Challenge #1
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
about their dog's age, and stored the data into an array (one array for each). For
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
old.
Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages
('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
ages from that copied array (because it's a bad practice to mutate function
parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog
🐶 number 1
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
")
4. Run the function for both test datasets
Test data:
§Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
Hints: Use tools from all lectures in this section so far 😉
GOOD LUCK 😀

*/


/*
5 dog owners-> dog age
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
old.

function checkDogs-> accepts 2 arrays, 
create a shallow copy of fucntion1 and remove the last 2 entries. do not mutate!!! 

array with the data of function 1 (corrected) and function 2 

each remaining dog, log to the console whether it's an adult ("Dog
🐶 number 1
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy") */

const julDogs = [3, 5, 2, 12, 7];
const katDogs = [4, 1, 15, 8, 3];

//console.log(julDogs);
//console.log(julDogs.slice(1, -2, -1)) //removes first and last 2 since false positive

const twoArr = julDogs.concat(katDogs); // concats 2 arrays
//console.log(twoArr);

const correctData = julDogs.slice(1, -2, -1).concat(katDogs); // concat of the fixed array and 
console.log(correctData);


for(const [i, correctData] of correctData.entries()){  
    if (correctData >= 3){
      console.log(`Dog ${i+1}: is an adult, and is 5 years old ${correctData}`);
      
    } else {
      console.log(`Dog ${i+1}: is still a puppy ${correctData} `);
    }
  }