const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const baseWinLogic = {
  rock: ["scissor"],
  paper: ["rock"],
  scissor: ["paper"],
};

class Player {
  constructor(name, baseWinLogic, move) {
    this.name = name;
    this.baseWinLogic = baseWinLogic;
    this.move = move;
  }

  compare = (oppMove, myMove = this.move, baseWinLogic = this.baseWinLogic) => {
    if (oppMove === myMove) return "It's a draw!";
    else if (baseWinLogic[oppMove].includes(myMove)) return "Computer Win :(";
    else return "Congrats! You win!";
  };
}

const gameStageIntro = () => {
  rl.question(`Hi! What Is Your Name: `, (answer) => {
    console.log(`Hey ${answer}! Rock, Paper, or Scissor (or MORE!)`);
    gameStageMenu(answer);
  });
};
gameStageIntro();

const gameStageMenu = (name) => {
  rl.question(
    `Would you like to play or add a new move? ["play", "add"] `,
    (cb) => {
      if (cb.toLowerCase() === "play") {
        const newPlayer = new Player(name, baseWinLogic);
        console.log("Let's PLAY!");
        gameStageFight(newPlayer);
      } else if (cb.toLowerCase() === "add") {
        gameStageAdd(name);
      } else handleError(gameStageMenu);
    }
  );
};

const gameStageAdd = (name) => {
  rl.question("Awesome! Give this item a name! ", (cb) => {
    rl.question(`Noise! What can ${cb} beat? `, (cb2) => {
      rl.question(`Noise! What can beat ${cb}? `, (cb3) => {
        if (cb3 === cb2) handleError((name) => gameStageAdd(name));
        baseWinLogic[cb].push(cb2);
        baseWinLogic[cb3].push(cb);
        gameStageMenu(name);
      });
    });
  });
};

const gameStageFight = (newPlayer) => {
  const keyOption = Object.keys(baseWinLogic);
  rl.question(`Select One: ${keyOption} `, (cb) => {
    console.log(`You pick ${cb.toUpperCase()}! `);
    newPlayer.move = cb;
    comPick = keyOption[Math.floor(Math.random() * keyOption.length)];
    console.log(`Computer pick ${comPick.toUpperCase()}! `);
    const result = newPlayer.compare(comPick.toLowerCase());
    console.log(result);
    playAgain();
  });
};

const playAgain = () => {
  rl.question(`Play Again? [Y | N] `, (cb) => {
    if (cb.toLowerCase() === "y" || cb.toLowerCase() === "yes")
      gameStageMenu(newPlayer.name);
    if (cb.toLowerCase() === "n" || cb.toLowerCase() === "no") endGame();
  });
};

const endGame = () => {
  console.log("BYE!");
  process.stdin.unref();
};

const handleError = (func) => {
  console.log("Invalid input, try again!");
  func();
};
