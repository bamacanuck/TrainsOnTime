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

var minutesToGo;
var nextOne;

//create function
function nextArrival(firstGo, freqInt){

  var firstGoMJS = moment(firstGo,"hh:mm");

  var nowTime = moment();

//difference between current time and "first go" train time
  var timeDelta = moment().diff(moment(firstGoMJS),"minutes");

//use modulus to determine minutes 'left over'
  var remainder = timeDelta % freqInt;

//minutes to go, relative to now
  minutesToGo = freqInt - remainder;

  //to catch the "next one"
  nextOne = moment().add(minutesToGo,"minutes");
  nextOneMJS = moment(nextOne).format("hh:mm");
}

//===================================================


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
db.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var headedTo = childSnapshot.val().destination;
  var firstTime = childSnapshot.val().firstGo;
  var freqInt = childSnapshot.val().trainInterval;

  // Employee Info
  console.log(trainName);
  console.log(headedTo);
  console.log(firstTime);
  console.log(freqInt);

  $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + headedTo + "</td><td>" +
  freqInt + "</td><td>" + "" + "</td><td>" + minutesToGo + "</td></tr>");

// !!!!!!!!!!!!!!!!!!!! table data is incomplete, lacking
// elements to be derived using Moment.js
});

// !!!!!!!!!!!!!!!! Use modulus (and Moment.js
// to arrange calculation of the next
// arrival time, absolutely, and relative
// to the 'current' time.
// 

// !!!!!!!!!!!!!!!! If frequency is
// equal to wait time, maybe 'alert' something like
// "Either the train is at the station,
//or it just left!"

//   // Prettify the employee start
//   var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

//   // Calculate the months worked using hardcore math
//   // To calculate the months worked
//   var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
//   console.log(empMonths);

//   // Calculate the total billed rate
//   var empBilled = empMonths * empRate;
//   console.log(empBilled);

//   // Add each train's data into the table
//   $("#employee-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
//   empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
// });

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
