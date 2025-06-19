document.addEventListener('DOMContentLoaded', () => {
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const resultArea = document.getElementById('result-area');
    const resultText = document.getElementById('result-text');
    const restartButton = document.getElementById('restart-button');
    const container = document.querySelector('.container');

    let currentQuestionId = 'isMeaty';
    const answers = {}; // Store user answers

    const questions = {
        'isMeaty': {
            text: 'Is the dish meaty?',
            options: [
                { text: 'Yes', next: 'isSpicyMeaty' },
                { text: 'No', next: 'isVegetable' }
            ]
        },
        'isSpicyMeaty': {
            text: 'Is the meaty dish spicy?',
            options: [
                { text: 'Yes', next: 'suggestSpicyBeefCurry' },
                { text: 'No', next: 'isSweetMeaty' }
            ]
        },
        'isSweetMeaty': {
            text: 'Is the meaty dish sweet?',
            options: [
                { text: 'Yes', next: 'suggestHoneyGlazedChicken' },
                { text: 'No', next: 'suggestGrilledSteak' }
            ]
        },
        'isVegetable': {
            text: 'Is it vegetable-based?',
            options: [
                { text: 'Yes', next: 'isSpicyVegetable' },
                { text: 'No', next: 'isVegan' } // If not meaty and not vegetable, assume vegan path
            ]
        },
        'isSpicyVegetable': {
            text: 'Is the vegetable dish spicy?',
            options: [
                { text: 'Yes', next: 'suggestSpicyStirFriedBroccoli' },
                { text: 'No', next: 'isSweetVegetable' }
            ]
        },
        'isSweetVegetable': {
            text: 'Is the vegetable dish sweet?',
            options: [
                { text: 'Yes', next: 'suggestMapleRoastedCarrots' },
                { text: 'No', next: 'suggestGrilledVegSkewers' }
            ]
        },
        'isVegan': {
            text: 'Is the dish vegan?',
            options: [
                { text: 'Yes', next: 'isSpicyVegan' },
                { text: 'No', next: 'errorNoSuggestion' } // Handle case where no suitable path
            ]
        },
        'isSpicyVegan': {
            text: 'Is the vegan dish spicy?',
            options: [
                { text: 'Yes', next: 'suggestVeganChili' },
                { text: 'No', next: 'isSweetVegan' }
            ]
        },
        'isSweetVegan': {
            text: 'Is the vegan dish sweet?',
            options: [
                { text: 'Yes', next: 'suggestVeganChocolateMousse' },
                { text: 'No', next: 'suggestVeganBuddhaBowl' }
            ]
        },
        // Meal suggestions (these act as "end" states for questions)
        'suggestSpicyBeefCurry': { text: 'Spicy Beef Curry', type: 'suggestion' },
        'suggestHoneyGlazedChicken': { text: 'Honey Glazed Chicken', type: 'suggestion' },
        'suggestGrilledSteak': { text: 'Grilled Steak', type: 'suggestion' },
        'suggestSpicyStirFriedBroccoli': { text: 'Spicy Stir-Fried Broccoli', type: 'suggestion' },
        'suggestMapleRoastedCarrots': { text: 'Maple Roasted Carrots', type: 'suggestion' },
        'suggestGrilledVegSkewers': { text: 'Grilled Veg Skewers', type: 'suggestion' },
        'suggestVeganChili': { text: 'Vegan Chili', type: 'suggestion' },
        'suggestVeganChocolateMousse': { text: 'Vegan Chocolate Mousse', type: 'suggestion' },
        'suggestVeganBuddhaBowl': { text: 'Vegan Buddha Bowl', type: 'suggestion' },
        'errorNoSuggestion': { text: 'Sorry, we could not find a suggestion based on your choices. Please try again.', type: 'suggestion' }
    };

    function displayQuestion(questionId) {
        // Clear previous options
        optionsContainer.innerHTML = '';
        questionText.textContent = '';
        resultArea.classList.add('hidden');
        container.classList.remove('animate'); // Reset animation

        const q = questions[questionId];

        if (!q) {
            console.error('Question ID not found:', questionId);
            displayResult('An error occurred. Please restart.');
            return;
        }

        if (q.type === 'suggestion') {
            displayResult(`Your meal suggestion is: ${q.text}`);
            return;
        }

        questionText.textContent = q.text;
        q.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option.text;
            button.classList.add('option-button');
            button.addEventListener('click', () => {
                handleAnswer(option.text, option.next);
                // Visual feedback: Add a class to indicate selection
                Array.from(optionsContainer.children).forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
            });
            optionsContainer.appendChild(button);
        });

        // Add bounce-in animation when a new question appears
        setTimeout(() => {
            container.classList.add('animate');
        }, 50); // Small delay to ensure display before animation
    }

    function handleAnswer(answerText, nextQuestionId) {
        answers[currentQuestionId] = answerText; // Store the answer
        currentQuestionId = nextQuestionId;
        displayQuestion(currentQuestionId);
    }

    function displayResult(message) {
        questionText.textContent = '';
        optionsContainer.innerHTML = '';
        resultText.textContent = message;
        resultArea.classList.remove('hidden');
        container.classList.add('animate'); // Animate result display
    }

    function restartApp() {
        currentQuestionId = 'isMeaty';
        for (const key in answers) {
            delete answers[key];
        }
        displayQuestion(currentQuestionId);
    }

    restartButton.addEventListener('click', restartApp);

    // Initial display
    displayQuestion(currentQuestionId);
});

