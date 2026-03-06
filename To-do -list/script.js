let tasks = JSON.parse(localStorage.getItem("tasks")) || []

function addTask() {

    let input = document.getElementById("taskInput")

    if (input.value === "") return

    let task = {
        text: input.value,
        done: false
    }

    tasks.push(task)

    input.value = ""

    saveTasks()
    showTasks()

}

function showTasks() {

    let list = document.getElementById("taskList")
    list.innerHTML = ""

    for (let i = 0; i < tasks.length; i++) {

        let div = document.createElement("div")

        div.className = "task"

        if (tasks[i].done) {
            div.classList.add("done")
        }

        div.innerHTML = `
${tasks[i].text}
<div>
<button onclick="completeTask(${i})">✔</button>
<button onclick="deleteTask(${i})">🗑</button>
</div>
`

        list.appendChild(div)

    }

    updateProgress()

}

function completeTask(index) {

    tasks[index].done = !tasks[index].done

    if (tasks[index].done) {
        showMessage("🎉 Task completed! You're amazing!")
    }

    saveTasks()
    showTasks()

}

function deleteTask(index) {

    tasks.splice(index, 1)

    saveTasks()
    showTasks()

}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function updateProgress() {

    let done = 0

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].done) {
            done++
        }
    }

    let percent = 0

    if (tasks.length > 0) {
        percent = (done / tasks.length) * 100
    }

    document.getElementById("progressBar").style.width = percent + "%"

}

function showMessage(text) {

    let message = document.getElementById("message")

    message.innerText = text

    setTimeout(() => {
        message.innerText = ""
    }, 2000)

}

showTasks()