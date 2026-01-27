import { useEffect, useState } from "react";
import { api } from "../services/api";

/**
 * Profile Page
 * ------------
 * Edit name & password
 */
export default function Profile() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    api.get("/users/profile").then((res) => {
      setName(res.data.name);
    });
  }, []);

  const updateProfile = async (e: any) => {
    e.preventDefault();

    await api.put("/users/profile", {
      name,
      password: password || undefined,
    });

    // Update localStorage user
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    user.name = name;
    localStorage.setItem("user", JSON.stringify(user));

    setPassword("");
    setToast("Profile updated successfully");

    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="p-6 max-w-md mx-auto text-black">
      {toast && (
        <div className="mb-4 bg-green-600 text-white p-2 rounded">
          {toast}
        </div>
      )}

      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">
          My Profile
        </h1>

        <form onSubmit={updateProfile}>
          {/* Name */}
          <label className="block mb-2 font-medium">
            Name
          </label>
          <input
            type="text"
            className="border p-2 w-full mb-4 text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Password */}
          <label className="block mb-2 font-medium">
            New Password
          </label>
          <input
            type="password"
            className="border p-2 w-full mb-4 text-black"
            placeholder="Leave blank to keep current password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
