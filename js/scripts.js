//fetching the predefined drone routes from the json file
fetch('./../routesData.json')
    .then(response => response.json())
    .then( data => moveDrones(data));


// Create the map
var map = L.map('map').setView([-31.4, -64.183], 14);

// Set up the OSM layer
L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
}).addTo(map);


//set up options for the drawing toolkit that appears on the top left side of the map
var options = {
    draw: {
      circle: false, // Turns off this drawing tool
      rectangle: false,
      polygon: false,
      marker: false,
      circlemarker: false,
    },
  };

  // setting up the draw function
  var drawControl = new L.Control.Draw(options);
  map.addControl(drawControl);

  //drawing the line and making the drone follow the line using the leaflet motion pluggin
  map.on(L.Draw.Event.CREATED, function (e) {

        var type = e.layerType;
        var layer = e.layer;

        if (type === "polyline") {
          var line = L.motion
            .polyline(
              layer.getLatLngs(),
              {
                color: "transparent",
               
              },
              {
                auto: true,
                easing: L.Motion.Ease.swing,
              },
              { removeOnEnd: true,
                icon: L.divIcon({
                html: "<i class='fa fa-helicopter fa-2x' style='color:black' aria-hidden='true' ></i>",
                iconSize: L.point(27.5, 24),
                
              })}
            )
            .motionSpeed(5000)
            .addTo(map);
        }
  });

  //predefined routes

//   var route1 = JSON.parse(
//     '[{"lat":-31.399844,"lng":-64.183245},{"lat":-31.420208,"lng":-64.164791},{"lat":-31.416619,"lng":-64.195347},{"lat":-31.399844,"lng":-64.183245}]'
//   );
//   var route2 = JSON.parse(
//     '[{"lat":-31.399844,"lng":-64.183245},{"lat":-31.404166,"lng":-64.219294},{"lat":-31.387242,"lng":-64.21483},{"lat":-31.399844,"lng":-64.183245}]'
//   );
//   var route3 = JSON.parse(
//     '[{"lat":-31.399844,"lng":-64.183245},{"lat":-31.422332,"lng":-64.199982},{"lat":-31.399844,"lng":-64.183245}]'
//   );


  //this function allows the drone to follow a predefined path set in the json files, using a for loop to iterate over each route and grab the data
  function moveDrones(data) {

        for (var i=0; i<data.length; i++) {
        let route = JSON.stringify(data[i].directions)
        i++;
        let route2 = JSON.stringify(data[i].directions)
        i++;
        let route3 = JSON.stringify(data[i].directions)
        // console.log("test: " + JSON.stringify(data[i].directions));
        // console.log("route1: " + route1);
        // console.log("route2: " + route2);
        // console.log("route3: " + route3);
        console.log(route);
        // console.log("route1: " + JSON.stringify(route1));
        // console.log("route1: " + JSON.stringify(route2));
        // console.log("route1: " + JSON.stringify(route3));

        var seqGroup = L.motion
    .seq([
      
      L.motion
        .polyline(
            JSON.parse(route),
          {
            color: "transparent",
          },
          {
            easing: L.Motion.Ease.easeInOutQuart,
          },
          {
            removeOnEnd: false,
            showMarker: false,
            icon: L.divIcon({
              html: "<i class='fa fa-helicopter fa-2x' style='color:black' aria-hidden='true' ></i>",
              iconSize: L.point(27.5, 24),
            }),
          }
        )
        .motionDuration(9000),
      L.motion
        .polyline(
            JSON.parse(route2),
          {
            color: "transparent",
          },
          {
            easing: L.Motion.Ease.easeInOutElastic,
          },
          {
            removeOnEnd: false,
            icon: L.divIcon({
              html: "<i class='fa fa-helicopter fa-2x' style='color:black' aria-hidden='true' ></i>",
              iconSize: L.point(27.5, 24),
            }),
          }
        )
        .motionDuration(12000),
      
        L.motion
        .polyline(
            JSON.parse(route3),
          {
            color: "transparent",
          },
          {
            easing: L.Motion.Ease.easeInOutElastic,
          },
          {
            removeOnEnd: true,
            icon: L.divIcon({
              html: "<i class='fa fa-helicopter fa-2x' style='color:black' aria-hidden='true' ></i>",
              iconSize: L.point(27.5, 24),
            }),
            }
          )
          .motionDuration(9000)
      
    ])
    .addTo(map);
  

    //functions for the buttons to start and stop the drone movement
  document.getElementById("start").addEventListener("click", function () {
    seqGroup.motionStart();
  });

  document.getElementById("stop").addEventListener("click", function () {
    seqGroup.motionStop();
  });


        }


    
  }

// adds marker by clicking anywhere in the map
// map.on("click", function(e){
//     new L.Marker([e.latlng.lat, e.latlng.lng]).addTo(map);
//  })



//here we are showing the coordinates whenever we click on the map
var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
   
}

//this function allows the user to click on the map to grab drone's starting point
function chooseDepart() {
 
  let value = map.on('click', onMapClick);
  console.log(value._popup._latlng);
  let pointDepart = value._popup._latlng;
  let resultstr = pointDepart.toString();
  
  document.getElementById("Lat").value = resultstr.replace("LatLng(", "").replace(")", "");; 
}


//this function allows the user to click on the map to grab drone's drop zone
function chooseArrivee() {
  let value = map.on('click', onMapClick);
  console.log(value._popup._latlng);
  let pointArrivee = value._popup._latlng;

  let resultstr = pointArrivee.toString();
  console.log(resultstr);
 
  document.getElementById("Lng").value = resultstr.replace("LatLng(", "").replace(")", "");
}

//clears the inputs in the form
function clearInputs() {
  document.getElementById("Lat").value = "";
  document.getElementById("Lng").value = "";
}

//once the coordinates have been chosen, the drone will travel from the starting point to the drop point
function goToPoint() {
  let coordA = document.getElementById("Lat").value;
  let coordB = document.getElementById("Lng").value;

  // console.log("coordA: "+coordA.substring(0,9) + "coordB: " +  coordB);

  let coordALat = coordA.substring(0,9);
  let coordALng = coordA.substring(12, 20);

  let coordBLat = coordB.substring(0,9);
  let coordBLng = coordB.substring(12, 20);

  console.log (coordALat, coordALng)

  let destinationSTR =  `[{"lat":${coordALat}, "lng":${coordALng}},{"lat":${coordBLat}, "lng":${coordBLng}}]`
  console.log(destinationSTR);

  var seqGroup = L.motion
  .seq([

  L.motion
  .polyline(
    JSON.parse(destinationSTR),
    {
      color: "red",
    },
    {
      easing: L.Motion.Ease.easeInOutQuart,
    },
    {
      auto: true,
      removeOnEnd: true,
      showMarker: false,
      icon: L.divIcon({
        html: "<i class='fa fa-helicopter fa-2x' style='color:black' aria-hidden='true' ></i>",
        iconSize: L.point(27.5, 24),
      }),
    }
  )
  .motionDuration(9000)
])
.addTo(map);


//start motion when clicking on the GO button
document.getElementById("submit").addEventListener("click", function () {
  seqGroup.motionStart();
});}



//this function was meant to make the markers move without having to use a leaflet pluggin.
// function showDrones(data) {

//     for (var i=0; i<data.length; i++) {
//         let lat = data[i].lat
//         let lng = data[i].lng
    
  

//         let destinationLat = data[i].destination.lat
//         let destinationLng = data[i].destination.lng

//         let startingLat = data[i].startingPoint.lat
//         let startingLng = data[i].startingPoint.lng

//         let droneNumber = data[i].drone

        
//         let marker = L.marker([lat, lng]).addTo(map);


//         marker.on('move', function(ev) {
           
//         marker.bindPopup(`Drone: ${droneNumber} location: ${ev.latlng} alt: ${ev.timestamp}`)
//         .openPopup();
//         });


        


//         const myInterval = setInterval(function () {
//             // lat = lat + ((Math.random() * 0.5) - 0.25) * 0.001;
//             // lng = lng + ((Math.random() * 1) - 0.5) * 0.001;

            
//             lat = lat + 1 * 0.001;
//             lng = lng + 1 * 0.001;
//             marker.setLatLng([lat, lng]).update();


        
//             console.log(`Drone: ${droneNumber} Lat : ${lat} Lng : ${lng}`)
        
//             //teacher tip: return a function qui retourne cette condition, i dunno why
            
//             if (lat == destinationLat && lng == destinationLng) {
//                 clearInterval(myInterval);
                
//                 const myInterval2 = setInterval(function () {
//                     // lat = lat + ((Math.random() * 0.5) - 0.25) * 0.001;
//                     // lng = lng + ((Math.random() * 1) - 0.5) * 0.001;
//                     lat = lat - 1 * 0.001;
//                     lng = lng - 1 * 0.001;
//                     marker.setLatLng([lat, lng]).update();
//                     // marker.bindPopup(popupContent).openPopup();


                
//                     console.log(`goLat : ${lat} goLng : ${lng}`)
                
                    
//                     if (lat == startingLat && lng == startingLng) {
//                         clearInterval(myInterval2);
            
//                     }
                   
                
//                 }, 200/FPS);
                
                
//             }
    
    
           
        
//         }, 200/FPS);

        
//     }
// }


// var lat = -31.4;
// var lng = -64.183;

// var marker = L.marker([lat, lng]).addTo(map);

//adding dropzone, they are shown on the map as transparent red circles
var dLat1 =  -31.35893099999996;
var dLng1 = -64.16732499999985;
var dropZone = L.circle([dLat1, dLng1], {
    color: 'red',
    fillColor: 'red',
    fillOpacity: 0.5,
    radius: 400
}).addTo(map);

var dLat2 = -31.381293999999965;
var dLng2 = -64.10872399999987;
var dropZone2 = L.circle([dLat2, dLng2], {
    color: 'red',
    fillColor: 'red',
    fillOpacity: 0.5,
    radius: 400
}).addTo(map);

var dLat3 = -31.357877999999957;
var dLng3 = -64.10080999999983;
var dropZone2 = L.circle([dLat3, dLng3], {
    color: 'red',
    fillColor: 'red',
    fillOpacity: 0.5,
    radius: 400
}).addTo(map);

var dLat4 = -31.391370999999967;
var dLng4 = -64.15515899999987;
var dropZone2 = L.circle([dLat4, dLng4], {
    color: 'red',
    fillColor: 'red',
    fillOpacity: 0.5,
    radius: 400
}).addTo(map);

var dLat5 = -31.38499999999998;
var dLng5 = -64.16799999999994;
var dropZone2 = L.circle([dLat5, dLng5], {
    color: 'red',
    fillColor: 'red',
    fillOpacity: 0.5,
    radius: 400
}).addTo(map);



//add Warehouse, shown on the map as a green transparent circle
var dLat = -31.4;
var dLng = -64.183;
var dropZone = L.circle([dLat, dLng], {
    color: 'green',
    fillColor: 'green',
    fillOpacity: 0.5,
    radius: 800
}).addTo(map);


//this function made the drone go back to its original starting point
// function goBackMarker(lat, lng) {

//     let latitude = lat;
//     let longitude = lng;
//     console.log(latitude, longitude)

//     const myInterval = setInterval(function () {
//         // lat = lat + ((Math.random() * 0.5) - 0.25) * 0.001;
//         // lng = lng + ((Math.random() * 1) - 0.5) * 0.001;
//         latitude = latitude - 1 * 0.001;
//         longitude = longitude - 1 * 0.001;
//         setLatLng([latitude, longitude]).update();
    
//         console.log(`goLat : ${latitude} goLng : ${longitude}`)
    
        
//         if (latitude == latitude && longitude == longitude) {
//             clearInterval(myInterval);

//         }
       
    
//     }, 200);
// }


// function moveMarker() {
//     const myInterval = setInterval(function () {
//         // lat = lat + ((Math.random() * 0.5) - 0.25) * 0.001;
//         // lng = lng + ((Math.random() * 1) - 0.5) * 0.001;
        
//         lat = lat + 1 * 0.001;
//         lng = lng + 1 * 0.001;
//         marker.setLatLng([lat, lng]).update();
    
//         console.log(`Lat : ${lat} Lng : ${lng}`)
    
//         //teacher tip: return a function qui retourne cette condition, i dunno why
        
//         if (lat == -31.38399999999998 && lng == -64.16699999999993) {
//             clearInterval(myInterval);
//             goBackMarker();
            
            
//         }


       
    
//     }, 200);
    
// }