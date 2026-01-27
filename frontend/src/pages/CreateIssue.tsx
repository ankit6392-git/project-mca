import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

/**
 * Create Issue Page
 * - Title
 * - Description
 * - Image upload
 * - Location (lat/lng) – map ready
 */
export default function CreateIssue() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // 📍 Get current location (basic GPS – Google Maps ready)
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude);
      setLng(pos.coords.longitude);
    });
  };

  // 🚀 Submit issue
  const submitIssue = async () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);
    if (lat && lng) {
      formData.append("lat", lat.toString());
      formData.append("lng", lng.toString());
    }

    await api.post("/issues", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="bg-white/5 p-8 rounded-xl w-[400px]">
        <h1 className="text-2xl font-bold mb-4">Create Issue</h1>

        <input
          className="w-full mb-3 p-2 rounded bg-white/10"
          placeholder="Issue Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full mb-3 p-2 rounded bg-white/10"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          className="mb-3"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />

        <button
          className="w-full mb-3 bg-indigo-600 py-2 rounded"
          onClick={getLocation}
        >
          📍 Use My Location
        </button>

        {lat && lng && (
          <p className="text-xs text-green-400 mb-3">
            Location captured
          </p>
        )}

        <button
          onClick={submitIssue}
          disabled={loading}
          className="w-full bg-green-600 py-2 rounded"
        >
          {loading ? "Submitting..." : "Submit Issue"}
        </button>
      </div>
    </div>
  );
}

