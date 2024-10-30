"use client"; 
import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NumberGuessingState {
    gameStarted:boolean;
    gameOver : boolean;
    paused:boolean;
    targetNumber:number;
    userGuess:number;
    attempts: number;

}

export default function NumberGuessing(): JSX.Element {
    
    const [gameStarted , setGameStarted] = useState<boolean>(false);
    const [gameOver ,setGameOver] = useState<boolean>(false);
    const [paused , setPaused] = useState <boolean>(false);
    const [targetNumber, setTargetNumber] = useState<number>(0);
    const [userGuess , setuserGuess] = useState<number | string>("");
    const [attempts, setAttempts] = useState<number>(0);

    

    useEffect(() => {
        if (gameStarted && !paused) {
          const randomNumber:number = Math.floor(Math.random() * 10) + 1;
          setTargetNumber(randomNumber);
        }
      }, [gameStarted, paused]);


      const handleStartGame = (): void => {
        setGameStarted(true);
        setGameOver(false);
        setAttempts(0);
        setPaused(false);
      };

      const handlePauseGame = ():void =>{
        setPaused(true);
      };

      const handleResumeGame  = ():void =>{
        setPaused(false);
      }; 


      const handleGuess  = ():void =>{
        if (typeof userGuess === "number" && userGuess === targetNumber) {
            setGameOver(true);
        }else {
            setAttempts(attempts + 1);
          }
      };

      const handleTryAgain  = ():void =>{
        setGameStarted(false);
        setGameOver(false);
        setuserGuess("");
        setAttempts(0);
      };


      const handleUserGuessChange = (e: ChangeEvent<HTMLInputElement>):void =>{
        setuserGuess(parseInt(e.target.value));
      };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-black">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
                    Number Guessing Game
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    Try to guess a number between 1 and 10!
                </p>
    
                {!gameStarted && (
                    <div className="flex justify-center mb-6">
                        <Button
                            onClick={handleStartGame}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300"
                        >
                            Start Game
                        </Button>
                    </div>
                )}
    
                {gameStarted && !gameOver && (
                    <div>
                        <div className="flex justify-center mb-4">
                            {paused ? (
                                <Button
                                    onClick={handleResumeGame}
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300"
                                >
                                    Resume
                                </Button>
                            ) : (
                                <Button
                                    onClick={handlePauseGame}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300"
                                >
                                    Pause
                                </Button>
                            )}
                        </div>
                        <div className="flex justify-center mb-4">
                            <Input
                                type="number"
                                value={userGuess}
                                onChange={handleUserGuessChange}
                                className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 w-full max-w-xs shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                                placeholder="Enter your guess"
                            />
                            <Button
                                onClick={handleGuess}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg ml-4 shadow-md transition duration-300"
                            >
                                Guess
                            </Button>
                        </div>
                        <div className="text-gray-800 text-center">
                            <p className="font-semibold">Attempts: {attempts}</p>
                        </div>
                    </div>
                )}
    
                {gameOver && (
                    <div>
                        <div className="text-center mb-4 text-gray-800">
                            <h2 className="text-2xl font-bold">Game Over!</h2>
                            <p className="mt-2">You guessed the number in {attempts} attempts.</p>
                        </div>
                        <div className="flex justify-center">
                            <Button
                                onClick={handleTryAgain}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
                            >
                                Try Again
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
    
}



