$(function () {
  //Placing the dayjs library into a variable to be able to use more easily
  let dayData = dayjs()
 
//establish variable btns to capture all the 'save' buttons on the page
 let btns = $('.saveBtn');
 //use the forEach, or each in this case, to select the ids that are assigned to each in html
 btns.each(function() {
  let id = $(this).data().id
  $(this).on('click', function(){
    //variable value is assigned the text found in the appropriate text box
    let value = $(`#hour-${id} textarea`).val();
    //stringifys the value to be sent to localStorage
    const valueString = JSON.stringify(value);
    //value and key are sent to localStorage
    localStorage.setItem(`hour-${id}`, valueString);
  });

  //Pulls the data from the local storage and places it in text boxes
  let storedUserData = localStorage.getItem(`hour-${id}`);
  let parsedUserData = JSON.parse(storedUserData)
    $(`#hour-${id} textarea`).val(parsedUserData);
 })
//A function that checks the time and updates the color of the sections based on if it is in the past, present, or future
  function checkTime() {
    let currentHour = dayData.hour();
    for (let i = 9; i <= 17; i++) {
      if (currentHour === i) {
     $(`#hour-${i}`).removeClass("future past");
        $(`#hour-${i}`).addClass("present");
      }
      if (currentHour < i) {
        $(`#hour-${i}`).removeClass("present past");
        $(`#hour-${i}`).addClass("future");
      }
      if (currentHour > i) {
        $(`#hour-${i}`).removeClass("future present");
        $(`#hour-${i}`).addClass("past");
      }
    }
  }

  //Checks the time when the application is loaded and applies colors to the different sections from there
  checkTime();

  //Adds the current day and time to page while also refreshing the time every 60 seconds
  setInterval(() => {
    $('#currentDay').html(dayjs().format('dddd, MMMM D, YYYY h:mm A'));
  }, 60000);
  $('#currentDay').html(dayjs().format('dddd, MMMM D, YYYY h:mm A'));
});



