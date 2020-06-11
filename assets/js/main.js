// CACHE PAGE ELEMENTS
var highScoreLink = document.getElementById('high-score');
var page = document.getElementById('page');
var pageContent = document.getElementById('page-content');
var startQuizBtn = document.getElementById('start-quiz');
var landingPage = document.getElementById('landing');
var timerDisplay = document.getElementById('timer');

// GLOBAL VARIABLES
var counter = 60;
var scoreArr = [ { player: 'EZ', score: 22 }, { player: 'JZ', score: 54 } ];
var questionsArr = [
	{
		question           :
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem dolorum, odio quam tempore?',
		answers            : [ 'Lorem', 'consectetur', 'tempore', 'dolorum' ],
		correctAnswerIndex : 2
	},
	{
		question           :
			"I'm baby mumblecore taiyaki fashion axe shoreditch, tilde mustache vape _______ fixie hella?",
		answers            : [ 'Lomo', 'banjo', 'messenger', 'taxidermy' ],
		correctAnswerIndex : 3
	},
	{
		question           :
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem dolorum, odio quam tempore?',
		answers            : [ 'Lorem', 'consectetur', 'tempore', 'dolorum' ],
		correctAnswerIndex : 1
	},
	{
		question           :
			"I'm baby mumblecore taiyaki fashion axe shoreditch, tilde mustache vape _______ fixie hella?",
		answers            : [ 'Lomo', 'banjo', 'messenger', 'taxidermy' ],
		correctAnswerIndex : 0
	},
	{
		question           :
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem dolorum, odio quam tempore?',
		answers            : [ 'Lorem', 'consectetur', 'tempore', 'dolorum' ],
		correctAnswerIndex : 1
	}
];
var questionIndex = 0;


// EVENT LISTENERS
highScoreLink.addEventListener('click', highScoresPage);
startQuizBtn.addEventListener('click', startQuiz);

function startQuiz() {
	// clear landing page
	landingPage.remove();

	// start timer
	timer();

	// call function to create single question page
	createQuestion(questionsArr[questionIndex]);
}

function timer() {
	var countdown = function() {
		counter--;
		timerDisplay.innerText = counter;
		if (counter === 0) {
			clearInterval(startCountdown);
		}
	};
	var startCountdown = setInterval(countdown, 1000);
}

// FUNCTION TO CREATE SINGLE QUESTION PAGE
function createQuestion(questionObj) {

  
	// create question page container
	var questionContainer = document.createElement('div');
  questionContainer.className = 'question';
  questionContainer.id = 'question';
  
	// create question
	var question = document.createElement('h2');
	question.textContent = questionObj.question;
	// append question
	questionContainer.appendChild(question);
	// create answer-list
	var answerList = document.createElement('ul');
	answerList.className = 'answer-list';
	answerList.id = 'answer-list';

	// create array of answers
	var answers = questionObj.answers;
	// generate li for each answer in array
	for (var i = 0; i < answers.length; i++) {
    var answer = document.createElement('li');
    answer.className = 'answer-list-item';
		// add button
		answer.innerHTML =
			'<button class="btn answer-btn">' + (i + 1) + '. ' + answers[i] + '</button>';
		// console.log(i);
		// console.log(questionObj.correctAnswerIndex);
		// set data-attr flag on correct answer
		if (i === questionObj.correctAnswerIndex) {
			answer.setAttribute('data-correct-answer', 'true');
		}
		// append answer to ul
		answerList.appendChild(answer);
	}

	questionContainer.appendChild(answerList);
	pageContent.appendChild(questionContainer);

  answerList.addEventListener('click', checkAnswer);
  
  // function checkAnswer(event) {
  //   var clicked = event.target.closest('li');
  //   if (clicked.hasAttribute('data-correct-answer')){
      
  //     displayCorrect(answerList);
  //   } else {
  //     displayWrong(answerList);
  //   }
  // }

}

// CHECK ANSWER, DISPLAY FEEDBACK MSG, TIMED CALL TO NEXT QUESTION FUNCTION
function checkAnswer(event) {
  // find parent li of clicked button
  console.log(event.target);
  var clicked = event.target.closest('li.answer-list-item');
  var answerList = document.getElementById('answer-list');
 
  // check if clicked is truthy otherwise, ul was clicked and we don't want function to proceed
  if (clicked) {
    var isCorrectAnswer = (clicked.hasAttribute('data-correct-answer'));
    if (isCorrectAnswer) {
      // display correct message
      var correctMsgEl = document.createElement('p');
      correctMsgEl.className = 'feedback-msg';
      correctMsgEl.innerText = 'Correct!'
      answerList.appendChild(correctMsgEl); 
    } else {
      // display wrong message
      var wrongMsgEl = document.createElement('p');
      wrongMsgEl.className = 'feedback-msg';
      wrongMsgEl.innerText = 'Wrong!'
      answerList.appendChild(wrongMsgEl);
    }
    answerList.removeEventListener('click', checkAnswer);
  
    var delayNextQuestion = setTimeout(function() {
      var questionContainer = document.getElementById('question');
      questionContainer.remove();
      questionIndex++;
      createQuestion(questionsArr[questionIndex]);
    }, 1000)
  }
  


  // QUESTION...DO I NEED TO CLEAR THIS TIMEOUT?
}

// FUNCTION TO CREATE GAME OVER PAGE
function gameOverPage() {
	// clear page
	pageContent.remove();

	var gameOver = document.createElement('div');
	gameOver.className = 'game-over';

	var msg = document.createElement('h2');
	msg.innerText = 'All done!';
	gameOver.appendChild(msg);

	var score = document.createElement('h3');
	score.innerText = 'Your final score is 22.';
	gameOver.appendChild(score);

	var initialsInput = document.createElement('form');
	initialsInput.innerHTML =
		"<label for='initials'>Enter initials:</label>" +
		"<input type='text' id='initials'>" +
		"<button class='btn btn-short' type='submit'>Submit</button>";
	gameOver.appendChild(initialsInput);

	page.appendChild(gameOver);

	// add listener for input submit which calls function to add player object with player and score to high scoreArr
}

// FUNCTION TO DISPLAY HIGH SCORES PAGE
function highScoresPage() {
	pageContent.remove();
	var highScoresContainer = document.createElement('div');
	highScoresContainer.className = 'high-scores';
	var heading = document.createElement('h2');
	heading.innerText = 'High Scores';
	highScoresContainer.appendChild(heading);
	var highScoresList = document.createElement('ul');
	for (var i = 0; i < scoreArr.length; i++) {
		var playerStats = document.createElement('li');
		playerStats.innerText =
			i + 1 + '. ' + scoreArr[i].player + ' - ' + scoreArr[i].score;
		highScoresList.appendChild(playerStats);
	}
	highScoresContainer.appendChild(highScoresList);
	var actionsContainer = document.createElement('div');
	actionsContainer.className = 'actions';
	var goBackBtn = document.createElement('button');
	goBackBtn.classList = 'btn btn-short';
	goBackBtn.innerText = 'Go Back';
	actionsContainer.appendChild(goBackBtn);
	var clearScores = document.createElement('button');
	clearScores.classList = 'btn btn-short';
	clearScores.innerText = 'Clear high scores';
	actionsContainer.appendChild(clearScores);

	highScoresContainer.appendChild(actionsContainer);
	page.appendChild(highScoresContainer);
}
