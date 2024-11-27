document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const taskDeadline = document.getElementById("taskDeadline");
  const addTaskButton = document.getElementById("addTaskButton");
  const taskList = document.getElementById("taskList");

  // Function to add a new task with a deadline
  const addTask = () => {
    const taskText = taskInput.value.trim();
    const deadlineValue = taskDeadline.value;

    if (taskText === "" || deadlineValue === "") {
      alert("Please enter both task and deadline.");
      return;
    }

    const deadline = new Date(deadlineValue);
    const taskItem = document.createElement("li");
    taskItem.className = "flex flex-col p-4 bg-gray-100 rounded-lg shadow space-y-2";

    const taskContent = document.createElement("div");
    taskContent.className = "flex justify-between items-center";

    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = taskText;
    taskTextElement.className = "text-gray-700 font-medium";

    const deadlineElement = document.createElement("span");
    deadlineElement.textContent = `Deadline: ${deadline.toLocaleString()}`;
    deadlineElement.className = "text-gray-500 text-sm";

    const taskActions = document.createElement("div");
    taskActions.className = "flex space-x-2 mt-2";

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "text-blue-500 hover:underline";
    editButton.addEventListener("click", () => editTask(taskItem, taskTextElement, deadline));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "text-red-500 hover:underline";
    deleteButton.addEventListener("click", () => taskItem.remove());

    const timeLeft = document.createElement("div");
    timeLeft.className = "text-sm text-red-500 font-semibold mt-2";
    const updateTimeLeft = () => {
      const now = new Date();
      const timeRemaining = deadline - now;

      if (timeRemaining <= 0) {
        timeLeft.textContent = "Time's up!";
      } else {
        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        timeLeft.textContent = `Time left: ${hours}h ${minutes}m ${seconds}s`;
      }
    };

    updateTimeLeft();
    setInterval(updateTimeLeft, 1000);

    taskActions.appendChild(editButton);
    taskActions.appendChild(deleteButton);

    taskContent.appendChild(taskTextElement);
    taskContent.appendChild(deadlineElement);
    taskItem.appendChild(taskContent);
    taskItem.appendChild(taskActions);
    taskItem.appendChild(timeLeft);

    taskList.appendChild(taskItem);

    taskInput.value = "";
    taskDeadline.value = "";
  };

  // Function to edit a task
  const editTask = (taskItem, taskTextElement, deadline) => {
    const newTaskText = prompt("Edit Task", taskTextElement.textContent);
    const newDeadline = prompt("Edit Deadline (YYYY-MM-DDTHH:mm)", deadline.toISOString().slice(0, 16));
    if (newTaskText && newDeadline) {
      taskTextElement.textContent = newTaskText;
      deadline = new Date(newDeadline);
    }
  };

  // Event listener for Add Task button
  addTaskButton.addEventListener("click", addTask);

  // Allow pressing Enter to add a task
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
  });
});

