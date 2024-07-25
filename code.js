document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('input');
    let currentInput = '';
    let lastResult = 0;

    // Disable manual input from the keyboard
    inputField.addEventListener('keydown', (e) => {
        e.preventDefault();
    });

    function updateInput(value) {
        currentInput += value;
        inputField.value = currentInput;
    }

    function calculateResult() {
        if (!currentInput || currentInput === lastResult.toString()) {
            // Do nothing if input is empty or only contains last result
            return;
        }
        try {
            let result = eval(currentInput);
            lastResult = result;
            inputField.value = result;
            currentInput = result.toString();
        } catch (e) {
            inputField.value = 'Error';
            currentInput = '';
        }
    }

    function clearInput() {
        currentInput = '';
        inputField.value = '';
    }

    function deleteLast() {
        currentInput = currentInput.slice(0, -1);
        inputField.value = currentInput;
    }

    function addNumberEvent(button, number) {
        button.addEventListener('click', () => {
            updateInput(number);
        });
    }

    function addOperatorEvent(button, operator) {
        button.addEventListener('click', () => {
            if (operator === '-' && (currentInput === '' || currentInput.slice(-1) === '(')) {
                updateInput(operator);
            } else if (currentInput && !isNaN(currentInput.slice(-1))) {
                updateInput(operator);
            }
        });
    }

    function addAnsEvent(button) {
        button.addEventListener('click', () => {
            updateInput(lastResult.toString());
        });
    }

    document.querySelectorAll('.numbers-grid button').forEach(button => {
        const value = button.innerText;

        if (!isNaN(value)) {
            addNumberEvent(button, value);
        } else if (['+', '-', '*', '/'].includes(value)) {
            addOperatorEvent(button, value);
        } else if (value === 'Ans') {
            addAnsEvent(button);
        } else if (value === '=') {
            button.addEventListener('click', calculateResult);
        } else if (value === 'Clear') {
            button.addEventListener('click', clearInput);
        } else if (value === 'Delete') {
            button.addEventListener('click', deleteLast);
        }
    });
}); 
