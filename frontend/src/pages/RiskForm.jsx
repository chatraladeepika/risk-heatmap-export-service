import { useState } from "react";

export default function RiskForm({ onSubmit, existing }) {
  const [name, setName] = useState(existing?.name || "");
  const [description, setDescription] = useState(existing?.description || "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      setError("Name required");
      return;
    }

    onSubmit({ name, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}

      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />

      <button type="submit">Save</button>
    </form>
  );
}