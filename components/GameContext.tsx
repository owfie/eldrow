import React from "react"

interface GameContextShape {
  gameOver: boolean
  setGameOver: (g: boolean) => void
}

export const GameContext = React.createContext<GameContextShape>({gameOver: false, setGameOver: () => {}})

export const GameProvider : React.FC = ({ children }) => {


  const [gameOver, setGameOver] = React.useState(false)

  return <GameContext.Provider value={{gameOver: gameOver, setGameOver: (gameOver) => setGameOver(gameOver)}}>{children}</GameContext.Provider>
}