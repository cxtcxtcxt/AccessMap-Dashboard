// Set up map
mapboxgl.accessToken = 'pk.eyJ1IjoiYWtrYXJoIiwiYSI6ImNqMThjNHllMTA3MXczOHFzeXZza2hpbXkifQ.W-eBkYLcQLAoZCKLGWxDgQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [-122.333592, 47.605628],
    zoom: 11, // Starts at Seattle by default
});

// AccessMap API Info
const ACCESSMAP_ENDPOINT = "www.accessmap.io/api/v2/<<endpoint>>.geojson?bbox=[<<minLat>>,<<minLon>>,<<maxLat>>,<<maxLon>>]";


const ROAD_WEATHER_ENDPOINT = "http://data.seattle.gov/resource/ivtm-938t.geojson?$limit=8000&$$app_token=<<api_key>>";
const SODA_API_KEY = "LGR70k7tHk8BqntKzzDsELIOs";

let state = {
    minTemp: 0,
    maxTemp: 0
};

let response;
function handleResponse(data) {
    console.log(data);
    let max = parseFloat(data.features[0].properties.roadsurfacetemperature);
    let min = parseFloat(data.features[0].properties.roadsurfacetemperature);
    data.features.forEach(function (result) {
        if (parseFloat(result.properties.roadsurfacetemperature) > max) {
            max = parseFloat(result.properties.roadsurfacetemperature);
        }
        if (parseFloat(result.properties.roadsurfacetemperature < min)) {
            min = parseFloat(result.properties.roadsurfacetemperature);
        }
    });
    state.maxTemp = max;
    state.minTemp = min;
    response = data;
}

$.get(ROAD_WEATHER_ENDPOINT.replace("<<api_key>>", SODA_API_KEY), handleResponse);

map.on('load', function () {
    map.addSource('response', {
        type: "geojson",
        data: response
    });

    map.addLayer({
        id: "road-surface",
        type: "heatmap",
        source: "response",
        maxzoom: 15,
        paint: {
            'heatmap-weight': {
                property: "roadsurfacetemperature",
                type: "exponential",
                stops: [
                    [1, 0],
                    [62, 0]
                ]
            },
            'heatmap-intensity': {
                stops: [
                    [11, 1],
                    [15, 3]
                ]
            },
            'heatmap-color': {
                stops: [
                    [0, 'rgba(236,222,239,0)'],
                    [0.2, 'rgb(208,209,230)'],
                    [0.4, 'rgb(166,189,219)'],
                    [0.6, 'rgb(103,169,207)'],
                    [0.8, 'rgb(28,144,153)'],
                    [1, 'rgb(1,108,89)']
                ]
            },
            'heatmap-radius': {
                stops: [
                    [11, 15],
                    [15, 20]
                ]
            },
            "heatmap-opacity": {
                "default": 1,
                "stops": [
                    [14, 1],
                    [15, 0]
                ]
            }
        }
    }, 'waterway-label');

    map.addLayer({
        id: "temp-point",
        type: "circle",
        source: "response",
        minzoom: 14,
        paint: {
            // increase the radius of the circle as the zoom level and dbh value increases
            'circle-radius': {
                property: 'dbh',
                type: 'exponential',
                stops: [
                    [{ zoom: 15, value: 1 }, 5],
                    [{ zoom: 15, value: 62 }, 10],
                    [{ zoom: 22, value: 1 }, 20],
                    [{ zoom: 22, value: 62 }, 50],
                ]
            },
            'circle-color': {
                property: 'dbh',
                type: 'exponential',
                stops: [
                    [0, 'rgba(236,222,239,0)'],
                    [10, 'rgb(236,222,239)'],
                    [20, 'rgb(208,209,230)'],
                    [30, 'rgb(166,189,219)'],
                    [40, 'rgb(103,169,207)'],
                    [50, 'rgb(28,144,153)'],
                    [60, 'rgb(1,108,89)']
                ]
            },
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            'circle-opacity': {
                stops: [
                    [14, 0],
                    [15, 1]
                ]
            }
        }
    }, 'waterway-label')
})

function getFloatingTimeStamp() {
    let d = new Date();
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
}



