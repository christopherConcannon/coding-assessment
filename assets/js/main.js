// CACHE PAGE ELEMENTS
var highScoreLink = document.getElementById('high-score');
var page = document.getElementById('page');
var pageContent = document.getElementById('page-content');
var startQuizBtn = document.getElementById('start-quiz');
var landingPage = document.getElementById('landing');

// GLOBAL VARIABLES
var counter = 60;
var scoreArr = [ { player: 'EZ', score: 22 }, { player: 'JZ', score: 54 } ];
var questionsArr = [
	{
		question :
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem dolorum, odio quam tempore?',
    answers  : ['Lorem', 'consectetur', 'tempore', 'dolorum'],
    correctAnswer: 2
	}
];

// EVENT LISTENERS
highScoreLink.addEventListener('click', highScoresPage);
startQuizBtn.addEventListener('click', startQuiz);

function startQuiz() {
	// clear landing page
	landingPage.remove();

	// start timer
	timer();

	// while( timer > 0 ) {
	//  for (var i = 0; i > questionsArr.length; i++)}

	// call function to create single question page
	createQuestion();
}

function timer() {
	return;
}

// FUNCTION TO CREATE SINGLE QUESTION PAGE
function createQuestion() {
	// create question page container
	var questionContainer = document.createElement('div');
	questionContainer.className = 'question';
	// create question
	var question = document.createElement('h2');
	question.textContent =
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem dolorum, odio quam tempore?';
	// append question
	questionContainer.appendChild(question);
	// create answer-list
	var answerList = document.createElement('ul');
	answerList.className = 'answer-list';

	// create array of answers
	var answers = [ 'Lorem', 'consectetur', 'tempore', 'dolorum' ];
	// generate li for each answer in array
	for (var i = 0; i < answers.length; i++) {
		var answer = document.createElement('li');
		answer.innerHTML =
			"<button class='btn answer-btn'>" + (i + 1) + '. ' + answers[i] + '</button>';
		// append answer to ul
		answerList.appendChild(answer);
	}

	questionContainer.appendChild(answerList);
	pageContent.appendChild(questionContainer);
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
  heading.innerText = "High Scores";
  highScoresContainer.appendChild(heading);
	var highScoresList = document.createElement('ul');
	for (var i = 0; i < scoreArr.length; i++) {
    var playerStats = document.createElement('li');
    playerStats.innerText = (i + 1) + ". "  + scoreArr[i].player + " - " + scoreArr[i].score;
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


