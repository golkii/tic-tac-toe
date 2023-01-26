const Gameboard = (function () {
  let gameboard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  const resetGameboard = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        gameboard[i][j] = '';
      }
    }
  }

  const Player = (sign, name, turn) => {
    const getName = () => name;
    const getSign = () => sign;
    const getTurn = () => turn;
    const updateTurn = () => turn = !turn;
    const setName = (name1) => name = name1;
    const makeAMove = (i, j, sign) => {
      gameboard[i][j] = sign;
    }

    return { getName, getSign, getTurn, makeAMove, updateTurn, setName };
  };

  let player1 = Player('x', 'player 1', true);
  let player2 = Player('o', 'player 2', false);

  const resetPlayers = () => {
    if (player1.getTurn()) {
      return;
    }
    else {
      player1.updateTurn();
      player2.updateTurn();
    }
  }

  const checkWin = () => {
    if (gameboard[0][0] == gameboard[1][1] && gameboard[0][0] == gameboard[2][2] && gameboard[0][0] != '') {
      return true;
    }
    else if (gameboard[2][0] == gameboard[1][1] && gameboard[2][0] == gameboard[0][2] && gameboard[2][0] != '') {
      return true;
    }
    for (let i = 0; i < 3; i++) {
      if (gameboard[i][0] == gameboard[i][1] && gameboard[i][0] == gameboard[i][2] && gameboard[i][0] != '') {
        return true;
      }
      else if (gameboard[0][i] == gameboard[1][i] && gameboard[0][i] == gameboard[2][i] && gameboard[0][i] != '') {
        return true;
      }
    }
    return false;
  }

  return { gameboard, checkWin, player1, player2, resetGameboard, resetPlayers };
})();



const displayController = (function () {

  const createBeginDisplay = () => {
    let div = document.createElement('div');
    div.classList.add('begin-display');
    let withFiend = document.createElement('button');
    withFiend.textContent = 'Play with fiend';
    let withAI = document.createElement('button');
    withAI.textContent = 'Play with AI';
    withFiend.classList.add('buttons');
    withAI.classList.add('buttons');

    withFiend.addEventListener('click', (e) => {
      let head = document.querySelector('h3');
      head.textContent = 'Type names';
      let firstName = document.createElement('input');
      firstName.type = 'text';
      firstName.value = 'Player 1';
      div.append(firstName);
      let secondName = document.createElement('input');
      secondName.type = 'text';
      secondName.value = 'Player 2';
      div.append(secondName);

      withFiend.remove();
      withAI.remove();

      let startButton = document.createElement('button');
      startButton.classList.add('buttons');
      startButton.textContent = 'Start';
      document.body.append(startButton);
      startButton.addEventListener('click', (e) => {
        Gameboard.player1.setName(firstName.value);
        Gameboard.player2.setName(secondName.value);

        firstName.remove();
        secondName.remove();
        startButton.remove();

        head.textContent = Gameboard.player1.getName() + "'s move";

        renderGameboard();
      });
    });

    withAI.addEventListener('click', (e) => {

    });
    div.append(withFiend, withAI);
    document.body.append(div);
  }

  const renderGameboard = () => {
    let div = document.createElement('div');
    div.classList.add('game-board');
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let gameDot = document.createElement('button');
        gameDot.classList.add('game-dot');
        gameDot.textContent = Gameboard.gameboard[i][j];
        gameDot.id = i + '+' + j;
        gameDot.addEventListener('click', function (e) {
          if (Gameboard.player1.getTurn() && !Gameboard.checkWin()) {
            Gameboard.player1.makeAMove(e.target.id[0], e.target.id[2], Gameboard.player1.getSign());
            updateGameBoard(e.target.id[0], e.target.id[2], Gameboard.player1.getSign());
            Gameboard.player1.updateTurn();
            Gameboard.player2.updateTurn();
            let header = document.querySelector('h3');
            header.textContent = Gameboard.player2.getName() + "'s move";
          }
          else if (Gameboard.player2.getTurn() && !Gameboard.checkWin()) {
            Gameboard.player2.makeAMove(e.target.id[0], e.target.id[2], Gameboard.player2.getSign());
            updateGameBoard(e.target.id[0], e.target.id[2], Gameboard.player2.getSign());
            Gameboard.player1.updateTurn();
            Gameboard.player2.updateTurn();
            let header = document.querySelector('h3');
            header.textContent = Gameboard.player1.getName() + "'s move";
          }
          if (Gameboard.checkWin()) {
            let header = document.querySelector('h3');
            if (Gameboard.player1.getTurn()) {
              header.textContent = Gameboard.player2.getName() + ' WIN!';
            }
            else {
              header.textContent = Gameboard.player1.getName() + ' WIN!';
            }
            reset.classList.remove('hide');
          }
        });
        div.append(gameDot);
      }
    }
    reset.before(div);
  }

  const updateGameBoard = (i, j, sign) => {
    let dot = document.getElementById(i + '+' + j);
    dot.textContent = sign;
    dot.disabled = true;
  }

  let resetBut = document.getElementById('reset');
  resetBut.addEventListener('click', () => {
    let div = document.querySelector('div.game-board');
    div.remove();
    Gameboard.resetGameboard();
    Gameboard.resetPlayers();
    reset.classList.add('hide');
    Gameboard.checkWin = () => {
      if (Gameboard.gameboard[0][0] == Gameboard.gameboard[1][1] && Gameboard.gameboard[0][0] == Gameboard.gameboard[2][2] && Gameboard.gameboard[0][0] != '') {
        return true;
      }
      else if (Gameboard.gameboard[2][0] == Gameboard.gameboard[1][1] && Gameboard.gameboard[2][0] == Gameboard.gameboard[0][2] && Gameboard.gameboard[2][0] != '') {
        return true;
      }
      for (let i = 0; i < 3; i++) {
        if (Gameboard.gameboard[i][0] == Gameboard.gameboard[i][1] && Gameboard.gameboard[i][0] == Gameboard.gameboard[i][2] && Gameboard.gameboard[i][0] != '') {
          return true;
        }
        else if (Gameboard.gameboard[0][i] == Gameboard.gameboard[1][i] && Gameboard.gameboard[0][i] == Gameboard.gameboard[2][i] && Gameboard.gameboard[0][i] != '') {
          return true;
        }
      }
      return false;
    };
    renderGameboard();
    let header = document.querySelector('h3');
    header.textContent = Gameboard.player1.getName() + "'s move";
  });

  return { createBeginDisplay, renderGameboard, updateGameBoard };
})();

displayController.createBeginDisplay();