// Infinite scroll & pagination

// Get field options from hidden input
var mblogFields = document.getElementById("m_info_fields-blog-listing");
var mblogLayout = getFieldOption("data-layout");
var mblogMasonry = getFieldOption("data-masonry");
var mblogInitial = getFieldOption("data-initial");
var mblogPagination = getFieldOption("data-pagination");
var mblogStatus = getFieldOption("data-status");
var mblogInfAfter = getFieldOption("data-inf_after");
var mblogVisClass = getFieldOption("data-vis_class");
var mblogCycle = getFieldOption("data-cycle");
var mblogNextPage = getFieldOption("data-next_page");

function getFieldOption(f) {
  return mblogFields.getAttribute(f);
}

// Set variables
var infScroll, appendContainer, viewMoreButton, statusContainer, outlayerContainer;

if (mblogMasonry == "true") {
  // Masonry
  var grid = document.querySelector(".focus_grid-blog-listing");
  var msnry = new Masonry(grid, {
    itemSelector: ".focus_grid-item",
    columnWidth: ".focus_grid-sizer",
    gutter: ".focus_grid-gutter-sizer",
    percentPosition: true,
  });
  imagesLoaded(grid).on("progress", function () {
    msnry.layout();
  });
}

if (mblogPagination != "classical") {
  // Init infinite scroll and set pieces according to layout
  if (mblogMasonry == "true") {
    // Masonry
    outlayerContainer = msnry;
    appendContainer = ".focus_grid-item";
    setInfiniteScroll(".focus_grid");
  } else if (mblogInitial == "true") {
    // Initial columns (e.g. 2+3 columns)
    appendContainer = ".mblog-initial";
    setInfiniteScroll(".focus_grid-inner");
  } else {
    // Classical columns (e.g. 2 columns)
    appendContainer = ".focus_grid-col";
    setInfiniteScroll(".focus_grid-inner");
    if (mblogLayout == "2col" || mblogLayout == "3col") {
      infScroll.on("append", onInfAppend); // Add append listener
    }
  }
  // Pagination types
  if (mblogNextPage == "true") {
    if (mblogPagination == "load_more") {
      // Load more
      infScroll.options.loadOnScroll = false; // Disable loading on scroll
    } else if (mblogPagination == "inf_scroll_load_more") {
      // Infinite scroll + load more
      infScroll.on("load", onInfPageLoad); // Add load listener
    }
  }
}

function setInfiniteScroll(infContainer) {
  // Show view more button
  if (mblogPagination == "load_more" || mblogPagination == "inf_scroll_load_more") {
    viewMoreButton = document.querySelector(".view-more-button");
  }
  // Show/hide status
  if (mblogStatus == "true") {
    statusContainer = document.querySelector(".page-load-status");
  }
  // Init infinite scroll
  if (mblogNextPage == "true") {
    infScroll = new InfiniteScroll(document.querySelector(infContainer), {
      path: ".pagination__link--next.mpln-ok",
      hideNav: ".pagination",
      append: appendContainer,
      button: viewMoreButton,
      status: statusContainer,
      outlayer: outlayerContainer,
    });
  }
}

function onInfPageLoad() {
  if (infScroll.loadCount == mblogInfAfter) {
    // After (x+1)st page loaded
    // Disable loading on scroll
    infScroll.options.loadOnScroll = false;
    // Show button
    viewMoreButton.classList.add("vmb-true");
    // Remove event listener
    infScroll.off(onInfPageLoad);
  }
}

function onInfAppend() {
  var inc = 0;
  var cycle = mblogCycle.replace(/\s+/g, "").slice(1, -1).split(",");
  // Re-organize column classes
  var elChildren = document.querySelector(".focus_grid-inner").querySelectorAll(".focus_grid-col");
  for (i = 0; i < elChildren.length; i++) {
    elChildren[i].className = "focus_grid-col focus_grid--" + mblogLayout + " " + cycle[inc] + mblogVisClass;
    inc = ++inc % cycle.length;
  }
}
