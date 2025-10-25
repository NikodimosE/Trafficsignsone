const navItems = [
  { name: "Home", url: "/index.html" },
  { name: "Warning Signs", url: "/pages/warning.html" },
  { name: "Regulatory Signs", url: "/pages/regulatory.html" },
  { name: "Speed Limit Signs", url: "/pages/speed-limit.html" },
  { name: "Level Crossing Signs and Signals", url: "/pages/levelcross.html" },
  { name: "Signs for Buses, Cycles, Equestrians, Trams, and Pedestrians", url: "/pages/trams.html" },
  { name: "Pedestrian and Cycle Zone Signs", url: "/pages/pedzone.html" },
];

function buildNav() {
  // Create sidebar nav
  const nav = document.createElement("nav");
  nav.classList.add("sidebar", "collapsed");

  // Create toggle button
  const toggle = document.createElement("button");
  toggle.id = "navToggle";
  toggle.setAttribute("aria-label", "Toggle navigation");
  toggle.innerHTML = `
  <span class="bar top"></span>
  <span class="bar middle"></span>
  <span class="bar bottom"></span>`;
  document.body.prepend(toggle);

  toggle.addEventListener("click", () => {
  nav.classList.toggle("collapsed");
  document.body.classList.toggle("sidebar-open");
});


  // Add site title
  const title = document.createElement("h2");
  title.textContent = "Traffic Signs in the Isle of Man";
  title.classList.add("site-title");1
  nav.appendChild(title);

  // Add nav links
  const ul = document.createElement("ul");
  navItems.forEach(item => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.url;
    a.textContent = item.name;
    li.appendChild(a);
    ul.appendChild(li);

    // Collapse nav on mobile after clicking a link
    a.addEventListener("click", () => {
      if (window.innerWidth < 769) {
        nav.classList.add("collapsed");
      }
    });
  });

  nav.appendChild(ul);
  document.body.prepend(nav);
}

document.addEventListener("DOMContentLoaded", () => {
  buildNav();

  document.addEventListener("click", (e) => {
    const nav = document.querySelector(".sidebar");
    const toggle = document.getElementById("navToggle");

    const clickedInsideNav = nav.contains(e.target);
    const clickedToggle = toggle.contains(e.target);

    if (!clickedInsideNav && !clickedToggle && !nav.classList.contains("collapsed")) {
      nav.classList.add("collapsed");
      document.body.classList.remove("sidebar-open");
    }
  });
});

