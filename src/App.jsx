import { useState } from "react";

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
    <>
      {currentPage === "home" && <HomePage onNavigate={setCurrentPage} />}
      {currentPage === "start" && <StartPage onNavigate={setCurrentPage} />}
      {currentPage === "history" && <HistoryPage onNavigate={setCurrentPage} />}
      {currentPage === "board" && <BoardPage onNavigate={setCurrentPage} />}
      {currentPage === "about" && <AboutPage onNavigate={setCurrentPage} />}
      {currentPage === "manual" && <ManualPage onNavigate={setCurrentPage} />}
      {currentPage === "bank-soal" && (
        <QuestionBankPage onNavigate={setCurrentPage} />
      )}
    </>
  );
}
