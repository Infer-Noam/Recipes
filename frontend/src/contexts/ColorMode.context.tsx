import {
  createContext,
  type FC,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import { ColorMode } from "../theme/colorMode.enum";

export type ColorModeContextType = {
  colorMode: ColorMode;
  toggleColorMode: () => void;
};
export const ColorModeContext = createContext<ColorModeContextType>({
  colorMode: ColorMode.LIGHT,
  toggleColorMode: () => {},
});

export const ColorModeProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [colorMode, setColorMode] = useState<ColorMode>(ColorMode.LIGHT);

  const toggleColorMode = () =>
    setColorMode((prevColorMode) =>
      prevColorMode === ColorMode.LIGHT ? ColorMode.DARK : ColorMode.LIGHT
    );

  const value = useMemo(() => ({ colorMode, toggleColorMode }), [colorMode]);

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
};
