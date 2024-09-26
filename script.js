const fetchQuestionBtn = document.getElementById('fetchQuestionBtn');
const questionDiv = document.getElementById('question');
const answersDiv = document.getElementById('answers');
const scoreDiv = document.getElementById('score');

let score = 0;

// Function to fetch trivia questions
async function fetchTriviaQuestion() {
    const url = 'https://opentdb.com/api.php?amount=1&type=multiple';
    const response = await fetch(url);
    const data = await response.json();
    displayQuestion(data.results[0]);
}

// Function to display the question and answers
function displayQuestion(data) {
    questionDiv.innerHTML = data.question;
    const answers = [...data.incorrect_answers, data.correct_answer];
    
    // Shuffle answers
    const shuffledAnswers = answers.sort(() => Math.random() - 0.5);
    
    answersDiv.innerHTML = '';
    shuffledAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.onclick = () => checkAnswer(answer, data.correct_answer);
        answersDiv.appendChild(button);
    });
}

// Function to check the answer and update the score
function checkAnswer(selected, correct) {
    if (selected === correct) {
        score++;
    } else {
        score--;
    }
    scoreDiv.textContent = `Score: ${score}`;
    fetchTriviaQuestion(); // Fetch a new question
}

// Event listener for button click
fetchQuestionBtn.addEventListener('click', fetchTriviaQuestion);