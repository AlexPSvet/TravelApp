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
                        destination={travel.destination}
                        country={travel.country}
                        coverImage={travel.coverImage}
                        rating={travel.rating}
                        pricePerPerson={travel.pricePerPerson}
                        duration={travel.duration}
                        tags={travel.tags}
                        difficulty={travel.difficulty}
                    />
                ))}
            </div>
        </section>
    );
};

export default TravelOptions;