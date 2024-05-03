document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const nameInput = document.getElementById("nameInput");
  const startButton = document.getElementById("startButton");
  const usernameSpan = document.getElementById("username");
  const scoreSpan = document.getElementById("score");
  const highscoreSpan = document.getElementById("highscore");
  const gameOverSound = new Audio("game_over.mp3");
  const foodSound = new Audio("food.mp3");
  // Add event listeners for directional buttons
  
  const upButton = document.getElementById("upButton");
  const downButton = document.getElementById("downButton");
  const leftButton = document.getElementById("leftButton");
  const rightButton = document.getElementById("rightButton");
  const aButton = document.getElementById("aButton");
  
    
    document.getElementById("pauseButton").addEventListener("click", () => {
        gamePaused = true;
    });
    document.getElementById("aButton").addEventListener("click", () => {
        gamePaused = true;
    });
    
    document.getElementById("continueButton").addEventListener("click", () => {
        gamePaused = false;
    });
    

  document.getElementById("restartButton").addEventListener("click", () => {
    // Reset game variables
    gamePaused = true;
    startButton.style.display = "inline-block"; // Show start button
    nameInput.style.display = "inline-block"; // Show name input
    usernameSpan.textContent = ""; // Clear username
    scoreSpan.textContent = ""; // Clear score
    highscoreSpan.textContent = ""; // Clear highscore
    snakeList = [];
    snakeLength = 1;
    snakeX = 45;
    snakeY = 40;
    velocityX = 0;
    velocityY = 0;
    foodX = Math.floor(Math.random() * (canvas.width / 2));
    foodY = Math.floor(Math.random() * (canvas.height / 2));
    score = 0;
    chapter = 1;
  });

  document.getElementById("restartButton").addEventListener("click", () => {
    // Reset game variables
    gamePaused = true;
    startButton.style.display = "inline-block"; // Show start button
    nameInput.style.display = "inline-block"; // Show name input
    usernameSpan.textContent = ""; // Clear username
    scoreSpan.textContent = ""; // Clear score
    highscoreSpan.textContent = ""; // Clear highscore
    snakeList = [];
    snakeLength = 1;
    snakeX = 45;
    snakeY = 40;
    velocityX = 0;
    velocityY = 0;
    foodX = Math.floor(Math.random() * (canvas.width / 2));
    foodY = Math.floor(Math.random() * (canvas.height / 2));
    score = 0;
    chapter = 1;
  });

  document.addEventListener("keydown", (event) => {
    if (!gamePaused) {
        switch (event.key) {
            case "w": // "w" for desktop keyboard, up arrow
            case "ArrowUp":
                if (velocityY !== 2) {
                    velocityX = 0;
                    velocityY = -2;
                }
                break;
            case "s": // "s" for desktop keyboard, down arrow
            case "ArrowDown":
                if (velocityY !== -2) {
                    velocityX = 0;
                    velocityY = 2;
                }
                break;
            case "a": // "a" for desktop keyboard, left arrow
            case "ArrowLeft":
                if (velocityX !== 2) {
                    velocityX = -2;
                    velocityY = 0;
                }
                break;
            case "d": // "d" for desktop keyboard, right arrow
            case "ArrowRight":
                if (velocityX !== -2) {
                    velocityX = 2;
                    velocityY = 0;
                }
                break;
        }
    }

    // Pause game with "a" key
    if (event.key === "a" && !gamePaused) {
        gamePaused = true;
    }

    // Continue game with "s" key
    if (event.key === "s" && gamePaused) {
        gamePaused = false;
    }

    // Start game with "Enter" key
    if (gamePaused && event.key === "Enter") {
        gamePaused = false;
        startButton.style.display = "none";
        nameInput.style.display = "none";
    }
});


  upButton.addEventListener("click", () => {
    if (velocityY !== 2) {
      velocityX = 0;
      velocityY = -2;
    }
  });

  downButton.addEventListener("click", () => {
    if (velocityY !== -2) {
      velocityX = 0;
      velocityY = 2;
    }
  });

  leftButton.addEventListener("click", () => {
    if (velocityX !== 2) {
      velocityX = -2;
      velocityY = 0;
    }
  });

  rightButton.addEventListener("click", () => {
    if (velocityX !== -2) {
      velocityX = 2;
      velocityY = 0;
    }
  });

  let snakeList = [];
  let snakeLength = 2;
  let snakeX = 45;
  let snakeY = 40;
  let velocityX = 0;
  let velocityY = 0;
  let foodX = Math.floor(Math.random() * (canvas.width / 2));
  let foodY = Math.floor(Math.random() * (canvas.height / 2));
  let score = 0;
  let highscore = localStorage.getItem("highscore") || 0;
  let chapter = 1;
  let gamePaused = true;

  function drawSnake() {
    ctx.fillStyle = "black";
    snakeList.forEach(([x, y]) => {
      ctx.fillRect(x, y, 10, 10);
    });
  }

  function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(foodX, foodY, 10, 10);
  }

  function updateScoreboard() {
    usernameSpan.textContent = `${nameInput.value}`;
    scoreSpan.textContent = `Your score is: ${score}`;
    highscoreSpan.textContent = `High Score: ${highscore}`;
  }

  function checkCollision() {
    // Check collision with walls
    if (
      snakeX < 0 ||
      snakeX >= canvas.width ||
      snakeY < 0 ||
      snakeY >= canvas.height
    ) {
      gameOver();
    }

    // Check collision with self
    for (let i = 0; i < snakeList.length - 1; i++) {
      if (snakeX === snakeList[i][0] && snakeY === snakeList[i][1]) {
        gameOver();
        break;
      }
    }
  }

  // Fix the eatFood() function
  function eatFood() {
    if (
      snakeX < foodX + 10 &&
      snakeX + 10 > foodX &&
      snakeY < foodY + 10 &&
      snakeY + 10 > foodY
    ) {
      score += 10;
      foodX = Math.floor(Math.random() * (canvas.width / 2));
      foodY = Math.floor(Math.random() * (canvas.height / 2));
      snakeLength += 5;

      foodSound.currentTime = 0;
      foodSound.play();
      if (score > highscore) {
        highscore = score;
        localStorage.setItem("highscore", highscore);
      }

      if (score >= 100 && chapter === 1) {
        transitionToChapter2();
      }
      if (score >= 200 && chapter === 2) {
        transitionToChapter3();
      }
      if (score >= 250 && chapter === 3) {
        transitionToChapter4();
      }
      if (score >= 300 && chapter === 4) {
        transitionToChapter5();
      }
      if (score >= 350 && chapter === 5) {
        transitionToChapter6();
      }
      if (score >= 400 && chapter === 6) {
        transitionToChapter7();
      }
      if (score >= 500 && chapter === 7) {
        transitionToChapter8();
      }
    }
  }

  function gameOver() {
    gameOverSound.currentTime = 0;
    gameOverSound.play();
    gamePaused = true;
    usernameSpan.textContent = "";
    scoreSpan.textContent = "Game over! Press Enter to Restart";
    highscoreSpan.textContent = "";
    snakeList = [];
    snakeLength = 1;
    snakeX = 45;
    snakeY = 40;
    velocityX = 0;
    velocityY = 0;
    foodX = Math.floor(Math.random() * (canvas.width / 2));
    foodY = Math.floor(Math.random() * (canvas.height / 2));
    score = 0;
    chapter = 1;
  }

  function transitionToChapter2() {
    // Display storyline and inform the user about the transition
    alert(
      "Congratulations! You have entered Chapter 2.\nGet ready for a new adventure!"
    );

    // Change background image to chapter2.jpg
    document.body.style.backgroundImage = "url('chapter2.jpg')";

    // Update chapter
    chapter = 2;
  }
  function transitionToChapter3() {
    // Display storyline and inform the user about the transition
    alert(
      "Congratulations! You have entered Chapter 3.\nGet ready for Hard Mode!"
    );

    // Change background image to chapter2.jpg
    document.body.style.backgroundImage = "url('chapter3.jpg')";

    // Update chapter
    chapter = 3;
  }
  function transitionToChapter4() {
    // Display storyline and inform the user about the transition
    alert(
      "Congratulations! You have entered Chapter 4.\nGet ready for Hard Mode!"
    );

    // Change background image to chapter2.jpg
    document.body.style.backgroundImage = "url('chapter4.jpg')";

    // Update chapter
    chapter = 4;
  }
  function transitionToChapter5() {
    // Display storyline and inform the user about the transition
    alert(
      "Congratulations! You have entered Chapter 5.\nGet ready for Hard Mode!"
    );

    // Change background image to chapter2.jpg
    document.body.style.backgroundImage = "url('chapter5.jpg')";

    // Update chapter
    chapter = 5;
  }
  function transitionToChapter6() {
    // Display storyline and inform the user about the transition
    alert(
      "Congratulations! You have entered Chapter 6.\nGet ready for Hard Mode!"
    );

    // Change background image to chapter2.jpg
    document.body.style.backgroundImage = "url('chapter6.jpg')";

    // Update chapter
    chapter = 6;
  }
  function transitionToChapter7() {
    // Display storyline and inform the user about the transition
    alert(
      "Congratulations! You have entered Chapter 7.\nGet ready for Hard Mode!"
    );

    // Change background image to chapter2.jpg
    document.body.style.backgroundImage = "url('chapter7.png')";

    // Update chapter
    chapter = 7;
  }
  function transitionToChapter8() {
    // Display storyline and inform the user about the transition
    alert(
      "Congratulations! You have entered Chapter 8.\nGet ready for Hard Mode!"
    );

    // Change background image to chapter2.jpg
    document.body.style.backgroundImage = "url('chapter8.jpg')";

    // Update chapter
    chapter = 8;
  }

  function gameloop() {
    if (!gamePaused) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawSnake();
      drawFood();
      updateScoreboard();
      checkCollision();
      eatFood();

      snakeX += velocityX;
      snakeY += velocityY;

      snakeList.push([snakeX, snakeY]);
      if (snakeList.length > snakeLength) {
        snakeList.shift();
      }
    }

    requestAnimationFrame(gameloop);
  }

  document.addEventListener("keydown", (event) => {
    if (gamePaused && event.key === "Enter") {
      gamePaused = false;
      startButton.style.display = "none";
      nameInput.style.display = "none";
    } else if (!gamePaused) {
      switch (event.key) {
        case "ArrowUp":
          if (velocityY !== 2) {
            velocityX = 0;
            velocityY = -2;
          }
          break;
        case "ArrowDown":
          if (velocityY !== -2) {
            velocityX = 0;
            velocityY = 2;
          }
          break;
        case "ArrowLeft":
          if (velocityX !== 2) {
            velocityX = -2;
            velocityY = 0;
          }
          break;
        case "ArrowRight":
          if (velocityX !== -2) {
            velocityX = 2;
            velocityY = 0;
          }
          break;
      }
    }
  });

  startButton.addEventListener("click", () => {
    gamePaused = false;
    startButton.style.display = "none";
    nameInput.style.display = "none";
  });

  gameloop();
});
