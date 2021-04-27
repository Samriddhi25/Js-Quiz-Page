const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: ' Why so JavaScript and Java have similar name?',
    answers: [
      { text: "JavaScript's syntax is loosely based on Java's", correct: true },
      { text: 'JavaScript is a stripped-down version of Java', correct: false },
      { text: 'They both originated on the island of Java', correct: false },
      { text: 'None of the above', correct: false }
    ]
  },
  {
    question: 'Which type of JavaScript language is ?',
    answers: [
      { text: 'Object-Oriented', correct: false },
      { text: 'Object-Based', correct: true },
      { text: 'Assembly-language', correct: false },
      { text: 'High-level', correct: false }
    ]
  },
  {
    question: 'How does JavaScript store dates in a date object?',
    answers: [
      { text: 'The number of milliseconds since January 1st, 1970', correct: true },
      { text: 'The number of days since January 1st, 1900', correct: false },
      { text: "The number of seconds since Netscape's public stock offering.", correct: false },
      { text: 'None of the above', correct: false }
    ]
  },
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    answers: [
      { text: '<js>', correct: false },
      { text: '<scripting>', correct: false },
      { text: '<javascript>', correct: false },
      { text: '<script>', correct: true }
    ]
  }
]