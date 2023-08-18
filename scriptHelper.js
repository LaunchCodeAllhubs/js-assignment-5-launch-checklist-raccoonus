// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    document.getElementByID("missionTarget").innerHTML =
   // Here is the HTML formatting for our mission target div.

               ` <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance} </li>
                    <li>Number of Moons: ${moons} </li>
                </ol>
                <img src="${imageUrl}">
`
}

function validateInput(testInput) {

    if(testInput === ''){
        return "Empty";
    } 
   if(isNaN(testInput)){
        return "Not a number";
        
    }
    if(isNaN(testInput) === false){
        return "It's a number";
        
    }
     
   
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
   let status = document.getElementById("launchStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let pilotStatus = document.getElementById("pilotStatus");
   
        if(validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel)=== "Empty")  {
          alert("All fields are required!");
        }
        if(validateInput(pilot) === "It's a number" || validateInput(copilot) === "It's a number" || validateInput(fuelLevel) === "Not a number" || validateInput(cargoLevel) === "Not a number")  {
            alert("Input not valid!");
        }else{
            
            console.log("Hey",cargoLevel)
            list.style.visibility = "visible";
            pilotStatus.innerHTML = `Pilot ${pilot} ready for launch`;   
            copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`

            if(fuelLevel < 10000 ){
                console.log("Hey",cargoLevel)
                status.innerHTML = "Shuttle not ready for launch";
                fuelStatus.innerHTML = "Fuel level not sufficient for journey";
                status.style.color = "red"; 
            }    
           if(cargoLevel > 10000 ){
            console.log("hi")
            status.innerHTML = "Shuttle not ready for launch";
            cargoStatus.innerHTML = "Cargo level too high";
            status.style.color = "red"; 
            }else{
                status.innerHTML = "Shuttle ready for launch!";
                status.style.color = "green"; 
            } 
       
      }

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
       return response.json });

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random()*planets.length); 
    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
