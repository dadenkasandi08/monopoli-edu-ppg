import { Routes, Route } from "react-router-dom";

import AboutPage from "./pages/AboutPage";
import BoardPage from "./pages/BoardPage";
import HistoryPage from "./pages/HistoryPage";
import HomePage from "./pages/HomePage";
import ManualPage from "./pages/ManualPage";
import StartPage from "./pages/StartPage";
import TambahSoalPage from "./pages/TambahSoalPage";

function App() {
  return (
    <div>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/manual" element={<ManualPage />} />
          <Route path="/start" element={<StartPage />} />
          <Route path="/tambah-soal" element={<TambahSoalPage />} />
        </Routes>
      </main>
      <footer>
        <p>© 2023 Monopoli Edu</p>
      </footer>
    </div>
  );
}

export default App;
