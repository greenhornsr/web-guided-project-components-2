import axios from "axios"  // this is necessary when installed as a package via npm to package.json; if installed using script tag, not needed.

// Other API Test URL & Endpoints
'https://lambda-times-api.herokuapp.com/friends'
'https://lambda-times-api.herokuapp.com/friends/1'
'https://lambda-times-api.herokuapp.com/quotes'
'https://lambda-times-api.herokuapp.com/cards'
'https://lambda-times-api.herokuapp.com/breeds'
'https://dog.ceo/api/breeds/image/random'


// Helper function to capitalize first letter
const capitalize = ([firstLetter, ...restOfWord]) => 
firstLetter.toUpperCase() + restOfWord.join("")

// 👉 TASK 1- Test out the following endpoints:

//  https://dog.ceo/api/breeds/image/random
//  * With Firefox and the Network Tab
//  * With JS using the native fetch [STRETCH]
const getDog = (url) => {
  axios.get(url)
  .then(res => {
    console.log(res.data.message)
    console.log(res.data.status)
  })
  .catch(err => {
    console.log(err)
  })
}
// getDog('https://dog.ceo/api/breeds/image/random')

// USING FETCH
// fetch('https://dog.ceo/api/breeds/image/random')
// .then(res => res.json())
// .then(data => console.log(data))


// 👉 TASK 2- Select the "entry point", the element
// inside of which we'll inject our dog cards 
const entryPoint = document.querySelector('.entry')


// 👉 TASK 3- `dogCardMaker` takes an object and returns a Dog Card.
// Use this function to build a Card, and append it to the entry point.
function dogCardMaker({ imageURL, breed }) {
  // instantiating the elements
  const dogCard = document.createElement('div')
  const dogImage = document.createElement('img')
  const dogHeading = document.createElement('h3')

  /*
    <div class="dog-card">
      <img class="dog-image">
      <h3>
    </div>
  */
  // set class names, attributes and text
  dogHeading.textContent = `Breed: ${capitalize(breed)}`
  dogImage.src = imageURL
  dogImage.classList.add('dog-image')
  dogCard.classList.add('dog-card')

  // create the hierarchy
  dogCard.appendChild(dogImage)
  dogCard.appendChild(dogHeading)
  // add some interactivity
  dogCard.addEventListener('click', () => {
    dogCard.classList.toggle('selected')
  })
  // Remember to return!
  return dogCard
}


// 👉 TASK 4- Bring the Axios library into the project using one of two methods:
//    * Traditional way: put another script tag inside index.html (`https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js`)
//    * Projects with npm: install it with npm and import it into this file


// 👉 TASK 5- Fetch dogs from `https://dog.ceo/api/breed/{breed}/images/random/{number}`
//    * ON SUCCESS: use the data to create dogCards and append them to the entry point
//    * ON FAILURE: log the error to the console
//    * IN ANY CASE: log "done" to the console

const fetchDogs = (breed, quantity) => {
  axios.get(`https://dog.ceo/api/breed/${breed}/images/random/${quantity}`)
  .then(res => {
    const images = res.data.message
    console.table(images)
    images.forEach(image => {
      const newDogCard = dogCardMaker({imageURL: image, breed: breed})
      entryPoint.append(newDogCard)
    })
    // debugger
  })
  .catch(err => {
    const errorH1 = document.createElement('h3')
    errorH1.textContent = `${err.response.status}: ${err.response.data.message}`
    entryPoint.append(errorH1)
    console.log(err)
    // debugger
  })
} 

fetchDogs('husky', 6)

// 👉 (OPTIONAL) TASK 6- Wrap the fetching operation inside a function `getDogs`
// that takes a breed and a count (of dogs)
// ** COMPLETE **


// 👉 (OPTIONAL) TASK 7- Put a button in index.html to 'get dogs' and add a click
// event listener that executes `getDogs`


// 👉 (OPTIONAL) TASK 8- Import the breeds from `breeds.js`
// and loop over them, fetching a dog at each iteration
