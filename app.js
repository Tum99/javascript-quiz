//DOM Elements
const progressFill = document.getElementById("progress-fill");
const questionCount = document.getElementById("question-count");
const question = document.getElementById("question");
const answerButtons = document.getElementById("answers-buttons");
const nextButton = document.getElementById("next-button");

//Quiz Questions
const questions = [
    {
        question: "Which keyword creates a variable that can be reassigned?",
        answers: [
            {text: 'const', correct: false},
            {text: 'let', correct: true},
            {text: 'function', correct: false},
            {text: 'return', correct: false}
        ]
    },

    {
        question: "Which method selects an HTML element using its ID?",
        answers: [
            {text: 'querySelectorAll()', correct: false},
            {text: 'createElement()', correct: false},
            {text: 'getElementById()', correct: true},
            {text: 'appendChild()', correct: false}
        ]
    },

    {
        question: "Which datatype stores multiple values togrther?",
        answers: [
            {text: 'String', correct: false},
            {text: 'Boolean', correct: false},
            {text: 'Number', correct: false},
            {text: 'Array', correct: true}
        ]
    },

    {
        question: "Which method adds a child element to a parent element?",
        answers: [
            {text: 'appendChild()', correct: true},
            {text: 'createElement()', correct: false},
            {text: 'getElementById()', correct: false},
            {text: 'textContent', correct: false}
        ]
    },

    {
        question: "Which JavaScript feature allows us to write reusable blocks of code?",
        answers: [
            {text: 'Array', correct: false},
            {text: 'Function', correct: true},
            {text: 'Boolean', correct: false},
            {text: 'Variable', correct: false}
        ]
    }

]

//Quiz State
let currentQuestionIndex = 0;
let score = 0;
let quizComplete = false;

//Display The Question
function displayQuestion() {
    //Remove the previous answer buttons
    answerButtons.textContent = "";

    //Get the current question from the questions array
    const currentQuestion = questions[currentQuestionIndex];

    //Convert array index into user-friendly question numbers
    const currentQuestionNumber = currentQuestionIndex + 1;
    
    //Get total number of questions
    const totalQuestions = questions.length;

    //Display the current question
    question.textContent = currentQuestion.question;

    //Create question count message
    const questionCountMessage = 'Question ' + currentQuestionNumber + ' of ' + totalQuestions;

    //Display the question count message
    questionCount.textContent = questionCountMessage;

    //Divide the current question number by the total number of questions
    const progressDecimal = currentQuestionNumber / totalQuestions;

    //Convert decimal to percentage
    const progressPercentage = progressDecimal * 100;

    //Add css percentage symbol
    const progressWidth = progressPercentage + '%';

    //Apply the width to progress using JS to create CSS
    progressFill.style.width = progressWidth;

    //Loop through answers for the current question
    for (let i = 0; i < currentQuestion.answers.length; i++) {
        //Get current answer from the answers array
        const currentAnswer = currentQuestion.answers[i];

        //Create a new answer button
        const answerButton = document.createElement("button");

        //Add answer text to the button
        answerButton.textContent = currentAnswer.text;

        //Add the CSS class to the button
        answerButton.classList.add("answer-button");

        //Run the checkAnswer function when the button is clicked
        answerButton.addEventListener('click', function(){

            checkAnswer(currentAnswer, answerButton);

        })

        //Add the buttons to the answer-buttons container
        answerButtons.appendChild(answerButton);

    }

}

//Check Answer Function
function checkAnswer(selectedAnswer, selectedButton) {
    //Check if selected answer is correct
    if (selectedAnswer.correct === true) {
        //Change the selevted button to green
        selectedButton.classList.add("correct");

        //increase score by one
        score = score + 1;
    }else {
        //Change the selected button to red
        selectedButton.classList.add("incorrect");
    }

    //Get all answer buttons currently displayed
    const displayedAnswerButtons = answerButtons.children;

    //Get the current question
    const currentQuestion = questions[currentQuestionIndex];

    //Get answers for the current question
    const currentAnswers = currentQuestion.answers;

    //loop through all displayed answer buttons
    for (let i = 0; i < displayedAnswerButtons.length; i++) {
        //Get the current displayed button
        const displayedButton = displayedAnswerButtons[i];

        //Get the answer data connected to that button
        const currentAnswer = currentAnswers[i];

        //Reveal the correct answer
        if (currentAnswer.correct === true) {
            displayedButton.classList.add("correct");
        }

        //Prevents button from being clicked again
        displayedButton.disabled = true;
    }

    nextButton.disabled = false;

}


function moveToNextQuestion() {
    //Increase question index by 1 to load the next question
    currentQuestionIndex = currentQuestionIndex + 1;

    //Disable next question button
    nextButton.disabled = true;

    //get the total number of questions
    const totalQuestions = questions.length;

    //Check if there ia a remaining questions
    const questionsRemain = currentQuestionIndex < totalQuestions;

    if (questionsRemain === true) {
        displayQuestion();
    } else {
        //Show final score screen
        console.log("Quiz Complete!");
        quizComplete = true;
        showFinalScore();
    }

}


//Show Final Score
function showFinalScore() {
    //Remove answer buttons
    answerButtons.textContent = "";

    //Get The total number of questions
    const totalQuestions = questions.length;

    //Create final score message
    const finalScoreMessage = 'You scored ' + score + ' out of ' + totalQuestions + '!';

    //Display completion message
    questionCount.textContent = "Quiz Completed"

    //display dinal score
    question.textContent = finalScoreMessage;

    //Fill progress bar to 100%
    progressFill.style.width = "100%";

    //Change next button text
    nextButton.textContent = "Restart Quiz";

    //Enable button
    nextButton.disabled = false;
}


//Restart the quiz
function restartQuiz () {
    //Reset the question index
    currentQuestionIndex = 0;

    //Reset the score
    score = 0;

    //Mark Quiz complete
    quizComplete = false;

    //Change the next button text back
    nextButton.textContent = "Next Question";

    //Disables nest button when quiz goes back to question 1
    nextButton.disabled = true;

    //Display 1st question
    displayQuestion();

}

nextButton.addEventListener("click", function(){
    //Check if quiz has been completed
    if (quizComplete === true) {
        restartQuiz();
    } else {
        moveToNextQuestion();
    }

});

displayQuestion();