import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import ChatPage from "scenes/chatPage";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import io from "socket.io-client";
import { SocketContext } from "context/socket";

const SOCKET_URL = process.env.NODE_ENV === 'production' ? process.env.REACT.USER.API : "http://localhost:3001"

function App() {
  const mode = useSelector((state) => state.auth.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.auth.token));
  const socket = isAuth ? io.connect(SOCKET_URL) : undefined;
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SocketContext.Provider value={socket}>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route
                path="/home"
                element={isAuth ? <HomePage /> : <Navigate to="/" />}
              />
              <Route
                path="/profile/:userId"
                element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
              />
              <Route
                path='/message'
                element={isAuth ? <ChatPage /> : <Navigate to="/" />}
              >
              </Route>
            </Routes>
          </SocketContext.Provider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
