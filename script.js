// script.js

document.addEventListener('DOMContentLoaded', function() {
    const calendarGrid = document.querySelector('.calendar-grid');
    const modal = document.getElementById('workoutModal');
    const closeModal = document.querySelector('.close');
    const workoutForm = document.getElementById('workoutForm');
    let selectedDayElement; // Variable to keep track of the selected day element

    // Create calendar days
    for (let day = 1; day <= 31; day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.classList.add('calendar-day');
        dayElement.classList.add('no-workout');

        // Show modal when day is clicked
        dayElement.addEventListener('click', () => {
            modal.style.display = "block"; // Show modal
            selectedDayElement = dayElement; // Store selected day element
        });

        calendarGrid.appendChild(dayElement);
    }

    // Close the modal when the user clicks on <span> (x)
    closeModal.onclick = function() {
        modal.style.display = "none";
    }

    // Close the modal when the user clicks anywhere outside of the modal
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    // Log workout on form submit
    workoutForm.onsubmit = function(event) {
        event.preventDefault(); // Prevent form submission

        // Get the selected body parts
        const checkedBodyParts = Array.from(document.querySelectorAll('input[name="bodyPart"]:checked'))
                                      .map(input => input.value);

        // Update the selected day element with the logged workout
        if (checkedBodyParts.length > 0) {
            selectedDayElement.classList.add('has-workout');
            selectedDayElement.classList.remove('no-workout'); // Change the color to green
            selectedDayElement.textContent = `${selectedDayElement.textContent}: ${checkedBodyParts.join(', ')}`;
        }

        modal.style.display = "none"; // Close modal
        workoutForm.reset(); // Reset form
    }
});
