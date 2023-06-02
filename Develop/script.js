// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage.
  $(".saveBtn").on("click", function () {
    // Find the closest parent element with the class "time-block" and get its id
    var timeBlockId = $(this).closest(".time-block").attr("id");
    // Get the user input from the sibling element with the class "description"
    var userDescription = $(this).siblings(".description").val();
    // Save the user input in local storage using the time block id as the key
    localStorage.setItem(timeBlockId, userDescription);
  });

  // Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour.
  var currentHour = dayjs().format("H");
  $(".time-block").each(function () {
    // Get the hour from the time block id by splitting the id string
    var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
    if (timeBlockHour < currentHour) {
      // If the time block hour is less than the current hour, add the "past" class
      $(this).removeClass("present future").addClass("past");
    } else if (timeBlockHour > currentHour) {
      // If the time block hour is greater than the current hour, add the "future" class
      $(this).removeClass("past present").addClass("future");
    } else {
      // If the time block hour is equal to the current hour, add the "present" class
      $(this).removeClass("past future").addClass("present");
    }
  });

  // Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.
  $(".time-block").each(function () {
    // Get the time block id
    var timeBlockId = $(this).attr("id");
    // Get the user input from local storage using the time block id as the key
    var userDescription = localStorage.getItem(timeBlockId);
    // Set the value of the corresponding textarea element
    $(this).find(".description").val(userDescription);
  });

  // Add code to display the current date in the header of the page.
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);
});