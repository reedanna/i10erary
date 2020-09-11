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
let logoutButton = ""
let userInfoDiv = ""
let attractionsTitle = ""
let vacationMain = ""
let myVacationsButton = ""

let currentDestination = ""
let currentUser = ""
let currentTrip = ""


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
    logoutButton = document.querySelector("#logout-title")
    loginModal = document.querySelector(".login-modal")
    loginClose = document.querySelector("#login-close-modal")
    loginForm = document.querySelector(".login-form")
    attractionsTitle = document.querySelector("#attractions-bar h2");
    vacationMain = document.querySelector("#vacations")
    myVacationsButton = document.querySelector("#user-info button")

    logoutButton.style.display = "none"



    renderDestinations();
    renderAttractions();
    renderVacations();


    newDestinationButton.addEventListener("click", () => {
        renderNewForm("Destination");
    })
    newAttractionButton.addEventListener("click", () => {
        renderNewForm("Attraction");
    })
    myVacationsButton.addEventListener("click", () => {
        renderVacations();
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
    logoutButton.addEventListener("click", logout)

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
                li.addEventListener("click", destinationBackground)
                li.addEventListener("click", () => {
                    describeLocation(destination, true);
                });

                destinationUl.append(li)
            })
        })
}

function renderVacations() {
    vacationMain.innerHTML = "";
    fetch("http://localhost:3000/trips")
        .then(function (response) {
            return response.json()
        })
        .then(function (json) {

            json.forEach(trip => {

                if (trip.user_id === currentUser.id) {
                    let li = document.createElement("button")
                    li.innerText =
                        `My Vacation in ${trip.destination.name} >`
                    li.addEventListener("click", () => {
                        renderVacationInfo(trip);
                    });

                    vacationMain.append(li)
                }
            })
        })
}

function renderVacationInfo(trip) {
    fetch(`http://localhost:3000/trips/${trip.id}`)
        .then(function (response) {
            return response.json()
        })
        .then(function (json) {
            currentTrip = json;
        });
    vacationMain.innerHTML = "";
    currentDestination = trip.destination;
    renderAttractions();
    fetch("http://localhost:3000/days")
        .then(function (response) {
            return response.json()
        })
        .then(function (json) {
            json.forEach(day => {

                if (day.trip_id === trip.id) {
                    let dayDiv = document.createElement("div");
                    dayDiv.classList.add("day-div");
                    let titleText = document.createElement("h3");
                    titleText.innerText = `Day ${day.date} in ${trip.destination.name}`;
                    dayDiv.append(titleText);
                    day.visits.forEach(visit => {
                        let visitInfo = document.createElement("div");
                        visitInfo.classList.add("visit-info");
                        day.attractions.forEach(attraction => {
                            if (attraction.id === visit.attraction_id) {
                                visitInfo.innerHTML =
                                    `<p>${attraction.name}</p>
                                    <button class="back-button"><</button>
                                    <button class="forward-button">></button>
                                    <button class="delete-visit-button">-</button>`;
                            };
                        });
                        dayDiv.append(visitInfo);
                        visitInfo.querySelector(".delete-visit-button").addEventListener("click", () => {
                            deleteVisit(visit);
                        });
                        visitInfo.querySelector(".back-button").addEventListener("click", () => {
                            moveVisitBack(visit, day);
                        });
                        visitInfo.querySelector(".forward-button").addEventListener("click", () => {
                            moveVisitForward(visit, day);
                        });
                    });
                    vacationMain.append(dayDiv);
                }
            })
        })
    let buttonsDiv = document.createElement("div");
    buttonsDiv.id = "buttons-div";
    vacationMain.append(buttonsDiv);
    let addDayButton = document.createElement("button");
    addDayButton.innerText = "+";
    buttonsDiv.append(addDayButton);
    addDayButton.addEventListener("click", () => {
        addDay();
    })
    let subtractDayButton = document.createElement("button");
    subtractDayButton.innerText = " - ";
    buttonsDiv.append(subtractDayButton);
    subtractDayButton.addEventListener("click", () => {
        subtractDay();
    })
}

function deleteVisit(visit) {
    fetch(`http://localhost:3000/visits/${visit.id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            renderVacationInfo(currentTrip);
        });
}

function moveVisitForward(visit, day) {
    if (day.date !== currentTrip.length) {
        let newDate = day.date + 1;
        let newDay = "";
        currentTrip.days.forEach(day => {
            if (day.date == newDate) {
                newDay = day;
            }
        })
        fetch(`http://localhost:3000/visits/${visit.id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "day_id": newDay.id
                })
            })
            .then(response => {
                renderVacationInfo(currentTrip);
            });
    }
}

function moveVisitBack(visit, day) {
    if (day.date !== 1) {
        let newDate = day.date - 1;
        let newDay = "";
        currentTrip.days.forEach(day => {
            if (day.date == newDate) {
                newDay = day;
            }
        })
        fetch(`http://localhost:3000/visits/${visit.id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "day_id": newDay.id
                })
            })
            .then(response => {
                renderVacationInfo(currentTrip);
            });
    };
}


function addDay() {
    currentTrip.length = currentTrip.length + 1;
    fetch(`http://localhost:3000/trips/${currentTrip.id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "length": currentTrip.length
            })
        })
        .then(response => {
            fetch("http://localhost:3000/days",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "trip_id": currentTrip.id,
                        "date": currentTrip.length
                    })
                })
                .then(response => {
                    renderVacationInfo(currentTrip);
                })
        });
}

function subtractDay() {
    fetch(`http://localhost:3000/trips/${currentTrip.id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "length": currentTrip.length - 1
            })
        })
        .then(response => {
            const dayID = currentTrip.days[currentTrip.length - 1].id;
            currentTrip.visits.forEach(visit => {
                if (visit.day_id === dayID) {
                    fetch(`http://localhost:3000/visits/${visit.id}`,
                        {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                }
            })
            fetch(`http://localhost:3000/days/${dayID}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                    renderVacationInfo(currentTrip);
                })
        });
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
            createVacation();
        })
    }
    else {
        addButton.innerHTML = "Visit Here";
        modalContent.querySelector("#description").append(addButton);
        addButton.addEventListener("click", () => {
            createVisit(location);
        })
    }

}

function createVisit(attraction) {
    fetch("http://localhost:3000/visits",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "day_id": currentTrip.days[0].id,
                "attraction_id": attraction.id
            })
        })
        .then(response => {
            renderVacationInfo(currentTrip);
        })
}

function createVacation() {
    fetch("http://localhost:3000/trips", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user_id": currentUser.id,
            "destination_id": currentDestination.id,
            "length": 1
        })
    })
        .then(response => response.json())
        .then((result) => {
            modal.style.display = "none";
            currentTrip = result;
            fetch("http://localhost:3000/days",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "trip_id": currentTrip.id,
                        "date": 1
                    })
                })
                .then(response => {
                    renderVacationInfo(currentTrip);
                })
        });
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
                    loginButton.style.display = "none"
                    signupButton.style.display = "none"
                    logoutButton.style.display = "flex"
                    closeLoginForm()
                    currentUser = user;
                    renderVacations();
                }
            })
            if (isAUser == false) { alert("User not found") }

        })
    event.preventDefault()
}

function logout() {
    window.location.reload(true)
}

function destinationBackground(event) {
    const destinationId = event.currentTarget.dataset.id
    fetch(`http://localhost:3000/destinations/${destinationId}`)
        .then(response => response.json())
        .then(destination => {
            document.body.style.backgroundImage = `url(${destination.image})`;
        })
}


