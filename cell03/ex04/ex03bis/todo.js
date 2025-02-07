// Function to create a new TO-DO item
function createTodoItem(text) {
    const todoDiv = document.createElement("div");
    todoDiv.className = "todo-item";
    todoDiv.textContent = text;
  
    // Add click event to remove the TO-DO item
    todoDiv.addEventListener("click", function () {
      if (confirm("Are you sure you want to delete this TO-DO?")) {
        todoDiv.remove();
        saveTodosToCookie();
      }
    });
  
    return todoDiv;
  }
  
  // Function to add a new TO-DO to the list
  function addTodo() {
    const todoText = prompt("Enter a new TO-DO:");
    if (todoText && todoText.trim() !== "") {
      const ftList = document.getElementById("ft_list");
      const newTodo = createTodoItem(todoText);
      ftList.insertBefore(newTodo, ftList.firstChild);
      saveTodosToCookie();
    }
  }
  
  // Function to save TO-DOs to a cookie
  function saveTodosToCookie() {
    const ftList = document.getElementById("ft_list");
    const todos = [];
    ftList.querySelectorAll(".todo-item").forEach((item) => {
      todos.push(item.textContent);
    });
    document.cookie = `todos=${JSON.stringify(todos)}; path=/; max-age=${60 * 60 * 24 * 7}`; // Save for 7 days
  }
  
  // Function to load TO-DOs from a cookie
  function loadTodosFromCookie() {
    const cookies = document.cookie.split("; ");
    const todoCookie = cookies.find((cookie) => cookie.startsWith("todos="));
    if (todoCookie) {
      const todos = JSON.parse(todoCookie.split("=")[1]);
      const ftList = document.getElementById("ft_list");
      todos.reverse().forEach((todo) => {
        const newTodo = createTodoItem(todo);
        ftList.appendChild(newTodo);
      });
    }
  }
  
  // Event listener for the "New" button
  document.getElementById("new-todo-btn").addEventListener("click", addTodo);
  
  // Load TO-DOs from cookie when the page loads
  window.onload = loadTodosFromCookie;