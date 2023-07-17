const questions = [{
        question: "Which is worlds largest animal?",
        answer: [
            { Text: "Shark", correct: false },
            { Text: "Elephant", correct: true },
            { Text: "Dog", correct: false },
            { Text: "Cat", correct: false },
        ]

    },
    {
        question: "Which planet is closest to the Sun?",
        answer: [
            { Text: "Earth", correct: false },
            { Text: "Mercury", correct: true },
            { Text: "Moon", correct: false },
            { Text: "Mars", correct: false },
        ]

    },
    {
        question: "Which day is celebrated as Environment Day?",
        answer: [
            { Text: "5 June", correct: true },
            { Text: "8 May", correct: false },
            { Text: "12 Aug", correct: false },
            { Text: "20 Jan", correct: false },
        ]

    }
]


const questionElemnet = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQIndex = 0;
let score = 0;

function startQuiz() {
    currentQIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuesstion();
}

function showQuesstion() {
    resetState();
    let currentQuestion = questions[currentQIndex];
    let questionNo = currentQIndex + 1;
    questionElemnet.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);

    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);

    }

}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElemnet.innerHTML = `You scored ${ score } out of ${ questions.length } questions!`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextbtn() {
    currentQIndex++;
    if (currentQIndex < questions.length) {
        showQuesstion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQIndex < questions.length) {
        handleNextbtn();
    } else {
        startQuiz();
    }
});
startQuiz();