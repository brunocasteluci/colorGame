var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll('.square');
var colorDisplay = document.getElementById('colorDisplay');
var messageDisplay = document.querySelector('#message');
var h1 = document.querySelector('h1');
var resetButton = document.querySelector('#reset');
var modeButtons = document.querySelectorAll('.mode');

init();

function init() {
  //Mode Buttons event listeners
  setupModeButtons();
  setupSquares();
  reset();
}

function setupModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener('click', function() {
      modeButtons[0].classList.remove('selected');
      modeButtons[1].classList.remove('selected');
      modeButtons[2].classList.remove('selected');
      this.classList.add('selected');
      //figure out how many squares to show
      if (this.textContent === 'Easy') {
        numSquares = 3;
      } else if (this.textContent === 'Medium') {
        numSquares = 6;
      } else {
        numSquares = 9;
      }

      reset();
    });
  }
}

function setupSquares() {
  for (var i = 0; i < squares.length; i++) {
    // click listeners to squares
    squares[i].addEventListener('click', function() {
      // Grab color of clicked squared
      var clickedColor = this.style.backgroundColor;
      // Compare color to pickedColor
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = 'Correct!';
        resetButton.textContent = 'Play Again?';
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
      } else {
        this.style.backgroundColor = '#232323';
        messageDisplay.textContent = 'Try Again!';
      }
    });
  }
}

function reset() {
  // generate new colors
  colors = generateRandomColors(numSquares);
  // pick new random color from array
  pickedColor = pickColor();
  //change colors display to match picked color
  colorDisplay.textContent = pickedColor;
  this.textContent = 'New Colors';
  messageDisplay.textContent = '';
  //change the colors of the squares
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = 'block';
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = 'none';
    }
  }
  h1.style.backgroundColor = 'steelblue';
}

resetButton.addEventListener('click', function() {
  reset();
});

colorDisplay.textContent = pickedColor;

function changeColors(color) {
  // loop through all squares
  for (var i = 0; i < squares.length; i++) {
    // change each color to match given color
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  //pick a random number beetween 1 to color length
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  // make an array
  var arr = [];
  // repeat num times
  for (var i = 0; i < num; i++) {
    // get random color and push into array
    arr.push(randomColor());
  }

  // return that array
  return arr;
}

function randomColor() {
  // pick a "red" from 0 to 255
  var r = Math.floor(Math.random() * 256);
  // pick a "green" from 0 to 255
  var g = Math.floor(Math.random() * 256);
  // pick a "blue" from 0 to 255
  var b = Math.floor(Math.random() * 256);

  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}
