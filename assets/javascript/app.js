// "#countdown-timer"
// "#trivia-questions"

var countdown;
var countdownTimer;
var allTriviaQuestions = [{
  question: "A cat has how many rows of whiskers?",
  correctAnswer: "four",
  option01: "two",
  option02: "three",
  option03: "four"
}, {
  question: "A cat will spend nearly what percentage of its life grooming itself?",
  correctAnswer: "30%",
  option01: "20%",
  option02: "30%",
  option03: "40%"
}];
var correctAnswers;
var inCorrectAnswers;
var unAnswered;

function createQuestion() {
  var question = "";
  for (var i = 0; i < allTriviaQuestions.length; i++) {
    question += '<div class="card mx-auto mb-4" style="width: 80%"><h5 class="card-header">' + allTriviaQuestions[i].question + '</h5><ul class="list-group list-group-flush"><li class="list-group-item form-check"><input class="form-check-input" type="radio" name="questionRadios-' + i + '" id="radio-' + i + '" value="' + allTriviaQuestions[i].option01 + '"><label class="form-check-label" for="radio-' + i + '">' + allTriviaQuestions[i].option01 + '</label></li><li class="list-group-item form-check"><input class="form-check-input" type="radio" name="questionRadios-' + i + '" id="radio-' + i + '" value="' + allTriviaQuestions[i].option02 + '"><label class="form-check-label" for="radio-' + i + '">' + allTriviaQuestions[i].option02 + '</label></li><li class="list-group-item form-check"><input class="form-check-input" type="radio" name="questionRadios-' + i + '" id="radio-' + i + '" value="' + allTriviaQuestions[i].option01 + '"><label class="form-check-label" for="radio-' + i + '">' + allTriviaQuestions[i].option03 + '</label></li></ul></div>';
  }
  return question;
}

//NOT USED CURRENTLY
function createAnswer() {
  var answer = "";
  for (var i = 0; i < allTriviaQuestions.length; i++) {
    answer += '<div class="card mx-auto mb-4" style="width: 80%"><h5 class="card-header">' + allTriviaQuestions[i].question + '</h5><ul class="list-group list-group-flush"><li class="list-group-item form-check"><label class="form-check-label">' + allTriviaQuestions[i].correctAnswer + '</label></li></ul></div>';
  }
  return answer;
}

function checkAnswers() {
  for (var i = 0; i < allTriviaQuestions.length; i++) {
    var currentRadioName = "questionRadios-" + i;
    if (!$('input[name=' + currentRadioName + ']').is(':checked')) {
      unAnswered++;
    } else {
      if ($('input[name=' + currentRadioName + ']:checked').val() === allTriviaQuestions[i].correctAnswer) {
        correctAnswers++;
      } else {
        inCorrectAnswers++;
      }
    }
  }
}

function triviaStart() {
  $("#countdown-timer").empty();
  $(".footer").empty();
  countdown = 5;
  correctAnswers = 0;
  inCorrectAnswers = 0;
  unAnswered = 0;
  $("#trivia-questions").html("<h3>Welcome! Welcome! Welcome!</h3>").append("<p>In this Trivia Game, Ellie will present you with a series of questions. <br> You will only have so much time to answer all the questions, so be sure not to lollygag before time runs out! <br> Are you ready to play?</p>");
  $("#trivia-questions").append("<button id='button-trivia-start' class='btn btn-success'>Start</button>");
  $("#button-trivia-start").click(triviaQuestions);
}

function triviaQuestions() {
  $("#countdown-timer").html("<p>Time Remaining: <span id='timer'>" + countdown + "</span> seconds.</p>");
  startCountDown();

  $("#trivia-questions").html(createQuestion());

  $(".footer").html('<p>Trivia Questions were sourced from: <a href="http://www.petcarefoundation.org/trivia.asp">petcarefoundation.com</a> and <a href="https://www.care.com/c/stories/6045/101-amazing-cat-facts-fun-trivia-about-your-feline-friend/">care.com</a></p>');
}

function startCountDown() {
   countdown--;
   $("#timer").html(countdown);
   countdownTimer = setTimeout(startCountDown, 1000);

   if (countdown === 0) {
     clearTimeout(countdownTimer);
     triviaAnswers();
   }
}

function triviaAnswers() {
  //need to check answers (checkAnswers()) here replacing html content
  //alert();
  checkAnswers();

  $("#countdown-timer").empty();
  $("#trivia-questions").html("<h3>Alright, let's see how you did!</h3>").append('<p>Correct Answers: ' + correctAnswers + '<br>Incorrect Answers: ' + inCorrectAnswers + '<br>Unanswered: ' + unAnswered + '</p>');

  // $("#trivia-questions").html('<p>Correct Answers: ' + correctAnswers + '.<br>Incorrect Answers: ' + inCorrectAnswers + '.<br>Unanswered: ' + unAnswered + '.</p>');

  //<p>You got all the answers correct!</p>
  $("#trivia-questions").append("<button id='button-trivia-play-again' class='btn btn-success'>Play Again</button>");
  $("#button-trivia-play-again").click(triviaStart);
}

$(document).ready(function(){
  triviaStart();

});
