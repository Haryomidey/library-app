import { extendTheme } from "@chakra-ui/react";

import styles from "./styles";
const breakpoints = {
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em"
};

export default extendTheme(styles, breakpoints);
