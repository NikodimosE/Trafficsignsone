const repoRoot = new URL("../../", window.location.href).href;

const navItems = [
  { name: "Home", url: new URL("index.html", repoRoot).href },
  { name: "Warning Signs", url: new URL("pages/warning.html", repoRoot).href },
  { name: "Regulatory Signs", url: new URL("pages/regulatory.html", repoRoot).href },
  { name: "Information Signs", url: new URL("pages/information.html", repoRoot).href },
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
