import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { client } from "./graphql/client";
import { RouterWrapper } from "./router/Router";
import { AuthProvider } from "./context/AuthContext";
import { theme } from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <AuthProvider>
          <BrowserRouter>
            <RouterWrapper />
            <ToastContainer />
          </BrowserRouter>
        </AuthProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
