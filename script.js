let round = 1; // Controls which round is active (1 to 3)
let showInstructions = true; // Determines if instructions should be shown

// Preload background images to avoid visual lag during transitions
const imagesToPreload = [
    "https://i.imgur.com/K00ncv2.gif",  // Round 1 background
    "https://i.imgur.com/46TozAt.gif",  // Round 2 background
    "https://i.imgur.com/wU23VYc.gif",  // Round 3 background
    "https://i.imgur.com/D1XyyGM.gif"   // Victory screen
];

imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src; // Preloads each image into the browser's cache
});

// Starts the game when the "Start" button is clicked
function startGame() {
    document.getElementById("startScreen").classList.add("hidden");
    document.getElementById("gameScreen").classList.remove("hidden");
    document.getElementById("instructions").classList.remove("hidden");
    document.getElementById("letsGoBtnContainer").classList.remove("hidden");
    document.querySelector(".choices").classList.add("hidden");
    document.getElementById("roundText").classList.add("hidden");

    // Set the background for the first round
    document.body.style.background = "url('https://i.imgur.com/K00ncv2.gif') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
}

// Hides the instructions and shows the path choices
function hideInstructions() {
    document.getElementById("instructions").classList.add("hidden");
    document.getElementById("letsGoBtnContainer").classList.add("hidden");
    document.querySelector(".choices").classList.remove("hidden");
    document.getElementById("roundText").classList.remove("hidden");
    updateRound(); // Update round text and background
}

// Called when a player chooses a path (1, 2, or 3)
function playRound(playerChoice) {
    const choices = document.querySelector(".choices");
    const message = document.getElementById("message");
    const transitionText = document.getElementById("transition-text");
    const overlay = document.getElementById("transition-overlay");

    // Randomly selects the correct path (between 1 and 3)
    let correctPath = Math.floor(Math.random() * 3) + 1;

    // Temporarily hide choices to prevent multiple clicks
    choices.classList.add("hidden");

    if (playerChoice === correctPath) {
        // Display transition message based on the current round
        if (round === 1) {
            transitionText.innerText = "You’ve escaped the whispering trees… but the shadows grow deeper.\n\n Prepare for Round 2!";
        } else if (round === 2) {
            transitionText.innerText = "A hidden path opens!\n\n The final challenge awaits in Round 3...";
        }

        if (round === 3) {
            // Player has won the final round
            endGame(true);
        } else {
            // Show transition overlay before starting next round
            overlay.classList.remove("hidden");

            // After a few seconds, go to the next round
            setTimeout(() => {
                round++;
                updateRound(); // Update text and background for new round
                overlay.classList.add("hidden"); // Hide transition overlay
            }, 4000); // Duration of transition (milliseconds)
        }
    } else {
        // Player chose the wrong path — game over
        endGame(false);
    }
}

// Updates the interface to reflect the current round
function updateRound() {
    document.getElementById("message").innerText = "";
    document.getElementById("roundText").innerText = `Round ${round}: Choose a path`;
    document.querySelector(".choices").classList.remove("hidden");
    document.getElementById("roundText").classList.remove("hidden");

    // Change background depending on the round
    if (round === 1) {
        document.body.style.background = "url('https://i.imgur.com/K00ncv2.gif') no-repeat center center fixed";
    } else if (round === 2) {
        document.body.style.background = "url('https://i.imgur.com/46TozAt.gif') no-repeat center center fixed";
    } else if (round === 3) {
        document.body.style.background = "url('https://i.imgur.com/wU23VYc.gif') no-repeat center center fixed";
    }
    document.body.style.backgroundSize = "cover";
}

// Displays the end screen, depending on win or loss
function endGame(won) {
    document.getElementById("gameScreen").classList.add("hidden");
    document.getElementById("endScreen").classList.remove("hidden");

    const playAgainBtn = document.getElementById("playAgainBtn");

    if (won) {
        // Show victory message and image
        document.getElementById("endMessage").innerText = "\n\n\n\n\nCongratulations! After braving the Magic Forest, you’ve reached the enchanted Cat Beach. Enjoy the sun, the sea, and the purring company!";
        document.getElementById("endImage").src = "https://i.imgur.com/D1XyyGM.gif";
        document.body.style.background = "url('https://i.imgur.com/Ed0rEyC.jpg') no-repeat center center fixed";
        playAgainBtn.classList.add("hidden"); // Hide play again button on win
    } else {
        // Show defeat message and image
        document.getElementById("endMessage").innerText = "";
        document.getElementById("endImage").src = "https://i.imgur.com/JoqM1YE.gif";
        document.body.style.background = "url('https://i.imgur.com/JoqM1YE.gif') no-repeat center center fixed";
        playAgainBtn.classList.remove("hidden"); // Allow replay on game over
    }

    document.body.style.backgroundSize = "cover";
}

// Resets the game and starts from Round 1 (skipping instructions)
function restartGame() {
    round = 1;
    showInstructions = false;
    document.getElementById("endScreen").classList.add("hidden");
    document.getElementById("gameScreen").classList.remove("hidden");
    document.getElementById("instructions").classList.add("hidden");
    document.getElementById("letsGoBtnContainer").classList.add("hidden");
    updateRound(); // Restart from round 1
}

// Returns to the start screen
function backToStart() {
    round = 1;
    showInstructions = true;
    document.getElementById("endScreen").classList.add("hidden");
    document.getElementById("gameScreen").classList.add("hidden");
    document.getElementById("startScreen").classList.remove("hidden");
    document.body.style.background = "url('https://i.imgur.com/3FoCI0S.gif') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
}