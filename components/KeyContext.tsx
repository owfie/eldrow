import React from "react"

interface KeyContextShape {
  activeKey: string | undefined
  pressedKey: string | undefined
  setKey: (key?: string) => void
}

export const alphabet = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m','Backspace','Enter']

export const PressedKeyContext = React.createContext<KeyContextShape>({activeKey: undefined, pressedKey: undefined, setKey: () => {}})

export const KeyProvider: React.FC = ({children}) => {

  const [pressedKey, setPressedKey] = React.useState<string | undefined>(undefined)
  const [activeKey, setActiveKey] = React.useState<string | undefined>(undefined)

  const handleKeyPress = React.useCallback((e: KeyboardEvent) => {
    const letter = e.key

    if (alphabet.includes(letter)) {
      setPressedKey(letter)
    } else {
      const key = letter.toLowerCase()
      if (alphabet.includes(key)) setPressedKey(key)
    }
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

  return <PressedKeyContext.Provider value={{activeKey, pressedKey, setKey: (key) => setPressedKey(key)}}>{children}</PressedKeyContext.Provider>
}