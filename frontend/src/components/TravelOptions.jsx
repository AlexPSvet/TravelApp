import TravelCard from "./TravelCard";

import "./TravelOptions.css";

const TravelOptions = ({ travels }) => {
    return (
        <section className="travels-container">
            <h3 className="grid-title">Results ({travels.length})</h3>

            <div className="travel-grid">
                {travels.map((travel) => (
                    <TravelCard
                        key={travel._id}
                        title={travel.title}
                        description={travel.description}
                        rating={travel.rating}
                        departureCity={travel.departureCity}
                        destination={travel.destination}
                        coverImage={travel.coverImage}
                        pricePerPerson={travel.pricePerPerson}
                        duration={travel.duration}
                        maxGroupSize={travel.maxGroupSize}
                        country={travel.country}
                        tags={travel.tags}
                    />
                ))}
            </div>
        </section>
    );
};

export default TravelOptions;