'use strict'
// import mapboxgl from 'mapbox-gl';


// Set up the map
mapboxgl.accessToken = 'pk.eyJ1IjoiemtlaSIsImEiOiJjajlic3hpeGYxajlzMnFsc3lpcmM3ZnVyIn0.stjuXAylUunlikhHKQZM-Q';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v10',
center: [-122.335167, 47.608013], // starting position [lng, lat]
zoom: 14
});

// var bbox = turf.bbox(features);

// get the sidewalks data
$.getJSON("sidewalks.geojson", function (data) {
    // $.each(data, function (index, value) {
    //    console.log(value);
    // });
    var streetInfo = data;
    console.log(streetInfo);
});


// get the supermarkets information (from Yelp API)
// got some technical issues and not being able to getting access to the api on the website
// got the data thru Postman software
$.getJSON("supermarketData.json", function(data){
    var supermarkets = data;
    console.log(supermarkets);
    // $.each(data, function(index, value){
    //     console.log(value);
    // })
})


// add interactivity to the supermarket


