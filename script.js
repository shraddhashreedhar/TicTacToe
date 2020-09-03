const statusB= document.querySelector('.status');

const resetB = document.querySelector('.reset');

const gameCell = document.querySelectorAll('.game-cell');
const xsymbol='⨯';
const osymbol='○';
//game variables

let gameLive = true;
let xNext = true;  //is x is true its x's turn


const letterToSymbol = (letter) => letter === 'x' ? xsymbol : osymbol;

//functions

const handleWin = (letter) => {
    gameLive = false;
    if (letter === 'x') {
      statusB.innerHTML = `<i>${letterToSymbol(letter)} has won!</i>`;
    } else {
      statusB.innerHTML = `<span>${letterToSymbol(letter)} has won!</span>`;
    }
  };

const checkstatus = () => {
    const topleft = gameCell[0].classList[1];
    const topmid = gameCell[1].classList[1];
    const topright = gameCell[2].classList[1];
    const midleft = gameCell[3].classList[1];
    const midmid = gameCell[4].classList[1];
    const midright = gameCell[5].classList[1];
    const bottomleft = gameCell[6].classList[1];
    const bottommid= gameCell[7].classList[1];
    const bottomright = gameCell[8].classList[1];
   //check winner
   if (topleft && topleft === topmid && topleft === topright) {
    handleWin(topleft);
    gameCell[0].classList.add('won');
    gameCell[1].classList.add('won');
    gameCell[2].classList.add('won');
  } else if (midleft && midleft === midmid && midleft === midright) {
    handleWin(midleft);
    gameCell[3].classList.add('won');
    gameCell[4].classList.add('won');
    gameCell[5].classList.add('won');
  } else if (bottomleft && bottomleft === bottommid && bottomleft === bottomright) {
    handleWin(bottomleft);
    gameCell[6].classList.add('won');
    gameCell[7].classList.add('won');
    gameCell[8].classList.add('won');
  } else if (topleft && topleft === midleft && topleft === bottomleft) {
    handleWin(topleft);
    gameCell[0].classList.add('won');
    gameCell[3].classList.add('won');
    gameCell[6].classList.add('won');
  } else if (topmid && topmid === midmid && topmid === bottommid) {
    handleWin(topmid);
    gameCell[1].classList.add('won');
    gameCell[4].classList.add('won');
    gameCell[7].classList.add('won');
  } else if (topright && topright === midright && topright === bottomright) {
    handleWin(topright);
    gameCell[2].classList.add('won');
    gameCell[5].classList.add('won');
    gameCell[8].classList.add('won');
  } else if (topleft && topleft === midmid && topleft === bottomright) {
    handleWin(topleft);
    gameCell[0].classList.add('won');
    gameCell[4].classList.add('won');
    gameCell[8].classList.add('won');
  } else if (topright && topright === midmid && topright === bottomleft) {
    handleWin(topright);
    gameCell[2].classList.add('won');
    gameCell[4].classList.add('won');
    gameCell[6].classList.add('won');
  } else if (topleft && topmid && topright && midleft && midmid && midright && bottomleft && bottommid && bottomright) {
    gameLive = false;
    statusB.innerHTML = '<b>Game is tied!</b>';
  } else {
    xNext = !xNext;
    if (xNext) {
      statusB.innerHTML = `${xsymbol} is next`;
    } else {
      statusB.innerHTML = `<span>${osymbol} is next</span>`;
    }
  }
};

//event handlers
const handleReset = () =>{
  xNext = true;
  statusB.innerHTML = `${xsymbol} is next`;
  for (const cell of gameCell) {
    cell.classList.remove('x');
    cell.classList.remove('o');
    cell.classList.remove('won');
  }
  gameLive = true;
};

const handleCellClick = (e) => {
    const classList = e.target.classList;
  

    if(!gameLive || classList[1] === 'x' || classList[1] === 'o'){
        return;
    }

    if(xNext){
        classList.add('x');
        checkstatus();
        
    }else{
        classList.add('o');
        checkstatus();
        
    }
};

//event listeners
resetB.addEventListener('click',handleReset);

for(const gameC of gameCell){
    gameC.addEventListener('click',handleCellClick);
}