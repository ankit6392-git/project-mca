/**
 * Common Navbar
 * -------------
 * - App title
 * - User name & role
 * - Profile & Logout buttons
 */

export default function Navbar() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="bg-blue-900 text-white px-6 py-3 flex justify-between items-center">
      {/* App Title */}
      {/* <h1 className="text-lg font-bold tracking-wide">
        Civic Connect
      </h1> */}
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

      {/* User Info + Actions */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold">
            {user.name}
          </p>
          <p className="text-xs capitalize">
            {user.role}
          </p>
        </div>

        {/* Profile */}
        <button
          onClick={() => (window.location.href = "/profile")}
          className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
        >
          Profile
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
