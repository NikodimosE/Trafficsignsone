// scripts/nav.js
const repoBase = "https://nikodimose.github.io/Trafficsignsone";

const navItems = [
  { name: "Home", url: `${repoBase}/index.html` },
  { name: "Warning Signs", url: `${repoBase}/pages/warning.html` },
  { name: "Regulatory Signs", url: `${repoBase}/pages/regulatory.html` },
  { name: "Information Signs", url: `${repoBase}/pages/information.html` },
];



function buildNav() {
  const nav = document.createElement("nav");
  nav.classList.add("sidebar");

  const title = document.createElement("h2");
  title.textContent = "Traffic Signs in the Isle of Man";
  title.classList.add("site-title");
  nav.appendChild(title);

  const ul = document.createElement("ul");
  navItems.forEach(item => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.url;
    a.textContent = item.name;
    li.appendChild(a);
    ul.appendChild(li);
  });

  nav.appendChild(ul);
  document.body.prepend(nav);
}

document.addEventListener("DOMContentLoaded", buildNav);

// JavaScript Document



