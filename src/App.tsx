import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { LocaleProvider } from "./i18n";
import { Analytics } from "@vercel/analytics/next"


/**
 * Main App Component
 * Sets up routing and main layout structure
 *
 * Routes:
 * - / : Home page
 */
console.log("App component loaded");

function App() {
  return (
    <LocaleProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Analytics />
      </Router>
    </LocaleProvider>
  );
}

export default App;
