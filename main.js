let computerNum = 0;
let playBtn = document.querySelector("#playBtn");
let userInput = document.querySelector("#user-input");
let resultArea = document.querySelector("#result-area");
let resetBtn = document.querySelector("#resetBtn");
let chances = 5;
let gameOver = false;
let chanceArea = document.querySelector("#chance-area");
let history = [];

playBtn.addEventListener('click', play);
resetBtn.addEventListener('click', reset);
userInput.addEventListener('focus', valueReset)

window.addEventListener('keydown', function (e) {
	if (e.code == "Enter" || e.code == "NumpadEnter") {
		if (document.activeElement.id == "user-input") {
			if (!gameOver) {
				play()
				valueReset()
			}
		}
	}
})

function valueReset() {
	userInput.value = ""
}

function pickRandomNum() {
	computerNum = Math.floor(Math.random() * 100) + 1
	console.log("정답", computerNum);
}

function play() {
	let userValue = userInput.value;

	if (userValue < 1 || userValue > 100) {
		resultArea.textContent = "1과 100사이 숫자를 입력해주세요."
		return;
	}

	if (history.includes(userValue)) {
		resultArea.textContent = "이미 입력한 숫자입니다."
		return;
	}

	chances--;
	chanceArea.textContent = `남은기회 : ${chances}번`
	if (userValue < computerNum) {
		resultArea.textContent = "Up!";
	} else if (userValue > computerNum) {
		resultArea.textContent = "Down!";
	} else {
		resultArea.textContent = "정답!";
		gameOver = true
	}

	history.push(userValue);
	userInput.focus();

	if (chances < 1) {
		gameOver = true;
	}

	if (gameOver) {
		playBtn.disabled = true;
	}
}

function reset() {
	userInput.value = "";
	pickRandomNum()
	playBtn.disabled = false;
	gameOver = false;
	history = [];
	chances = 5;
	chanceArea.textContent = `남은기회 : ${chances}번`
	resultArea.textContent = "결과값이 나옵니다."
}

pickRandomNum()