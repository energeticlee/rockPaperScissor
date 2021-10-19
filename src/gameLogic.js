const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const delay = () => new Promise((cb) => setTimeout(cb, 500));

class Player {
  constructor(name, move) {
    this.name = name;
    this.move = move;
    this.baseWinLogic = {
      rock: ["scissor"],
      paper: ["rock"],
      scissor: ["paper"],
    };
  }

  compare = (oppMove, myMove = this.move, baseWinLogic = this.baseWinLogic) => {
    if (oppMove === myMove) return "It's a draw!";
    else if (baseWinLogic[oppMove].includes(myMove)) return "Computer Win :(";
    else return "Congrats! You win!";
  };

  startGame = () => {
    rl.question(`Hi! What Is Your Name: `, async (answer) => {
      await delay();
      console.log(`Hey ${answer}! Rock, Paper, or Scissor (or MORE!)`);
      await delay();
      this.gameStageMenu(answer);
    });
  };

  gameStageMenu = () => {
    rl.question(
      `Would you like to play or add a new move? ["play", "add"] `,
      async (cb) => {
        await delay();
        if (cb.toLowerCase() === "play") {
          console.log("Let's PLAY!");
          await delay();
          this.gameStageFight();
        } else if (cb.toLowerCase() === "add") {
          this.gameStageAdd();
        } else this.handleError(this.gameStageMenu);
      }
    );
  };

  gameStageAdd = () => {
    rl.question("Let's give this item a name! ", async (cb) => {
      if (this.moveExist(cb)) this.handleError(this.gameStageAdd);
      else {
        await delay();
        rl.question(`Noise! What can ${cb} beat? `, async (cb2) => {
          if (!this.moveExist(cb2)) this.handleError(this.gameStageAdd);
          else {
            await delay();
            rl.question(`Noise! What can beat ${cb}? `, async (cb3) => {
              if (!this.moveExist(cb3) || cb3 === cb2)
                this.handleError(this.gameStageAdd);
              else {
                await delay();
                this.baseWinLogic[cb].push(cb2);
                this.baseWinLogic[cb3].push(cb);
                this.gameStageMenu();
              }
            });
          }
        });
      }
    });
  };

  gameStageFight = () => {
    const keyOption = Object.keys(this.baseWinLogic);
    rl.question(`Select One: ${keyOption} `, async (cb) => {
      await delay();
      if (!this.moveExist(cb)) this.handleError(this.gameStageFight);
      else {
        console.log(`You pick ${cb.toUpperCase()}! `);
        await delay();
        this.move = cb;
        const comPick = keyOption[Math.floor(Math.random() * keyOption.length)];
        console.log(`Computer pick ${comPick.toUpperCase()}! `);
        await delay();
        const result = this.compare(comPick.toLowerCase());
        console.log(result);
        await delay();
        this.playAgain();
      }
    });
  };

  playAgain = () => {
    rl.question(`Play Again? [Y | N] `, async (cb) => {
      await delay();
      if (cb.toLowerCase() === "y" || cb.toLowerCase() === "yes")
        this.gameStageMenu();
      if (cb.toLowerCase() === "n" || cb.toLowerCase() === "no") this.endGame();
    });
  };

  endGame = () => {
    console.log("BYE!");
    process.stdin.unref();
  };

  moveExist = (move) => {
    return Object.keys(this.baseWinLogic).includes(move);
  };

  handleError = async (func) => {
    console.log("Invalid input, try again!");
    await delay();
    func();
  };
}

const newPlayer = new Player();

module.exports = newPlayer;
