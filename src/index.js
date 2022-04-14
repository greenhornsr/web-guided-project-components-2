import axios from "axios";
import breeds from "./breeds";
// 👉 TASK 1- Test out the following endpoints:

//  https://dog.ceo/api/breeds/image/random

//  * With Firefox and the Network Tab
//  * With JS using the native fetch [STRETCH]


// 👉 TASK 2- Select the "entry point", the element
// inside of which we'll inject our dog cards 

// 👉 TASK 3- `dogCardMaker` takes an object and returns a Dog Card.
// Use this function to build a Card, and append it to the entry point.
function dogCardMaker({ imageURL, breed }) {
  // instantiating the elements
  /*
    <div class="dog-card">
      <img class="dog-image">
      <h3>
    </div>
  */
  const dogCard = document.createElement("div");
  const dogImg = document.createElement("img");
  const dogHeading = document.createElement("h3");

  // set class names, attributes and text
  dogCard.classList.add("dog-card");
  dogImg.classList.add("dog-image");
  dogImg.alt = "Cute doggo";

  dogImg.src = imageURL;
  dogHeading.textContent = breed;

  // create the hierarchy
  dogCard.appendChild(dogImg);
  dogCard.appendChild(dogHeading);
  // add some interactivity

  dogCard.addEventListener("click", () => {
    dogCard.classList.toggle("selected");
  })

  // never forget to return!
  return dogCard;
}

// 👉 TASK 4- Bring the Axios library into the project using one of two methods:
//    * Traditional way: put another script tag inside index.html (`https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js`)
//    * Projects with npm: install it with npm and import it into this file

// 👉 TASK 5- Fetch dogs from `https://dog.ceo/api/breed/{breed}/images/random/{number}`
//    * ON SUCCESS: use the data to create dogCards and append them to the entry point
//    * ON FAILURE: log the error to the console
//    * IN ANY CASE: log "done" to the console


// 👉 (OPTIONAL) TASK 6- Wrap the fetching operation inside a function `getDogs`
// that takes a breed and a count (of dogs)
const getDogs = (breed, count, selector) => {
  const entryPoint = document.querySelector(selector);
  axios.get(`https://dog.ceo/api/breed/${breed}/images/random/${count}`)
    .then((res) => {
      const dogsArr = res.data.message;
      dogsArr.forEach(data => {
        const dogObj = {
          imageURL: data,
          breed: breed
        }
        const newElem = dogCardMaker(dogObj);
        entryPoint.appendChild(newElem);
      })
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      console.log("DONE!")
    })
}

// 👉 (OPTIONAL) TASK 7- Put a button in index.html to 'get dogs' and add a click
// event listener that executes `getDogs`
const btn = document.querySelector("button");

btn.addEventListener("click", () => {
  breeds.forEach(doggo => {
    getDogs(doggo, 5, ".entry");
  })
})

// 👉 (OPTIONAL) TASK 8- Import the breeds from `breeds.js`
// and loop over them, fetching a dog at each iteration
