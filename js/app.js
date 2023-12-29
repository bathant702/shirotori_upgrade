// MODEL => HOLDS THE STATE OF THE APPLICATION
const wordsUsed = [];
// CACHED DOM ELEMENTS
const wordsListElement = document.querySelector("#words-list");
const addWordButtonElement = document.querySelector("#add-word-button");
const newWordInputElement = document.querySelector("#new-word-input");
const startButton = document.getElementById("start-game");
const countdownElement = document.getElementById("countdown");
const resetShiritori = document.getElementById("reset-game-button");

// VIEW
// WHEN THE APP STATE CHANGES, RE-RENDER THE VIEW
function renderList() {
  wordsListElement.innerHTML = "";
  // Loop through all the words in wordsUsed
  wordsUsed.forEach(function (word) {
    // Create a new list item
    const newListItem = document.createElement("li");
    // Set the list item's text equal to that word
    newListItem.innerText = word;
    // Append the list item to my #words-list
    wordsListElement.append(newListItem);
  });
}

// CONTROLLER
let countdownTimer;

function handleWordAdd(newWord) {
  if (wordsUsed.length === 0) {
    wordsUsed.push(newWord);
    return renderList();
  }
  const firstLetterOfNewWord = newWord[0];
  const lastWordInList = wordsUsed[wordsUsed.length - 1];
  const lastLetterOfLastWordInList = lastWordInList[lastWordInList.length - 1];
  if (lastLetterOfLastWordInList === firstLetterOfNewWord) {
    console.log("THIS IS A VALID SUBMISSION");
    wordsUsed.push(newWord);
    renderList();
  } else {
    console.log("THIS IS NOT A VALID SUBMISSION");
    console.log(
      `Your new word needs to start with ${lastLetterOfLastWordInList}`
    );
  }
}

function respondToWordSubmit() {
  // Grab the text from the input
  const newWordToAdd = newWordInputElement.value;
  // Call the handleWordAdd function using that text
  handleWordAdd(newWordToAdd);
  // Clear the input field
  newWordInputElement.value = "";
}

//timer event
function startTimer() {
  setTimeout(() => {
    let timeLeft = 60;

    countdownTimer = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(countdownTimer);
        countdownElement.textContent = "Time's up!";
      } else {
        countdownElement.textContent = `Time left: ${timeLeft} sec`;
        timeLeft--;
      }
    }, 1000); // tick per sec
  }, 1000); // start after start time click
}

//reset event
function resetGame() {
  wordsUsed.length = 0;
  renderList();
  clearInterval(countdownTimer);
  countdownElement.textContent = " ";
}

// SET UP EVENT LISTENERS
addWordButtonElement.addEventListener("click", respondToWordSubmit);
resetShiritori.addEventListener("click", resetGame);
startButton.addEventListener("click", startTimer);

