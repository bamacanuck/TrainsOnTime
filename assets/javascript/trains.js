/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase


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

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

      // <th>train</th>
      // <th>destination</th>
      // <th>frequency (minutes)</th>
      // <th>next arrival</th>
      // <th>minutes away</th>

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var headedTo = $("#destination-input").val().trim();
  var freqTime = moment($("#freq-input").val().trim(), "DD/MM/YY").format("X");
  var nextTime = $("#next-input").val().trim();
  var waitTime = $("#wait-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: headedTo,
    frequency: freqTime,
    nextArrival: nextTime,
    minutesAway: waitTime
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);
  console.log(newTrain.nextArrival);
  console.log(newTrain.minutesAway);

  // Alert
  alert("train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#freq-input").val("");
  $("#next-input").val("");
  $("#wait-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var headedTo = childSnapshot.val().destination;
  var freqTime = childSnapshot.val().frequency;
  var nextTime = childSnapshot.val().nextArrival;
  var waitTime = childSnapshot.val().minutesAway;

  // Employee Info
  console.log(trainName);
  console.log(headedTo);
  console.log(freqTime);
  console.log(nextTime);
  console.log(waitTime);

// !!!!!!!!!!!!!!!! Use modulus (and Moment.js
// to arrange calculation of the next
// arrival time, absolutely, and relative
// to the 'current' time.
// 

// !!!!!!!!!!!!!!!! If frequency is
// equal to wait time, write something like
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
