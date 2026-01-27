import { useState } from "react";
import { api } from "../../services/api";

/**
 * IssueForm
 * ---------
 * Allows citizen to register a new complaint
 * - Image upload (max 5MB)
 * - Auto-detect location
 */
export default function IssueForm({ onSuccess }: { onSuccess: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("water");
  const [image, setImage] = useState<File | null>(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("department", department);
      formData.append("location", location);
      if (image) formData.append("image", image);

      await api.post("/issues/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // reset form
      setTitle("");
      setDescription("");
      setDepartment("water");
      setImage(null);
      setLocation("");

      onSuccess();
    } catch (error) {
      alert("Failed to register complaint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow mb-6 space-y-4"
    >
      <h2 className="text-lg font-semibold text-black">
        Register New Complaint
      </h2>

      {/* Title */}
      <input
        type="text"
        placeholder="Issue title"
        className="w-full border p-2 rounded text-black"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* Description */}
      <textarea
        placeholder="Describe the issue"
        className="w-full border p-2 rounded text-black"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      {/* Image Upload */}
      <input
        type="file"
        accept="image/*"
        className="border p-2 rounded text-black w-full"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          if (file.size > MAX_IMAGE_SIZE) {
            alert("Image size must be less than 5 MB");
            e.target.value = "";
            return;
          }

          setImage(file);
        }}
      />

      {/* Location */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Location"
          value={location}
          className="border p-2 rounded text-black flex-1"
          readOnly
        />

        <button
  type="button"
  className="bg-blue-600 text-white px-4 py-2 rounded"
  onClick={() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_GOOGLE_MAPS_KEY`
          );

          const data = await response.json();

          if (data.status === "OK" && data.results.length > 0) {
            setLocation(data.results[0].formatted_address);
          } else {
            alert("Unable to fetch address from location");
          }
        } catch (err) {
          alert("Error while fetching location");
        }
      },
      (error) => {
        // 👇 THIS WAS MISSING
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Location permission denied");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information unavailable");
            break;
          case error.TIMEOUT:
            alert("Location request timed out");
            break;
          default:
            alert("Failed to fetch location");
        }
      }
    );
  }}
>
  Fetch Location
</button>

      </div>

      {/* Department */}
      <select
        className="w-full border p-2 rounded text-black"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        <option value="water">Water</option>
        <option value="road">Road</option>
        <option value="electricity">Electricity</option>
        <option value="sanitation">Sanitation</option>
        <option value="health">Health</option>
        <option value="education">Education</option>
        <option value="transport">Transport</option>
        <option value="environment">Environment</option>
        <option value="other">Other</option>
      </select>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        {loading ? "Submitting..." : "Submit Complaint"}
      </button>
    </form>
  );
}
