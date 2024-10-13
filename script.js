document.getElementById('workout-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const date = document.getElementById('date').value;
  const exercise = document.getElementById('exercise').value;
  const sets = document.getElementById('sets').value;
  const reps = document.getElementById('reps').value;
  const weight = document.getElementById('weight').value;

  const newEntry = {
    date,
    exercise,
    sets,
    reps,
    weight
  };

  let history = JSON.parse(localStorage.getItem('workoutHistory')) || [];
  history.push(newEntry);
  localStorage.setItem('workoutHistory', JSON.stringify(history));

  displayHistory();
});

function displayHistory() {
  const history = JSON.parse(localStorage.getItem('workoutHistory')) || [];
  const historyTable = document.getElementById('history');
  historyTable.innerHTML = '';

  history.forEach((entry, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.date}</td>
      <td>${entry.exercise}</td>
      <td>${entry.sets}</td>
      <td>${entry.reps}</td>
      <td>${entry.weight}</td>
      <td><button onclick="deleteEntry(${index})">Delete</button></td>
    `;
    historyTable.appendChild(row);
  });
}

function deleteEntry(index) {
  let history = JSON.parse(localStorage.getItem('workoutHistory')) || [];
  history.splice(index, 1);
  localStorage.setItem('workoutHistory', JSON.stringify(history));
  displayHistory();
}

window.onload = displayHistory;
