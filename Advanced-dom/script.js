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

//Page navigation 

//1st try without event delection - 
//its unnecessary as we are creating a copy of the function, and it will create impact on performance if we have more than 3 elements

/*
document.querySelectorAll('.nav__link').forEach(function(el){
  el.addEventListener('click', function(e){
    e.preventDefault();
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
    

  })
}) // it will return node list and we can use the FOREAH method of the elements that are in the node list
*/

// To prevent that is better to have event delegation - we use the fact that events bubble up, and we do that 
//by putting the event listener on a common parent of all the elements that we ar einterested in.
//and we can catch that element in the parent element and handle it there, as we know its origins.

// In event delegation we need 2 steps - first we add the event listener to a parent element of all the elements that we are interested in, 
//second- determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e){
  e.preventDefault(e);

  //Matching strategy
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }

})






//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//                           Course notes:


/*

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

message.style.backgroundColor = '#33165e';
message.style.width = '120%';

console.log(message.style.height); //using the style property, only works for inline styles that we set ourselves only using the style property
console.log(message.style.backgroundColor)
// we can not get a style that is hidden inside of a class or doesnt even exist

//if we want to get the styles that we want we need to make the function- GET computed 

console.log(getComputedStyle(message).color);

message.style.height = 
  Number.parseFloat(getComputedStyle(message).height, 10 +40 + 'px');// we are trying to add a number to a string so it will not work , so we need to add- Number.parseFloat

document.documentElement.style.setProperty('--color-primary', 'orangered') // with this we can change the style of our website by changing 1 property
// since its custom propery we need to use setProperty


//Attributes - mainly in html but we can selec them 

const logo = document.querySelector('.nav__logo');
console.log(logo.alt); // images are supposed to have those atributes- alt/src so if we specify them in the html , then JS will automatically create a property on the object
console.log(logo.src);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';

//Non-standard
console.log(logo.designer); // its not a approved attribute, hence it will be undefined
console.log(logo.getAttribute('designer'))// it will get the attribute that we manually put in 

//there is opposite of getattribute- its set attribute
logo.setAttribute('company', 'Bankist');

/* Note on the URL-s when we are looging for the src in the logo, 
in the console is printed http://127.0.0.1:5500/Advanced-do which is the Absolute uRL
its different that we have the source for image in the HTML, in the HTML we have the 
so-called relative URL which showsthe source of the image and folder and its location. */

//If we want to get the relative URL, we need to use the GET ATTRIBUTE in order to target it 

//console.log(logo.getAttribute('src'));

/* Same is also true for the href attribute on links, */

//const link = document.querySelector('.nav__link--btn');
//console.log(link.href); // this will provide us with the absolute property
//console.log(link.getAttribute('href')); // here will print #

//Data attributes 

/* it has to start with data, thats why we added another attribute into the html 
and dash and whatever we want so now we can target it*
-in html we use the dash, but in JS we will write with camelCase*/

//console.log(logo.dataset.versionNumber);

//Classes - 4 classes- this is preffered method of using 
/*
logo.classList.add('c', 'j');
logo.classList.remove('c','j')
logo.classList.toggle('c','j')
logo.classList.contains('c', 'j')


//Dont use- this will overite everyting, 
logo.className = 'jonas'

*/
/*
// Implementing smooth scrolling-> 1 click and the effect is that it will move us to the first section: there are 2 ways of doing it

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

//adding event listener to the button and function

btnScrollTo.addEventListener('click', function (e){
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset)





/*
window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset)

//oldschool way 
window.scrollTo({
  left: s1coords.left + window.pageXOffset,
  top: s1coords.top + window.pageYOffset,
  behaviour: 'smooth'
})
*/

//scrolling new way
//section1.scrollIntoView({behavior: 'smooth'})



/*
}); 

*/

// Events and Event handlers 

/*
Event is basically a signal that is generated, by a certain DOM node . And a signal is indication that something has happened on the webpage.
no matter if we handle certain event or not -a clik that event will always happen if a user click, so it doesnt matter if we actually listen for it or not
*/
/*
//mouse enter event- its like the hover element in css, it fires when a mouse enters a certain element
const h1 = document.querySelector('h1');

h1.addEventListener('mouseenter', function(e){
  alert('addEventListener: Great! You are reading the heading!')


});
*/

// you can refrence the mouse and keyboard events from the MDN docs


/*
//another way of attaching an event listen to an element- by using the ON event propery on the element
//its an older way of listenig for events, BETTER USE ADDEVENT LISTENER

h1.onmouseenter = function(e){
  alert('addEventListener: Great! You are reading the heading!')


};
*/

//reasons why add event listener is better-> 1- it allow us to have multiple event listeners to the same event
//2 -> we can remove an event handler in case we do not need it anymore

//to do so we need to export the function into a named function

//copy the original version so we can show the difference

/*
const h1 = document.querySelector('h1');

const alertH1 = function(e){
  alert('addEventListener: Great! You are reading the heading!')

  //After we listened for an event, then handled that even, then we can remove that listener.

  //h1.removeEventListener('mouseenter', alertH1); // this is why we had to export the function in its own function, so we can listen to the event just once

};

*/


/*

h1.addEventListener('mouseenter', alertH1);

//or we can remove it after certain time has passed, it can live outside of the function

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

//third way of handling events which is with html attributes
//NOT TO BE USED 

*/



/*
// Event BUBLING AND CAPTURING


//JS events have so called capturing and bubling phase

// EVENT PROPAGATION, MAINLY EVENT BUBLING

// Maily we will make it by attaching event handlers to the navigation link  and also all of its parents and when we clicked, 
// we will give random background colors

// random color rgb(255,255,255)
const randomInt =(min, max) => 
  Math.floor(Math.random() * (max-min +1) + min); //formula for random number generator
const randomColor = () => 
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

console.log(randomColor(0, 255));


document.querySelector('.nav__link').addEventListener('click', function (e) {
  //this-> this keyword on an event handler points out to the element on which that event handler is attached

  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  //Stop event propagation
  //e.stopPropagation(); // now 2 parent elements will not change their backgounds.
  //stopping event propagation is not recommended


})

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();

  console.log('CONTAINER', e.target, e.currentTarget);

  // due to the bubling, and propagation, when we have this event on nav_link it also happens for the PARENT element-> nav_links
})

document.querySelector('.nav').addEventListener('click', function (e) {

  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
})

//with the target, all 3 elements will have random color, and the target is always the same ->
// FOR all 3 handlers the target will always be the same-> ALWAYS THE ELEMENT THAT THE CLICK FIRST HAPPENED
// and of the e of the function they receive it as its the event bubling
//it originates from the link but then bubbles up to ther parent elements
// when we add the e.currentTarget, the link is not the same 
//HOWEVER e.currentTarget === this keyword!!!! exactly the same
// The event handlers are not pick up the events during the capture phase
//addeventListener is only listening to elements in the bubling phase and not in the captuing phase
// if we want to catch specifically, we will need to add 3rd element in the addeventlistener function, only using true/false

*/

//Event Delegation: Implementing Page Navigation

//Smooth scrolling behaviour so when we use the nav bar it will scrollsmoothly to the corresponding section

// Using event delegation at top of the file