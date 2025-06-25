import React, { useState, useRef, useEffect } from "react";
import GameBtn from './GameBtn';

const colors = ["green", "red", "yellow", "blue"];
const SimonGame = () => {

    const [sequence, setSequence] = useState([]);
    const [playing, setPlaying] = useState(false);
    const [playingIdx, setPlayingIdx] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");
    const [highScore, setHighScore] = useState(() => {
  
  const saved = localStorage.getItem("memorysync-highscore");
  return saved ? parseInt(saved, 10) : 0;
});
    const [selectedDifficulty, setSelectedDifficulty] = useState("medium");

    // refs
    const greenRef = useRef(null);
    const redRef = useRef(null);
    const yellowRef = useRef(null);
    const blueRef = useRef(null);

    const resetGame = () => {
    setSequence([]);
    setPlaying(false);
    setPlayingIdx(0);
  };

  const addNewColor = () => {
    const color = colors[Math.floor(Math.random() * 4)];
    const newSequence = [...sequence, color];
    setSequence(newSequence);

    if (newSequence.length > highScore) {
  setHighScore(newSequence.length);
  localStorage.setItem("memorysync-highscore", newSequence.length.toString());
}
  };

  const handleNextLevel = () => {
    if (!playing) {
      setPlaying(true);
      addNewColor();
      setErrorMsg("");
    }
  };

  const handleColorClick = (e) => {
    if (playing) {
      e.target.classList.add("opacity-50");

      setTimeout(() => {
        e.target.classList.remove("opacity-50");

        const clickColor = e.target.getAttribute("color");

        
        if (sequence[playingIdx] === clickColor) {
          
          if (playingIdx === sequence.length - 1) {
            setTimeout(() => {
              setPlayingIdx(0);
              addNewColor();
            }, 250);
          }

          
          else {
            setPlayingIdx(playingIdx + 1);
          }
        }

        
        else {
          resetGame();
          setErrorMsg("That was incorrect. Play again.");
        }
      }, 250);
    }
  };

  
  useEffect(() => {
    
    if (sequence.length > 0) {
      const showSequence = (idx = 0) => {
        let ref = null;

        if (sequence[idx] === "green") ref = greenRef;
        if (sequence[idx] === "red") ref = redRef;
        if (sequence[idx] === "yellow") ref = yellowRef;
        if (sequence[idx] === "blue") ref = blueRef;

        
        setTimeout(() => {
          ref.current.classList.add("brightness-[4]", "scale-110");

          setTimeout(() => {
            ref.current.classList.remove("brightness-[4]", "scale-110");
            if (idx < sequence.length - 1) showSequence(idx + 1);
          }, 250);
        }, 250);
      };

      showSequence();
    }
  }, [sequence]);
  
    return (
  <div className="flex flex-col bg-neutral-900 text-white min-h-screen w-screen">
    {/* Header */}
    <header className="text-center py-8 mb-12">
      <h1 className="text-5xl font-extrabold mb-2">MemorySync</h1>
      <p className="text-lg text-gray-300">Sequential memory and attention training game</p>
    </header>

    {/* Info Panel */}
    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-5 mb-10">
      {/* High Score */}
      <div className="bg-neutral-800 p-5 rounded-lg shadow-md w-64 text-center">
        <p className="text-xl font-semibold">High Score</p>
        <p className="text-4xl font-bold text-yellow-400 mt-2">{highScore}</p>
        {errorMsg && (
    <p className="text-red-400 text-sm mt-3">{errorMsg}</p>
  )}

  <button
  className="mt-2 text-xs text-gray-400 hover:text-white underline"
  onClick={() => {
    localStorage.removeItem("memorysync-highscore");
    setHighScore(0);
  }}
>
  Reset High Score
</button>
      </div>

      {/* Difficulty */}
<div className="bg-neutral-800 p-6 rounded-xl shadow-lg w-80 text-center mtb-10">
  <p className="text-2xl font-semibold mb-4">Select Difficulty</p>
  <div className="flex justify-center gap-4">
    {["easy", "medium", "hard"].map((level) => {
      const baseClasses = "px-5 py-3 rounded-lg text-lg font-semibold transition-transform duration-200";
      const isSelected = selectedDifficulty === level;
      const selectedClass = isSelected ? "scale-110 ring-2 ring-white" : "";

      const colorMap = {
        easy: "bg-green-500 hover:bg-green-600",
        medium: "bg-yellow-500 hover:bg-yellow-600",
        hard: "bg-red-500 hover:bg-red-600",
      };

      return (
        <button
          key={level}
          onClick={() => setSelectedDifficulty(level)}
          className={`${baseClasses} ${colorMap[level]} ${selectedClass}`}
        >
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </button>
      );
    })}
  </div>
</div>
    </div>

    {/* Game area */}
    <main className="flex flex-1 items-center justify-center">
      <div className="relative flex flex-col justify-center items-center">
        <div>
          <GameBtn color="green" border="rounded-tl-full" bg="bg-green-500" onClick={handleColorClick} ref={greenRef} />
          <GameBtn color="red" border="rounded-tr-full" bg="bg-red-500" onClick={handleColorClick} ref={redRef} />
        </div>
        <div>
          <GameBtn color="yellow" border="rounded-bl-full" bg="bg-yellow-400" onClick={handleColorClick} ref={yellowRef} />
          <GameBtn color="blue" border="rounded-br-full" bg="bg-blue-500" onClick={handleColorClick} ref={blueRef} />
        </div>
        <button
          className="absolute bg-neutral-900 text-white text-xl sm:text-2xl font-bold rounded-full w-[150px] sm:w-[175px] h-[150px] sm:h-[175px] duration-200 hover:scale-105"
          onClick={handleNextLevel}
        >
          {sequence.length === 0 ? "Play" : sequence.length}
        </button>
      </div>
    </main>
  </div>
);


}

export default SimonGame;
  


