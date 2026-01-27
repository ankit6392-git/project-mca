// import { Link, NavLink } from "react-router-dom";
// //import { useAuth } from "../../context/AuthContext";
// import { useAuth } from "../hooks/useAuth";



// export default function Navbar() {
//   const { user, logout } = useAuth();

//   return (
//     <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur border-b border-slate-800">
//       <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
//         {/* Logo */}
//         <Link to="/" className="text-xl font-bold tracking-wide">
//           Civic<span className="text-indigo-500">Connect</span>
//         </Link>

//         {/* Links */}
//         <div className="flex items-center gap-6 text-sm">
//           <NavLink
//             to="/issues"
//             className={({ isActive }) =>
//               isActive ? "text-indigo-400" : "text-slate-300 hover:text-white"
//             }
//           >
//             Issues
//           </NavLink>

//           {user ? (
//             <>
//               <NavLink
//                 to="/dashboard"
//                 className={({ isActive }) =>
//                   isActive ? "text-indigo-400" : "text-slate-300 hover:text-white"
//                 }
//               >
//                 Dashboard
//               </NavLink>

//               {user.role === "ADMIN" && (
//                 <NavLink
//                   to="/admin"
//                   className="text-slate-300 hover:text-white"
//                 >
//                   Admin
//                 </NavLink>
//               )}

//               <button
//                 onClick={logout}
//                 className="ml-4 px-4 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <NavLink
//                 to="/login"
//                 className="text-slate-300 hover:text-white"
//               >
//                 Login
//               </NavLink>
//               <NavLink
//                 to="/register"
//                 className="px-4 py-1.5 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
//               >
//                 Register
//               </NavLink>
//             </>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// }

export default function Navbar() {
  return (
    <div className="gov-header p-4 flex justify-between">
      <h1 className="font-bold text-lg">
        CivicConnect – Government of India
      </h1>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
        className="bg-red-600 px-3 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}

