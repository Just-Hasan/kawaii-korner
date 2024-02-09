import { useState } from "react";
import PropTypes from "prop-types";

StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.string,
  className: PropTypes.string,
  onSetRating: PropTypes.func,
};

export default function StarRating({
  maxRating = 5,
  starColor = "#f4f4f4",
  starOutlineColor = "#fee715",
  starSize = 40,
  defaultRating = 0,
  onSetRating,
  ratingColor = "#f4f4f4",
  ratingSize = "24px",
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(defaultRating);

  function handleRating(rating) {
    setRating(rating);
    onSetRating && onSetRating(rating);
  }

  /////////////////////////////////////[Styles]
  const StarContainerStyle = {
    display: "flex",
  };

  const RatingStyle = {
    fontSize: ratingSize,
    color: ratingColor,
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <div style={StarContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => {
          return (
            <Star
              key={i}
              full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
              onRate={() => handleRating(i + 1)}
              onMouseEnter={() => {
                setTempRating(i + 1);
              }}
              onMouseLeave={() => setTempRating(0)}
              onDoubleClick={() => {
                setRating(0);
                setTempRating(0);
                onSetRating(null);
              }}
              starColor={starColor}
              starSize={starSize}
              starOutlineColor={starOutlineColor}
            />
          );
        })}
      </div>
      {tempRating >= 0 && rating >= 0 && (
        <p style={RatingStyle}>{tempRating ? tempRating : rating}</p>
      )}
    </div>
  );
}

function Star({
  onRate,
  onMouseEnter,
  onMouseLeave,
  onDoubleClick,
  full,
  starColor,
  starSize,
  starOutlineColor,
}) {
  const starStyle = {
    width: `${starSize}px`,
    height: `${starSize}px`,
    display: "block",
    cursor: "pointer",
  };

  return (
    <span
      style={starStyle}
      role="button"
      onClick={onRate}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onDoubleClick={onDoubleClick}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={starColor}
          stroke={starOutlineColor}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="none"
          stroke={starOutlineColor}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
    </span>
  );
}
