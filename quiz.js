let seconds = 5;
let questions = 10;
let categoryID = 12;
const answers = document.getElementById("answers");
const questionbar = document.getElementById("question")
const button = document.getElementById("button");
const icon = document.getElementById("icon");
const timebar = document.getElementById("countdown");
const option1 = document.getElementById("first");
const option2 = document.getElementById("second");
const option3 = document.getElementById("third");
const option4 = document.getElementById("fourth");
const options = [option1,option2,option3,option4];
let rightIndex = 0;
let rightOption = 0;
let progress = 0;
let playing = false;
let score = 0;
let result = 0;

window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    seconds = params.get("time");
    questions = params.get("questions");
    categoryID = params.get("category");
    if (seconds == null) {
         seconds = 5;
    }
    if (questions == null) {
        questions = 10;
    }
   if (categoryID == null) {
        categoryID = 12;
    }

    answers.innerHTML = "Answers<br>0/" + questions
    timebar.innerHTML = seconds
    result = apiCall();
};


button.addEventListener("click", function() {

    button.style.display = "none"
    icon.style.display = "none"
    timebar.style.display = "flex"
    count();

}) 


function count() {
    
       func = setInterval(function() {
            time = parseInt(timebar.innerHTML);
            timebar.innerHTML = time - 1;
        },1000);

        setInterval(function() {
            if (timebar.innerHTML == 0) {
                clearInterval(func);
            }
        },1);
}


async function apiCall() {

   var url = "https://opentdb.com/api.php?amount=" + questions + "&category=" + categoryID + "&type=multiple";
   const value = await fetch(url);
   result = await value.json();
   console.log(url)
   return result;
}


check()

function loadQuestion(index, interval) {
    setTimeout(function() {
        rightIndex = Math.floor(Math.random() * options.length);
        rightOption = options[rightIndex];
        rightOption.innerHTML = result.results[index].correct_answer;
        let questionText = result.results[index].question;
        questionbar.innerHTML = questionText;
        let incorrect_answers = result.results[index].incorrect_answers;
        console.log(result.results[index].correct_answer)
        let falseArray = [];
        options.forEach((o) => {
            if (o.innerHTML != rightOption.innerHTML) {
                falseArray.push(o);
            }
        })
        for (let i = 0; i < incorrect_answers.length; i++) {
            falseArray[i].innerHTML = incorrect_answers[i]
        }
        answers.innerHTML = "Answers<br>" + progress +"/" + questions
        count();
        playing = true;
    }, interval)
}



options.forEach(option => {
    option.addEventListener("click", function() {
        let value = timebar.innerHTML;
        if (value > 0 && playing) {

            playing = false;
            timebar.innerHTML = "0"

            if (option == rightOption) {
               score++;
            }
        }
    })
})


function check() {

   checker = setInterval(function(){
    
        if (timebar.innerHTML == 0 && progress > 0 && progress < questions) {
            progress++;
            timebar.innerHTML = seconds;
            clear()
            loadQuestion(progress-1,5000)
        }

        if (timebar.innerHTML == 0 && progress == questions) {
            alert("Your Score: " + score)
            clearInterval(checker)
            clear()
        }

        if (timebar.innerHTML == 0 && progress == 0) {
            clear()
            loadQuestion(progress,0)
            progress++;
            timebar.innerHTML = seconds;
        }

    }, 100) 
}

function clear() {
    playing = false;
    options.forEach(option => {
        option.innerHTML = ""
    })
    questionbar.innerHTML = ""
}