document.addEventListener('DOMContentLoaded', function () {
    const buttonYes = document.querySelector('.button_yes');
    const buttonNo = document.querySelector('.button_no');
    const submit = document.querySelector('.submit-button');
    const content = document.querySelector('.content');
    const form = document.getElementById('question-form');
    const warning = document.querySelector('.warning');
    const receipt = document.querySelector('.receipt');
    const noER = document.querySelector('.no-ER');
    const questions = document.querySelectorAll('.question-container');
    const summaryContent = document.getElementById('summary-content');
    const geminiResult = document.getElementById('gemini-result');
    let currentQuestionIndex = 0;

    const answers = {};

    function showQuestion(index) {
        questions.forEach((question, i) => {
            question.style.display = (i === index) ? 'block' : 'none';
        });
    }

    function goNext(event) {
        event.preventDefault();
        const currentQuestion = questions[currentQuestionIndex];
        const input = currentQuestion.querySelector('input');
        if (input && !input.value.trim()) {
            alert('Please fill out this field before proceeding.');
            return;
        }

        if (currentQuestionIndex < questions.length - 1) {
            // Save the answer
            if (input) {
                answers[input.name] = input.value;
            }

            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);

            // Update the summary
            updateSummary();
        } else if (currentQuestionIndex === questions.length - 1) {
            // Save the final answer
            if (input) {
                answers[input.name] = input.value;
            }

            // Update the summary and show it
            updateSummary();
            document.querySelector('#question-submit').style.display = 'block';
        }
    }

    function goBack(event) {
        event.preventDefault();
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);

            // Update the summary
            updateSummary();
        } else {
            // If currentQuestionIndex is 0, redirect to index.html
            window.location.href = 'index.html';
        }
    }

    function updateSummary() {
        summaryContent.innerHTML = ''; // Clear previous summary content
        Object.entries(answers).forEach(([key, value]) => {
            const formattedKey = key.replace(/_/g, ' ')
                .replace(/\b\w/g, c => c.toUpperCase());
            summaryContent.innerHTML += `<p><strong>${formattedKey}:</strong> ${value}</p>`;
        });
    }

    function handleInputChange(event) {
        answers[event.target.name] = event.target.value;
        updateSummary(); // Update summary immediately when input changes
    }

    buttonYes.addEventListener('click', function () {
        content.style.display = 'none';
        form.style.display = 'block';
        showQuestion(currentQuestionIndex);
    });

    buttonNo.addEventListener('click', function () {
        content.style.display = 'none';
        warning.style.display = 'block';
    });

    // Attach event listeners to the buttons
    document.querySelectorAll('.next-button').forEach(button => {
        button.addEventListener('click', function (event) {
            goNext(event);
        });
    });

    document.querySelector('.proceed-button').addEventListener('click', function (event) {
        proceed(event);
    });

    function proceed(event) {
        event.preventDefault();

        form.style.display = 'none';
        noER.style.display = 'none';
        receipt.style.display = 'block';
    }

    document.querySelector('.home-button').addEventListener('click', function () {
        window.location.href = 'index.html';
    });



    document.querySelectorAll('.back-button').forEach(button => {
        button.addEventListener('click', function (event) {
            goBack(event);
        });
    });

    // Initially show the first question
    showQuestion(currentQuestionIndex);

    // On submit, send data to backend and display evaluation
    submit.addEventListener('click', async function (e) {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:3000/evaluate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(answers)
            });
    
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("data before");
            console.log(`Evaluation: '${data.evaluation}'`);
            console.log(`Length: ${data.evaluation.length}`);
            console.log("data after");
    
            if (!data.evaluation) {
                throw new Error('No evaluation returned.');
            }
    
            // Normalize the evaluation string
            const evalClean = data.evaluation.toLowerCase().trim();
            console.log(`Clean Evaluation: '${evalClean}'`);
    
            if (evalClean.startsWith('no')) {
                console.log('no');
                form.style.display = 'none';
                noER.style.display = 'block';
            } else if (evalClean.startsWith('yes')) {
                console.log('yes');
                form.style.display = 'none';
                receipt.style.display = 'block';
            } else {
                throw new Error(`Unexpected evaluation value: '${data.evaluation}'`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error processing your response. Please try again.');
        }
    });
    document.querySelector('.accept').addEventListener('click', function () {
        warning.style.display = 'none';
        form.style.display = 'block';
        showQuestion(currentQuestionIndex);
    });

    form.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            goNext(event);
        }
    });

    form.addEventListener('change', handleInputChange);
});