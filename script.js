let emojiData = {
  "😄": "😄 You're smiling happily.",
  "😢": "😢 You're sad because something bad happened.",
  "😱": "😱 You’re extremely shocked or scared.",
  "😡": "😡 You're angry and frustrated.",
  "🤔": "🤔 You're deep in thought, thinking carefully.",
  "😴": "😴 You're sleepy or bored.",
  "😁": "😁 You're excited and showing all your teeth.",
  "😎": "😎 You're feeling cool and confident.",
  "🥳": "🥳 You're celebrating something fun!",
  "😇": "😇 You feel innocent or did something kind.",
  "😭": "😭 You're crying loudly and deeply upset.",
  "😬": "😬 You're awkward or nervous about something."
};

let randomEmoji = '';
let score = 0;
let maxRounds = 10;
let roundsPlayed = 0;
let countdown;
let timeLeft = 10;

function startGame() {
  if (roundsPlayed >= maxRounds) {
    alert(`Game Over! Your final score is ${score} out of ${maxRounds}.`);
    resetGame();
    return;
  }

  roundsPlayed++;
  startTimer();

  const emojis = Object.keys(emojiData);
  const randomIndex = Math.floor(Math.random() * emojis.length);
  randomEmoji = emojis[randomIndex];

  document.getElementById("mypargrap").textContent =
    "Guess the emoji for this clue: " + emojiData[randomEmoji].slice(2);

  document.getElementById("result").textContent = '';
  document.getElementById("scoreDisplay").textContent =
    `Score: ${score} | Round: ${roundsPlayed}/${maxRounds}`;
}

function checkAnswer(userpick) {
  if (!randomEmoji) return;

  const userClue = emojiData[userpick];
  let resultText = "";

  if (userpick === randomEmoji) {
    score++;
    resultText = `✅ Correct! That emoji means: "${userClue}"`;
  } else {
    const correctClue = emojiData[randomEmoji];
    resultText = `❌ Wrong! You picked: "${userClue}". Correct answer was: "${randomEmoji}" → ${correctClue}`;
  }

  document.getElementById("result").textContent = resultText;
  document.getElementById("scoreDisplay").textContent =
    `Score: ${score} | Round: ${roundsPlayed}/${maxRounds}`;

  clearInterval(countdown);

  if (roundsPlayed >= maxRounds) {
    setTimeout(() => {
      alert(`Game Over! Your final score is ${score} out of ${maxRounds}.`);
      resetGame();
    }, 1500);
  } else {
    setTimeout(startGame, 2000);
  }
}

function startTimer() {
  timeLeft = 10;
  document.getElementById("timer").textContent = "⏳ Time Left: " + timeLeft;

  countdown = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = "⏳ Time Left: " + timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      document.getElementById("timer").textContent = "⏰ Time’s up!";

      if (roundsPlayed >= maxRounds) {
        alert(`Game Over! Your final score is ${score} out of ${maxRounds}.`);
        resetGame();
      } else {
        setTimeout(startGame, 1500);
      }
    }
  }, 1000);
}

function resetGame() {
  score = 0;
  roundsPlayed = 0;
  randomEmoji = '';
  clearInterval(countdown);

  document.getElementById("mypargrap").textContent = "Click Start to play!";
  document.getElementById("result").textContent = '';
  document.getElementById("timer").textContent = "⏳ Time Left: 10";
  document.getElementById("scoreDisplay").textContent =
    "Score: 0 | Round: 0/" + maxRounds;
}
