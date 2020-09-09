const destinationUl = document.querySelector("#destination-ul")
const attractionUl = document.querySelector("#attraction-ul")
document.addEventListener("DOMContentLoaded", () => {

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

})

function renderDestinations(destinations) {
    destinations.forEach(destination => {
        
        let li = document.createElement("li")
        li.innerHTML =  
        `<div class="block">
        <img src=${destination.image}>
        <p>${destination.name}</p>`
        li.setAttribute("data-id", destination.id)
        
        // span.addEventListener("click", showCharacterInfo)
        destinationUl.append(li)
    })
}

function renderAttractions(attractions) {
    attractions.forEach(attraction => {
        
        let li = document.createElement("li")
        li.innerHTML =  
        `<div class="block">
        <img src=${attraction.image}>
        <p>${attraction.name}</p>`
        li.setAttribute("data-id", attraction.id)
        attractionUl.append(li)
    })
}