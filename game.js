// Iteration 1: Declare variables required for this game

const gameBody = document.getElementById("game-body");
const $lives = document.getElementById("lives");
let seconds = document.getElementById("timer").textContent;
let zombieId = 0;
const img = [
    "./assets/zombie-1.png",
    "./assets/zombie-2.png",
    "./assets/zombie-3.png",
    "./assets/zombie-4.png",
    "./assets/zombie-5.png",
    "./assets/zombie-6.png",
];

// Iteration 1.2: Add shotgun sound
const soundtoShoot = new Audio('./assets/shotgun.wav');
soundtoShoot.volume = 0.7;
gameBody.onclick = () => {
    soundtoShoot.pause();
    soundtoShoot.currentTime = 0;
    soundtoShoot.play();
}

// Iteration 1.3: Add background sound
let backgroundSound = new Audio('./assets/bgm.mp3');
backgroundSound.volume = 0.5;
backgroundSound.play();
backgroundSound.loop = true;

// Iteration 1.4: Add lives
const maximumLives = 4;
let lives = maximumLives;

// Iteration 2: Write a function to make a zombie
function createZombie() {
    const zombieImg = document.createElement('img');
    const randomImg = Math.floor(Math.random() * 6);
    zombieImg.src = img[randomImg];
    zombieImg.classList.add('zombie-image');
    zombieImg.id = `zombie-${zombieId}`;
    document.body.append(zombieImg);
    const leftPromp = generateRandomInteger(20, 80);
    zombieImg.style.left = `${leftPromp}vw`;
    zombieImg.onclick = () => {
        destroyZombie(zombieImg);
    }
    zombieId++;
}

// Iteration 3: Write a function to check if the player missed a zombie
function checkCollision(zombie) {
    if (zombie.getBoundingClientRect().top <= 0) {
        lives--;
        updateLives();
        return true;
    } else {
        return false;
    }
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function destroyZombie(zombie) {
    zombie.remove();
    zombieId++;
    createZombie();
}

// Iteration 5: Creating timer
let timer = setInterval(() => {
    seconds--;
    document.getElementById("timer").textContent = seconds;
    const zombie = document.getElementById(`zombie-${zombieId - 1}`);
    if (checkCollision(zombie)) {
        destroyZombie(zombie);
    }
    if (lives == 0) {
        clearInterval(timer);
        location.href = "./game-over.html";
    }
    if (seconds == 0) {
        clearInterval(timer);
        location.href = "./win.html";
    }
}, 1000);

// Iteration 6: Write a code to start the game by calling the first zombie
createZombie();

// Iteration 7: Write the helper function to get random integer
function generateRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNos = Math.floor(Math.random() * (max - min) + min);
    return randomNos;
}

// Update lives
function updateLives() {
    $lives.textContent = `Lives: ${lives}`;
    if (lives == 0) {
        $lives.classList.add('text-danger');
    } else {
        $lives.classList.remove('text-danger');
    }
}

// Update lives on page load
updateLives();