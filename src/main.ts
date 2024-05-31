import './style.css'

type Todo = {
  title: string,
  isCompleted: boolean,
  readonly id: string
}

const myForm = document.getElementById("myForm") as HTMLFormElement
const todosContainer = document.getElementsByClassName("todos")[0] as HTMLDivElement
const myInput = document.getElementsByName('title')[0] as HTMLInputElement

// Fetch Todos from LocalStorage
const getTodos = (): Todo[] => {
  const savedTodos = localStorage.getItem('todos')
  return savedTodos ? JSON.parse(savedTodos) : []
}

// Save Todo to LocalStorage
const saveTodos = (todos: Todo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos))
}

const todos: Todo[] = getTodos()

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault()
  const todo: Todo = {
    title: myInput.value,
    isCompleted: false,
    id: String(Math.random() * 100)
  }
  todos.push(todo)
  myInput.value = ""
  saveTodos(todos)
  renderTodos(todos)
}

const generateTodoAndRender = (title: string, isCompleted: boolean, id: string) => {
  // Generating todo div
  const generatedTodo = document.createElement('div')
  generatedTodo.className = "todo"

  // Generating inner container
  const inner = document.createElement('div')
  inner.className = "inner"

  // Creating Checkbox
  const checkbox = document.createElement('input') as HTMLInputElement
  checkbox.setAttribute('type', 'checkbox')
  checkbox.checked = isCompleted
  checkbox.onchange = () => {
    const newTodo = todos.find(item => item.id === id)
    if (newTodo) {
      newTodo.isCompleted = checkbox.checked
      paragraph.className = checkbox.checked ? 'cut' : "mainTitle"
      saveTodos(todos)
    }
  }

  // Creating Paragraph for Title
  const paragraph = document.createElement('p') as HTMLParagraphElement
  paragraph.innerText = title
  paragraph.className = isCompleted ? 'cut' : "mainTitle"

  // Creating Delete Button
  const deleteBtn = document.createElement('button') as HTMLButtonElement
  deleteBtn.className = 'deleteBtn'
  deleteBtn.innerText = "Delete"
  deleteBtn.onclick = () => deleteTodo(id)

  // Rendering Todos in HTML Window
  inner.append(checkbox, paragraph)
  generatedTodo.append(inner, deleteBtn)
  todosContainer.append(generatedTodo)
}

const deleteTodo = (id: string) => {
  const idx = todos.findIndex(todo => todo.id === id)

  todos.splice(idx, 1)
  saveTodos(todos)
  renderTodos(todos)
}

const renderTodos = (todos: Todo[]) => {
  todosContainer.textContent = ""
  if (todos.length === 0) {
    todosContainer.innerHTML = "<h1 class='no-todo'>No Todo Found</h1>"
  } else {
    todos.forEach(todo => {
      generateTodoAndRender(todo.title, todo.isCompleted, todo.id)
    })
  }
}

renderTodos(todos)
