/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
// define all sections in document
const allSections = document.querySelectorAll("section");
// define ul part in document
const ulPart = document.querySelector("ul");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// this helper function to show UlPart when scrolling happend
const addUlPart = () => {
  // in this function we calculate the defferent scrrolTop values of document.body in 50 ms (very speed event)
  // when the defferent is not equal zero , this mean we have scrolling, and Ulpart must shown
  let positionOne = document.body.scrollTop;
  //   console.log(positionOne);
  const addUlPlarTimer = setTimeout(function position() {
    let positionTwo = document.body.scrollTop;
    // console.log(positionTwo);
    if (positionTwo - positionOne !== 0) {
      ulPart.style.display = "block";
    }
  }, 50);
  return () => clearTimeout(addUlPlarTimer); // cleanUp
};

// this helper function to remove UlPart when No scrolling happend
const removeUlPart = () => {
  // in this function we calculate the defferent scrrolTop values of document.body in 3000 ms (3s) (slow event)
  // when the defferent is equal zero , this mean we dont have scrolling, and Ulpart must hidden.
  let positionOne = document.body.scrollTop;
  // console.log(positionOne);
  const removeUlPartTimer = setTimeout(function position() {
    let positionTwo = document.body.scrollTop;
    // console.log(positionTwo);
    if (positionTwo - positionOne === 0) {
      ulPart.style.display = "none";
    } else {
      ulPart.style.display = "block";
    }
  }, 3000);
  return () => clearTimeout(removeUlPartTimer); // clean up
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// this function to build UlPart when window 'DOMContentLoaded' event is happend
const menuBuild = () => {
  for (const section of allSections) {
    // create liPart for each section
    let liPart = document.createElement("li");
    // take (data-nav) attribute value to put it into liPart
    let liText = section.getAttribute("data-nav");
    liPart.textContent = liText;
    // add (menu__link) class for each liPart
    liPart.classList.add("menu__link");
    // we can add more style in hear or modify the styles.css file
    //liPart.style.display = "inline-block"; // I added (!important;) in styles.css line : 74
    //liPart.style.cursor = "pointer"; // I added (cursor: pointer;) in styles.css line : 75

    // append each liPart to ulPart
    ulPart.appendChild(liPart);
  }
};

// Add class 'active' to section when near top of viewport
const addActiveState = () => {
  // first apply the addUlPart if scrolling happend
  addUlPart();
  // then apply the removeUlPart if scrooling stopped
  removeUlPart();

  // define empty arrays to save all values of top and bottom section height every scrolling event
  let topReacts = [];
  let bottomReacts = [];

  for (let i = 0; i < allSections.length; i++) {
    let section = allSections[i];
    // the height of section from top to window
    let topReact = section.getBoundingClientRect().top;
    // the height of section from bottom to window
    let bottomReact = section.getBoundingClientRect().bottom;
    // console.log(topReact);

    // save the values in arrays
    topReacts[i] = topReact;
    bottomReacts[i] = bottomReact;

    // Now apply our condision consider those values (topReacts and bottomReacts)
    if (topReacts[i] <= 200) {
      allSections[i].classList.add("your-active-class"); // add active class when the top of section = 200 or less
    }
    if (bottomReacts[i] < 350) {
      allSections[i].classList.remove("your-active-class"); // (down scrolling) remove active class when the bottom of section < 350
    }
    if (bottomReacts[i] > allSections[i].clientHeight + 200) {
      // (up scrolling) remove active class when the bottom of section > sectionHeight + 200
      if (i > 0) {
        // without first section
        allSections[i].classList.remove("your-active-class");
      }
    }
  }
  // console.log(topReacts);
  // console.log(bottomReacts);
};

// Scroll to anchor ID using scrollTO event
const scrollToSection = (evet) => {
  // in this function we make these steps
  // 1- check for click event on liPart or No
  // 2- if this click event on liPart , get the (textContent) from this liPart
  // 3- remove the (space) from this text and make idName acoording to this text
  // 4- get the section element that has this idName and use the .scrollIntoView({ behavior: "smooth" })

  if (evet.target.nodeName === "LI") {
    // console.log(evet.target.textContent);
    const idName = evet.target.textContent.replace(" ", "");
    // console.log(idName);
    const targetElement = document.querySelector(`#${idName}`);
    // console.log(targetElement);
    targetElement.scrollIntoView({ behavior: "smooth" });
    targetElement.classList.add("your-active-class"); // we can remove this line
  }
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
window.addEventListener("DOMContentLoaded", menuBuild);

// Scroll to section on link click
ulPart.addEventListener("click", scrollToSection);

// Set sections as active
document.addEventListener("scroll", addActiveState);
