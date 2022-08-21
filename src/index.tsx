import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "store/store";

import App from "./App";
import { Main } from "pages/main/Main";

import "./globals.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
