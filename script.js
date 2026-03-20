const startScreen = document.querySelector("#start-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");
const startButton = document.querySelector("#start-btn");
const questionText = document.querySelector("#question-text");
const answersContainer = document.querySelector("#answers-container");
const currentQuestionSpan = document.querySelector("#currentQuestion");
const totalQuestionSpan = document.querySelector("#total-questions");
const scoreSpan = document.querySelector("#score");
const finalScoreSpan = document.querySelector("#final-score");
const maxScoreSpan = document.querySelector("#max-score");
const resultMessage = document.querySelector("#result-message");
const restartButton = document.querySelector("#restart-btn");
const progressBar = document.querySelector("#progress");

const quizQuestions = [
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Indian Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
      { text: "Atlantic Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
    ],
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: [
      { text: "Charles Dickens", correct: false },
      { text: "William Shakespeare", correct: true },
      { text: "Mark Twain", correct: false },
      { text: "Jane Austen", correct: false },
    ],
  },
  {
    question: "Which country is home to the Great Pyramid of Giza?",
    answers: [
      { text: "Mexico", correct: false },
      { text: "Peru", correct: false },
      { text: "Egypt", correct: true },
      { text: "India", correct: false },
    ],
  },
  {
    question: "What is the boiling point of water at sea level?",
    answers: [
      { text: "90°C", correct: false },
      { text: "80°C", correct: false },
      { text: "100°C", correct: true },
      { text: "120°C", correct: false },
    ],
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Carbon Dioxide", correct: true },
      { text: "Nitrogen", correct: false },
      { text: "Hydrogen", correct: false },
    ],
  },
];


let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;
startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score;

  startScreen.classList.remove('active');
  quizScreen.classList.add('active');
  showQuestion();
}

function showQuestion(){
  answerDisabled = false;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;

  progressBar.style.width = progressPercent + '%';

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = '';

  currentQuestion.answers.forEach(answer =>{
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('answer-btn');
    button.dataset.correct = answer.correct;

    button.addEventListener('click', selectAnswer);
    answersContainer.appendChild(button);

  });
}

function selectAnswer(event){
  if(answerDisabled) return

  answerDisabled = true;
  const selectedButton = event.target
  const isCorrect = selectedButton.dataset.correct === 'true';

  Array.from(answersContainer.children).forEach(button => {
    if(button.dataset.correct === 'true'){
      button.classList.add('correct');
    } else if(button === selectedButton){
      button.classList.add('incorrect');
    }
  });

  if(isCorrect){
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
   currentQuestionIndex++;
   
   if(currentQuestionIndex < quizQuestions.length){
    showQuestion();
   } else {
    showResult();
   }
  }, 1000);
};

function showResult() {
  quizScreen.classList.remove('active');
  resultScreen.classList.add('active');

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if(percentage === 100){
    resultMessage.textContent = "Perfect! You're a genius!"
  } else if(percentage >= 80){
    resultMessage.textContent = "Good job! You know your stuff!";
  } else if(percentage >= 60){
    resultMessage.textContent = "Good effort! Keep leaning!"
  } else if(percentage >= 40){
    resultMessage.textContent = "Not bad! Try again to improve!"
  } else{
    resultMessage.textContent = "Keep studying! You'll get better!"
  }
};

function restartQuiz(){
  resultScreen.classList.remove('active');
  startQuiz();
}

