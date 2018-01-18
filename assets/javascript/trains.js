// Initialize Firebase

  var config = {
    apiKey: "AIzaSyANvn9IUlh0l09qRAs2LiNPEe7jzMYKe0s",
    authDomain: "trainsontime-srs.firebaseapp.com",
    databaseURL: "https://trainsontime-srs.firebaseio.com",
    projectId: "trainsontime-srs",
    storageBucket: "trainsontime-srs.appspot.com",
    messagingSenderId: "296865311891"
  };
  firebase.initializeApp(config);

  var db = firebase.database();

// 2. Button for adding Employees
$("#addTrainBtn").on("click", function(event) {
  event.preventDefault();

      // <th>train</th>
      // <th>destination</th>
      // <th>frequency (minutes)</th>
      // <th>next arrival</th>
      // <th>minutes away</th>

  // Grabs user input
  var trainName = $("#trainNameAdd").val().trim();
  var headedTo = $("#destinationAdd").val().trim();
  var firstTime = $("#firstDeparture").val().trim();
  var freqInt = $("#frequencyAdd").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: headedTo,
    firstGo: firstTime,
    trainInterval: freqInt
  };

  // Uploads employee data to the database
  db.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstGo);
  console.log(newTrain.trainInterval);

  // Alert
  alert("Another train is on our schedule!");

  // Clears all of the text-boxes
  $("#trainNameAdd").val("");
  $("#destinationAdd").val("");
  $("#firstDeparture").val("");
  $("#frequencyAdd").val("");
});

//===================================================

//create function
function nextArrival(x, y){

  var firstGoMJS = moment(x,"hh:mm").subtract(1,"years");

  var nowTime = moment();

//difference between current time and "first go" train time
  var timeDelta = moment().diff(moment(firstGoMJS),"minutes");

//use modulus to determine minutes 'left over'
  var remainder = timeDelta % y;

//minutes to go, relative to now
  minutesToGo = y - remainder;

  //to catch the "next one"
  nextOne = moment().add(minutesToGo,"minutes");
  nextOneMJS = moment(nextOne).format("hh:mm");
}

var minutesToGo;
var nextOne;

//===================================================


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
db.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainNameFBase = childSnapshot.val().name;
  var headedToFBase = childSnapshot.val().destination;
  var firstTimeFBase = childSnapshot.val().firstGo;
  var freqIntFBase = childSnapshot.val().trainInterval;

  // Employee Info
  console.log(trainNameFBase);
  console.log(headedToFBase);
  console.log(firstTimeFBase);
  console.log(freqIntFBase);

    nextArrival(firstTimeFBase, freqIntFBase);

  $("#trainTable > tbody").append("<tr><td>" + trainNameFBase + "</td><td>" + headedToFBase + "</td><td>" +
  freqIntFBase + "</td><td>" + nextOneMJS + "</td><td>" + minutesToGo + "</td></tr>");
});