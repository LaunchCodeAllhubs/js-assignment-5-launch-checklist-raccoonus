function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    document.getElementById("missionTarget").innerHTML =
   // Here is the HTML formatting for our mission target div.
   
             `   <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name} </li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance} </li>
                    <li>Number of Moons: ${moons} </li>
                </ol>
                <img src=" ${imageUrl}">
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
   
    if (
        validateInput(pilot) === "Empty" ||
        validateInput(copilot) === "Empty" ||
        validateInput(fuelLevel) === "Empty" ||
        validateInput(cargoLevel) === "Empty"
    ) {
        alert("All fields are required!");
    } else if (
        validateInput(pilot) === "It's a number" ||
        validateInput(copilot) === "It's a number" ||
        validateInput(fuelLevel) === "Not a number" ||
        validateInput(cargoLevel) === "Not a number"
    ) {
        alert("Input not valid!");
    } else {

        // Reset launch status color and content
        status.style.color = "";
        status.innerHTML = "";
        list.style.visibility = "visible";

        // Check fuel and cargo conditions
        let readyForLaunch = true;

        if (fuelLevel < 10000) {
            fuelStatus.innerHTML = "Fuel level not sufficient for journey";
            readyForLaunch = false;
        }

        if (cargoLevel > 10000) {
            cargoStatus.innerHTML = "Cargo mass too heavy for launch";
            readyForLaunch = false;
        }

        // Set status based on readyForLaunch flag
        if (readyForLaunch) {
            status.innerHTML = "Shuttle ready for launch!";
            status.style.color = "green";
            pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`; ;
            copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
            fuelStatus.innerHTML = `Fuel level high enough for launch`;
            cargoStatus.innerHTML = `Cargo level low enough for launch`;
        } else {
            status.innerHTML = "Shuttle not ready for launch";
            status.style.color = "red";
            pilotStatus.innerHTML = `Pilot ${pilot} is not ready for launch`; ;
            copilotStatus.innerHTML = `Co-pilot ${copilot} is not ready for launch`;
            fuelStatus.innerHTML = `Fuel level too low for launch`;
            cargoStatus.innerHTML = `Cargo level too high for launch`;
        }
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
      return response.json()  });

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
