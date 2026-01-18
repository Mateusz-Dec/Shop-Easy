import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import { BsCart3, BsArrowLeftRight, BsSearch } from "react-icons/bs";
import { useCartStore } from "../store/cartStore";
import Rating from "../components/Rating";
import { notify } from "../lib/notify";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const addToCart = useCartStore((s) => s.addToCart);
  const toggleFavorite = useCartStore((state) => state.toggleFavorite);

  useEffect(() => {
    let mounted = true;
    setLoadingProduct(true);
    setNotFound(false);

    const load = async () => {
      try {
        const res = await fetch("/data/products.json");
        const data = await res.json();

        // load locally imported external products (if any)
        const external = JSON.parse(
          localStorage.getItem("externalProducts") || "[]"
        );

        const combined = [...data, ...external];

        // try to find by id in combined data
        const prod = combined.find((p) => String(p.id) === String(id));

        if (prod) {
          if (!mounted) return;
          setProduct(prod);
          setNotFound(false);
          setIsFavorite(
            useCartStore
              .getState()
              .favorites.some((p) => String(p.id) === String(id))
          );

          // compute similar products for comparison
          const similar = combined
            .filter((c) => String(c.id) !== String(prod.id))
            .filter(
              (c) =>
                (c.category && prod.category && c.category === prod.category) ||
                (c.name &&
                  prod.name &&
                  c.name
                    .toLowerCase()
                    .includes(prod.name.toLowerCase().split(" ")[0]))
            )
            .slice(0, 6);

          setSimilarProducts(similar);
        } else {
          setProduct(null);
          setNotFound(true);
        }
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        mounted && setLoadingProduct(false);
      }
    };

    load();

    return () => (mounted = false);
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantity(1);
    try {
      window.dispatchEvent(
        new CustomEvent("shopeasy-toast", {
          detail: {
            message: `${product.name} dodano do koszyka`,
            type: "success",
          },
        })
      );
    } catch (err) {}
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product);
    setIsFavorite(!isFavorite);
    try {
      window.dispatchEvent(
        new CustomEvent("shopeasy-toast", {
          detail: {
            message: isFavorite
              ? `${product.name} usunięto z ulubionych`
              : `${product.name} dodano do ulubionych`,
            type: "info",
          },
        })
      );
    } catch (err) {}
  };

  // comparison UI state
  const [similarProducts, setSimilarProducts] = useState([]);
  const [compareOpen, setCompareOpen] = useState(false);

  // reviews state
  const [reviews, setReviews] = useState([]);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    if (!product) return;
    const all = JSON.parse(localStorage.getItem("productReviews") || "{}");
    const list = all[String(product.id)] || [];
    setReviews(list);
  }, [product]);

  const saveReview = (e) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewText.trim())
      return notify("Wypełnij imię i treść opinii", "warn");
    if (reviewText.trim().length < 10)
      return notify("Opinia jest za krótka (min. 10 znaków)", "warn");

    const rev = {
      id: Date.now(),
      name: reviewName.trim(),
      rating: Number(reviewRating) || 5,
      text: reviewText.trim(),
      reported: false,
      date: new Date().toISOString(),
    };
    const all = JSON.parse(localStorage.getItem("productReviews") || "{}");
    const list = all[String(product.id)] || [];
    const updated = [rev, ...list];
    all[String(product.id)] = updated;
    localStorage.setItem("productReviews", JSON.stringify(all));
    setReviews(updated);
    setReviewName("");
    setReviewRating(5);
    setReviewText("");
    notify("Dziękujemy za opinię", "success");
  };

  const reportReview = (id) => {
    const all = JSON.parse(localStorage.getItem("productReviews") || "{}");
    const list = all[String(product.id)] || [];
    const updated = list.map((r) =>
      r.id === id ? { ...r, reported: true } : r
    );
    all[String(product.id)] = updated;
    localStorage.setItem("productReviews", JSON.stringify(all));
    setReviews(updated);
    notify("Opinia została zgłoszona", "info");
  };

  const deleteReview = (id) => {
    const all = JSON.parse(localStorage.getItem("productReviews") || "{}");
    const list = all[String(product.id)] || [];
    const updated = list.filter((r) => r.id !== id);
    all[String(product.id)] = updated;
    localStorage.setItem("productReviews", JSON.stringify(all));
    setReviews(updated);
    notify("Opinia została usunięta", "info");
  };

  // computed rating from product metadata + local reviews
  const existingSum = (product?.rating || 0) * (product?.reviews || 0);
  const storedSum = reviews.reduce((s, r) => s + (r.rating || 0), 0);
  const totalCount = (product?.reviews || 0) + reviews.length;
  const computedRating =
    totalCount > 0 ? +((existingSum + storedSum) / totalCount).toFixed(2) : 0;

  if (loadingProduct) {
    return (
      <div className="text-center py-5">
        <p>Wczytywanie...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="text-center py-5">
        <h3>Produkt nie został znaleziony</h3>
        <p className="mb-4">Sprawdź listę produktów lub wróć do sklepu.</p>
        <Link to="/" className="btn btn-outline-primary">
          Powrót do sklepu
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <Link to="/" className="btn btn-outline-secondary mb-3">
        <FaArrowLeft /> Powrót do sklepu
      </Link>

      <div className="card shadow-sm border-0 p-4">
        <div className="row">
          <div className="col-md-6 mb-4">
            <img
              src={product.image}
              className="img-fluid rounded"
              alt={product.name}
              style={{
                maxHeight: "500px",
                objectFit: "cover",
                width: "100%",
                cursor: "zoom-in",
              }}
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("shopeasy-open-image", {
                    detail: { src: product.image, alt: product.name },
                  })
                )
              }
            />
          </div>

          <div className="col-md-6">
            <h1 className="fw-bold mb-3">{product.name}</h1>

            <div className="d-flex flex-wrap gap-2 mb-3">
              <button
                className="btn btn-outline-secondary"
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("shopeasy-compare-add", {
                      detail: { product },
                    })
                  );
                  notify("Dodano produkt do porównania", "info");
                }}
              >
                <BsArrowLeftRight size={18} /> Dodaj do porównania
              </button>

              <button
                className="btn btn-outline-primary"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("shopeasy-open-image", {
                      detail: { src: product.image, alt: product.name },
                    })
                  )
                }
              >
                <BsSearch size={18} /> Powiększ zdjęcie
              </button>
            </div>
            <small className="text-muted d-block mb-3">
              {product.category}
            </small>

            <div className="mb-3">
              <Rating rating={computedRating} reviews={totalCount} />
            </div>

            <p className="text-muted fs-5 mb-4">{product.description}</p>

            <div className="mb-3">
              <button
                className="btn btn-outline-primary me-2"
                onClick={() => setCompareOpen(!compareOpen)}
                disabled={!similarProducts.length}
              >
                Porównaj z podobnymi
              </button>
              {compareOpen && similarProducts.length > 0 && (
                <div className="card mt-3 p-2">
                  <h6 className="mb-2">Podobne produkty</h6>
                  <div className="row">
                    {similarProducts.map((s) => (
                      <div key={s.id} className="col-12 mb-2">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <div style={{ fontWeight: 600 }}>{s.name}</div>
                            <small className="text-muted">
                              {s.category} • {s.reviews || 0} opinii
                            </small>
                          </div>
                          <div className="text-end">
                            <div style={{ fontWeight: 700 }}>{s.price} PLN</div>
                            <div className="mt-1">
                              <a
                                href={`/product/${s.id}`}
                                className="btn btn-sm btn-outline-primary me-2"
                              >
                                Szczegóły
                              </a>
                              <span className="badge bg-secondary">
                                {s.source
                                  ? s.source
                                  : localStorage.getItem("externalProducts") &&
                                    JSON.stringify(
                                      JSON.parse(
                                        localStorage.getItem(
                                          "externalProducts"
                                        ) || "[]"
                                      ).map((p) => p.id)
                                    ).includes(String(s.id))
                                  ? "Importer"
                                  : "Sklep"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="d-flex align-items-center gap-3 mb-4">
              <h2 className="text-success fw-bold mb-0">{product.price} PLN</h2>
              <div>
                {product.stock > 5 ? (
                  <span className="badge bg-success">Na magazynie</span>
                ) : product.stock > 0 ? (
                  <span className="badge bg-warning">
                    Mało ({product.stock})
                  </span>
                ) : (
                  <span className="badge bg-danger">Brak</span>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Ilość:</label>
              <div className="input-group" style={{ maxWidth: "150px" }}>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  className="form-control text-center"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  min="1"
                  max={product.stock}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                >
                  +
                </button>
              </div>
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-primary btn-lg flex-grow-1"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                <BsCart3 /> Dodaj do koszyka
              </button>
              <button
                className="btn btn-lg"
                style={{
                  backgroundColor: isFavorite ? "#ff6b6b" : "#e9ecef",
                  border: "none",
                  color: isFavorite ? "white" : "#666",
                }}
                onClick={handleToggleFavorite}
              >
                {isFavorite ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>

            <div className="mt-5 p-3 bg-light rounded">
              <h5>Parametry produktu:</h5>
              <ul className="list-unstyled">
                <li>
                  <strong>Kategoria:</strong> {product.category}
                </li>
                <li>
                  <strong>Cena:</strong> {product.price} PLN
                </li>
                <li>
                  <strong>Dostępność:</strong> {product.stock} szt.
                </li>
                <li>
                  <strong>Średnia ocena:</strong> {computedRating} / 5 (
                  {totalCount} opinii)
                </li>
              </ul>

              <div className="mt-3">
                <h5 className="mb-2">Opinie i oceny</h5>
                <form onSubmit={saveReview} className="mb-3">
                  <div className="row g-2">
                    <div className="col-md-4">
                      <input
                        className="form-control"
                        placeholder="Twoje imię"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4 d-flex align-items-center">
                      <div className="me-2">Ocena:</div>
                      <div>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span
                            key={s}
                            onClick={() => setReviewRating(s)}
                            style={{ cursor: "pointer", marginRight: 4 }}
                          >
                            {s <= reviewRating ? (
                              <FaStar color="#ffc107" />
                            ) : (
                              <FaRegStar color="#ccc" />
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <button
                        className="btn btn-primary w-100"
                        type="submit"
                        disabled={
                          !reviewName.trim() || reviewText.trim().length < 10
                        }
                      >
                        Dodaj opinię
                      </button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <textarea
                      className="form-control mt-2"
                      placeholder="Napisz recenzję..."
                      rows={3}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                    />
                  </div>
                </form>

                {reviews.length === 0 ? (
                  <div className="text-muted">
                    Brak opinii. Bądź pierwszy, który oceni ten produkt.
                  </div>
                ) : (
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="text-muted">
                        Liczba opinii: {reviews.length}
                      </div>
                      <div style={{ maxWidth: 220 }}>
                        <select
                          className="form-select form-select-sm"
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                        >
                          <option value="newest">Najnowsze</option>
                          <option value="highest">Najwyżej ocenione</option>
                          <option value="lowest">Najniżej ocenione</option>
                        </select>
                      </div>
                    </div>

                    {[...reviews]
                      .sort((a, b) => {
                        if (sortBy === "newest")
                          return new Date(b.date) - new Date(a.date);
                        if (sortBy === "highest") return b.rating - a.rating;
                        if (sortBy === "lowest") return a.rating - b.rating;
                        return 0;
                      })
                      .map((r) => (
                        <div
                          key={r.id}
                          className="mb-3 p-3 bg-white rounded shadow-sm"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <strong>{r.name}</strong>
                              <div className="small text-muted">
                                {new Date(r.date).toLocaleString("pl-PL")}
                                {r.reported && (
                                  <span className="badge bg-warning ms-2">
                                    Zgłoszono
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-end">
                              <div className="d-flex justify-content-end mb-1">
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <span key={s} style={{ marginLeft: 2 }}>
                                    {s <= r.rating ? (
                                      <FaStar color="#ffc107" />
                                    ) : (
                                      <FaRegStar color="#ccc" />
                                    )}
                                  </span>
                                ))}
                              </div>
                              <div>
                                {!r.reported && (
                                  <button
                                    className="btn btn-sm btn-outline-warning me-2"
                                    onClick={() => reportReview(r.id)}
                                  >
                                    Zgłoś
                                  </button>
                                )}
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => deleteReview(r.id)}
                                >
                                  Usuń
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2">{r.text}</div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
