import { useNavigate } from 'react-router-dom';
import "./TravelCard.css";

const DIFFICULTY_LABEL = {
    easy:        { label: 'Easy',       className: 'badge--easy' },
    moderate:    { label: 'Moderate',   className: 'badge--moderate' },
    challenging: { label: 'Challenging', className: 'badge--challenging' },
};

const TravelCard = ({
    travelId,
    title,
    destination,
    country,
    coverImage,
    rating,
    pricePerPerson,
    duration,
    tags = [],
    difficulty,
}) => {
    const navigate = useNavigate();
    const visibleTags = tags.slice(0, 2);
    const diff = DIFFICULTY_LABEL[difficulty];

    return (
        <article className="travel-card">

            <div className="travel-card-image-wrapper">
                <img
                    src={coverImage ?? '/placeholder.jpg'}
                    alt={title}
                    className="travel-card-image"
                />
                {rating != null && (
                    <span className="travel-card-rating">⭐ {rating}</span>
                )}
            </div>

            <div className="travel-card-body">

                <div className="travel-card-meta">
                    <span className="travel-card-location">
                        {destination}{country ? `, ${country}` : ''}
                    </span>
                    {diff && (
                        <span className={`travel-card-badge ${diff.className}`}>
                            {diff.label}
                        </span>
                    )}
                </div>

                <h3 className="travel-card-title">{title}</h3>

                {visibleTags.length > 0 && (
                    <div className="travel-card-tags">
                        {visibleTags.map((tag) => (
                            <span key={tag} className="travel-tag">{tag}</span>
                        ))}
                    </div>
                )}

                <hr className="travel-card-divider" />

                <div className="travel-card-footer">
                    <div className="travel-card-info">
                        {duration && (
                            <span className="travel-card-duration">🗓 {duration}</span>
                        )}
                        {pricePerPerson != null && (
                            <span className="travel-card-price">
                                ${pricePerPerson}
                                <span className="travel-card-price-unit"> /person</span>
                            </span>
                        )}
                    </div>
                    <button
                        className="travel-card-btn"
                        onClick={() => navigate(`/travels/${travelId}`)}
                    >
                        View Trip →
                    </button>
                </div>

            </div>
        </article>
    );
};

export default TravelCard;