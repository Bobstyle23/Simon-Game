//jshint esversion:6
let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

// $(document).keypress(function () {
//   if (!started) {
//     $("#level-title").text("Level " + level);
//     nextSequence();
//     started = true;
//   }
// });
document.addEventListener("keypress", function () {
  if (!started) {
    var leveltitle = (document.getElementById("level-title").innerHTML =
      "Level " + level);
    nextSequence();
    started = true;
  }
});
document.addEventListener("click", function (i) {
  var userChosenColour = i.target.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});
// document.addEventListener('click',function(i)
// {
//   var userChosenColour = i.target.className;
//   console.log(userChosenColour);
//   userClickedPattern.push(userChosenColour);
//   playSound(this.userChosenColour);
//   animatePress(this.userChosenColour);
//   checkAnswer(userClickedPattern.length - 1);
// });
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // playSound("wrong");
    // $("body").addClass("game-over");
    // $("#level-title").text("Game Over, Press Any Key to Restart");

    var element = document.body;
    element.classList.add("game-over");
    document.getElementById("level-title").innerHTML =
      "Game Over, Press Any Key to Restart";
    setTimeout(function () {
      //   $("body").removeClass("game-over");
      // }, 200);
      var remove = document.getElementById("body");
      element.classList.remove("game-over");
    }, 200);
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  // $("#level-title").text("Level " + level);
  document.getElementById("level-title").innerHTML = "Level " + level;
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    // let fade = document.getElementById(randomChosenColour);
    // console.log(fade);
    //   fadeIn(fade);
    //   fadeOut(fade);
    //   fadeIn(fade);
    //     fade.classList.add('show');
    //     fade.classList.remove('show');
    //     fade.classList.add('show');
    //     fade.classList.add('show');

    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  // $("#" + currentColor).addClass("pressed");
  let val = document.getElementById(currentColor);
  val.classList.add("pressed");
  // console.log(val);
  setTimeout(function () {
    // $("#" + currentColor).removeClass("pressed");
    let rval = document.getElementById(currentColor);
    rval.classList.remove("pressed");
  }, 100);
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function fadeIn(el) {
  el.classList.add("show");
  el.classList.remove("hide");
}

function fadeOut(el) {
  el.classList.add("hide");
  el.classList.remove("show");
}
