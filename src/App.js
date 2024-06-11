import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/Login/log";
import Home from "./components/GestionnaireStock/Home";
import Stock from "./components/GestionnaireStock/Stock";
import BonL from "./components/GestionnaireStock/BonL";
import ListBL from "./components/GestionnaireStock/ListBL";
import ListFacture from "./components/GestionnaireStock/ListFacture";
import ListDdachat from "./components/GestionnaireStock/ListDdachat";
import AStock from "./components/ResponssablAchat/AStock"
import DemAchat from "./components/ResponssablAchat/DemAchat";
import ListBC from "./components/ResponssablAchat/ListBC";
import ListBR from "./components/GestionnaireStock/ListBR";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Stock" element={<Stock />} />
        <Route path="/AStock" element={<AStock />} />
        <Route path="/Command" element={<BonL />} />
        <Route path="/Demmand" element={<DemAchat />} />
        <Route path="/BL" element={<ListBL />} />
        <Route path="/BC" element={<ListBC />} />
        <Route path="/Fac" element={<ListFacture />} />
        <Route path="/DD" element={<ListDdachat />} />
        <Route path="/BR" element={<ListBR />} />
      </Routes>
    </Router>
  );
};

export default App;
