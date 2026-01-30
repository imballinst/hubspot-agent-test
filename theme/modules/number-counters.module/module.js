// Animation speed
const speed = parseInt(document.querySelector(".focus_module_number_counters").getAttribute("data-speed")) * 500;

// Selector
const counters = document.querySelectorAll(".focus_module_number_counter");

var animated = false;

window.addEventListener("scroll", scrollFunctionNumberCounters);

function scrollFunctionNumberCounters() {
  var countersTop = document.querySelector(".focus_module_number_counters").offsetTop - window.innerHeight;
  var top = this.scrollY;
  if (!animated && top > countersTop) {
    // Calculate speeds to finish the animations at the same time
    var targets = [];
    // Get targets
    for (let n of counters) {
      targets.push(parseInt(n.getAttribute("data-target")));
    }
    targets.sort((a, b) => b - a);
    // Set speeds
    var speeds = [];
    for (let i = 0; i < targets.length; i++) {
      const s = (targets[0] / targets[i]) * speed; // Decrease speed for lower targets
      speeds.push(parseInt(s));
    }
    // Start counters
    var current_speed = 0;
    for (let n of counters) {
      const updateCount = () => {
        const target = +n.getAttribute("data-target");
        const count = +n.innerText;
        // Find current speed
        targets.forEach((t, index) => {
          if (parseInt(n.getAttribute("data-target")) == t) {
            current_speed = speeds[index];
          }
        });
        // Execute
        const inc = target / speed;
        if (count < target) {
          n.innerText = Math.ceil(count + inc);
          setTimeout(updateCount, ((1 * current_speed) / speed) * 2);
        } else {
          n.innerText = target;
        }
      };
      updateCount();
    }
    animated = true;
  }
}
