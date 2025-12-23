import { FaStar, FaRegStar } from "react-icons/fa";

export default function Rating({ rating, reviews }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="d-flex align-items-center gap-2">
      <div className="d-flex text-warning">
        {[...Array(5)].map((_, i) => (
          <span key={i}>
            {i < fullStars ? (
              <FaStar size={16} />
            ) : i === fullStars && hasHalfStar ? (
              <FaStar size={16} style={{ opacity: 0.5 }} />
            ) : (
              <FaRegStar size={16} />
            )}
          </span>
        ))}
      </div>
      <small className="text-muted">
        {rating} ({reviews} opinii)
      </small>
    </div>
  );
}
