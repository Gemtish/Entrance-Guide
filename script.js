function addTask() {
  const input = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  if (input.value.trim() === "") return;

  const li = document.createElement("li");
  li.textContent = input.value;

  li.onclick = () => li.style.textDecoration = 
    li.style.textDecoration === "line-through" ? "none" : "line-through";

  taskList.appendChild(li);
  input.value = "";
}
