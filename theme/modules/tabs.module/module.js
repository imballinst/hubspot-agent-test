document.querySelectorAll(".focus_module_tabs_link").forEach(function (button) {
  button.addEventListener("click", function () {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("focus_module_tabs_content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("focus_module_tabs_link");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(this.getAttribute("data-name")).style.display = "flex";
    this.className += " active";
  });
});

document.getElementById("mmt_id1").click();
