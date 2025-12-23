import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light mt-5">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">ShopEasy</h5>
            <p style={{ color: "#e0e0e0", lineHeight: "1.7" }}>
              Najlepsze ceny na elektronikę i akcesoria. Szybka dostawa,
              bezpieczne transakcje.
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Szybkie linki</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none footer-link">
                  Strona główna
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/products"
                  className="text-decoration-none footer-link"
                >
                  Wszystkie produkty
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-decoration-none footer-link">
                  O nas
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/contact"
                  className="text-decoration-none footer-link"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Obserwuj nas</h5>
            <div className="d-flex gap-3">
              <a href="/" className="text-light" title="Facebook">
                <FaFacebook size={24} />
              </a>
              <a href="/" className="text-light" title="Instagram">
                <FaInstagram size={24} />
              </a>
              <a href="/" className="text-light" title="Twitter">
                <FaTwitter size={24} />
              </a>
              <a href="/" className="text-light" title="LinkedIn">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        <hr className="bg-secondary" />

        <div className="row align-items-center">
          <div className="col-md-6 text-muted">
            © {currentYear} ShopEasy — wszystkie prawa zastrzeżone
          </div>
          <div className="col-md-6 text-end">
            <small>
              <Link
                to="/privacy"
                className="text-muted text-decoration-none me-2"
              >
                Polityka prywatności
              </Link>
              |
              <Link
                to="/terms"
                className="text-muted text-decoration-none mx-2"
              >
                Warunki użytkowania
              </Link>
              |
              <Link
                to="/cookies"
                className="text-muted text-decoration-none ms-2"
              >
                Polityka cookies
              </Link>
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}
