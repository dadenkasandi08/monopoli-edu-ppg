import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import AboutPage from "./pages/AboutPage";
import BoardPage from "./pages/BoardPage";
import HistoryPage from "./pages/HistoryPage";
import HomePage from "./pages/HomePage";
import ManualPage from "./pages/ManualPage";
import StartPage from "./pages/StartPage";
import QuestionBankPage from "./pages/TambahSoalPage";

export default function App() {
  // State untuk melacak halaman mana yang sedang dibuka (home, start, history, board)
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <Routes>
      <Route path="/" element={<HomePage onNavigate={setCurrentPage} />} />
      <Route
        path="/start"
        element={<StartPage onNavigate={setCurrentPage} />}
      />
      <Route
        path="/history"
        element={<HistoryPage onNavigate={setCurrentPage} />}
      />
      <Route
        path="/board"
        element={<BoardPage onNavigate={setCurrentPage} />}
      />
      <Route
        path="/about"
        element={<AboutPage onNavigate={setCurrentPage} />}
      />
      <Route
        path="/manual"
        element={<ManualPage onNavigate={setCurrentPage} />}
      />
      <Route
        path="/bank-soal"
        element={<QuestionBankPage onNavigate={setCurrentPage} />}
      />
    </Routes>
  );
}
