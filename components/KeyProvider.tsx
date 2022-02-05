import React from "react"

export const PressedKeyContext = React.createContext<string | undefined>(undefined)

export const KeyProvider: React.FC = ({children}) => {

  const [pressedKey, setPressedKey] = React.useState<string | undefined>(undefined)

  const handleKeyPress = React.useCallback((e: KeyboardEvent) => {
    const letter = e.key
    setPressedKey(letter)
  }, [])

  const handleKeyRelease = React.useCallback(() => {
    setPressedKey(undefined)
  }, [])

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, false);
    document.addEventListener("keyup", handleKeyRelease, false);

    return () => {
      document.removeEventListener("keydown", handleKeyPress, false);

      document.removeEventListener("keyup", handleKeyRelease, false);
    };
  }, [handleKeyPress, handleKeyRelease]);

  return <PressedKeyContext.Provider value={pressedKey}>{children}</PressedKeyContext.Provider>
}