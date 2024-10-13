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
        dayElement.dataset.workout = ''; // Add a data attribute to store workout info

        // Show modal when day is clicked
        dayElement.addEventListener('click', () => {
            // Check if there's an existing workout
            if (dayElement.dataset.workout) {
                const existingWorkouts = dayElement.dataset.workout.split(', ');
                // Pre-select the checkboxes based on the existing workouts
                const checkboxes = document.querySelectorAll('input[name="bodyPart"]');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = existingWorkouts.includes(checkbox.value);
                });
            } else {
                // Reset checkboxes if no existing workout
                const checkboxes = document.querySelectorAll('input[name="bodyPart"]');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });
            }
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
            selectedDayElement.dataset.workout = checkedBodyParts.join(', '); // Save workout data
            selectedDayElement.textContent = `${selectedDayElement.textContent}: ${selectedDayElement.dataset.workout}`;
        } else {
            // If no body parts are selected, remove the workout
            selectedDayElement.classList.remove('has-workout');
            selectedDayElement.classList.add('no-workout');
            selectedDayElement.dataset.workout = ''; // Clear workout data
            selectedDayElement.textContent = selectedDayElement.textContent.split(':')[0]; // Reset text
        }

        modal.style.display = "none"; // Close modal
        workoutForm.reset(); // Reset form
    }
});
