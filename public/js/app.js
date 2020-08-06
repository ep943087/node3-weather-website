const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
search.select();
const message1 = document.querySelector("#message1");
const message2 = document.querySelector("#message2");
const $sendLocation = document.querySelector("#sendLocation");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  message1.textContent = "Loading...";
  message2.textContent = "";
  fetch("weather?address=" + search.value).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message1.textContent = message2.textContent = "";
        return (message1.textContent = data.error + ' "' + search.value + '"');
      }
      message1.textContent = data.location;
      message2.textContent = data.forecast;
    });
  });
});

$sendLocation.addEventListener("click", (e) => {
  message1.textContent = "Loading...";
  message2.textContent = "";
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser");
  }
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    const url = `/weather-by-coords?latitude=${latitude}&longitude=${longitude}`;
    message1.textContent = message2.textContent = "";
    try {
      const response = await fetch(url);
      const data = await response.json();

      message2.textContent = data.data;
    } catch (e) {
      alert(e);
    }
  });
});
