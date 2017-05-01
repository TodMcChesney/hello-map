var map;
function initMap() {
    'use strict';
    // Constructor to create a new map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 40.7413549,
            lng: -73.99802439999996
        },
        zoom: 13
    });
}
