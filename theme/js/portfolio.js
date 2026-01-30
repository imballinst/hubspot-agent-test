const nextIcon = '<div class="focus-next"></div>';
const prevIcon = '<div class="focus-prev"></div>';
const closeIcon = '<div class="focus-close"></div>';

document.querySelectorAll(".work-clicker").forEach(function (button) {
  button.addEventListener("lgInit", function () {
    var close_nodes = document.querySelectorAll(".lg-icon.lg-close");
    var last_close = close_nodes[close_nodes.length - 1];
    last_close.insertAdjacentHTML("beforeend", closeIcon);

    var next_nodes = document.querySelectorAll(".lg-icon.lg-next");
    var last_next = next_nodes[next_nodes.length - 1];
    last_next.insertAdjacentHTML("beforeend", nextIcon);

    var prev_nodes = document.querySelectorAll(".lg-icon.lg-prev");
    var last_prev = prev_nodes[prev_nodes.length - 1];
    last_prev.insertAdjacentHTML("beforeend", prevIcon);
  });

  button.addEventListener("click", function () {
    var current_images = button.querySelector(".focus-work-imgs").getAttribute("imgs");
    var imagesArr = current_images.split(",");
    var galleryArr = [];

    for (var i = 0; i < imagesArr.length; i++) {
      galleryArr.push({ src: imagesArr[i] });
    }

    var dynamicGallery = lightGallery(button, {
      dynamic: true,
      download: false,
      dynamicEl: galleryArr,
      mobileSettings: { controls: false, showCloseIcon: true, download: false },
    });

    dynamicGallery.openGallery();
  });
});
