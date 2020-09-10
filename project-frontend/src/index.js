let destinationUl = ""
let attractionUl = ""
let modal = ""
let modalContent = ""
let closeModalButton = ""
let newDestinationButton = ""
let newAttractionButton = ""
let signupModal = ""
let loginModal = ""
let signupButton = ""
let signupClose = ""
let loginClose = ""
let signupForm = ""
let loginForm = ""
let userInfoDiv = ""

document.addEventListener("DOMContentLoaded", () => {

    destinationUl = document.querySelector("#destination-ul")
    attractionUl = document.querySelector("#attraction-ul")
    modal = document.querySelector(".modal")
    modalContent = document.querySelector(".modal-content")
    closeModalButton = document.querySelector("#close-modal")
    newDestinationButton = document.querySelector("#add-destination")
    newAttractionButton = document.querySelector("#add-attraction");
    signupModal = document.querySelector(".signup-modal")
    signupButton = document.querySelector("#signup-title")
    signupClose = document.querySelector("#signup-close-modal")
    signupForm = document.querySelector(".signup-form")
    userInfoDiv = document.querySelector("#user-info")
    loginButton = document.querySelector("#login-text")
    loginModal = document.querySelector(".login-modal")
    loginClose = document.querySelector("#login-close-modal")
    loginForm = document.querySelector(".login-form")

    fetch("http://localhost:3000/destinations")
        .then(function (response) {
            return response.json()
        })
        .then(function (json) {
            renderDestinations(json)
        })

    fetch("http://localhost:3000/attractions")
        .then(function (response) {
            return response.json()
        })
        .then(function (json) {
            renderAttractions(json)
        })


    newDestinationButton.addEventListener("click", () => {
        renderNewForm("Destination");
    })
    newAttractionButton.addEventListener("click", () => {
        renderNewForm("Attraction");
    })
    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none";
    })
    signupButton.addEventListener("click", renderSignupForm)
    signupClose.addEventListener("click", closeSignupForm)
    signupForm.addEventListener("submit", submitNewUser)
    loginButton.addEventListener("click", renderLoginForm)
    loginClose.addEventListener("click", closeLoginForm)
    loginForm.addEventListener("submit", findUser)
})

function renderDestinations(destinations) {
    destinations.forEach(destination => {

        let li = document.createElement("li")
        li.innerHTML =
            `<div class="block">
        <img src=${destination.image}>
        <p>${destination.name}</p>`
        li.setAttribute("data-id", destination.id)

        li.addEventListener("click", () => {
            describeLocation(destination, true);
        });

        destinationUl.append(li)
    })
}

function describeLocation(location, isDestination) {
    modal.style.display = "block";
    modalContent.querySelector("div.left").innerHTML =
        `<h3>${location.name}</h3>
        <img src="${location.image}">`;
    modalContent.querySelector("#description").innerHTML =
        `<p>${location.description}</p>`;
    let addButton = document.createElement("button");
    if (isDestination == true) {
        addButton.innerHTML = "Create a Vacation Here";
    }
    else {
        addButton.innerHTML = "Visit Here";
    }
    modalContent.querySelector("#description").append(addButton);
}

function renderAttractions(attractions) {
    attractions.forEach(attraction => {

        let li = document.createElement("li")
        li.innerHTML =
            `<div class="block">
        <img src=${attraction.image}>
        <p>${attraction.name}</p>`
        li.setAttribute("data-id", attraction.id)

        li.addEventListener("click", () => {
            describeLocation(attraction, false);
        });

        attractionUl.append(li)
    })
}

function renderNewForm(destinationOrAttraction) {
    modal.style.display = "block";
    modalContent.querySelector("div.left").innerHTML =
        `<h3>Add Unlisted ${destinationOrAttraction}</h3>`;
    modalContent.querySelector("#description").innerHTML =
        `<form  id="new-${destinationOrAttraction}">

        <input
          type="text"
          name="name"
          value=""
          placeholder="Name"
          class="input-text"
        />
        <br /><br />
        <input
          type="text"
          name="image"
          value=""
          placeholder="Image URL"
          class="input-text"
        />
        <br /><br />
        <input
          type="text"
          name="description"
          value=""
          placeholder="Description"
          class="input-text"
        />
        <br /><br />
        <input
          type="submit"
          name="submit"
          value="Submit"
          class="submit"
        />
      </form>`
}

function renderSignupForm() {
    signupModal.style.display = "flex"
}
function closeSignupForm() {
    signupModal.style.display = "none"
}
function renderLoginForm() {
    loginModal.style.display = "flex"
}
function closeLoginForm() {
    loginModal.style.display = "none"
}

function submitNewUser() {

    fetch(`http://localhost:3000/users`, {
        method: 'POST',
        headers:
        {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "name": signupForm[0].value,
            "email": signupForm[1].value
        })
    })
}

function findUser() {
    fetch("http://localhost:3000/users")
        .then(function (response) {
            return response.json()
        })
        .then(function (json) {
            let isAUser = false
            json.forEach(user => {
                if (user.name == loginForm[0].value && user.email == loginForm[1].value) {
                    isAUser = true
                    let nameH2 = document.createElement("h2")
                    nameH2.innerText = `Logged in as ${user.name}`
                    userInfoDiv.append(nameH2)
                    closeLoginForm()
                }
            })
                if (isAUser == false) { alert("User not found") }
                
        })
        event.preventDefault()
}

