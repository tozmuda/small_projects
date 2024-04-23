import { useState } from "react";
import { CSSTransition } from "react-transition-group";

const Grid = () => {
  const [currTurn, changeTurn] = useState(1);
  const [squaresState, changeState] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [block, changeBlock] = useState(false);

  const checkWin = (squareNo: number) => {
    let verMatch = 0;

    if (squareNo - 6 >= 0 && squaresState[squareNo - 6] === currTurn)
      verMatch++;
    if (squareNo - 3 >= 0 && squaresState[squareNo - 3] === currTurn)
      verMatch++;
    if (squareNo + 3 <= 8 && squaresState[squareNo + 3] === currTurn)
      verMatch++;
    if (squareNo + 6 <= 8 && squaresState[squareNo + 6] === currTurn)
      verMatch++;
    if (verMatch == 2) return 1;

    if (
      squareNo % 3 === 0 &&
      squaresState[squareNo + 1] === squaresState[squareNo + 2] &&
      squaresState[squareNo + 1] == currTurn
    )
      return 1;
    if (
      squareNo % 3 === 1 &&
      squaresState[squareNo - 1] === squaresState[squareNo + 1] &&
      squaresState[squareNo + 1] == currTurn
    )
      return 1;
    if (
      squareNo % 3 === 2 &&
      squaresState[squareNo - 1] === squaresState[squareNo - 2] &&
      squaresState[squareNo - 1] == currTurn
    )
      return 1;

    if (
      squareNo === 8 &&
      squaresState[4] === squaresState[0] &&
      squaresState[4] === currTurn
    )
      return 1;
    if (
      squareNo === 0 &&
      squaresState[4] === squaresState[8] &&
      squaresState[4] === currTurn
    )
      return 1;
    if (
      squareNo === 2 &&
      squaresState[4] === squaresState[6] &&
      squaresState[4] === currTurn
    )
      return 1;
    if (
      squareNo === 6 &&
      squaresState[4] === squaresState[2] &&
      squaresState[4] === currTurn
    )
      return 1;
    if (
      squareNo === 4 &&
      squaresState[0] === squaresState[8] &&
      squaresState[0] === currTurn
    )
      return 1;
    if (
      squareNo === 4 &&
      squaresState[2] === squaresState[6] &&
      squaresState[2] === currTurn
    )
      return 1;

    return 0;
  };

  const tryPlace = (squareNo: number) => {
    if (squaresState[squareNo] === 0 && block === false) {
      if (currTurn === 1) {
        place(squareNo, 1);
      } else {
        place(squareNo, 2);
      }
      if (checkWin(squareNo) === 1) {
        changeBlock(true);
        // console.log("win");
      }
      currTurn === 1 ? changeTurn(2) : changeTurn(1);
    }
  };

  const place = (squareNo: number, state: number) => {
    changeState(
      squaresState.map((square, index) => (index === squareNo ? state : square))
    );
  };

  const resetGrid = () => {
    changeBlock(false);
    changeTurn(1);
    changeState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  };

  return (
    <div className="container text-center col-4 grid">
      <CSSTransition
        in={block}
        timeout={1000}
        classNames="popup"
      >
        <div className="popup popup-enter">
          <p>Winner is { currTurn === 2 ? "X" : "O" } </p>
        </div>
      </CSSTransition>
      <div className="row">
        <div
          className="col-4 h-100 square"
          onClick={() => tryPlace(0)}
        >
          {squaresState[0] === 0 ? " " : squaresState[0] === 1 ? "X" : "O"}
        </div>
        <div
          className="col-4 h-100 square"
          onClick={() => tryPlace(1)}
        >
          {squaresState[1] === 0 ? " " : squaresState[1] === 1 ? "X" : "O"}
        </div>
        <div
          className="col-4 h-100 square"
          onClick={() => tryPlace(2)}
        >
          {squaresState[2] === 0 ? " " : squaresState[2] === 1 ? "X" : "O"}
        </div>
      </div>

      <div className="row">
        <div
          className="col-4 h-100 square"
          onClick={() => tryPlace(3)}
        >
          {squaresState[3] === 0 ? " " : squaresState[3] === 1 ? "X" : "O"}
        </div>
        <div
          className="col-4 h-100 square"
          onClick={() => tryPlace(4)}
        >
          {squaresState[4] === 0 ? " " : squaresState[4] === 1 ? "X" : "O"}
        </div>
        <div
          className="col-4 h-100 square"
          onClick={() => tryPlace(5)}
        >
          {squaresState[5] === 0 ? " " : squaresState[5] === 1 ? "X" : "O"}
        </div>
      </div>

      <div className="row">
        <div
          className="col-4 h-100 square"
          onClick={() => tryPlace(6)}
        >
          {squaresState[6] === 0 ? " " : squaresState[6] === 1 ? "X" : "O"}
        </div>
        <div
          className="col-4 h-100 square"
          onClick={() => tryPlace(7)}
        >
          {squaresState[7] === 0 ? " " : squaresState[7] === 1 ? "X" : "O"}
        </div>
        <div
          className="col-4 h-100 square"
          onClick={() => tryPlace(8)}
        >
          {squaresState[8] === 0 ? " " : squaresState[8] === 1 ? "X" : "O"}
        </div>
      </div>

      <button
        type="button"
        className="btn btn-warning reset-btn"
        onClick={resetGrid}
      >
        Reset
      </button>
    </div>
  );
};

export default Grid;
