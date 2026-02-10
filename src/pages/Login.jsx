import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { notify } from "../lib/notify";
import { BsArrowLeft, BsPerson, BsEnvelope } from "react-icons/bs";

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const user = useAuthStore((state) => state.user);

  const [form, setForm] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Jeśli użytkownik jest już zalogowany, przekieruj do home
  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Imię jest wymagane";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Imię musi mieć co najmniej 2 znaki";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email jest wymagany";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Podaj prawidłowy email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    // Symulacja opóźnienia logowania
    setTimeout(() => {
      const userData = login(form.name, form.email);
      setLoading(false);
      notify(`Witaj ${userData.name}!`, "success");
      navigate("/");
    }, 1000);
  };

  return (
    <div className="container py-5">
      <Link to="/" className="btn btn-outline-secondary mb-4">
        <BsArrowLeft /> Powrót
      </Link>

      <div className="row justify-content-center">
        <div className="col-md-5 col-lg-4">
          <div className="card border-0 shadow-sm p-4">
            <div className="text-center mb-4">
              <h3 className="fw-bold">Logowanie</h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small">Imię</label>
                <div className="input-group">
                  <span className="input-group-text border-0 bg-light">
                    <BsPerson size={16} />
                  </span>
                  <input
                    type="text"
                    name="name"
                    className={`form-control border-start-0 ${errors.name ? "is-invalid" : ""}`}
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Imię"
                  />
                </div>
                {errors.name && (
                  <small className="text-danger d-block mt-1">
                    {errors.name}
                  </small>
                )}
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
                    className={`form-control border-start-0 ${errors.email ? "is-invalid" : ""}`}
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </div>
                {errors.email && (
                  <small className="text-danger d-block mt-1">
                    {errors.email}
                  </small>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-secondary w-100"
                disabled={loading}
              >
                {loading ? "Logowanie..." : "Zaloguj się"}
              </button>
            </form>

            <div className="text-center mt-3">
              <p className="small text-muted">
                Nie masz konta?{" "}
                <Link to="/register" className="text-decoration-none">
                  Załóż konto
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
