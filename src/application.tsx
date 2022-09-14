import * as React from "react";
import { hot } from "react-hot-loader/root";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { RoutePrivate, RoutePublic } from "components";
import { useStore } from "effector-react";
import * as pages from "./pages";
import theme from "./theme";

const App = (props: {}) => {
  const user = {}

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <RoutePublic path="/" component={pages.Public} />
        <RoutePrivate path="/private" exact={true} component={pages.Private} user={user} />
      </Router>
    </ThemeProvider>
  );
};

export default hot(App);
