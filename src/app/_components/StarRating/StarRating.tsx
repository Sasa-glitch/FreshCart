import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";

interface StarRatingProps {
    rating: number;
    count?: number;
    size?: "sm" | "md";
}

export default function StarRating({
    rating,
    count,
    size = "sm",
}: StarRatingProps) {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
        stars.push(
            <FontAwesomeIcon
                key={`full-${i}`}
                icon={faStar}
                className="text-star"
            />,
        );
    }
    if (hasHalf) {
        stars.push(
            <FontAwesomeIcon
                key="half"
                icon={faStarHalfStroke}
                className="text-star"
            />,
        );
    }
    for (let i = 0; i < emptyStars; i++) {
        stars.push(
            <FontAwesomeIcon
                key={`empty-${i}`}
                icon={faStarEmpty}
                className="text-star-empty"
            />,
        );
    }

    const sizeClass = size === "sm" ? "text-xs gap-0.5" : "text-sm gap-1";

    return (
        <div className={`flex items-center ${sizeClass}`}>
            <div className="flex items-center gap-0.5">{stars}</div>
            {count !== undefined && (
                <span className="text-mute ml-1">{rating} ({count})</span>
            )}
        </div>
    );
}
