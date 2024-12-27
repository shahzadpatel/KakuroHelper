const form = document.getElementById('kakuroForm');
const resultDiv = document.getElementById('result');
const errorDiv = document.getElementById('error');
const themeToggle = document.getElementById('themeToggle');

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
    resultDiv.textContent = '';
    errorDiv.textContent = '';

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
            errorDiv.textContent = error.error || 'No Combinations Possible!!! :((';
            return;
        }

        const data = await response.json();
        // resultDiv.textContent = JSON.stringify(data, null, 2);
        if (data.partitions && Array.isArray(data.partitions)) {
            const formattedPartitions = data.partitions.map(partitionObj => {
                // Check if highlighting metadata exists
                if (partitionObj.combination && partitionObj.highlighted) {
                    return partitionObj.combination
                        .map((num, idx) => 
                            partitionObj.highlighted[idx] 
                                ? `<span style="color: red; font-weight: bold;">${num}</span>` 
                                : num
                        ).join(' + ');
                } else if (Array.isArray(partitionObj)) {
                    // Fallback for cases without metadata
                    return partitionObj.join(' + ');
                }
            });
            
            resultDiv.innerHTML = formattedPartitions.join('<br>'); // Use innerHTML for rich formatting
        } else {
            resultDiv.textContent = 'No partitions found!!! :(((';
        }

    } catch (err) {
        errorDiv.textContent = 'Failed to connect to the server.';
    }
});