
const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");
let button1 = document.querySelector("#modify-button");




const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}


function updateToDo(event) { 
  //폼 생성
  const li1 = event.target.parentElement;
  const form = document.createElement("form");
  const text = document.createElement("input");
  form.setAttribute("id","modify-form");
  //form.setAttribute("required");
  form.appendChild(text);
  text.setAttribute("type", "text");
  text.classList.add("modify");
  li1.appendChild(form);
  event.target.setAttribute("class","modify-button");
  
  const modifyForm = document.getElementById("modify-form")
 
  
  modifyForm.addEventListener("submit", updatedTodo);
  

}

function updatedTodo(event) {
  event.preventDefault();
  const li2 = event.target.parentElement; // 폼의 li
  const modifyInput = document.querySelector(".modify");
  const modifyToDo = modifyInput.value;

  const origin = localStorage.getItem(toDos);
  console.log(event.target.parentElement.id);
  console.log(origin);
  
  
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

//취소선 그리기
var clickedLi = toDoList.onclick = function (event) {
 
event.target.classList.toggle("done");

}

function deleteToDo(event){
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id))
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
 
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  
  button.innerText = "X";
  button.addEventListener("click", deleteToDo);
  button1 = document.createElement("button");
  
 
  button1.innerText = "modify";
  button1.addEventListener("click", updateToDo);
  li.appendChild(span);
  li.appendChild(button);
  li.appendChild(button1);
  toDoList.appendChild(li);
  
  
}

function handleToDoSubmit(event) {
event.preventDefault();
const newTodo = toDoInput.value;
toDoInput.value = "";
const newTodoObj = {
text:newTodo,
id: Date.now(),
};
toDos.push(newTodoObj);
paintToDo(newTodoObj);
saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);


const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}

// li.addEventListener("click", drawlineTodo);