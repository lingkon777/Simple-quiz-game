const allQuestions = [
    { question: "1 + 1 =", answers: [{text:"1", correct:false},{text:"2", correct:true},{text:"3", correct:false},{text:"4", correct:false}] },
    { question: "2 + 10 =", answers: [{text:"12", correct:true},{text:"14", correct:false},{text:"15", correct:false},{text:"13", correct:false}] },
    { question: "20 + 5 =", answers: [{text:"25", correct:true},{text:"24", correct:false},{text:"30", correct:false},{text:"26", correct:false}] },
    { question: "5 + 7 =", answers: [{text:"12", correct:true},{text:"10", correct:false},{text:"11", correct:false},{text:"13", correct:false}] },
    { question: "3 + 9 =", answers: [{text:"11", correct:false},{text:"12", correct:true},{text:"13", correct:false},{text:"10", correct:false}] },
    { question: "8 + 6 =", answers: [{text:"13", correct:false},{text:"14", correct:true},{text:"12", correct:false},{text:"15", correct:false}] },
    { question: "Which is the largest animal in the world?", answers: [{text:"Shark", correct:false},{text:"Blue Whale", correct:true},{text:"Elephant", correct:false},{text:"Giraffe", correct:false}] },
    { question: "Which is the smallest continent in the world?", answers: [{text:"Asia", correct:false},{text:"Australia", correct:true},{text:"Arctic", correct:false},{text:"Africa", correct:false}] },
    { question: "Which is the largest desert in the world?", answers: [{text:"Kalahari", correct:false},{text:"Gobi", correct:false},{text:"Sahara", correct:false},{text:"Antarctica", correct:true}] },
    { question: "National fruit of Bangladesh?", answers: [{text:"Jackfruit", correct:true},{text:"Mango", correct:false},{text:"Java Plum", correct:false},{text:"Banana", correct:false}] }
];

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

function getRandomQuestions(allQs, count=4){
    const shuffled = allQs.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function startQuiz(){
    questions = getRandomQuestions(allQuestions, 4);
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) button.dataset.correct = "true";
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect) selectedBtn.classList.add("correct");
    else selectedBtn.classList.add("incorrect");
    if(isCorrect) score++;
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct == "true") button.classList.add("correct");
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) showQuestion();
    else showScore();
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length) handleNextButton();
    else startQuiz();
});

startQuiz();