import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import globalTheme from "./theme";
import {ContextWrapper} from "./contexts/UserContext";
import Sidebar from "./components/admin/Sidebar";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <ChakraProvider theme={globalTheme}> */}
    <ContextWrapper>
      <App />
    </ContextWrapper>
    {/* </ChakraProvider> */}
  </React.StrictMode>
);

reportWebVitals();
