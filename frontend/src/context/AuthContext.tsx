// // // // // // // // import { createContext, useContext, useEffect, useState } from "react";

// // // // // // // // /**
// // // // // // // //  * Types for user & auth context
// // // // // // // //  */
// // // // // // // // type User = {
// // // // // // // //   id: string;
// // // // // // // //   name: string;
// // // // // // // //   email: string;
// // // // // // // //   role: "admin" | "citizen" | "authority";
// // // // // // // // };

// // // // // // // // type AuthContextType = {
// // // // // // // //   user: User | null;
// // // // // // // //   token: string | null;
// // // // // // // //   login: (data: { token: string; user: User }) => void;
// // // // // // // //   logout: () => void;
// // // // // // // // };

// // // // // // // // /**
// // // // // // // //  * Create context
// // // // // // // //  */
// // // // // // // // const AuthContext = createContext<AuthContextType | null>(null);

// // // // // // // // /**
// // // // // // // //  * AuthProvider
// // // // // // // //  * ------------
// // // // // // // //  * Wraps entire app
// // // // // // // //  * Handles auto-login on refresh
// // // // // // // //  */
// // // // // // // // export function AuthProvider({ children }: { children: React.ReactNode }) {
// // // // // // // //   const [user, setUser] = useState<User | null>(null);
// // // // // // // //   const [token, setToken] = useState<string | null>(null);

// // // // // // // //   /**
// // // // // // // //    * Auto-login when app loads
// // // // // // // //    */
// // // // // // // //   useEffect(() => {
// // // // // // // //     const storedToken = localStorage.getItem("token");
// // // // // // // //     const storedUser = localStorage.getItem("user");

// // // // // // // //     if (storedToken && storedUser) {
// // // // // // // //       setToken(storedToken);
// // // // // // // //       setUser(JSON.parse(storedUser));
// // // // // // // //     }
// // // // // // // //   }, []);

// // // // // // // //   /**
// // // // // // // //    * Login handler
// // // // // // // //    */
// // // // // // // //   function login(data: { token: string; user: User }) {
// // // // // // // //     localStorage.setItem("token", data.token);
// // // // // // // //     localStorage.setItem("user", JSON.stringify(data.user));
// // // // // // // //     setToken(data.token);
// // // // // // // //     setUser(data.user);
// // // // // // // //   }

// // // // // // // //   /**
// // // // // // // //    * Logout handler
// // // // // // // //    */
// // // // // // // //   function logout() {
// // // // // // // //     localStorage.clear();
// // // // // // // //     setToken(null);
// // // // // // // //     setUser(null);
// // // // // // // //   }

// // // // // // // //   return (
// // // // // // // //     <AuthContext.Provider value={{ user, token, login, logout }}>
// // // // // // // //       {children}
// // // // // // // //     </AuthContext.Provider>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // /**
// // // // // // // //  * Custom hook
// // // // // // // //  */
// // // // // // // // export function useAuth() {
// // // // // // // //   const context = useContext(AuthContext);
// // // // // // // //   if (!context) {
// // // // // // // //     throw new Error("useAuth must be used inside AuthProvider");
// // // // // // // //   }
// // // // // // // //   return context;
// // // // // // // // }

// // // // // // // import {
// // // // // // //   createContext,
// // // // // // //   useContext,
// // // // // // //   useEffect,
// // // // // // //   useState,
// // // // // // // } from "react";
// // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // import api from "../services/api";

// // // // // // // /**
// // // // // // //  * Types
// // // // // // //  */
// // // // // // // type UserRole = "admin" | "citizen" | "authority";

// // // // // // // interface User {
// // // // // // //   _id: string;
// // // // // // //   name: string;
// // // // // // //   email: string;
// // // // // // //   role: UserRole;
// // // // // // //   department?: string;
// // // // // // // }

// // // // // // // interface AuthContextType {
// // // // // // //   user: User | null;
// // // // // // //   loading: boolean;
// // // // // // //   login: (token: string) => void;
// // // // // // //   logout: () => void;
// // // // // // // }

// // // // // // // /**
// // // // // // //  * Context creation
// // // // // // //  */
// // // // // // // const AuthContext = createContext<AuthContextType | null>(null);

// // // // // // // /**
// // // // // // //  * Provider
// // // // // // //  */
// // // // // // // export const AuthProvider = ({
// // // // // // //   children,
// // // // // // // }: {
// // // // // // //   children: React.ReactNode;
// // // // // // // }) => {
// // // // // // //   const [user, setUser] = useState<User | null>(null);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const navigate = useNavigate();

// // // // // // //   /**
// // // // // // //    * Auto-login on page refresh
// // // // // // //    */
// // // // // // //   useEffect(() => {
// // // // // // //     const token = localStorage.getItem("token");
// // // // // // //     if (token) {
// // // // // // //       fetchMe();
// // // // // // //     } else {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   }, []);

// // // // // // //   /**
// // // // // // //    * Fetch logged-in user using JWT
// // // // // // //    */
// // // // // // //   const fetchMe = async () => {
// // // // // // //     try {
// // // // // // //       const res = await api.get("/auth/me");
// // // // // // //       setUser(res.data.user);
// // // // // // //       roleRedirect(res.data.user.role);
// // // // // // //     } catch {
// // // // // // //       logout();
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   /**
// // // // // // //    * Login handler
// // // // // // //    */
// // // // // // //   const login = (token: string) => {
// // // // // // //     localStorage.setItem("token", token);
// // // // // // //     fetchMe();
// // // // // // //   };

// // // // // // //   /**
// // // // // // //    * Logout handler
// // // // // // //    */
// // // // // // //   const logout = () => {
// // // // // // //     localStorage.removeItem("token");
// // // // // // //     setUser(null);
// // // // // // //     navigate("/login");
// // // // // // //   };

// // // // // // //   /**
// // // // // // //    * Role-based redirect
// // // // // // //    */
// // // // // // //   const roleRedirect = (role: UserRole) => {
// // // // // // //     if (role === "admin") navigate("/admin");
// // // // // // //     if (role === "authority") navigate("/authority");
// // // // // // //     if (role === "citizen") navigate("/dashboard");
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <AuthContext.Provider
// // // // // // //       value={{ user, loading, login, logout }}
// // // // // // //     >
// // // // // // //       {children}
// // // // // // //     </AuthContext.Provider>
// // // // // // //   );
// // // // // // // };

// // // // // // // /**
// // // // // // //  * Hook
// // // // // // //  */
// // // // // // // export const useAuth = () => {
// // // // // // //   const ctx = useContext(AuthContext);
// // // // // // //   if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
// // // // // // //   return ctx;
// // // // // // // };

// // // // // // import { createContext, useEffect, useState } from "react";
// // // // // // import api from "../services/api";

// // // // // // /**
// // // // // //  * Shape of auth state
// // // // // //  */
// // // // // // type AuthContextType = {
// // // // // //   user: any;
// // // // // //   token: string | null;
// // // // // //   login: (data: any) => void;
// // // // // //   logout: () => void;
// // // // // // };

// // // // // // /**
// // // // // //  * ✅ Named export (IMPORTANT)
// // // // // //  */
// // // // // // export const AuthContext = createContext<AuthContextType | null>(null);

// // // // // // export function AuthProvider({ children }: { children: React.ReactNode }) {
// // // // // //   const [user, setUser] = useState<any>(null);
// // // // // //   const [token, setToken] = useState<string | null>(null);

// // // // // //   // Auto-login on refresh
// // // // // //   useEffect(() => {
// // // // // //     const savedToken = localStorage.getItem("token");
// // // // // //     const savedUser = localStorage.getItem("user");

// // // // // //     if (savedToken && savedUser) {
// // // // // //       setToken(savedToken);
// // // // // //       setUser(JSON.parse(savedUser));
// // // // // //       api.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
// // // // // //     }
// // // // // //   }, []);

// // // // // //   const login = (data: any) => {
// // // // // //     setUser(data.user);
// // // // // //     setToken(data.token);

// // // // // //     localStorage.setItem("token", data.token);
// // // // // //     localStorage.setItem("user", JSON.stringify(data.user));

// // // // // //     api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
// // // // // //   };

// // // // // //   const logout = () => {
// // // // // //     setUser(null);
// // // // // //     setToken(null);
// // // // // //     localStorage.clear();
// // // // // //     delete api.defaults.headers.common["Authorization"];
// // // // // //   };

// // // // // //   return (
// // // // // //     <AuthContext.Provider value={{ user, token, login, logout }}>
// // // // // //       {children}
// // // // // //     </AuthContext.Provider>
// // // // // //   );
// // // // // // }

// // // // // import { createContext, useEffect, useState } from "react";
// // // // // import api from "../services/api";

// // // // // type User = {
// // // // //   _id: string;
// // // // //   name: string;
// // // // //   email: string;
// // // // //   role: "admin" | "citizen" | "authority";
// // // // // };

// // // // // type AuthContextType = {
// // // // //   user: User | null;
// // // // //   token: string | null;
// // // // //   login: (token: string) => Promise<void>;
// // // // //   logout: () => void;
// // // // //   loading: boolean;
// // // // // };

// // // // // export const AuthContext = createContext<AuthContextType | null>(null);

// // // // // export function AuthProvider({ children }: { children: React.ReactNode }) {
// // // // //   const [user, setUser] = useState<User | null>(null);
// // // // //   const [token, setToken] = useState<string | null>(
// // // // //     localStorage.getItem("token")
// // // // //   );
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   // Auto-login on refresh
// // // // //   useEffect(() => {
// // // // //     async function loadUser() {
// // // // //       if (!token) {
// // // // //         setLoading(false);
// // // // //         return;
// // // // //       }

// // // // //       try {
// // // // //         const res = await api.get("/auth/me");
// // // // //         setUser(res.data);
// // // // //       } catch {
// // // // //         logout();
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     }

// // // // //     loadUser();
// // // // //   }, [token]);

// // // // //   async function login(jwt: string) {
// // // // //     localStorage.setItem("token", jwt);
// // // // //     setToken(jwt);

// // // // //     const res = await api.get("/auth/me");
// // // // //     setUser(res.data);
// // // // //   }

// // // // //   function logout() {
// // // // //     localStorage.removeItem("token");
// // // // //     setUser(null);
// // // // //     setToken(null);
// // // // //   }

// // // // //   return (
// // // // //     <AuthContext.Provider value={{ user, token, login, logout, loading }}>
// // // // //       {children}
// // // // //     </AuthContext.Provider>
// // // // //   );
// // // // // }

// // // // // import { createContext, useContext, useEffect, useState } from "react";

// // // // // /* =======================
// // // // //    TYPES
// // // // // ======================= */

// // // // // type User = {
// // // // //   _id: string;
// // // // //   name: string;
// // // // //   email: string;
// // // // //   role: "admin" | "citizen" | "authority";
// // // // // };

// // // // // type AuthContextType = {
// // // // //   user: User | null;
// // // // //   token: string | null;
// // // // //   login: (token: string, user: User) => void;
// // // // //   logout: () => void;
// // // // // };

// // // // // /* =======================
// // // // //    CONTEXT
// // // // // ======================= */

// // // // // const AuthContext = createContext<AuthContextType | null>(null);

// // // // // /* =======================
// // // // //    PROVIDER
// // // // // ======================= */

// // // // // export function AuthProvider({ children }: { children: React.ReactNode }) {
// // // // //   const [user, setUser] = useState<User | null>(null);
// // // // //   const [token, setToken] = useState<string | null>(null);

// // // // //   // Auto-login on refresh
// // // // //   useEffect(() => {
// // // // //     const savedToken = localStorage.getItem("token");
// // // // //     const savedUser = localStorage.getItem("user");

// // // // //     if (savedToken && savedUser) {
// // // // //       setToken(savedToken);
// // // // //       setUser(JSON.parse(savedUser));
// // // // //     }
// // // // //   }, []);

// // // // //   const login = (token: string, user: User) => {
// // // // //     setToken(token);
// // // // //     setUser(user);
// // // // //     localStorage.setItem("token", token);
// // // // //     localStorage.setItem("user", JSON.stringify(user));
// // // // //   };

// // // // //   const logout = () => {
// // // // //     setToken(null);
// // // // //     setUser(null);
// // // // //     localStorage.clear();
// // // // //   };

// // // // //   return (
// // // // //     <AuthContext.Provider value={{ user, token, login, logout }}>
// // // // //       {children}
// // // // //     </AuthContext.Provider>
// // // // //   );
// // // // // }

// // // // // /* =======================
// // // // //    HOOK  ✅ THIS WAS MISSING
// // // // // ======================= */

// // // // // export function useAuth() {
// // // // //   const context = useContext(AuthContext);
// // // // //   if (!context) {
// // // // //     throw new Error("useAuth must be used inside AuthProvider");
// // // // //   }
// // // // //   return context;
// // // // // }

// // // // import { createContext, useContext, useEffect, useState } from "react";

// // // // type User = {
// // // //   _id: string;
// // // //   name: string;
// // // //   email: string;
// // // //   role: "admin" | "citizen" | "authority";
// // // // };

// // // // type AuthContextType = {
// // // //   user: User | null;
// // // //   token: string | null;
// // // //   login: (token: string, user: User) => void;
// // // //   logout: () => void;
// // // // };

// // // // const AuthContext = createContext<AuthContextType | null>(null);

// // // // export function AuthProvider({ children }: { children: React.ReactNode }) {
// // // //   const [user, setUser] = useState<User | null>(null);
// // // //   const [token, setToken] = useState<string | null>(null);

// // // //   useEffect(() => {
// // // //     const token = localStorage.getItem("token");
// // // //     const user = localStorage.getItem("user");

// // // //     if (token && user) {
// // // //       setToken(token);
// // // //       setUser(JSON.parse(user));
// // // //     }
// // // //   }, []);

// // // //   const login = (token: string, user: User) => {
// // // //     setToken(token);
// // // //     setUser(user);
// // // //     localStorage.setItem("token", token);
// // // //     localStorage.setItem("user", JSON.stringify(user));
// // // //   };

// // // //   const logout = () => {
// // // //     setToken(null);
// // // //     setUser(null);
// // // //     localStorage.clear();
// // // //   };

// // // //   return (
// // // //     <AuthContext.Provider value={{ user, token, login, logout }}>
// // // //       {children}
// // // //     </AuthContext.Provider>
// // // //   );
// // // // }

// // // // /* ✅ ONLY HOOK EXPORTED */
// // // // export function useAuth() {
// // // //   const ctx = useContext(AuthContext);
// // // //   if (!ctx) {
// // // //     throw new Error("useAuth must be used inside AuthProvider");
// // // //   }
// // // //   return ctx;
// // // // }

// // // import { createContext, useContext, useEffect, useState } from "react";
// // // import api from "../services/api";

// // // type User = {
// // //   id: string;
// // //   name: string;
// // //   email: string;
// // //   role: "admin" | "citizen" | "authority";
// // // };

// // // type AuthContextType = {
// // //   user: User | null;
// // //   token: string | null;
// // //   login: (email: string, password: string) => Promise<void>;
// // //   logout: () => void;
// // //   loading: boolean;
// // // };

// // // const AuthContext = createContext<AuthContextType | null>(null);

// // // export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
// // //   const [user, setUser] = useState<User | null>(null);
// // //   const [token, setToken] = useState<string | null>(null);
// // //   const [loading, setLoading] = useState(true);

// // //   // 🔄 Auto-login on refresh
// // //   useEffect(() => {
// // //     const storedToken = localStorage.getItem("token");
// // //     const storedUser = localStorage.getItem("user");

// // //     if (storedToken && storedUser) {
// // //       setToken(storedToken);
// // //       setUser(JSON.parse(storedUser));
// // //       api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
// // //     }

// // //     setLoading(false);
// // //   }, []);

// // //   const login = async (email: string, password: string) => {
// // //     const res = await api.post("/auth/login", { email, password });

// // //     const { token, user } = res.data;

// // //     localStorage.setItem("token", token);
// // //     localStorage.setItem("user", JSON.stringify(user));

// // //     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

// // //     setToken(token);
// // //     setUser(user);
// // //   };

// // //   const logout = () => {
// // //     localStorage.clear();
// // //     setUser(null);
// // //     setToken(null);
// // //     delete api.defaults.headers.common["Authorization"];
// // //   };

// // //   return (
// // //     <AuthContext.Provider value={{ user, token, login, logout, loading }}>
// // //       {children}
// // //     </AuthContext.Provider>
// // //   );
// // // };

// // // export const useAuth = () => {
// // //   const ctx = useContext(AuthContext);
// // //   if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
// // //   return ctx;
// // // };

// // import { createContext, useContext, useEffect, useState } from "react";

// // type User = {
// //   id: string;
// //   name: string;
// //   email: string;
// //   role: "admin" | "citizen" | "authority";
// // };

// // type AuthContextType = {
// //   user: User | null;
// //   token: string | null;
// //   login: (token: string, user: User) => void;
// //   logout: () => void;
// // };

// // const AuthContext = createContext<AuthContextType | null>(null);

// // export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
// //   const [user, setUser] = useState<User | null>(null);
// //   const [token, setToken] = useState<string | null>(null);

// //   // 🔁 Auto-login on page refresh
// //   useEffect(() => {
// //     const savedToken = localStorage.getItem("token");
// //     const savedUser = localStorage.getItem("user");

// //     if (savedToken && savedUser) {
// //       setToken(savedToken);
// //       setUser(JSON.parse(savedUser));
// //     }
// //   }, []);

// //   // ✅ Login handler
// //   const login = (token: string, user: User) => {
// //     localStorage.setItem("token", token);
// //     localStorage.setItem("user", JSON.stringify(user));
// //     setToken(token);
// //     setUser(user);
// //   };

// //   // 🚪 Logout handler
// //   const logout = () => {
// //     localStorage.clear();
// //     setUser(null);
// //     setToken(null);
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, token, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // // 🔥 Custom hook
// // export const useAuth = () => {
// //   const ctx = useContext(AuthContext);
// //   if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
// //   return ctx;
// // };

// import { createContext, useContext, useEffect, useState } from "react";

// type User = {
//   id: string;
//   name: string;
//   email: string;
//   role: "admin" | "citizen" | "authority";
// };

// type AuthContextType = {
//   user: User | null;
//   token: string | null;
//   login: (user: User, token: string) => void;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);

//   /* 🔁 Auto-login on refresh */
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedToken = localStorage.getItem("token");

//     if (storedUser && storedToken) {
//       setUser(JSON.parse(storedUser));
//       setToken(storedToken);
//     }
//   }, []);

//   /* ✅ LOGIN */
//   const login = (user: User, token: string) => {
//     localStorage.setItem("user", JSON.stringify(user));
//     localStorage.setItem("token", token);
//     setUser(user);
//     setToken(token);
//   };

//   /* 🚪 LOGOUT */
//   const logout = () => {
//     localStorage.clear();
//     setUser(null);
//     setToken(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// <button onClick={logout}>Logout</button>

// /* ✅ Hook */
// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) {
//     throw new Error("useAuth must be used inside AuthProvider");
//   }
//   return ctx;
// }

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "authority" | "citizen";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (
        storedToken &&
        storedToken !== "undefined" &&
        storedUser &&
        storedUser !== "undefined"
      ) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch {
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (user: User, token: string) => {
    if (!user || !token) return;

    setUser(user);
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
