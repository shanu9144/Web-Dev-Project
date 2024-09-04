let Questions = [];
let questag = document.getElementById("ques");

async function fetchQuestions() {
    try {
        const resp = await fetch("https://opentdb.com/api.php?amount=10");
        if (!resp.ok) {
            throw new Error("Something went wrong");
        }

        const data = await resp.json();
        Questions = data.results;

        // Load the first question once questions are fetched
        if (Questions.length > 0) {
            loadQues();
        } else {
            questag.innerHTML = `<h5 style ="background-color:red">No Questions Found</h5>`;
        }

    } catch (error) {
        console.error(error);
        questag.innerHTML = `<h5 style ="background-color:red">${error.message}</h5>`;
    }
}

let currentQuestion = 0;
let score = 0;

function loadQues() {
    const opt = document.getElementById("opt");

    let currQuesText = Questions[currentQuestion].question;
    ques.innerHTML = currQuesText;

    opt.innerHTML = ""; // Clear previous options
    const correctAnswer = Questions[currentQuestion].correct_answer;
    const incorrectAnswers = Questions[currentQuestion].incorrect_answers;

    const options = [correctAnswer, ...incorrectAnswers];
    options.sort(() => Math.random() - 0.5); // Shuffle the options

    options.forEach((option, idx) => {
        const opnDiv = document.createElement("div");
        const optionTag = document.createElement("input");
        const labelTag = document.createElement("label");

        optionTag.type = 'radio';
        optionTag.name = 'answer';
        optionTag.id = `option${idx}`;
        optionTag.value = option;

        labelTag.textContent = option;
        labelTag.htmlFor = `option${idx}`;

        opnDiv.appendChild(optionTag);
        opnDiv.appendChild(labelTag);

        opt.appendChild(opnDiv);
    });
}

setTimeout(() => {
    loadQues();
    if (Questions.length === 0) {
        questag.innerHTML = `<h5 style ="color:red"> Unable to fetch data  ,Please try again!!</h5>`
    }
    else{
        loadQues();
    }
}, 2000)

// function handleSubmit() {
//     const selectedAns = document.querySelector('input[name="answer"]:checked');
//     if (!selectedAns) {
//         alert("Please select an answer!");
//         return;
//     }

//     checkAnswer(selectedAns.value);
// }

function checkAnswer(selectedValue) {
    if (selectedValue === Questions[currentQuestion].correct_answer) {
        score++;
    }
    nextQuestion();
}

function nextQuestion() {
    if (currentQuestion < Questions.length - 1) {
        currentQuestion++;
        loadQues();
    } else {
        document.getElementById("opt").remove();
        document.getElementById("ques").remove();
        document.getElementById("btn").remove();
        showTotal();
    }
}

function showTotal() {
    const totalScore = document.getElementById('score');
    totalScore.innerHTML = `<h3>Your Score: ${score}/${Questions.length}</h3>`;

    Questions.forEach((ques, idx) => {
        totalScore.innerHTML += `<p>${idx + 1}: ${ques.correct_answer}</p>`;
    });
}

// document.getElementById("btn").addEventListener("click", handleSubmit);

fetchQuestions();
