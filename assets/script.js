const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const timeEl = document.querySelector(".time");
const mainEl = document.getElementById("main");



let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "What does CSS stand for?",
    choice1: 'Cascading Style Sheets',
    choice2: 'Coconut Sweet Sauce',
    choice3: 'Camera Science Seminary',
    choice4: 'none of the above',

    answer: 1,
    },
    {
        question: "Which one is a primitive type in Javascript?",
    choice1: "Number",
    choice2: "Boolean",
    choice3: "String",
    choice4: "All of the above",

    answer : 4,
    },
    {
        question: "What is to refactor code",
    choice1: "Sending back your code to the factory",
    choice2: "The procees of restructuring existing code",
    choice3: "To factor all of the client needs into the code",
    choice4: "factorizing all the mathemathical elements",

    answer: 2,
    },
    {
        question: "Which is a Front End Language?",
    choice1: "JAVA",
    choice2: "HTML",
    choice3: "Python",
    choice4: "PHP",

    answer: 2,
    }
]




const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0 
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/assets/end.html')

    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question 

    choices.forEach(choice => {
        const number = choice.dataset["number"]
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset["number"]

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
           
         selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    }) 
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
 
}

let sec = 60;
let time = setInterval(myTimer, 1000);

function myTimer() {
    document.getElementById('timer').innerHTML = sec + " sec left";
    sec--;
    if (sec == 0) {
        clearInterval(time);
        prompt("Time out!! :(");
        return window.location.assign('/assets/end.html')
    }
}


startGame()
