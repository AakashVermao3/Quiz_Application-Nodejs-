
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('quizForm');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value; // Correctly get email
        const answers = [
            document.querySelector('input[name="question1"]:checked'),
            document.querySelector('input[name="question2"]:checked'),
            document.querySelector('input[name="question3"]:checked'),
            document.querySelector('input[name="question4"]:checked'),
            document.querySelector('input[name="question5"]:checked')
        ];

        // Validate user inputs
        if (!validateInputs(fullName, email, answers)) {
            resultDiv.textContent = "Please fill out all fields correctly.";
            resultDiv.style.color = "red";
            return;
        }

        // Ensure userAnswers is an array of selected values
        const userAnswers = answers.map(answer => answer ? answer.value : null);

        try {
            const response = await fetch('/api/quiz/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fullName, email, userAnswers }) // Correctly structure payload
            });

            const result = await response.json();
            displayResult(result.score >= 3); // Pass/fail based on score
        } catch (error) {
            console.error('Error:', error);
            resultDiv.textContent = "An error occurred while submitting the quiz.";
            resultDiv.style.color = "red";
        }
    });

    function validateInputs(fullName, email, answers) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Validate full name and email
        if (!fullName.match(/^[A-Za-z\s]+$/) || !emailPattern.test(email)) {
            return false;
        }
        // Ensure all answers are selected
        return answers.every(answer => answer !== null);
    }

    function displayResult(passed) {
        resultDiv.textContent = passed ? "You have passed this test!" : "You have failed the test.";
        resultDiv.style.color = passed ? "green" : "red";
    }
});



