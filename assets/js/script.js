//array of obejcts of the questions and their answers adn options 
var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    options: ["string","booleans" , "alerts", "numbers"] ,
    answer: "alerts",
    
  },
  {
    question: "The condition in an if/esle statement is enclosed within __",
    options: ["quotes","curly brackets", "paranthesis","square brackets"],
    answer: "paranthesis",
    
  },
  {
    question: "Arrays in javascript can be used to store ____",
    options: ["numbers and strings","other arrays","booleans", "all of the above"],
    answer: "all of the above",
    
  },
  {
    question: "String values must be enclosed within ___ when ebing assigned to variables",
    options: ["commas", "curly brackets","quotes","paranthesis"],
    answer: "quotes",
    
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is: ",
    options: ["Javascript","terminal/bash","for loops","console.log"],
    answer: "console.log",
    
  }
]


var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector("#start-button");
var mainQuestionArea = document.querySelector("#questionArea");
var alert = document.querySelector(".alert");
var currentQuestion;
var scoreList = [];
var userInitials = "" ;
var score = 0;
var storedScores = JSON.parse(localStorage.getItem("userInfo"));
var input;
var myform = document.createElement("form");
var questionCount = 0;
var timer;
var timerCount;

//console.log(storedScores);
// takes the scores from local storage and ads them into the scorelist array
if (storedScores !== null){
  for (var i = 0 ; i < storedScores.length; i++){
  scoreList.push(storedScores[i]);
  };
}

// The startQuiz function is called when the start button is clicked
function startQuiz() {
  timerCount = 75;
  // Prevents start button from being clicked when round is in progress
  currentQuestion =  questions[questionCount];
  startButton.disabled = false;
  startButton.style.display = 'none';
  askQuestion(currentQuestion);
  startTimer()
}


// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  startButton.disabled = false;
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = "Timer: " + timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (timerCount <= 0) {
        // Clears interval and stops timer
        clearInterval(timer);
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
    }
  }, 1000);
}


//displays question q  on main page
function askQuestion(q){

    mainQuestionArea.innerHTML = "" ;
    mainQuestionArea.innerText= "Question: " + q.question;
    q.options.forEach(element => {
    var button =document.createElement("button")
    button.className="btn-primary btn-block text-left"
    button.innerText=element
    mainQuestionArea.appendChild(button)
    timerElement.innerText = "Timer: " + timerCount;
    timerCount--;
    button.addEventListener("click", displaynextQuestion)
 });

};

//loads the next question and calls asQuestion() again to load it 
function displaynextQuestion(event){
  questionCount++
  if(questionCount < questions.length){
    console.log("test");
     console.log(event.target.innerText);
      isRightAnswer(event.target.innerText == currentQuestion.answer)
     // mainQuestionArea.innerHTML=""
      if(questionCount < questions.length){    
          currentQuestion = questions[questionCount]
          askQuestion(currentQuestion)  
      }else {
          questionCount = 0
          //displayScore();  
      }

  }else{
      console.log("endgame");
      displayScore();
  }
  
}

// called after quiz is done to display their score and ask their initials
function displayScore(){
  clearInterval(timer);
  mainQuestionArea.innerHTML = "You score is: " +  score;

  //creating the form that will pass back initials 
  var myform = document.createElement("form");
  myform.method = "get";
  myform.className = "inputForm";
  var label = document.createElement("label");
  label.innerText = "Enter your initials             ";
  myform.appendChild(label);
//input field 
  input = document.createElement("input");
  input.value = "";
  input.name = "name";
  input.id ="InputInitials";
  console.log(input);
  userInitials = input.value;
  console.log(userInitials);
  myform.appendChild(input);
//save button
  var submitButton =document.createElement("button");
  submitButton.className="btn-initals";
  submitButton.innerText= "Save";
  myform.appendChild(submitButton);
  mainQuestionArea.appendChild(myform);
 
//event lister for input field 
  input.addEventListener("input", myScript);
  //captures the name and stores it
  function myScript(e){
    console.log(e)
    userInitials = userInitials +  e.data ;

  };


 submitButton.addEventListener("click", displayScores);

}

//submitButton.addEventListener("click", displayScores, true);

//displays stored scores function 
function displayScores(event){

  event.preventDefault();
  console.log(input);
  console.log(myform.input);
  var userInfo = {
    inits: userInitials,
    userScore: score
  };

  mainQuestionArea.innerHTML = "";
  scoreList.push(userInfo);
  localStorage.setItem("userInfo", JSON.stringify(scoreList));

  //run through the stored scores create a list element with them 
  if (storedScores !== null) {
    var list = document.createElement("ol");
    list.className = "scoreListClass";
    for (var i = 0; i <  scoreList.length; i++) {
        var initials =  scoreList[i].inits;
        var scores =  scoreList[i].userScore
        var scoreEntry = document.createElement("li");
        scoreEntry.innerHTML = initials + " - " + scores;
        list.appendChild(scoreEntry);
    }
  } else {
    var list = document.createElement("ol");
    list.className = "scoreListClass";
    var scoreEntry = document.createElement("li");
    scoreEntry.innerHTML = userInfo.inits + " - " + userInfo.userScore;
    list.appendChild(scoreEntry);

  }
    //append the list to the page 
    mainQuestionArea.appendChild(list);


    //creation of go back button 
    var goBackButton =document.createElement("button")
    goBackButton.className="btn-primary"
    goBackButton.innerText= "Go Back"

    //creation of clear scores button 
    var clearButton =document.createElement("button")
    clearButton.className="btn-primary"
    clearButton.innerText= "Clear Scores"

    // appending both those buttons to the page 
    mainQuestionArea.appendChild(goBackButton);
    mainQuestionArea.appendChild(clearButton);

    //event listeners for the previos 2 buttons 
    goBackButton.addEventListener("click", goToStart);
    clearButton.addEventListener("click", clearScores);
  
     //clears the scores and erases the list of scores from screen 
    function clearScores(e){

      localStorage.clear();
      list.innerHTML = "";
      list.clear
      scoreList.clear;
      if (storedScores !== null){
        storedScores.clear;
      }
     // displayScores(e);
      return;
    }



}

//takes user back to first page by reloading 
function goToStart(){

  location.reload();
  return;
}

//Checks to see if answer chosen is correct 
////if it is it prints good at the bottom of screen  
//if wrong displays wrong and takes 10 seconds off the clock
//
function isRightAnswer(response){
    
  if(response){
      alert.innerText= "Good";
      //console.log("Good");
      score = score + 10;
  }else {
      alert.innerText="Wrong";
      if ((timerCount - 10) > 0  ){
      timerCount = timerCount -10;
      timer.innerHTML = timerCount;
      //console.log("Wrong")
    } else {
      timerCount = 0;
      timer.innerHTML = timerCount;
    }

  }
  setTimeout(function(){
      alert.innerText=""
      }, 1000);

}

// Attach event listener to start button to call startQuiz function on click
startButton.addEventListener("click", startQuiz);


