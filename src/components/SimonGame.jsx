import React from 'react';
import GameBtn from './GameBtn';

const colors = ["green", "red", "yellow", "blue"];
const SimonGame = () => {
  
    return (
    
    <div className="flex justify-center items-center bg-neutral-800 text-white w-screen h-screen">
      
      <div className="relative flex flex-col justify-center items-center">
        {/* Green and red container */}
        <div>
          {/* Green button */}
          <GameBtn
            color="green"
            border="rounded-tl-full"
            bg="bg-green-500"
            //onClick={handleColorClick}
            //ref={greenRef}
          />

          {/* Red button */}
          <GameBtn
            color="red"
            border="rounded-tr-full"
            bg="bg-red-500"
            //onClick={handleColorClick}
            //ref={redRef}
          />
        </div>

        {/* Yellow and blue container */}
        <div>
          {/* Yellow button */}
          <GameBtn
            color="yellow"
            border="rounded-bl-full"
            bg="bg-yellow-400"
            //onClick={handleColorClick}
            //ref={yellowRef}
          />

          {/* Blue button */}
          <GameBtn
            color="blue"
            border="rounded-br-full"
            bg="bg-blue-500"
            //onClick={handleColorClick}
            //ref={blueRef}
          />
        </div>

        {/* Play button */}
         <button
          className="absolute bg-neutral-900 text-white text-xl sm:text-2xl font-bold rounded-full w-[150px] sm:w-[175px] h-[150px] sm:h-[175px] duration-200 hover:scale-105"
          //onClick={handleNextLevel}
        >
          
        </button>
        
      </div>
    </div>
  );
}

export default SimonGame;
  


