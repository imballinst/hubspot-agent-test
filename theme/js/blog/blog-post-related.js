var inc = 0;
var states = ["mgi-col1", "mgi-col2"];
var cols = document.querySelector(".rp_cols").getAttribute("data-cols");

if (cols == "3col") {
  states.push("mgi-col3");
}

var current_lang = document.documentElement.lang;
var final_date_output = "";

var blog_post_formatter = function (blogposts) {
  var formatted = '<div class="focus_grid-container"><section class="focus_grid-inner">';
  for (var i = 0; i < blogposts.length; i++) {
    var blogpost = blogposts[i];

    var the_date = new Date(blogpost.publishDate);
    var day = the_date.toLocaleDateString(current_lang, { day: "numeric" });
    var month_short = the_date.toLocaleDateString(current_lang, { month: "short" });
    var year = the_date.toLocaleDateString(current_lang, { year: "numeric" });

    final_date_output = day + " " + month_short + " " + year;

    formatted += '<article class="focus_grid-col focus_grid--' + cols + " " + states[inc] + '">';
    formatted += '<div class="focus_widget-container focus_widget-single_post">';
    formatted += `<a class="focus_widget_post_item-a mw_single_post" href="${blogpost.url}">`;
    if (blogpost.featuredImage) {
      formatted += `<img src="${blogpost.featuredImage}" alt="${blogpost.featuredImageAltText}" width="100%" loading="lazy">`;
    }
    formatted += '<div class="focus_widget_post_item-text">';
    formatted += `<h4 class="focus_widget_post_item-title">${blogpost.name}</h4>`;
    formatted += '<time class="focus_widget_post_item-date">' + final_date_output + "</time>";
    formatted += "</div></a></div>";
    formatted += "</article>";
    inc = ++inc % states.length;
  }
  formatted += "</section></div>";
  return formatted;
};
