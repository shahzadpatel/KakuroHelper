const form = document.getElementById('kakuroForm');
const resultGrid = document.getElementById('resultGrid');
const resultMeta = document.getElementById('resultMeta');
const errorDiv = document.getElementById('error');
const themeToggle = document.getElementById('themeToggle');
const resultsHeading = document.getElementById('resultsHeading');

// Function to toggle themes
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode'); // Toggle dark mode class
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Update button text
    themeToggle.textContent = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    
    // Optional: Save preference in localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// Apply saved theme preference on load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = 'Switch to Light Mode';
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    resultGrid.innerHTML = '';
    resultMeta.textContent = '';
    errorDiv.textContent = '';
    resultsHeading.textContent = 'Result';

    const sumValue = document.getElementById('sum_value').value;
    const length = document.getElementById('length').value;
    const inclusionNumbersInput = document.getElementById('inclusion_numbers').value.trim();
    const inclusionNumbers = inclusionNumbersInput
        ? inclusionNumbersInput.split(',').map(Number).filter(n => !isNaN(n))
        : [];

    const exclusionNumbersInput = document.getElementById('exclusion_numbers').value.trim();
    const exclusionNumbers = exclusionNumbersInput
        ? exclusionNumbersInput.split(',').map(Number).filter(n => !isNaN(n))
        : [];

    try {
        const response = await fetch('http://127.0.0.1:5000/get_combinations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sum_value: parseInt(sumValue, 10),
                length: parseInt(length, 10),
                inclusion_numbers: inclusionNumbers,
                exclusion_numbers: exclusionNumbers
            })
        });

        if (!response.ok) {
            const error = await response.json();
            errorDiv.textContent = error.error || 'Server Error 🛑';
            return;
        }

        const data = await response.json();

        // Build meta info
        const inclusionText = inclusionNumbers.length > 0 ? inclusionNumbers.join(', ') : 'NONE';
        const exclusionText = exclusionNumbers.length > 0 ? exclusionNumbers.join(', ') : 'NONE';
        resultMeta.innerHTML = `
            <p><strong>Sum:</strong> ${sumValue}</p>
            <p><strong>Split:</strong> ${length} ways</p>
            <p><strong>Including:</strong> ${inclusionText}</p>
            <p><strong>Excluding:</strong> ${exclusionText}</p>
            <p><strong>Total combinations:</strong> ${data.partitions?.length || 0}</p>
        `;

        // Populate result grid
        if (data.partitions && Array.isArray(data.partitions)) {
            resultGrid.innerHTML = data.partitions.map(partitionObj => {
                if (partitionObj.combination && partitionObj.highlighted) {
                    return `
                        <div class="result-item">
                            ${partitionObj.combination.map((num, idx) =>
                                partitionObj.highlighted[idx]
                                    ? `<span style="color: red; font-weight: bold;">${num}</span>`
                                    : num
                            ).join(' + ')}
                        </div>
                    `;
                } else if (Array.isArray(partitionObj)) {
                    return `<div class="result-item">${partitionObj.join(' + ')}</div>`;
                }
            }).join('');
        } else {
            resultGrid.innerHTML = '<p>⚠️ No Combinations Possible... ☹️</p>';
        }

    } catch (err) {
        errorDiv.textContent = 'Failed to connect to the server....';
    }
});