document.addEventListener('DOMContentLoaded', function() {
  // Variables for the timer
  let timer;
  let minutes = 25;
  let seconds = 0;
  let isRunning = false;

  // Elements from the DOM
  const minutesDisplay = document.getElementById('minutes');
  const secondsDisplay = document.getElementById('seconds');
  const startButton = document.getElementById('start-timer');
  const resetButton = document.getElementById('reset-timer');
  const googleMeetButton = document.getElementById('google-meet-button');
  const googleKeepButton = document.getElementById('google-keep-button');

  // Function to update the display
  function updateDisplay() {
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
  }

  // Function to start the timer
  function startTimer() {
    if (!isRunning) {
      isRunning = true;
      timer = setInterval(function() {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timer);
            alert('Time is up! Take a break.');
            minutes = 5;
            seconds = 0;
            isRunning = false;
          } else {
            minutes--;
            seconds = 59;
          }
        } else {
          seconds--;
        }
        updateDisplay();
      }, 1000);
    }
  }

  // Function to reset the timer
  function resetTimer() {
    clearInterval(timer);
    minutes = 25;
    seconds = 0;
    isRunning = false;
    updateDisplay();
  }

  // Event listeners for the buttons
  startButton.addEventListener('click', startTimer);
  resetButton.addEventListener('click', resetTimer);

  // Initial display update
  updateDisplay();

  // Daily Growth Checklist
  const dgcList = document.getElementById('dgc-list');
  const newTaskInput = document.getElementById('new-task');
  const addTaskButton = document.getElementById('add-task');
  const resetDgcButton = document.getElementById('reset-dgc');

  // Load saved tasks
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.text, task.completed));
  }

  // Save tasks to localStorage
  function saveTasks() {
    const tasks = [];
    dgcList.querySelectorAll('li').forEach(li => {
      const checkbox = li.querySelector('input[type="checkbox"]');
      const text = li.querySelector('label').textContent;
      tasks.push({ text: text, completed: checkbox.checked });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Add a task to the list
  function addTask(text, completed = false) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    const label = document.createElement('label');
    label.textContent = text;

    li.appendChild(checkbox);
    li.appendChild(label);
    dgcList.appendChild(li);

    checkbox.addEventListener('change', saveTasks);
    saveTasks();
  }

  // Event listener for adding new tasks
  addTaskButton.addEventListener('click', () => {
    const text = newTaskInput.value.trim();
    if (text) {
      addTask(text);
      newTaskInput.value = '';
    }
  });

  // Event listener for resetting the checklist
  resetDgcButton.addEventListener('click', () => {
    const checkboxes = dgcList.querySelectorAll('input[type="checkbox"]');
    const allCompleted = Array.from(checkboxes).every(checkbox => checkbox.checked);

    if (allCompleted) {
      localStorage.removeItem('tasks');
      dgcList.innerHTML = '';
    } else {
      alert('Please complete all tasks before resetting the checklist.');
    }
  });

  // Load tasks on startup
  loadTasks();

  // Event listeners for opening Google Meet and Google Keep
  googleMeetButton.addEventListener('click', () => {
    window.open('https://meet.google.com', '_blank');
  });

  googleKeepButton.addEventListener('click', () => {
    window.open('https://keep.google.com', '_blank');
  });

  // Start the timer automatically on load
  startTimer();
});
