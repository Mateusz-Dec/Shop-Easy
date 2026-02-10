import { Link, useNavigate } from "react-router-dom";
import {
  BsCart3,
  BsHeart,
  BsBoxSeam,
  BsHouseDoor,
  BsArrowLeftRight,
  BsPlug,
  BsSun,
  BsMoon,
  BsBoxArrowRight,
  BsPerson,
} from "react-icons/bs";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import ThemeToggle from "../ThemeToggle";

import { useState, useEffect } from "react";

export default function Header() {
  const cart = useCartStore((state) => state.cart);
  const favorites = useCartStore((state) => state.favorites);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{ zIndex: 1100 }}
    >
      <div className="container-fluid px-4">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <BsCart3 size={22} style={{ color: "var(--primary)" }} />
          <span
            style={{
              fontSize: "1.1rem",
              fontWeight: "800",
              letterSpacing: "-1px",
              color: "var(--primary)",
            }}
          >
            ShopEasy
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
          style={{ borderColor: "#d0d0d0" }}
        >
          <div
            style={{
              width: 26,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span
              style={{
                height: 2,
                background: "#666",
                borderRadius: 2,
                display: "block",
              }}
            />
            <span
              style={{
                height: 2,
                background: "#666",
                borderRadius: 2,
                display: "block",
              }}
            />
            <span
              style={{
                height: 2,
                background: "#666",
                borderRadius: 2,
                display: "block",
              }}
            />
          </div>
        </button>

        <div
          className={`collapse navbar-collapse ${open ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2" to="/">
                <BsHouseDoor size={18} />
                Sklep
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center gap-2"
                to="/collections"
              >
                <BsBoxSeam size={18} /> Kolekcje
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center gap-2 position-relative"
                to="/wishlist"
              >
                <BsHeart size={18} />
                Ulubione
                {favorites.length > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-10px",
                      background: "#f5576c",
                      color: "white",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.7rem",
                      fontWeight: "bold",
                    }}
                  >
                    {favorites.length}
                  </span>
                )}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center gap-2"
                to="/orders"
              >
                <BsBoxSeam size={18} />
                Zamówienia
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center gap-2"
                to="/compare"
              >
                <BsArrowLeftRight size={18} />
                Porównaj
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center gap-2"
                to="/integrations"
              >
                <BsPlug size={18} /> Integracje
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center gap-2 position-relative"
                to="/cart"
              >
                <BsCart3 size={18} />
                Koszyk
                {cart.length > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      background: "#ff6b35",
                      color: "white",
                      borderRadius: "50%",
                      width: "24px",
                      height: "24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.7rem",
                      fontWeight: "bold",
                    }}
                  >
                    {cart.length}
                  </span>
                )}
              </Link>
            </li>
            <li className="nav-item">
              {user ? (
                <div className="d-flex align-items-center gap-2">
                  <Link
                    className="nav-link d-flex align-items-center gap-2"
                    to="/account"
                  >
                    <BsPerson size={18} /> {user.name}
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    title="Wyloguj się"
                  >
                    <BsBoxArrowRight size={16} />
                  </button>
                </div>
              ) : (
                <Link
                  className="nav-link d-flex align-items-center gap-2"
                  to="/login"
                >
                  <BsPerson size={18} /> Logowanie
                </Link>
              )}
            </li>
            <li className="nav-item">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
