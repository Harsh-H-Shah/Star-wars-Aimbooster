const crosshair = document.querySelector(".cursor");
const target = document.querySelector(".targetbox");
const scoreText = document.querySelector(".score");
const timerText = document.querySelector(".timer");
const highscoreText = document.querySelector(".highscore");
const menupage = document.querySelector(".menupage");
const playbutton = document.querySelector(".menupage .playbtn");
const explosion = document.querySelector(".explosion");
const targetShip = document.querySelector(".target");

const damage = document.querySelector(".damage");
const shoot = document.querySelector(".shoot");

let score = 0;
let timeLeft = 60;
let highscore = 0;

window.addEventListener("load", () => {
	if (localStorage.getItem("highscore")) {
		highscore = localStorage.getItem("highscore");
		highscoreText.innerText = `Highscore ${highscore}`;
	}

	scoreText.innerText = score;
	timerText.innerText = timeLeft;

	respawn();
});

playbutton.addEventListener("click", () => {
	menupage.style.opacity = "0";
	setTimeout(() => {
		menupage.style.display = "none";
	}, 100);

	play();
});

menupage.addEventListener("click", (e) => e.stopPropagation()); // To prevent damage sound from playing

window.addEventListener("click", () => {
	damage.currentTime = 0;
	damage.play();
});

target.addEventListener("click", (e) => {
	targetShip.style.opacity = "0";
	explosion.style.opacity = "1";

	e.stopPropagation(); // To prevent damage sound from playing

	shoot.currentTime = 0;
	shoot.play();

	score += 1;
	scoreText.innerText = score;

	setTimeout(() => {
		respawn();
	}, 500);
});

window.addEventListener("mousemove", (e) => {
	crosshair.style.left = `${e.clientX}px`;
	crosshair.style.top = `${e.clientY}px`;
});

const play = () => {
	setInterval(() => {
		timer();
	}, 1000);
};

const respawn = () => {
	explosion.style.opacity = "0";
	targetShip.style.opacity = "1";

	const top = Math.floor(Math.random() * window.innerHeight);
	const left = Math.floor(Math.random() * window.innerWidth);
	target.style.top = `${top}px`;
	target.style.left = `${left}px`;
};

const gameOver = () => {
	alert(`Game Over!\nYour Score = ${score}`);

	if (localStorage.getItem("highscore") < score) {
		localStorage.setItem("highscore", score);
		highscore = score;
		highscoreText.innerText = `Highscore ${highscore}`;
	}

	score = 0;
	scoreText.innerText = score;

	timeLeft = 60 + 2;
	timerText.innerText = timeLeft;
};

const timer = () => {
	if (timeLeft === 0) gameOver();

	timeLeft -= 1;
	timerText.innerText = timeLeft;
};
