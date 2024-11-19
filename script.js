const mainBox = document.getElementById("main-container");
const startButton = document.getElementById("startbutton");
const questionBox = document.getElementById("Question-box");
const nextButton = document.getElementById("nextbutton");
const scoreBox = document.getElementById("scorebox");
const restartButton = document.getElementById("restartbutton");
const question = questionBox.querySelector("h1");
const options = questionBox.querySelectorAll("button");

// Array of Question objects.
const questionList = [
  {
    "The country which has highest population in the world": [
      "China",
      "japan",
      "America",
      "India",
    ],
  },
  {
    "What is the smallest country in the world by area?": [
      "Monaco",
      "Vatican City",
      "Maldives",
      "San Marino",
    ],
  },
  {
    "Which is the largest planet in the solar system?": [
      "Neptune",
      "Saturn",
      "Pluto",
      "Jupiter",
    ],
  },
  {
    "Who was the first President of the United States?": [
      "Abraham Lincoln",
      "George Washington",
      "Thomas Jefferson",
      "John Adams",
    ],
  },
  {
    "Who painted the Mona Lisa?": [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Claude Monet",
    ],
  },
];
// Answers of questions
const answers = [
  "China",
  "Vatican City",
  "Jupiter",
  "George Washington",
  "Leonardo da Vinci",
];

// variable to track Question List to Load
let questionListIndex = 0;

// function to load questions
function loadQuestion() {
  if (questionListIndex == questionList.length) {
    return;
  }
  // questionList[questionListIndex] : it is object with one key:value pair.
  for (let i in questionList[questionListIndex]) {
    question.innerText = i;
    let optionIndex = 0;
    // questionList[questionListIndex][i] : it is an Array.
    for (let k of questionList[questionListIndex][i]) {
      options[optionIndex].innerText = k;
      optionIndex++;
    }
  }
}

// event listener to START BUTTON
startButton.addEventListener("click", () => {
  startButton.classList.add("hidden");
  loadQuestion();

  questionBox.classList.remove("hidden");
  questionBox.classList.add(
    "flex",
    "flex-col",
    "justify-center",
    "items-center"
  );
});

// Add Event to each Option or Button.
options.forEach((option) => {
  option.addEventListener("click", () => {
    checkAnswer(option);
    disableButton();
    nextButton.classList.remove("hidden");
  });
});

// variable to track score Value
let score = 0;

// variable to track answers array
let answersIndex = 0;
// function to Check Answer
function checkAnswer(option) {
  // prevents exceeding array index.
  if (answersIndex == answers.length) {
    return;
  }

  if (option.innerText == answers[answersIndex]) {
    option.style.backgroundColor = "#00c853";

    score = score + 1;
  }
  if (option.innerText != answers[answersIndex]) {
    option.style.backgroundColor = "red";
  }
}

// Add event on Next Button
nextButton.addEventListener("click", () => {
  questionListIndex++;
  answersIndex++;
  showScore();
  enableButton();
  loadQuestion();
  removeBg();
  nextButton.classList.add("hidden");
});

// function to disable all options i.e buttons
function disableButton() {
  options.forEach((btn) => {
    btn.disabled = true;
  });
}

// Enable Button function
function enableButton() {
  options.forEach((btn) => {
    btn.disabled = false;
  });
}

// function to remove applied bg
function removeBg() {
  options.forEach((btn) => {
    btn.style.backgroundColor = "#4F5C70";
  });
}

// function to Show Score
function showScore() {
  if (answersIndex == answers.length) {
    questionBox.classList.remove(
      "flex",
      "flex-col",
      "justify-center",
      "items-center"
    );
    questionBox.classList.add("hidden");
    nextButton.classList.add("hidden");
    scoreBox.classList.remove("hidden");
    scoreBox.firstElementChild.innerText = `You Scored ${score} out of ${answers.length}`;
    restartButton.classList.remove("hidden");
  }
}

// Restart Function to reload page
restartButton.addEventListener("click", () => {
  window.location.reload();
});
