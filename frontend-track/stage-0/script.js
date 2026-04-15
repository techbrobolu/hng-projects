let todoCard = document.querySelector(".todo-card");
let completeToggle = document.querySelector(".complete-toggle");
let todoCardTitle = document.querySelector(".todo-card__title")
let todoCardDescription = document.querySelector(".todo-card__description")
let headerTags = document.querySelector(".header-tags")
let categoryTags = document.querySelector(".category-tags")
let dueDate = document.querySelector(".todo-card__due-date").getAttribute("datetime")
let remainingTimeBox = document.querySelector(".remaining-time")
let timeRemaining = document.querySelector(".todo-card__time-remaining")

function calculateTimeRemaining(date) {
    let due = new Date(date);
    let now = new Date();
    let timeToDeadline = due - now;

    if (timeToDeadline < 0) return { overdue: true, label: "Overdue" };

    let days = Math.floor(timeToDeadline / 86400);
    let hours = Math.floor(timeToDeadline / 3600) % 24;
    let minutes = Math.floor(timeToDeadline / 60) % 60;
    let seconds = Math.floor(timeToDeadline / 1000);
    
    if (days > 0) {
        return { overdue: false, label: `Due in ${hours} hrs` };
    } else if(days == 1){
        return { overdue: false, label: "Due in 1 day" }
    } else if (hours > 0) {
        return { overdue: false, label: `Due in ${minutes} mins` };
    } else if (minutes > 0) {
        return { overdue: false, label: `Due in ${seconds} secs` };
    }
}

completeToggle.addEventListener("click", () => {
    todoCard.classList.toggle("complete");
    todoCardTitle.classList.toggle("disabled");
    todoCardDescription.classList.toggle("disabled");
    headerTags.classList.toggle("disabled");
    categoryTags.classList.toggle("disabled");
    remainingTimeBox.classList.toggle("disabled");
    timeRemaining.classList.toggle("disabled");
});

function startCountdown(timeEl) {
	function update() {
		const result = calculateTimeRemaining(dueDate);
        timeEl.textContent = result.label;

		if (result.overdue) {
			clearInterval(timer); // no point keep running after it's overdue
		}
	}

	update(); // run immediately so there's no blank state on load
	const timer = setInterval(update, 1000 * 60);
}

startCountdown(timeRemaining)