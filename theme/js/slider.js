document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".focus_splide").forEach(function (slider) {
    new Splide(slider).mount();
  });
});
