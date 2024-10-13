// script.js

document.addEventListener('DOMContentLoaded', function() {
    const calendarGrid = document.querySelector('.calendar-grid');
    const modal = document.getElementById('workoutModal');
    const closeModal = document.querySelector('.close');
    const workoutForm = document.getElementById('workoutForm');

    // Create calendar days
    for (let day = 1; day <= 31; day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.classList.add('calendar-day');
        dayElement.classList.add('no-workout');

        // Show modal when day is clicked
        dayElement.addEventListener('click', () => {
            modal.style.display = "block"; // Show modal
            modal.dataset.selectedDay = day; // Store selected day
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
        const selectedDay = modal.dataset.selectedDay;
        const checkedBodyParts = Array.from(document.querySelectorAll('input[name="bodyPart"]:checked'))
                                      .map(input => input.value);

        // Find the corresponding day element and update it
        const dayElements = document.querySelectorAll('.calendar-grid div');
        const dayElement = dayElements[selectedDay - 1]; // Adjust for 0-based index

        if (checkedBodyParts.length > 0) {
            dayElement.classList.add('has-workout');
            dayElement.textContent = `${selectedDay}: ${checkedBodyParts.join(', ')}`;
        }

        modal.style.display = "none"; // Close modal
        workoutForm.reset(); // Reset form
    }
});
