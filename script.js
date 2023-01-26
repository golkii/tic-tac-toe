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
    const makeAMove = (i, j, sign) => {
      gameboard[i][j] = sign;
    }

    return { getName, getSign, getTurn, makeAMove, updateTurn };
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
      console.log('диагональ');
      return true;
    }
    else if (gameboard[2][0] == gameboard[1][1] && gameboard[2][0] == gameboard[0][2] && gameboard[2][0] != '') {
      console.log('обратная диагональ');
      return true;
    }
    for (let i = 0; i < 3; i++) {
      if (gameboard[i][0] == gameboard[i][1] && gameboard[i][0] == gameboard[i][2] && gameboard[i][0] != '') {
        console.log('горизонтальный ряд');
        return true;
      }
      else if (gameboard[0][i] == gameboard[1][i] && gameboard[0][i] == gameboard[2][i] && gameboard[0][i] != '') {
        console.log('Вертикальный ряд');
        return true;
      }
    }
    return false;
  }

  return { gameboard, checkWin, player1, player2, resetGameboard, resetPlayers };
})();



const displayController = (function () {

  const renderGameboard = () => {
    console.log('начал делать поле');
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
            header.textContent = 'Player 2 move';
            console.log('ход 1 игрока');
          }
          else if (Gameboard.player2.getTurn() && !Gameboard.checkWin()) {
            Gameboard.player2.makeAMove(e.target.id[0], e.target.id[2], Gameboard.player2.getSign());
            updateGameBoard(e.target.id[0], e.target.id[2], Gameboard.player2.getSign());
            Gameboard.player1.updateTurn();
            Gameboard.player2.updateTurn();
            let header = document.querySelector('h3');
            header.textContent = 'Player 1 move';
            console.log('Ход 2 игрока');
          }
          if (Gameboard.checkWin()) {
            let header = document.querySelector('h3');
            if (Gameboard.player1.getTurn()) {
              header.textContent = 'Player 2 WIN!';
            }
            else {
              header.textContent = 'Player 1 WIN!';
            }
            reset.classList.remove('hide');
            console.log('конец игры');
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
    console.log(Gameboard.player1.getTurn());
    console.log(Gameboard.player2.getTurn());
    reset.classList.add('hide');
    Gameboard.checkWin = () => {
      if (Gameboard.gameboard[0][0] == Gameboard.gameboard[1][1] && Gameboard.gameboard[0][0] == Gameboard.gameboard[2][2] && Gameboard.gameboard[0][0] != '') {
        console.log('диагональ');
        return true;
      }
      else if (Gameboard.gameboard[2][0] == Gameboard.gameboard[1][1] && Gameboard.gameboard[2][0] == Gameboard.gameboard[0][2] && Gameboard.gameboard[2][0] != '') {
        console.log('обратная диагональ');
        return true;
      }
      for (let i = 0; i < 3; i++) {
        if (Gameboard.gameboard[i][0] == Gameboard.gameboard[i][1] && Gameboard.gameboard[i][0] == Gameboard.gameboard[i][2] && Gameboard.gameboard[i][0] != '') {
          console.log('горизонтальный ряд');
          return true;
        }
        else if (Gameboard.gameboard[0][i] == Gameboard.gameboard[1][i] && Gameboard.gameboard[0][i] == Gameboard.gameboard[2][i] && Gameboard.gameboard[0][i] != '') {
          console.log('Вертикальный ряд');
          return true;
        }
      }
      return false;
    };
    renderGameboard();
    console.log('Начал заново');
    let header = document.querySelector('h3');
    header.textContent = 'Player 1 move';
  });

  return { renderGameboard, updateGameBoard };
})();

displayController.renderGameboard();