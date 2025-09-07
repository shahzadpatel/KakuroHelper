# Kakuro Helper

Kakuro Helper is a simple web application designed to assist Kakuro puzzle enthusiasts. It allows users to calculate combinations of numbers based on a given sum, partition length, inclusion, and exclusion constraints. The application also supports a light and dark mode toggle for better usability.

---

## Features

- **Sum Combinations**: Calculate combinations of numbers that meet specific sum and length criteria.
- **Constraints**:
  - Include specific numbers in the result.
  - Exclude specific numbers from the result.
- **Light and Dark Mode**: Switch between light and dark themes for a comfortable user experience.
- **Responsive Design**: Works seamlessly across devices with different screen sizes.

---

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Styling**: CSS with support for CSS variables for dynamic theming
- **Backend**: Python3
- **Framework/Library**: Flask

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shahzadpatel/KakuroHelper
   cd KakuroHelper/root/backend
   ```
2. Execute the below command in the above location: 
   
   **Note:** In some scenarios, you may need to run the application from a virtual environemnt. If so, first activate the environemnt using:
   ```bash
   source venv/bin/activate
   ```
   Then run:
   ```bash
   python3 app.py
   ```

2. Open the `index.html` file in your browser:
   ```bash
   open index.html
   ```

---

## Usage

1. **Enter Input Values**:
   - **Sum Value**: Enter the target sum.
   - **Length of Partitions**: Specify the number of digits to include in each combination.
   - **Inclusion Numbers**: Provide numbers that must appear in the combinations (comma-separated).
   - **Exclusion Numbers**: Provide numbers to exclude from the combinations (comma-separated).

2. **Get Combinations**:
   - Click the "Get Combinations" button to calculate and display the results.

3. **Toggle Themes**:
   - Click the "Switch to Dark Mode" button to enable dark mode or "Switch to Light Mode" to revert to light mode.

---

## Future Enhancements

- Add support for multiple themes.
- Reduce the API calls by sending all available combinations to the frontend and filter the exclusion/inclusion numbers without making API calls for them
- Enhance the UI
- Make the application into a mobile app

---

## Author

- **Your Name**  
  GitHub: [Shahzad Patel](https://github.com/shahzadpatel)

---

Feel free to fork this repository and contribute! 🎉
