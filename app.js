const amount = document.getElementById("amount");
const time = document.getElementById("time");
const category = document.getElementById("category");
const button = document.getElementById("sub");
const warnings = document.querySelectorAll("#error-message");
const warn1 = document.querySelector(".error1");
const warn2 = document.querySelector(".error2");

let seconds = 5;
let questions = 10;
let categoryID = 12;

function checkInt() {
    return Number.isInteger(seconds) && Number.isInteger(questions) && Number.isInteger(categoryID);
}

amount.addEventListener("input", function() {
    questions = parseInt(amount.value);
});

time.addEventListener("input", function() {
    seconds = parseInt(time.value);
});

category.addEventListener("input", function() {
    categoryID = parseInt(category.value);
});

button.addEventListener("click", function() {
    if (checkInt()) {
        warnings.forEach((warn) => warn.style.display = "none")
        window.location.href = "quiz.html?category=" + encodeURIComponent(categoryID) + "&questions=" + encodeURIComponent(questions) + "&time=" + encodeURIComponent(seconds);
    } else {
       if (!Number.isInteger(questions)) {
        warn1.style.display = "flex"
       } else {
        warn1.style.display = "none"
       }
       if (!Number.isInteger(seconds)) {
        warn2.style.display = "flex"
       } else {
        warn2.style.display = "none"
       }
    }
});

