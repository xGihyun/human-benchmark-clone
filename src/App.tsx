import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from './components/Layout';
import AimTrainer from "./pages/AimTrainer";
import ChimpTest from "./pages/ChimpTest";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="aim-trainer" element={<AimTrainer />} />
        <Route path="chimp-test" element={<ChimpTest />} />
      </Route>
    </Routes>
  )
}

export default App
