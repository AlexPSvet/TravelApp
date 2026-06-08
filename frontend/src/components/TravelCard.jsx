import "./TravelCard.css";

const TravelCard = ({
    title,
    rating,
    departureCity,
    destination,
    coverImage,
    pricePerPerson,
    duration,
    maxGroupSize,
}) => {
    return (
        <article className="travel-card">
            <img
                src={coverImage}
                alt={title}
                className="travel-card-image"
            />

            <div className="travel-card-content">
                <div className="travel-card-header">
                    <h3>{title}</h3>

                    <span className="travel-rating">
                        ⭐ {rating}
                    </span>
                </div>

                <p className="travel-route">
                    📍 {departureCity} → {destination}
                </p>

                {duration && (
                    <p className="travel-duration">
                        🗓️ {duration}
                    </p>
                )}

                {maxGroupSize && (
                    <p className="travel-travelers">
                        👥 {maxGroupSize} travelers
                    </p>
                )}

                <div className="travel-footer">
                    <div>
                        <p className="price-label">
                            Average Price
                        </p>

                        <p className="travel-price">
                            ${pricePerPerson}
                            <span>/person</span>
                        </p>
                    </div>

                    <button className="travel-btn">
                        View Trip
                    </button>
                </div>
            </div>
        </article>
    );
};

export default TravelCard;