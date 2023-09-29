fetch('./../routesData.json')
    .then(response => response.json())
    .then( data => moveDrones(data));


let FPS = .5;


// Create the map
var map = L.map('map').setView([-31.4, -64.183], 14);

// Set up the OSM layer
L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
}).addTo(map);

var options = {
    draw: {
      circle: false, // Turns off this drawing tool
      rectangle: false,
      polygon: false,
      marker: false,
      circlemarker: false,
    },
  };

  var drawControl = new L.Control.Draw(options);
  map.addControl(drawControl);

  
  map.on(L.Draw.Event.CREATED, function (e) {

        var type = e.layerType;
        var layer = e.layer;

        // let maxspeed = motionSpeed(5000);
        // console.log(maxspeed);

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


  //motion events
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
  
//   seqGroup.on("click", function () {
//     seqGroup.motionPause();
//   });

  document.getElementById("start").addEventListener("click", function () {
    seqGroup.motionStart();
  });

  document.getElementById("stop").addEventListener("click", function () {
    seqGroup.motionStop();
  });

  document.getElementById("toggle").addEventListener("click", function () {
    seqGroup.motionToggle();
  });
  
//   seqGroup.on("dblclick", function (e) {
//     seqGroup.motionResume();
//   });
  
//   setTimeout(function () {
//     seqGroup.motionStart();
//   }, 1000);

        }


    
  }




 

// adds marker on click
// map.on("click", function(e){
//     new L.Marker([e.latlng.lat, e.latlng.lng]).addTo(map);
//  })


// var polylinePoints = [
//     [-31.4, -64.183],
//     [-31.38399999999998, -64.16699999999993],
//     [-31.391370999999967, -64.15515899999987],
//     [-31.4, -64.183],
//     [-31.357877999999957, -64.10080999999983],
//     [-31.381293999999965, -64.10872399999987],
//     [-31.35893099999996, -64.16732499999985]
//   ];

//   //polyline 3 is the  warehouse

// function moveDrone() {
//     L.motion.polyline( [polylinePoints[0], polylinePoints[1], polylinePoints[2], polylinePoints[3], polylinePoints[4],polylinePoints[3], polylinePoints[5], polylinePoints[6], polylinePoints[3]], {
//         color: "transparent"
//     }, {
//         auto: true,
//         duration: 9000,
//         easing: L.Motion.Ease.linear,
        
//     }, {
//         removeOnEnd: true,
//         icon: L.divIcon({html: "<i class='fas fa-plane fa-2x'></i>", iconSize: L.point(30,30)})
//     }).addTo(map);
// }








var popup = L.popup();



function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);

    // let pointDepart = e.latlng.toString();

    // document.getElementById("Lat").value = pointDepart.slice(6);
   
}





function chooseDepart() {
 
  let value = map.on('click', onMapClick);
  console.log(value._popup._latlng);
  let pointDepart = value._popup._latlng;

  document.getElementById("Lat").value = pointDepart;

  
}

function chooseArrivee() {
  let value = map.on('click', onMapClick);
  console.log(value._popup._latlng);
  let pointArrivee = value._popup._latlng;
 
  document.getElementById("Lng").value = pointArrivee;
}

function clearInputs() {
  document.getElementById("Lat").value = "";
  document.getElementById("Lng").value = "";
}

function goToPoint() {
  let lat = document.getElementById("Lat").value;
  let lng = document.getElementById("Lng").value;

  let strLat = lat.slice(6);
  let strLng = lng.slice(6);

  

  console.log(strLat, strLng)

  // let marker = L.marker([strLat, strLng]).addTo(map);

    var route3 = JSON.parse(
    '[{"lat":-31.399844,"lng":-64.183245},{"lat":-31.422332,"lng":-64.199982},{"lat":-31.399844,"lng":-64.183245}]'
  );

  var seqGroup = L.motion
  .seq([

  L.motion
  .polyline(
      route3,
    {
      color: "transparent",
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

document.getElementById("submit").addEventListener("click", function () {
  seqGroup.motionStart();
});


  // marker.on('move', function(ev) {
    
  // marker.bindPopup(`location: ${ev.latlng} alt: ${ev.timestamp}`)
  // .openPopup();
  // });
  
}
// add a marker in the given location
//place markers using the json file

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

//add dropzone
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



//add Warehouse
var dLat = -31.4;
var dLng = -64.183;
var dropZone = L.circle([dLat, dLng], {
    color: 'green',
    fillColor: 'green',
    fillOpacity: 0.5,
    radius: 800
}).addTo(map);



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









// // add a layer and add points
// var myLayer = L.geoJson().addTo(map);

// // geojsonFeature
// var geojsonFeature = {
//     "type": "Feature",
//         "properties": {
//         "name": "Coors Field",
//             "amenity": "Baseball Stadium",
//             "popupContent": "This is where the Rockies play!"
//     },
//         "geometry": {
//         "type": "Point",
//             "coordinates": [-105.99404, 39.75621]
//     }
// };

// // put the marker
// setTimeout(function () {
//     myLayer.addData(geojsonFeature);
// }, 1000);

// // update the marker
// setTimeout(function () {
//     // clear layer
//     myLayer.clearLayers(); // inherited from LayerGroup
//     //myLayer.addData(geojsonFeature);
// }, 3000);

// // put the marker
// setTimeout(function () {
//     myLayer.addData(geojsonFeature);
// }, 5000);

// just fooling around

