'use strict'

var withCurbBramp=[];
var withoutCurbBramp=[];

function getData(){
    $.getJSON("crossings.geojson", function (data) {
        return data;
    })
}

var withCurbBramp=[];
var withoutCurbBramp=[];

const crossingsWith = getData();
const crossingsWithout = getData();
let features = crossingsWith.features;
features.forEach(function (feature) {
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

export {crossingsWith, crossingsWithout}
