const answers = [
  "先稳住，再出手。",
  "今天适合慢一点。",
  "你已经知道答案了。",
  "别急，先睡个好觉。",
  "把重点放回自己。",
  "先完成最小的一步。",
  "值得，但别硬撑。",
  "等风来，也要系好鞋带。",
  "说出口，会轻松很多。",
  "换个角度就亮了。",
  "先拒绝，再决定。",
  "你不需要所有人同意。",
  "这是一次提醒，不是阻拦。",
  "先收心，再收获。",
  "今天更适合观察。",
  "别被情绪催促。",
  "答案在安静里。",
  "该联系的人会回应你。",
  "再试一次，方式换一下。",
  "你可以把它做小。",
  "别替未来提前焦虑。",
  "现在行动，比完美重要。",
  "顺其自然，也是一种力量。",
  "先顾好身体，别逞强。",
  "不必证明，直接去做。",
  "这件事会慢慢转好。",
  "把复杂的事说简单。",
  "是时候清理旧念头了。",
  "暂停，不等于后退。",
  "你需要一次独处。",
  "此刻不必回答所有问题。",
  "你的直觉值得被听见。",
  "先把边界立起来。",
  "别怕麻烦，值得问清楚。",
  "放松一点，机会会靠近。",
  "今天适合整理而不是冲刺。",
  "真正重要的不会催你乱跑。",
  "先完成，再优化。",
  "勇气会在行动后出现。",
  "往前一步就够了。",
  "可以答应自己，但别急着答应别人。",
  "留白，会带来新答案。",
  "先去见见阳光。",
  "不合适的，迟早会松手。",
  "这次请相信长期主义。",
  "马上去做那件拖了很久的事。",
  "你需要的是节奏，不是速度。",
  "先听事实，再听情绪。",
  "多问一句，会更明朗。",
  "今天适合接受帮助。",
  "别让一时失落定义今天。",
  "答案偏向肯定，但要稳。",
  "答案偏向等待，但不用怕。",
  "这不是终点，是转弯。",
  "先把心收回来。",
  "你要找的，不在热闹里。",
  "有些门，轻推就会开。",
  "如果犹豫，就先减少承诺。",
  "去做那个让你更踏实的选择。",
  "别把小问题养成大负担。",
  "今天适合说真话。",
  "这次先为自己站队。",
  "把期待降一点，惊喜会更多。",
  "需要时间发酵。",
  "先结束一件旧事。",
  "不舒服，就是线索。",
  "你正在接近关键节点。",
  "今天不适合比较。",
  "与其猜，不如问。",
  "慢慢来，但别停。",
  "你比想象中更有底气。",
  "答案是会的，只是不是立刻。",
  "放下控制，反而顺了。",
  "该休息时别谈理想。",
  "先把眼前过好。",
  "把话说短，把事做实。",
  "此刻适合保留一点神秘。",
  "你需要的是确认，不是安慰。",
  "今天先修复能量。",
  "真正在意你的人看得见。",
  "答案在路上，不在原地。",
  "多一点耐心，少一点内耗。",
  "先别下结论。",
  "你会感谢今天的克制。",
  "可以开始了。",
  "等一个更自然的时机。",
  "别再重复同样的解释。",
  "你需要一次清晰的取舍。",
  "最好的回复，是拿出结果。",
  "往简单处走。",
  "这个念头值得认真对待。",
  "先去喝口水。",
  "你不需要马上赢。",
  "这次适合主动一点。",
  "会有回应，先别心急。",
  "把重心放在能掌控的部分。",
  "先停一下，答案会浮上来。",
  "有惊喜，但要有耐心。",
  "请把今天过得具体一点。",
  "先照顾情绪，再处理问题。",
  "你已经走对方向。",
  "现在不宜逞一时痛快。",
  "答案是肯定的，节奏放缓。",
  "今天适合做减法。",
  "不确定时，就先选择诚实。",
  "这件事值得继续。",
  "先看看自己是不是太累了。"
];

const historyKey = "answers-book-history";
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
  return new Intl.DateTimeFormat("zh-CN", {
    month: "numeric",
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
    empty.textContent = "还没有记录，今天先翻开第一句吧。";
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
    answerText.textContent = "先输入一个有效数字，再翻开答案。";
    answerNumber.textContent = "等待数字";
    return;
  }

  const answer = pickAnswer(number);
  answerText.textContent = answer;
  answerNumber.textContent = `数字 ${number}`;
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
  if (!text || text.includes("输入")) {
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = "已复制";
    window.setTimeout(() => {
      copyBtn.textContent = "复制";
    }, 1200);
  } catch {
    copyBtn.textContent = "复制失败";
    window.setTimeout(() => {
      copyBtn.textContent = "复制";
    }, 1200);
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}

renderHistory();
