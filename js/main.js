window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => revealObserver.observe(el));
} else {
  reveals.forEach(el => el.classList.add("active"));
}

const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");

if (toggle && links) {
  const closeMenu = () => {
    toggle.classList.remove("active");
    links.classList.remove("open");
  };

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    links.classList.toggle("open");
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", e => {
    if (!e.target.closest(".navbar")) closeMenu();
  });
}

const termBody = document.getElementById("termBody");

const terminalLines = [
  { type: "prompt", text: "whoami" },
  { type: "out", text: "dileep_mandaloju - data_analyst & software_developer" },
  { type: "prompt", text: "./fetch_skills.sh" },
  { type: "ok", text: "[ OK ] Python, SQL, Power BI, PHP, Flask loaded." },
  { type: "prompt", text: "echo $STATUS" },
  { type: "comment", text: "# Open to new opportunities..." }
];

let tLineIndex = 0;
let tCharIndex = 0;
let tIsTyping = false;
let tCurrentLineEl = null;

function typeTerminal() {
  if (tLineIndex >= terminalLines.length) {
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    termBody.appendChild(cursor);
    return;
  }

  const line = terminalLines[tLineIndex];

  if (!tIsTyping) {
    tCurrentLineEl = document.createElement("div");
    tCurrentLineEl.className = "terminal-line " + line.type;
    termBody.appendChild(tCurrentLineEl);
    tIsTyping = true;
  }

  if (line.type === "prompt" || line.type === "comment") {
    const prefix = line.type === "prompt" ? '<span class="prompt">~ % </span>' : "";
    const currentText = line.text.substring(0, tCharIndex + 1);
    tCurrentLineEl.innerHTML = prefix + currentText + '<span class="cursor"></span>';
    tCharIndex++;

    if (tCharIndex < line.text.length) {
      setTimeout(typeTerminal, Math.random() * 50 + 30);
    } else {
      tCurrentLineEl.innerHTML = prefix + line.text;
      tCharIndex = 0;
      tIsTyping = false;
      tLineIndex++;
      setTimeout(typeTerminal, 400);
    }
  } else {
    tCurrentLineEl.innerHTML = line.text;
    tIsTyping = false;
    tLineIndex++;
    setTimeout(typeTerminal, 250);
  }
}

if (termBody && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setTimeout(typeTerminal, 1000);
} else if (termBody) {
  terminalLines.forEach(line => {
    const el = document.createElement("div");
    el.className = "terminal-line " + line.type;
    el.textContent = line.type === "prompt" ? "~ % " + line.text : line.text;
    termBody.appendChild(el);
  });
}
