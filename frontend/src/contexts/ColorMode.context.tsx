import {
  createContext,
  type FC,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import { type ColorMode } from "../theme/theme";

export type ColorModeContextType = {
  colorMode: ColorMode;
  toggleColorMode: () => void;
};
export const ColorModeContext = createContext<ColorModeContextType>({
  colorMode: "light",
  toggleColorMode: () => {},
});

export const ColorModeProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [colorMode, setColorMode] = useState<ColorMode>("light");

  const toggleColorMode = () =>
    setColorMode((prevColorMode) =>
      prevColorMode === "light" ? "dark" : "light"
    );

  const value = useMemo(() => ({ colorMode, toggleColorMode }), [colorMode]);

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
};
