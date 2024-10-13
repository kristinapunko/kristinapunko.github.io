let watchId = null;
let map;
let markers = [];
let destinationCoords = null; // Змінна для зберігання координат пункту призначення

document.addEventListener('DOMContentLoaded', function() {
    getMyLocation();

    // Перевіряємо існування елементів
    const addMarkerButton = document.getElementById("addMarker");
    const scrollToDestinationButton = document.getElementById("scrollToDestination");

    if (addMarkerButton && scrollToDestinationButton) {
        // Обробники подій для кнопок
        addMarkerButton.onclick = function() {
            let destLatitude = parseFloat(document.getElementById("destLatitude").value);
            let destLongitude = parseFloat(document.getElementById("destLongitude").value);

            if (!isNaN(destLatitude) && !isNaN(destLongitude)) {
                let destinationMarker = L.marker([destLatitude, destLongitude]).addTo(map);
                destinationMarker.bindPopup(`Destination: ${destLatitude}, ${destLongitude}`).openPopup();

                map.setView([destLatitude, destLongitude], 13);

                destinationCoords = { latitude: destLatitude, longitude: destLongitude };
            } else {
                alert("Enter the correct coordinates");
            }
        };

        scrollToDestinationButton.onclick = function() {
            if (destinationCoords) {
                map.setView([destinationCoords.latitude, destinationCoords.longitude], 13); // Прокрутка до збережених координат
            } else {
                alert("Add new marker");
            }
        };
    } else {
        console.error("Elements 'addMarker' or 'scrollToDestination' not found.");
    }
});

function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
    } else {
        alert("Oops, no geolocation support");
    }
}

function displayLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let div = document.getElementById("location");
    div.innerHTML = `You are at Latitude: ${latitude}, Longitude: ${longitude}`;
    div.innerHTML += `(with ${position.coords.accuracy} meters accuracy)`;
    
    let km = computeDistance(position.coords, ourCoords);
    let distance = document.getElementById("distance");
    distance.innerHTML = `You are ${km} km from the College`;

    let kmToVerhovnaRada = computeDistance(position.coords, verhovnaRada);
    let distanceToVerhovnaRada = document.getElementById("distanceToVerhovnaRada");
    distanceToVerhovnaRada.innerHTML = `You are ${kmToVerhovnaRada} km from the Verhovna Rada`;

    if (!map) {
        map = L.map('map').setView([latitude, longitude], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    } else {
        map.setView([latitude, longitude]);
    }

    let marker = L.marker([latitude, longitude]).addTo(map);
    let currentTime = new Date().toLocaleString();
    marker.bindPopup(`You are here: ${latitude}, ${longitude}`).openPopup();
    markers.push(marker);
}

function computeDistance(startCoords, destCoords) {
    let startLatRads = degreesToRadians(startCoords.latitude);
    let startLongRads = degreesToRadians(startCoords.longitude);
    let destLatRads = degreesToRadians(destCoords.latitude);
    let destLongRads = degreesToRadians(destCoords.longitude);
    
    let Radius = 6371; // Радіус Землі в км
    let distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) *
        Math.cos(startLongRads - destLongRads)) * Radius;

    return distance;
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

function displayError(error) {
    const errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    let errorMessage = errorTypes[error.code];
    if (error.code === 0 || error.code === 2) {
        errorMessage += `: ${error.message}`;
    }
    let div = document.getElementById("location");
    div.innerHTML = errorMessage;
}