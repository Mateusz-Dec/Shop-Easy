import React, { useState } from "react";
import { notify } from "../lib/notify";
import { Link } from "react-router-dom";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // simple validation
    if (!form.name || !form.email || !form.message) {
      notify("Wypełnij wszystkie pola", "warn");
      return;
    }
    notify("Wiadomość wysłana. Odpowiemy wkrótce.", "success");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="container py-5">
      <Link to="/" className="btn btn-outline-secondary mb-3">
        Powrót
      </Link>
      <h1>Kontakt</h1>
      <p className="text-muted">
        Masz pytanie? Napisz do nas korzystając z formularza poniżej.
      </p>

      <div className="card p-4" style={{ maxWidth: 720 }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Imię i nazwisko</label>
            <input
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Wiadomość</label>
            <textarea
              name="message"
              className="form-control"
              value={form.message}
              onChange={handleChange}
              rows={5}
            />
          </div>
          <button className="btn btn-primary">Wyślij wiadomość</button>
        </form>
      </div>
    </div>
  );
}
