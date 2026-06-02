const answers = [
  "Steady first, then move.",
  "Go slower today.",
  "You already know.",
  "Sleep on it first.",
  "Return to yourself.",
  "Take the smallest step.",
  "Worth it, but pace it.",
  "Wait well, not idly.",
  "Say it out loud.",
  "A new angle helps.",
  "Decline first, decide later.",
  "You do not need permission.",
  "This is a reminder, not a stop sign.",
  "Gather yourself first.",
  "Today is better for watching.",
  "Do not let emotion rush you.",
  "The answer lives in quiet.",
  "The right person will respond.",
  "Try again, differently.",
  "Make it smaller.",
  "Do not pre-worry the future.",
  "Action matters more than polish.",
  "Letting it unfold is still strength.",
  "Care for your body first.",
  "No need to prove it.",
  "This will turn in your favor.",
  "Say the complex thing simply.",
  "Release the old thought.",
  "A pause is not retreat.",
  "You need a little solitude.",
  "You do not have to answer everything now.",
  "Trust your instinct.",
  "Set the boundary first.",
  "Ask one more question.",
  "Relax a little. Room will open.",
  "Today is for sorting, not sprinting.",
  "What matters will not demand panic.",
  "Finish first. Refine later.",
  "Courage arrives after action.",
  "One step is enough.",
  "Promise yourself before others.",
  "Leave space for the next answer.",
  "Go meet the sunlight.",
  "What does not fit will loosen.",
  "Think long-term this time.",
  "Do the overdue thing now.",
  "You need rhythm, not speed.",
  "Hear the facts, then the feelings.",
  "One more question brings clarity.",
  "Accept help today.",
  "Do not let one hard moment define the day.",
  "The answer leans yes, with care.",
  "The answer leans wait, without fear.",
  "This is a turn, not an end.",
  "Bring your heart back home.",
  "What you seek is not in the noise.",
  "Some doors open with a light push.",
  "If unsure, promise less.",
  "Choose what feels steadier.",
  "Do not let a small issue grow.",
  "Speak honestly today.",
  "Stand with yourself this time.",
  "Lower the expectation and notice the gift.",
  "This needs time to ripen.",
  "Close one old chapter first.",
  "Discomfort is a clue.",
  "You are nearing the key point.",
  "Today is not for comparison.",
  "Instead of guessing, ask.",
  "Move slowly, but keep moving.",
  "You have more ground than you think.",
  "Yes, but not immediately.",
  "Release control and it softens.",
  "Rest before you chase ideals.",
  "Live this day well first.",
  "Use fewer words, do the real thing.",
  "Keep a little mystery.",
  "You need confirmation, not comfort.",
  "Repair your energy today.",
  "The people who care can see it.",
  "The answer is on the way.",
  "More patience, less friction.",
  "Do not conclude too early.",
  "You will thank yourself for restraint.",
  "You can begin.",
  "Wait for the more natural moment.",
  "Stop repeating the same explanation.",
  "A clear tradeoff is needed.",
  "Results will answer best.",
  "Take the simpler path.",
  "This thought deserves respect.",
  "Drink some water first.",
  "You do not need to win today.",
  "This time, be a little more direct.",
  "A reply is coming. Breathe.",
  "Focus on what you can control.",
  "Pause. The answer will rise.",
  "A pleasant surprise needs patience.",
  "Make today concrete.",
  "Care for the feeling, then the problem.",
  "You are already facing the right way.",
  "Do not chase short-term satisfaction.",
  "Yes, but slow the tempo.",
  "Today calls for subtraction.",
  "When unsure, choose honesty.",
  "This is worth continuing.",
  "Check whether you are simply tired."
];

const historyKey = "answers-book-history-en";
const numberInput = document.querySelector("#lucky-number");
const answerBtn = document.querySelector("#answer-btn");
const answerText = document.querySelector("#answer-text");
const answerNumber = document.querySelector("#answer-number");
const historyList = document.querySelector("#history-list");
const clearBtn = document.querySelector("#clear-btn");
const copyBtn = document.querySelector("#copy-btn");

function normalizeNumber(value) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) {
    return null;
  }
  return Math.abs(parsed);
}

function pickAnswer(number) {
  const mixed = (number * 17 + 23) ^ (number >>> 1);
  const index = Math.abs(mixed) % answers.length;
  return answers[index];
}

function formatTime(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(timestamp);
}

function getHistory() {
  try {
    const saved = localStorage.getItem(historyKey);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveHistory(history) {
  localStorage.setItem(historyKey, JSON.stringify(history));
}

function renderHistory() {
  const history = getHistory();
  historyList.innerHTML = "";

  if (!history.length) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    empty.textContent = "No entries yet. Let today be the first one.";
    historyList.appendChild(empty);
    return;
  }

  history.forEach((item) => {
    const li = document.createElement("li");
    li.className = "history-item";
    li.innerHTML = `
      <span class="history-number">#${item.number}</span>
      <span class="history-answer">${item.answer}</span>
    `;
    li.title = formatTime(item.time);
    historyList.appendChild(li);
  });
}

function addHistory(number, answer) {
  const history = getHistory();
  const next = [{ number, answer, time: Date.now() }, ...history]
    .filter((item, index, arr) => index === arr.findIndex((entry) => entry.number === item.number))
    .slice(0, 6);
  saveHistory(next);
  renderHistory();
}

function showAnswer() {
  const number = normalizeNumber(numberInput.value);
  if (number === null) {
    answerText.textContent = "Enter a valid number first.";
    answerNumber.textContent = "Waiting for a number";
    return;
  }

  const answer = pickAnswer(number);
  answerText.textContent = answer;
  answerNumber.textContent = `Number ${number}`;
  addHistory(number, answer);
}

answerBtn.addEventListener("click", showAnswer);
numberInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    showAnswer();
  }
});

clearBtn.addEventListener("click", () => {
  localStorage.removeItem(historyKey);
  renderHistory();
});

copyBtn.addEventListener("click", async () => {
  const text = answerText.textContent;
  if (!text || text.includes("Enter")) {
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = "Copied";
    window.setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 1200);
  } catch {
    copyBtn.textContent = "Failed";
    window.setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 1200);
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker-en.js").catch(() => {});
  });
}

renderHistory();
