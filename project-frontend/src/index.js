let destinationUl = ""
let attractionUl = ""
let modal = ""
let modalContent = ""
let closeModalButton = ""
let newDestinationButton = ""
let newAttractionButton = ""

document.addEventListener("DOMContentLoaded", () => {

    destinationUl = document.querySelector("#destination-ul")
    attractionUl = document.querySelector("#attraction-ul")
    modal = document.querySelector("#modal")
    modalContent = document.querySelector("#modal-content")
    closeModalButton = document.querySelector("#close-modal")
    newDestinationButton = document.querySelector("#add-destination")
    newAttractionButton = document.querySelector("#add-attraction");

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
        renderDestinationForm();
    })
    newAttractionButton.addEventListener("click", () => {
        renderAttractionForm();
    })
    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none";
    })
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
            describeLocation(destination);
        });

        destinationUl.append(li)
    })
}

function describeLocation(location) {
    modal.style.display = "block";
    modalContent.querySelector("div.left").innerHTML =
        `<h3>${location.name}</h3>
        <img src="${location.image}">`;
    modalContent.querySelector("#description").innerHTML =
        `<p>${location.description}</p>`;
    let addButton = document.createElement("button");
    addButton.innerHTML = "Create a Vacation Here";
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
            describeLocation(attraction);
        });

        attractionUl.append(li)
    })
}

function renderDestinationForm() {
    modal.style.display = "block";
    modalContent.querySelector("div.left").innerHTML =
        `<h3>Add Unlisted Destination</h3>`;
    modalContent.querySelector("#description").innerHTML =
        `<form  id="new-destination">

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
    const destinationForm = document.querySelector("#new-destination");
    console.log(destinationForm);
}

function renderAttractionForm() {
    modal.style.display = "block";
    modalContent.querySelector("div.left").innerHTML =
        `<h3>Add Unlisted Attraction</h3>`;
    modalContent.querySelector("#description").innerHTML =
        `<form  id="new-attraction">

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
    const attractionForm = document.querySelector("#new-attraction");
    console.log(attractionForm);
}