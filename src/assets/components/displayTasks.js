// Get a reference to the .main-content element
const mainContent = document.querySelector('.main-content')

// Define an array of objects
const tasks = [
  { id: 1, title: 'Task 1', description: 'Description 1' },
  { id: 2, title: 'Task 2', description: 'Description 2' },
  { id: 3, title: 'Task 3', description: 'Description 3' }
]

// Function to display tasks in the .main-content element
function displayTasks() {
  // Clear the existing content in .main-content
  mainContent.innerHTML = ''

  // Loop through the tasks array and create HTML elements for each task
  tasks.forEach((task) => {
    const taskElement = document.createElement('div')
    taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
        `
    mainContent.appendChild(taskElement)
  })
}

// Call the displayTasks function to initially display the tasks
displayTasks()
