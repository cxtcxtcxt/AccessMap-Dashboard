'use strict'
// import mapboxgl from 'mapbox-gl';


// Set up the map
mapboxgl.accessToken = 'pk.eyJ1IjoiemtlaSIsImEiOiJjajlic3hpeGYxajlzMnFsc3lpcmM3ZnVyIn0.stjuXAylUunlikhHKQZM-Q';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/light-v9',
center: [-122.335167, 47.608013], // starting position [lng, lat]
zoom: 14
});

// var bbox = turf.bbox(features);
var crossingsWith;
var crossingsWithout;
var withCurbBramp=[];
var withoutCurbBramp=[];


$.getJSON("crossings.geojson", function (data) {
    crossingsWith = data;
    crossingsWithout = data;
    let features = data.features;
    console.log(data);
    features.forEach(function (feature) {
        // console.log(feature);
        if(feature.properties.curbramps > 0){
            withCurbBramp.push(feature);
        }else{
            withoutCurbBramp.push(feature)
        }
    });

    crossingsWith =  {
        "type": "FeatureCollection",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        "features": withCurbBramp
    }
    
    crossingsWithout =  {
        "type": "FeatureCollection",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        "features": withoutCurbBramp
    }
    
    console.log(crossingsWith);
    console.log(crossingsWithout);
    label(crossingsWith, crossingsWithout);
    county();
});
console.log(crossingsWith);
console.log(crossingsWithout);


function label(crossingsWith, crossingsWithout){
    map.on('load', function() {
        console.log("mapmap");
        
        map.addLayer({
          id: 'crossingWith',
          type: "circle",
          source: {
            type: 'geojson',
            data: crossingsWith
          },

          paint: { 'circle-radius': {
            'base': 1.75,
            'stops': [[12, 2], [22, 180]]
            },
            'circle-color': "#3CB371"
        }
        });

        map.addLayer({
            id: 'crossingsWithout',
            type: "circle",
            source: {
              type: 'geojson',
              data: crossingsWithout
            },

            paint: { 'circle-radius': {
              'base': 1.75,
              'stops': [[12, 2], [22, 180]]
              },
              'circle-color': "#B22222"
          }
          });
  
    });
}


function county(){
    map.addSource('counties', {
        "type": "vector",
        "url": "mapbox://mapbox.82pkq93d"
    });

    map.addLayer({
        "id": "counties",
        "type": "fill",
        "source": "counties",
        "source-layer": "original",
        "paint": {
            "fill-outline-color": "rgba(0,0,0,0.1)",
            "fill-color": "rgba(0,0,0,0.1)"
        }
    }, 'place-city-sm'); // Place polygon under these labels.

    map.addLayer({
        "id": "counties-highlighted",
        "type": "fill",
        "source": "counties",
        "source-layer": "original",
        "paint": {
            "fill-outline-color": "#484896",
            "fill-color": "#6e599f",
            "fill-opacity": 0.75
        },
        "filter": ["in", "COUNTY", ""]
    }, 'place-city-sm');

}


