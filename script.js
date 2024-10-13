// script.js

document.addEventListener('DOMContentLoaded', function() {
    const calendarGrid = document.querySelector('.calendar-grid');

    for (let day = 1; day <= 31; day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.classList.add('calendar-day');
        
        // Set default class for no workout
        dayElement.classList.add('no-workout');

        // Placeholder click event for each day
        dayElement.addEventListener('click', () => {
            // Toggle workout status
            if (dayElement.classList.contains('has-workout')) {
                dayElement.classList.remove('has-workout');
                dayElement.classList.add('no-workout');
            } else {
                dayElement.classList.add('has-workout');
                dayElement.classList.remove('no-workout');
            }
        });

        calendarGrid.appendChild(dayElement);
    }
});
