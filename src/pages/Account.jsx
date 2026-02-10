import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BsArrowLeft, BsPerson, BsEnvelope } from "react-icons/bs";
import { notify } from "../lib/notify";

export default function Account() {
  const user = useAuthStore((state) => state.user);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  if (!user) {
    return (
      <div className="text-center py-5">
        <h3>Zaloguj się aby zobaczyć profil</h3>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/login")}
        >
          Przejdź do logowania
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) {
      notify("Wypełnij wszystkie pola", "error");
      return;
    }
    updateProfile(form.name, form.email);
    setIsEditing(false);
    notify("Profil zaktualizowany", "success");
  };

  const handleCancel = () => {
    setForm({
      name: user.name,
      email: user.email,
    });
    setIsEditing(false);
  };

  return (
    <div className="container py-5">
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        <BsArrowLeft /> Powrót
      </button>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-light">
              <h4 className="mb-0">Mój profil</h4>
            </div>
            <div className="card-body p-4">
              {isEditing ? (
                <>
                  <div className="mb-3">
                    <label className="form-label small">Imię</label>
                    <div className="input-group">
                      <span className="input-group-text border-0 bg-light">
                        <BsPerson size={16} />
                      </span>
                      <input
                        type="text"
                        name="name"
                        className="form-control border-start-0"
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label small">Email</label>
                    <div className="input-group">
                      <span className="input-group-text border-0 bg-light">
                        <BsEnvelope size={16} />
                      </span>
                      <input
                        type="email"
                        name="email"
                        className="form-control border-start-0"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-secondary flex-grow-1"
                      onClick={handleSave}
                    >
                      Zapisz
                    </button>
                    <button
                      className="btn btn-outline-secondary flex-grow-1"
                      onClick={handleCancel}
                    >
                      Anuluj
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-3">
                    <p className="text-muted small mb-1">Imię</p>
                    <p className="fw-bold">{user.name}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-muted small mb-1">Email</p>
                    <p className="fw-bold">{user.email}</p>
                  </div>

                  <div className="mb-3">
                    <p className="text-muted small mb-1">Zalogowany od</p>
                    <p className="fw-bold text-muted">
                      {user.loginAt
                        ? new Date(user.loginAt).toLocaleDateString("pl-PL")
                        : "—"}
                    </p>
                  </div>

                  <button
                    className="btn btn-secondary w-100"
                    onClick={() => setIsEditing(true)}
                  >
                    Edytuj profil
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
