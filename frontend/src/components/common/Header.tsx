import { Link } from "react-router-dom";
import AnnouncementTicker from "./AnnouncementTicker";
import { useTheme } from "../../hooks/useTheme";

/**
 * Public Header
 * -------------
 * Used only on Home page
 */
export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement */}
      {/* <AnnouncementTicker /> */}

      {/* Main Header */}
      <div className="bg-slate-950/90 backdrop-blur border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Branding */}
          <div>
            {/* <p className="text-xs text-slate-400 uppercase">
              Government of India (Demo)
            </p> */}
            <h1 className="text-xl font-bold">
              Civic Connect
            </h1>
            <p className="text-xs text-slate-400">
              National Grievance Redressal Portal
            </p>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#about" className="hover:text-indigo-400">About</a>
            <a href="#stats" className="hover:text-indigo-400">Statistics</a>
            <a href="#faq" className="hover:text-indigo-400">
              FAQ <span className="ml-1 bg-red-600 text-white text-xs px-2 py-0.5 rounded">New</span>
            </a>
            <a href="#contact" className="hover:text-indigo-400">Contact</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            {/* <button
              onClick={toggleTheme}
              className="text-xl"
              title="Toggle theme"
            >
              {theme === "dark" ? "🌙" : "🌞"}
            </button> */}

            <Link
              to="/login"
              className="px-4 py-2 border border-slate-600 rounded hover:bg-slate-800"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
