let sequence = [];
let inputSequence = [];
let colors = ["red", "yellow", "green", "blue"];
let red = document.getElementById("red");
let yellow = document.getElementById("yellow");
let green = document.getElementById("green");
let blue = document.getElementById("blue");
let level = 1;
let levelText = document.getElementById("simon-text");
let darkColors = ["#AE252C", "#AC861F", "#216325", "#0E4970"];
let lightColors = ["#FB3640", "#F9C22E", "#3CB043", "#197BBD"];
let inputs = document.getElementById("inputs-container");
let highscore = 0;
let highscoreDisplay = document.getElementById("highscore");
let startButton = document.getElementById("start-button");
let resetButton = document.getElementById("reset-button");
// const playGreen = document.getElementById('green');
// const greenAudio = document.getElementById('greenAudio');


reset(0);


function reset(score) {
    stopInput()
    inputs.innerHTML = "";
    console.log("score is" + score);
    if (highscore < score) {
        highscore = score;
    }
    startButton.disabled = false;
    sequence = [];
    inputSequence = [];
    level = 1;
    levelText.innerHTML = "STAGE <br>"  + level;
}

function startGame() {
    startButton.disabled = true;
    addToSequence();
}

function addToSequence() {
    stopInput();
    sequence.push(Math.floor(Math.random() * 4));
    console.log(sequence);
    playSequence();
   
}

function startInput() {
    red.setAttribute("onclick", "addInput(0)");
    yellow.setAttribute("onclick", "addInput(1)");
    green.setAttribute("onclick", "addInput(2)");
    blue.setAttribute("onclick", "addInput(3)");
}

function stopInput() {
    red.removeAttribute("onclick");
    yellow.removeAttribute("onclick");
    green.removeAttribute("onclick");
    blue.removeAttribute("onclick");
}

function addInput(input) {
    inputSequence.push(input);
    flashColor(input);
    renderInputBlocks();
    checkInputs();
}

function playSequence() {
    for (let i = 0; i < sequence.length; i++) {
        setTimeout(() => {flashColor(sequence[i]);}, i * 750);
    }
    startInput();
}

function flashColor(colorID) {
    const tile = colorConvert(colorID);
    const mode = document.getElementById("mode").value;
   
    if (mode === "both" || mode === "lights") {
        tile.style.backgroundColor = lightColors[colorID];
        setTimeout(() => {
            tile.style.backgroundColor = darkColors[colorID];
        }, 500);
    }

    if (mode === "both" || mode === "sound") {
        const audios = [
            document.getElementById('redAudio'),
            document.getElementById('yellowAudio'),
            document.getElementById('greenAudio'),
            document.getElementById('blueAudio')
        ];
        audios[colorID].currentTime = 0;
        audios[colorID].play();
    }
}


function checkInputs() {
    const isMatch = sequence.slice(0, inputSequence.length).every((val, index) => val === inputSequence[index]);
    const isEqual = inputSequence.length === sequence.length && inputSequence.every((val, index) => val === sequence[index]);

    if (!isMatch) {
        reset(sequence.length);
    }

    if (isEqual) {
        inputSequence = [];
        setTimeout(() => {inputs.innerHTML = "";}, 500);
        level++;
        levelText.innerHTML = "STAGE <br>"  + level;
        setTimeout(() => {addToSequence();}, 2000);
    }
}

function colorConvert(colorID) {
    if (colorID == 0) {return red;}
    if (colorID == 1) {return yellow;}
    if (colorID == 2) {return green;}
    if (colorID == 3) {return blue;}
}

function renderInputBlocks() {
    inputs.innerHTML = "";
    for (let i = 0; i < inputSequence.length; i++) {
        var block = document.createElement("div");
        block.classList.add("input");
        block.style.backgroundColor = lightColors[inputSequence[i]]
        if (inputSequence[i] == 1) {
            block.style.color = "black";
        }
        block.innerHTML = i + 1;
        inputs.appendChild(block);
    }
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
