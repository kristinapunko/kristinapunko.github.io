let watchId = null;
let map;
let markers = [];

document.addEventListener('DOMContentLoaded', getMyLocation)
function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition (displayLocation)
    } else {
        alert("Oops, no geolocation support")
    }
}

function displayLocation (position) {
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude
    let div = document.getElementById("location")
    div.innerHTML = `You are at Latitude: ${latitude}, Longitude: ${longitude}`;
    div.innerHTML += `(with ${position.coords.accuracy} meters accuracy)`
    let km = computeDistance(position.coords, ourCoords); 
    let distance = document.getElementById("distance");
    distance.innerHTML = `You are ${km} km from the College`;
    let kmToVerhovnaRada = computeDistance(position.coords, verhovnaRada); 
    let distanceToVerhovnaRada = document.getElementById("distanceToVerhovnaRada");
    distanceToVerhovnaRada.innerHTML = `You are ${kmToVerhovnaRada} km from the Verhovna Rada`;

    if (!map) {
        map = L.map('map').setView([latitude, longitude], 13); 
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
    } else {
        map.setView([latitude, longitude]); 
    }
    let marker = L.marker([latitude, longitude]).addTo(map);
    let currentTime = new Date().toLocaleString(); 
    marker.bindPopup(`You are here: ${latitude}, ${longitude}`).openPopup(); 
    markers.push(marker);
}

function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition (displayLocation, displayError);
        var watchButton = document.getElementById("watch");
        watchButton.onclick = watchLocation;
        var clearWatchButton = document.getElementById("clearWatch");
        clearWatchButton.onclick = clearWatch;
    } else {
        alert("Oops, no geolocation support");
    }
    }

function watchLocation() {
    watchId = navigator.geolocation.watchPosition(displayLocation, displayErгог);
}
function clearWatch() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

let ourCoords = {
    latitude: 48.94439584358175, 
    longitude: 24.73210983068624
};
let verhovnaRada = {
    latitude: 50.440900495208155, 
    longitude: 30.574719901873927
};

function displayError(error) {
    const errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    const errorMessage = errorTypes [error.code];
    if (error.code === 0 || error.code === 2) { 
        errorMessage = errorMessage + ""+ error.message;
    }
    let div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

function computeDistance(startCoords, destCoords) {
    let startLatRads = degreesToRadians(startCoords.latitude); 
    let startLongRads = degreesToRadians(startCoords.longitude);
    let destLatRads = degreesToRadians(destCoords.latitude);
    let destLongRads = degreesToRadians(destCoords.longitude);
    
    let Radius = 6371; // Earth's radius in km
    
    let distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) *
        Math.cos(startLongRads - destLongRads)) * Radius;
    
    return distance;
}
function degreesToRadians (degrees) {
    let radians = (degrees * Math.PI)/180;

    return radians;
}

let destinationCoords = null; 

document.getElementById("addMarker").onclick = function() {
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

document.getElementById("scrollToDestination").onclick = function() {
    if (destinationCoords) {
        map.setView([destinationCoords.latitude, destinationCoords.longitude], 13); 
    } else {
        alert("Add new marker");
    }
};
