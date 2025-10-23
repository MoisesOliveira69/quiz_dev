let current = 0;
let score = 0;

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionBox = document.getElementById("question-box");
const optionsBox = document.getElementById("options-box");
const feedback = document.getElementById("feedback");
const scoreText = document.getElementById("score-text");
const progress = document.getElementById("progress");

startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  current = 0;
  score = 0;
  showQuestion();
});

nextBtn.addEventListener("click", () => {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

restartBtn.addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});

function showQuestion() {
  const q = questions[current];
  questionBox.innerHTML = `<p>${q.question}</p>`;
  optionsBox.innerHTML = "";
  feedback.innerHTML = "";
  progress.style.width = `${((current + 1) / questions.length) * 100}%`;

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i, btn);
    optionsBox.appendChild(btn);
  });
}

function checkAnswer(i, btn) {
  const q = questions[current];
  const buttons = optionsBox.querySelectorAll("button");

  buttons.forEach(b => b.disabled = true);

  if (i === q.answer) {
    score++;
    btn.classList.add("correct");
    feedback.textContent = "✅ Correto! " + q.explanation;
  } else {
    btn.classList.add("incorrect");
    feedback.textContent = "❌ Errado. " + q.explanation;
  }
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  let emoji = score === questions.length ? "🎉" : score >= 2 ? "👍" : "😅";
  scoreText.textContent = `${emoji} Você acertou ${score} de ${questions.length} perguntas.`;
}
