const taskInput = document.querySelector(".task-input input"),
    filters = document.querySelectorAll(".filters span"),
    clearAll = document.querySelector(".clearBtn"),
    taskBox = document.querySelector(".task-box");


// getting local storage todo list
let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

function showTodo(filter) {
    let li = "";
    if (todos) {
        todos.forEach((todo, id) => {
            let isCompleted = todo.status == "completed" ? "checked" : "";
            if (filter == todo.status || filter == "all") {
                li += `<li class="task">
                        <label for="${id}">
                            <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted} />
                            <p class="${isCompleted}">${todo.name}</p>
                        </label>
                        <div class="settings">
                            <i onClick="deleteTask(${id})" class="uil uil-trash"></i>                   
                        </div>
                    </li>`;
            }
        });
    }
    taskBox.innerHTML = li || `<span>You don't have any task here.</span>`;
}

showTodo("all");

function showMenu(selectedTask) {
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != selectedTask) {
            taskMenu.classList.remove("show");
        }
    })
}


function deleteTask(deleteId) {
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");

}

clearAll.addEventListener("click", () => {
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
})


function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if (e.key == "Enter" && userTask) {
        if (!todos) {
            todos = [];
        }
        taskInput.value = "";
        let taskInfo = { name: userTask, status: "pending" }
        todos.push(taskInfo);
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo("all");
    }
})