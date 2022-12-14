import { createTheme, Theme as CoreTheme } from "@material-ui/core/styles";

import palette from "./palette";
import overrides from "./overrides";
import typography from "./typography";

export interface Theme extends CoreTheme {
  custom?: string;
}

const theme: Theme = createTheme({
  palette,
  overrides,
  typography
});

theme.custom = "works!";

export default theme;
