// Countdown > Date

function toTwoDigits(num) {
  let formattedNumber = num.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  return formattedNumber;
}

function startDate(countDownDate) {
  var one_hour = 1000 * 60;
  var d_text = document.getElementById("mmct_date").getAttribute("data-days");
  var h_text = document.getElementById("mmct_date").getAttribute("data-hours");
  var m_text = document.getElementById("mmct_date").getAttribute("data-minutes");
  var s_text = document.getElementById("mmct_date").getAttribute("data-seconds");

  // Update the count down every 1 second
  var m_int = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = toTwoDigits(Math.floor(distance / (one_hour * 60 * 24)));
    var hours = toTwoDigits(Math.floor((distance % (one_hour * 60 * 24)) / (one_hour * 60)));
    var minutes = toTwoDigits(Math.floor((distance % (one_hour * 60)) / one_hour));
    var seconds = toTwoDigits(Math.floor((distance % one_hour) / 1000));

    // Output the result in an element with id="mmct_date"
    document.getElementById("mmct_date").innerHTML =
      "<div>" +
      days +
      "<span>" +
      d_text +
      "</span></div><div>:</div><div>" +
      hours +
      "<span>" +
      h_text +
      "</span></div><div>:</div><div>" +
      minutes +
      "<span>" +
      m_text +
      "</span></div><div>:</div><div>" +
      seconds +
      "<span>" +
      s_text +
      "</span></div>";

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(m_int);
      document.getElementById("mmct_date").innerHTML = document.getElementById("mmct_date").getAttribute("data-expired");
    }
  }, 1000);
}

// Countdown > Duration

function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  var t = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.innerHTML = "<div>" + minutes + "</div><div>:</div><div>" + seconds + "</div>";

    if (--timer < 0) {
      timer = duration;
      clearInterval(t);
    }
  }, 1000);
}

window.onload = function () {
  // Duration
  if (document.getElementById("mmct_duration")) {
    var duration_min = 60 * parseInt(document.getElementById("mmct_duration").getAttribute("data-duration"));
    var display = document.querySelector("#mmct_duration");
    startTimer(duration_min, display);
  }

  // Date
  if (document.getElementById("mmct_date")) {
    var targetDate = new Date(document.getElementById("mmct_date").getAttribute("data-date").replace(" ", "T") + "Z").getTime();
    startDate(targetDate);
  }
};
