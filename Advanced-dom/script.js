'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
    e.preventDefault(); // adding this to avoid the link+ href behaviour of the modal window
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

//for (let i = 0; i < btnsOpenModal.length; i++)
//  btnsOpenModal[i].addEventListener('click', openModal);
//Open modal is a node list, because is the result of the query selector, node list is not an array, but still we can use FOR EACH 

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//                           Course notes:



//SELECTING ELEMENTS 


console.log(document.documentElement);
// in order to target the real document, or apply css style to it we need to always select documentElement

console.log(document.head); // for selecting the head
console.log(document.body); //for selecting the body

const header = document.querySelector('.header'); // queryselector-> used for only 1 element
 const allSections = document.querySelectorAll('.section'); // queryselectorALL- when u need to select multiple elements
console.log(allSections);

//the query selectors can be used on all elements not only on the document

document.getElementById('section--1')
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);
//last method returns HTML collection instead of node list, the HTML collection is called 'live collection' meaning if DOM changes the collection changes as well

console.log(document.getElementsByClassName('btn')) // also uses HTML collection


// Creating and inserting elements 
//.insertAdjeacentHTML -> A way of creating elements used in the bankist app

 const message = document.createElement('div') // creates a dom element then stores that element in the message, its not yet in the dom itself, if we want to to be on the page, we need to manually insert it on the page
 //we can add classes => message is just an object that represents a DOM element
message.classList.add('cookie-message');
message.textContent = 'We use cookies for improved functionality and analytics.'
message.innerHTML = 'We use cookies for improved functionality and analytics <button class="btn btn--close--cookie"></button>'

header.prepend(message);
//prepend- adds the element (message) as the first child of the header element

//however we can also add it as the last child
//header.append(message); //message is inserted once and its indeed a live element, living in the DOM-> therefore can not at multiple places at the same time

//we can use the prepend and append method not only to insert elements but to also move them, as the DOM elements are unique and always exist at one place

//if we want multiple elements then we will need to copy  and remove APPEND

//header.append(message.cloneNode(true)) // it will make the message at top and bottom 

header.append(message);

//there are only 2 methods that we can use for the header 
//header.before(message); it will put it before the element AS A SIBLING
//header.after(message); after the element AS A SIBLING

//DELETE ELEMENTS 
document.querySelector('.btn--close--cookie').addEventListener('click', function(){
    //message.remove(); // newer way of removal 
    message.parentElement.removeChild(message); //old way of removal   
});


//Styles, Attributes and Classes

message.style.backgroundColor = '#33165e'