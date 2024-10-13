// script.js

document.addEventListener('DOMContentLoaded', function() {
    const calendarGrid = document.querySelector('.calendar-grid');

    for (let day = 1; day <= 31; day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.classList.add('calendar-day');
        
        // Placeholder click event for each day
        dayElement.addEventListener('click', () => {
            alert(`Details for Day ${day}`);
        });

        calendarGrid.appendChild(dayElement);
    }
});
