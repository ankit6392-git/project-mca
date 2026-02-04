import { useState } from "react";
import { api } from "../../services/api";

/**
 * IssueForm
 * ---------
 * Manual location entry (no auto fetch)
 */
export default function IssueForm({ onSuccess }: { onSuccess: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("water");

  // 📍 Location fields
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Combine location into one string
      const location = `${address}, ${city}, ${state} - ${zip}`;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("department", department);
      formData.append("location", location);

      // ✅ backend requires this
      formData.append("zipCode", zip);

      if (image) {
        formData.append("image", image);
      }

      await api.post("/issues", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // reset form
      setTitle("");
      setDescription("");
      setDepartment("water");
      setAddress("");
      setCity("");
      setState("");
      setZip("");
      setImage(null);

      onSuccess();
    } catch (error: any) {
      if (error.response?.status === 409) {
        const existing = error.response.data.existingComplaint;

        alert(
          `This issue already exists.\n\n` +
            `Complaint ID: ${existing.complaintId}\n` +
            `Current Status: ${existing.status}\n` +
            `Priority: ${existing.priority}\n\n` +
            `You are now linked to the same ticket.`
        );

        // 🔁 refresh dashboard so shared complaint appears
        onSuccess();
      } else {
        alert("Failed to register complaint");
      }
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

      <input
        type="text"
        placeholder="Issue title"
        className="w-full border p-2 rounded text-black"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Describe the issue"
        className="w-full border p-2 rounded text-black"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Address / Area"
        className="w-full border p-2 rounded text-black"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="City"
          className="border p-2 rounded text-black"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="State"
          className="border p-2 rounded text-black"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="ZIP / PIN Code"
          className="border p-2 rounded text-black"
          value={zip}
          onChange={(e) => {
            if (/^\d{0,6}$/.test(e.target.value)) {
              setZip(e.target.value);
            }
          }}
          required
        />
      </div>

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

      <button
        type="submit"
        disabled={loading || zip.length !== 6}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        {loading ? "Submitting..." : "Submit Complaint"}
      </button>
    </form>
  );
}
