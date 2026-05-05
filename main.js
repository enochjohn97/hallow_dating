function showScreen(id) {
  document
    .querySelectorAll(".screen")
    .forEach((s) => s.classList.remove("active"));
  document
    .querySelectorAll(".nav-tab")
    .forEach((t) => t.classList.remove("active"));
  document.getElementById("screen-" + id).classList.add("active");
  const tabs = {
    onboard: 0,
    profile: 1,
    matches: 2,
    messages: 3,
    subscription: 4,
  };
  document.querySelectorAll(".nav-tab")[tabs[id]]?.classList.add("active");
  if (id === "messages") {
    setTimeout(() => {
      const c = document.getElementById("chat-messages");
      c.scrollTop = c.scrollHeight;
    }, 100);
  }
}

function toggleCard(el) {
  el.classList.toggle("selected");
}

function nextStep(n) {
  document
    .querySelectorAll(".onboard-step")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById("step-" + n).classList.add("active");
  const dots = document.querySelectorAll(".dot");
  dots.forEach((d, i) => {
    d.classList.remove("active", "done");
    if (i < n - 1) d.classList.add("done");
    if (i === n - 1) d.classList.add("active");
  });
}

const sliderLabels = [
  "",
  "Deep introvert",
  "Quiet & Reflective",
  "Balanced",
  "Mostly social",
  "Ambivert",
];
function updateSlider(v) {
  document.getElementById("slider-val").textContent = sliderLabels[v];
  const pct = ((v - 1) / 4) * 100;
  document.getElementById("energy-slider").style.background =
    `linear-gradient(to right,var(--sage) 0%,var(--sage) ${pct}%,var(--border) ${pct}%,var(--border) 100%)`;
}

function selectOpt(el, group) {
  document.querySelectorAll(`.q-opt`).forEach((o) => {
    if (o.parentElement === el.parentElement) o.classList.remove("selected");
  });
  el.classList.add("selected");
}

function filterPill(el) {
  document
    .querySelectorAll(".vbar-pill")
    .forEach((p) => p.classList.remove("active"));
  el.classList.add("active");
}

function selectPlan(plan) {
  document
    .querySelectorAll(".plan-card")
    .forEach((c) => c.classList.remove("selected"));
  document.getElementById("plan-" + plan).classList.add("selected");
  const labels = {
    free: "Start Free",
    connect: "Begin with Connect — $14/month",
    deep: "Begin with Deep — $27/month",
    lifetime: "Claim Lifetime Access — $149",
  };
  document.getElementById("cta-btn").textContent = labels[plan];
}

let thinkingOn = true;
function toggleThinking() {
  thinkingOn = !thinkingOn;
  const t = document.getElementById("think-toggle");
  const l = document.getElementById("think-label");
  t.classList.toggle("on", thinkingOn);
  l.textContent = thinkingOn
    ? "Thinking mode — take your time replying"
    : "Live mode — replies expected sooner";
}

function autoResize(el) {
  el.style.height = "auto";
  el.style.height = Math.min(el.scrollHeight, 100) + "px";
}

function sendMessage() {
  const input = document.getElementById("msg-input");
  const text = input.value.trim();
  if (!text) return;
  const msgs = document.getElementById("chat-messages");
  const bubble = document.createElement("div");
  bubble.innerHTML = `<div class="msg-bubble msg-me">${text}</div><div class="msg-time right">Just now</div>`;
  msgs.appendChild(bubble);
  input.value = "";
  input.style.height = "auto";
  msgs.scrollTop = msgs.scrollHeight;
}

function handleKey(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}
