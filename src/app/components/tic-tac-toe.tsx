"use client";

import { useState } from "react";

import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { HashIcon, X } from "lucide-react";
import { cn } from "@/src/lib/utils";

function Square({
  value,
  onSquareClick,
  isWinningSquare,
}: {
  value: string | null;
  onSquareClick: () => void;
  isWinningSquare: boolean;
}) {
  return (
    <button
      className={`h-20 w-20 border-2 border-primary/20 text-4xl font-bold flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors
        ${isWinningSquare ? "bg-primary/20" : "hover:bg-primary/10"}`}
      onClick={onSquareClick}
      aria-label={value ? `${value} is in this square` : "Empty square"}
    >
      {value}
    </button>
  );
}

function Board({
  squares,
  xIsNext,
  onPlay,
}: {
  squares: (string | null)[];
  xIsNext: boolean;
  onPlay: (nextSquares: (string | null)[]) => void;
}) {
  const winner = calculateWinner(squares);
  const winningLine = winner ? winner.line : [];

  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  let status;
  if (winner) {
    status = `Winner: ${winner.player}`;
  } else if (squares.every((square) => square !== null)) {
    status = "Draw! Game over";
  } else {
    status = `Proximo jogador: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-xl font-medium">{status}</div>
      <div className="grid grid-cols-3 gap-1">
        {Array(9)
          .fill(null)
          .map((_, i) => (
            <Square
              key={i}
              value={squares[i]}
              onSquareClick={() => handleClick(i)}
              isWinningSquare={winningLine.includes(i)}
            />
          ))}
      </div>
    </div>
  );
}

export default function TicTacToe() {
  const [squares, setSquares] = useState<(string | null)[]>(
    Array(9).fill(null)
  );

  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const [xIsNext, setXIsNext] = useState(true);

  function handlePlay(nextSquares: (string | null)[]) {
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <>
      {!isOpen && (
        <div
          className="fixed bottom-6 right-24 z-20 cursor-pointer"
          onClick={toggleChat}
        >
          <div className="bg-[#009CE0] rounded-full p-4 shadow-lg hover:scale-110 transition-transform duration-300">
            <HashIcon className="h-6 w-6 text-white" />
          </div>
        </div>
      )}

      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-80 sm:w-96 rounded-lg shadow-xl flex flex-col bg-[#424a59] overflow-hidden transition-all duration-300 transform",
          isOpen
            ? "opacity-100 scale-100 animate-bounce-in h-[500px]"
            : "opacity-0 scale-0 h-0"
        )}
      >
        <Card className="w-full max-w-md p-6 shadow-lg relative">
          <X
            className="absolute right-2 top-2 cursor-pointer"
            onClick={toggleChat}
          />
          <h1 className="mb-6 text-center text-3xl font-bold">Tic Tac Toe</h1>

          <Board xIsNext={xIsNext} squares={squares} onPlay={handlePlay} />

          <div className="mt-6 flex justify-center">
            <Button onClick={resetGame} variant="outline">
              Restart Game
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: lines[i] };
    }
  }

  return null;
}
