import Router from "./router/Router";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "./theme/theme";
import { PAGES_ROUTES } from "./router/routes.const";
import { Box, Toolbar } from "@mui/material";
import Styles from "./App.style";
import SideDrawer from "./components/sideDrawer/SideDrawer";
import AppHeader from "./components/appHeader/appHeader";
import useToggle from "./hooks/useToggle";
import { ColorModeContext } from "./contexts/ColorMode.context";
import { useContext } from "react";

const App = () => {
  const {
    open: mobileDrawerOpen,
    handleClose: handleMobileDrawerClose,
    handleOpen: handleMobileDrawerOpen,
  } = useToggle();

  const { colorMode } = useContext(ColorModeContext);

  return (
    <ThemeProvider theme={createAppTheme(colorMode)}>
      <Box sx={Styles.rootLayout}>
        <AppHeader handleMobileDrawerOpen={handleMobileDrawerOpen} />

        <SideDrawer
          mobileDrawerOpen={mobileDrawerOpen}
          handleMobileDrawerClose={handleMobileDrawerClose}
        />
        <Box component="main" sx={Styles.contentArea}>
          <Toolbar />
          <Router routes={PAGES_ROUTES} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
