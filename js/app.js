var map;
var markers = [];

// This function populates the infowindow for the marker that was clicked
function populateInfoWindow(marker, infowindow) {
    'use strict';
    // Check to make sure the infowindow is not already open on this marker
    if (infowindow.marker !== marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.open(map, marker);
        // Clear the .marker property if the infowindow is closed
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });
    }
}

// This function will loop through the markers and display them all
function showListings() {
    'use strict';
    var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and show it
    markers.forEach(function (marker) {
        marker.setMap(map);
        bounds.extend(marker.position);
    });
    map.fitBounds(bounds);
}

// This function will loop through the markers and hide them all
function hideListings() {
    'use strict';
    markers.forEach(function (marker) {
        marker.setMap(null);
    });
}

// This function initializes the map
// It is called via the google maps api script tag in the html
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

    // Data for real estate listings
    var locations = [
        {
            title: 'Park Ave Penthouse',
            location: {
                lat: 40.7713024,
                lng: -73.9632393
            }
        },
        {
            title: 'Chelsea Loft',
            location: {
                lat: 40.7444883,
                lng: -73.9949465
            }
        },
        {
            title: 'Union Square Open Floor Plan',
            location: {
                lat: 40.7347062,
                lng: -73.9895759
            }
        },
        {
            title: 'East Village Hip Studio',
            location: {
                lat: 40.7281777,
                lng: -73.984377
            }
        },
        {
            title: 'TriBeCa Artsy Bachelor Pad',
            location: {
                lat: 40.7195264,
                lng: -74.0089934
            }
        },
        {
            title: 'Chinatown Homey Space',
            location: {
                lat: 40.7180628,
                lng: -73.9961237
            }
        }
    ];

    // Loop through data and create an array of markers
    var position;
    var title;
    var marker;
    var largeInfowindow = new google.maps.InfoWindow();
    locations.forEach(function(property, index) {
        position = property.location;
        title = property.title;
        marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: index
        });
        markers.push(marker);
        // Create click event listener to open infowindow for each marker
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
        });
    });

    // Add click event listeners for show/hide listings buttons
    document.getElementById('show-listings').addEventListener('click', showListings);
    document.getElementById('hide-listings').addEventListener('click', hideListings);
}
