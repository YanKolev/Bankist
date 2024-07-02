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


//Tabbed component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

//we will need to use event delegation we need to attach the event handler to the common parent element. 

tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab')




   // Guard clause
  if(!clicked) return
  

  //Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList. remove('operations__content--active'));

  // Active tab
  clicked.classList.add('operations__tab--active');

  //Activate content area

  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active')
});


// Menu fade animation // Passing arguments to event handlers

const handleHover = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img');


    siblings.forEach(el =>{
      if(el !==link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}


 const nav = document.querySelector('.nav');


 //Passing "argument" into handler function with this keyword
 // we use mouseover because the element bubles and we can use that
 nav.addEventListener('mouseover', handleHover.bind(0.5));


 nav.addEventListener('mouseout',handleHover.bind(1));
/*

 // Sticky navigation 

 const intialCoords = section1.getBoundingClientRect();
 console.log(intialCoords);

 //we need to use the scroll event for now 
 window.addEventListener('scroll', function(e){
    console.log(window.scrollY);

    if(window.scrollY > intialCoords.top) nav
    .classList.add('sticky');
    else nav.classList.remove('sticky');
 })

 // Improving sticky animation with INTERSECTION OBSERVER API

 //this API allows our code to basically observe changes in a way that certain target element intersects with another element.
 // or the way it intersects the viewport

 //how it works without sticky animation. 

 const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  })

 }


 const obsOptions = {
  root: null,//when we add null it observes the entire vieport
  //threshold: 0.1 // 0.1= 10%
  threshold: [0, 0.2]
 }

 const observer = new IntersectionObserver();
 (obsCallback, obsOptions);
 observer.observe(section1);
*/
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height; // Get the height of the navigation bar

// Function to handle the sticky navigation logic
const stickyNav = function(entries) {
  const [entry] = entries; // Destructure entries to get the first entry

  // Add or remove the sticky class based on whether the header is intersecting the viewport
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

// Create a new IntersectionObserver to observe the header
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // Use the viewport as the root
  threshold: 0, // Intersection ratio, trigger callback as soon as even one pixel is visible
  rootMargin: `-${navHeight}px`, // Adjust the trigger point by the height of the navigation bar
});

// Start observing the header element
headerObserver.observe(header);


// Revealing images on scroll with no external library 
//using the intersection observer API 

//Reveal section 

const allSections = document.querySelectorAll('.section')

const revealSection = function(entries, observer){
 const [entry] = entries;

 if(!entry.isIntersecting) return;

 entry.target.classList.remove('section--hidden');
 observer.unobserve(entry.target);

}

const sectionObserver = new IntersectionObserver
(revealSection, {
  root:null,
  threshold: 0.15 //15% visible
})


allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden')
})


//Lazy loading images with Observer API 

const imgTargets = document.querySelectorAll('img[data-src]');

const loading = function (entries, observer){
  const [entry] = entries;

  if(!entry.isIntersecting) return
  
  //replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function (){
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);

};

const imgObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
})

imgTargets.forEach(img => imgObserver.observe(img))


//SLIDER COMPONENTS 

const slides = document.querySelectorAll('.slide');
const btnLeft= document.querySelector('.slider__btn--left');
const btnRight= document.querySelector('.slider__btn--right');

let curSlide = 0;
const maxSlide = slides.length;

/*
const silder = document.querySelector('.slider');
silder.style.transform = 'scale(0.5)';
silder.style.overflow = 'visible'; 
*/



const goToSlide = function(slide){
  slides.forEach((s,i) => (s.style.transform =
    `transalateX(${100 * (i-curSlide)}%)`))
}

goToSlide(0)

//Next slide - change the percentages, so the slide we want to go is 0%

const nextSlide = function(){
  if (curSlide ===maxSlide -1){
    curSlide = 0;
  } else {
    curSlide++;

  }

  goToSlide(curSlide)
  }

const prevSlide = function(){
  if(curSlide===0){
    curSlide =maxSlide-1;
  } else {
    curSlide--;
  }

  
  goToSlide(curSlide);
};


btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
  

  





// curSlite= 1, -100%, 0%, 100%, 200%

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




//DOM TRAVERSING- walking through the dom- selecting an element based on another element
// we need to select element relative to other elements. or if we do not know the structure of the DOM 

//const h1= document.querySelector('h1');

//Going downwards: selecting child elements
//using queryselector
//console.log(h1.querySelector('.highlight'));
//that would work, no matter how deep those elements will be in the dom,

// to target directly the children
//console.log(h1.childNodes); //gives every single node
//console.log(h1.children); // html live collection  of the  DIRECT ''children''
//h1.firstElementChild.style.color = 'white'; //targets the first child element
//h1.lastElementChild.style.color = 'orangered';


//Going upwards: parents

//console.log(h1.parentNode); // produces direct parent
//console.log(h1.parentElement);// also, produes dirent parent=> its an element but its a node

//when we do not need a direct parent, no matter how far away its in the tree
//h1.closest('.header').style.background = 'var(--gradient-secondary)';
// we can use custom properties in CSS, closest header to h1 element and then applied our style to the element
//used a lot in event delegation 

//if this selector matches the element on which we are calling closest, then thats the element that is going to be returned

//.closer Is the oposite of the query selector, both receive input string, 
// query selector finds children NO MATTER HOW DEEP in the DOM tree
//wihile closest FIND PARENTs no matter how deep 


// Going sideways: selecting siblins- we can only select direct siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

//if we need all the siblings, then we can move up to the parent element and then read all the children from there
console.log(h1.parentElement.children)

/*
[... h1.parentElement.children].forEach(function (el){
  if(el !==h1) el.style.transform = 'scale(0.5)';
})

*/


//----Building tabbed components----

//tabbed component- has some tabs, and the content of the area below changes-> like browser tab

//htmp div class operations, we will not create a new tab, we will hide the already existent info


