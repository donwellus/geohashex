const State = require('./state.js');

let xmldom = require('xmldom');
let polyhash = require('polygon-hash');
const fs = require('fs');
let tj = require('@mapbox/togeojson')

let doc = new xmldom.DOMParser().parseFromString(fs.readFileSync('states.kml', 'utf8'));

converted = tj.kml(doc)

let stateList = [];

//console.dir(converted);
converted.features.forEach(element => {
    //console.log(element.properties.name);
    let state = new State(element.properties.name);
    element.geometry.coordinates.forEach(coord => {
        state.addCoord(coord[1], coord[0]);
    });
    stateList.push(state);
});

stateList.forEach(state => {
    let hashes = polyhash(state.coords, 4);

    fs.appendFile(state.name+'.txt', hashes, function (err) {
      if (err) throw err;
    });
});