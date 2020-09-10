let destinationUl = ""
let attractionUl = ""
let modal = ""
let modalContent = ""
let closeModalButton = ""
let newDestinationButton = ""
let newAttractionButton = ""
let attractionsTitle = ""

let currentDestination = ""

document.addEventListener("DOMContentLoaded", () => {

    destinationUl = document.querySelector("#destination-ul")
    attractionUl = document.querySelector("#attraction-ul")
    modal = document.querySelector(".modal")
    modalContent = document.querySelector(".modal-content")
    closeModalButton = document.querySelector("#close-modal")
    newDestinationButton = document.querySelector("#add-destination")
    newAttractionButton = document.querySelector("#add-attraction");
    attractionsTitle = document.querySelector("#attractions-bar h2");

    renderDestinations();
    renderAttractions();

    newDestinationButton.addEventListener("click", () => {
        renderNewForm("Destination");
    })
    newAttractionButton.addEventListener("click", () => {
        renderNewForm("Attraction");
    })
    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none";
    })
})

function renderDestinations() {
    destinationUl.innerHTML = "";
    fetch("http://localhost:3000/destinations")
        .then(function (response) {
            return response.json()
        })
        .then(function (json) {

            json.forEach(destination => {

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
        modalContent.querySelector("#description").append(addButton);
        addButton.addEventListener("click", () => {
            currentDestination = location;
            renderAttractions();
        });
    }
    else {
        addButton.innerHTML = "Visit Here";
    }
    modalContent.querySelector("#description").append(addButton);
}

function renderAttractions(attractions) {
    if (currentDestination == "") {
        attractionsTitle.innerHTML = "Choose a Destination to View Attractions";
    }
    else {
        attractionsTitle.innerHTML = `Attractions in ${currentDestination.name}`;
    }
    attractionUl.innerHTML = "";
    fetch("http://localhost:3000/attractions")
        .then(function (response) {
            return response.json()
        })
        .then(function (json) {
            json.forEach(attraction => {

                if (attraction.destination_id === currentDestination.id) {
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
                }
            })
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
    const newForm = modalContent.querySelector("form");
    newForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (newForm.id == "new-Attraction") {
            fetch("http://localhost:3000/attractions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "name": newForm.name.value,
                    "description": newForm.description.value,
                    "image": newForm.image.value,
                    "destination_id": currentDestination.id
                })
            })
                .then((response) => {
                    modal.style.display = "none";
                    console.log()
                    renderAttractions();
                })
        }
        else {
            fetch("http://localhost:3000/destinations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "name": newForm.name.value,
                    "description": newForm.description.value,
                    "image": newForm.image.value,
                })
            })
                .then((response) => {
                    modal.style.display = "none";
                    renderDestinations();
                })
        };
    })
}