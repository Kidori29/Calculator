let display = document.getElementById('display');
let currentInput = '0';
let shouldResetDisplay = false;

function updateDisplay() {
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = '0';
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function appendToDisplay(value) {
    if (shouldResetDisplay) {
        currentInput = '0';
        shouldResetDisplay = false;
    }

    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function calculate() {
    try {
        // Thay thế × bằng * để tính toán
        let expression = currentInput.replace(/×/g, '*');
        let result = eval(expression);
        
        // Kiểm tra kết quả hợp lệ
        if (isNaN(result) || !isFinite(result)) {
            currentInput = 'Lỗi';
        } else {
            currentInput = result.toString();
        }
        shouldResetDisplay = true;
    } catch (error) {
        currentInput = 'Lỗi';
        shouldResetDisplay = true;
    }
    updateDisplay();
}

// Hỗ trợ bàn phím
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9' || key === '.') {
        appendToDisplay(key);
    } else if (key === '+' || key === '-' || key === '/' || key === '*') {
        appendToDisplay(key === '*' ? '×' : key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});