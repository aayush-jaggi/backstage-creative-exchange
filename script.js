const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navLinks.classList.toggle("mobile-open", !isOpen);
    menuButton.textContent = isOpen ? "☰" : "×";
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("mobile-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰";
    });
  });
}

const chartData = {
  "1M": {
    path: "M0 230 C20 207 38 218 58 189 S95 210 114 170 S149 195 175 151 S211 183 237 130 S275 160 294 118 S331 143 353 103 S385 125 405 95 S441 129 459 78 S493 91 515 70 S550 102 568 57 S607 81 625 43 S659 66 679 30 S706 51 720 18",
    fanPath: "M0 280 C35 275 56 255 94 251 S145 234 181 220 231 215 268 193 321 188 359 164 412 161 451 138 498 134 542 111 592 104 635 80 685 72 720 56",
    labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
    value: "4,821.34",
    change: "+4.2% MTD",
  },
  "6M": {
    path: "M0 254 C24 242 36 251 57 228 S88 237 110 218 S141 225 164 204 S196 218 219 190 S254 202 276 178 S310 196 334 159 S365 181 390 141 S421 160 444 120 S476 150 498 99 S530 128 554 83 S588 111 610 64 S646 89 666 52 S698 62 720 27",
    fanPath: "M0 294 C38 284 65 280 98 267 S145 262 181 247 223 242 258 222 301 215 342 199 387 192 427 175 465 170 508 147 552 140 593 119 638 110 676 83 701 78 720 65",
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
    value: "4,821.34",
    change: "+12.8% / 6M",
  },
  "1Y": {
    path: "M0 278 C22 269 37 282 58 261 S92 274 112 248 S146 258 168 239 S197 254 222 220 S251 231 276 214 S304 229 331 188 S362 208 386 178 S414 198 440 154 S472 178 496 135 S526 158 550 113 S582 140 606 91 S638 119 659 70 S694 94 720 18",
    fanPath: "M0 298 C32 290 62 286 95 276 S135 270 170 256 210 250 244 231 282 226 318 210 356 202 392 185 431 177 466 160 502 152 538 134 575 123 609 106 642 97 672 75 697 61 720 49",
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    value: "4,821.34",
    change: "+18.6% YTD",
  },
};

const timeButtons = document.querySelectorAll(".time-button");
const line = document.querySelector("[data-chart-line]");
const fanLine = document.querySelector("[data-fan-line]");
const area = document.querySelector(".chart-area-fill");
const months = document.querySelector("[data-chart-labels]");
const indexValue = document.querySelector(".index-number strong");
const indexChange = document.querySelector(".index-number b");

function setPeriod(period) {
  const selection = chartData[period];
  if (!selection) return;
  line?.setAttribute("d", selection.path);
  fanLine?.setAttribute("d", selection.fanPath);
  area?.setAttribute("d", `${selection.path} L720 310H0Z`);
  if (months) months.innerHTML = selection.labels.map((label) => `<span>${label}</span>`).join("");
  if (indexValue) indexValue.innerHTML = `${selection.value.split(".")[0]}<span>.${selection.value.split(".")[1]}</span>`;
  if (indexChange) indexChange.textContent = `↗ ${selection.change}`;
  timeButtons.forEach((button) => {
    const active = button.dataset.period === period;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

timeButtons.forEach((button) => button.addEventListener("click", () => setPeriod(button.dataset.period)));

const copyEmailButton = document.querySelector("[data-copy-email]");
const copyFeedback = document.querySelector(".copy-feedback");

async function copyEmailAddress() {
  if (!copyEmailButton) return;
  const email = copyEmailButton.dataset.copyEmail;
  let copied = false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(email);
      copied = true;
    }
  } catch { /* Try the local copy fallback below. */ }
  if (!copied) {
    const temporaryInput = document.createElement("textarea");
    temporaryInput.value = email;
    temporaryInput.setAttribute("readonly", "");
    temporaryInput.style.position = "fixed";
    temporaryInput.style.opacity = "0";
    document.body.append(temporaryInput);
    temporaryInput.select();
    copied = document.execCommand("copy");
    temporaryInput.remove();
  }
  if (copyFeedback) {
    copyFeedback.textContent = copied ? "Email copied" : `Copy unavailable — ${email}`;
    if (copied) window.setTimeout(() => { copyFeedback.textContent = ""; }, 2400);
  }
}

copyEmailButton?.addEventListener("click", copyEmailAddress);

const confettiColors = ["#f3c64e", "#ef6c73", "#2441eb", "#d9f64b", "#fffaf0", "#65ce85", "#a78bfa"];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let confettiLayer;

function sprinkleConfetti(event) {
  if (prefersReducedMotion.matches || event.detail === 0) return;
  const shapes = ["star", "strip", "dot"];
  const particleCount = 46;
  if (!confettiLayer) {
    confettiLayer = document.createElement("div");
    confettiLayer.className = "confetti-layer";
    confettiLayer.setAttribute("aria-hidden", "true");
    document.body.append(confettiLayer);
  }

  for (let index = 0; index < particleCount; index += 1) {
    const angle = (Math.PI * 2 * index) / particleCount + (Math.random() - 0.5) * 0.45;
    const distance = 48 + Math.random() * 105;
    const piece = document.createElement("span");
    piece.className = `confetti-piece ${shapes[Math.floor(Math.random() * shapes.length)]}`;
    if (piece.classList.contains("star")) piece.textContent = "✦";
    piece.style.left = `${event.clientX}px`;
    piece.style.top = `${event.clientY}px`;
    piece.style.setProperty("--confetti-color", confettiColors[Math.floor(Math.random() * confettiColors.length)]);
    piece.style.setProperty("--confetti-x", `${Math.cos(angle) * distance}px`);
    piece.style.setProperty("--confetti-y", `${Math.sin(angle) * distance - 10}px`);
    piece.style.setProperty("--confetti-spin", `${Math.round(Math.random() * 720 - 360)}deg`);
    piece.style.animationDelay = `${Math.random() * 70}ms`;
    confettiLayer.append(piece);
    window.setTimeout(() => piece.remove(), 1700);
  }
}

document.addEventListener("click", sprinkleConfetti);

// Respect reduced-motion preferences while allowing the editorial page to reveal as it enters view.
if ("IntersectionObserver" in window && !prefersReducedMotion.matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".ipo-card, .how-card, .perk, .perk-photo, .chart-panel").forEach((item) => {
    item.classList.add("reveal");
    observer.observe(item);
  });
}
