$(function () {
  //Placing the dayjs library into a variable to be able to use more easily
  let dayData = dayjs()
 

 let btns = $('.saveBtn')
 btns.each(function() {
  let id = $(this).data().id
  $(this).on('click', function(){
    let value = $(`#hour-${id} textarea`).val();
    const valueString = JSON.stringify(value);
    localStorage.setItem(`hour-${id}`, valueString);
  });

  let storedUserData = localStorage.getItem(`hour-${id}`);
  let parsedUserData = JSON.parse(storedUserData)
    $(`#hour-${id} textarea`).val(parsedUserData);
 })

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
  setInterval(checkTime, 100)



  //
  checkTime();

  //Adds the current day and time to page while also refreshing the time every 60 seconds
  setInterval(() => {
    $('#currentDay').html(dayjs().format('dddd, MMMM D, YYYY h:mm A'));
  }, 60000);
  $('#currentDay').html(dayjs().format('dddd, MMMM D, YYYY h:mm A'));
});



