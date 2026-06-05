import TravelCard from "./TravelCard";

import "./TravelOptions.css";

const TravelOptions = ({ travels }) => {
    return (
        <section className="travels-container">
            <h3 className="grid-title">Results ({travels.length})</h3>

            <div className="travel-grid">
                {travels.map((travel) => (
                    <TravelCard
                        key={travel.id}
                        title={travel.title}
                        description={travel.description}
                        rating={travel.rating}
                        departureCity={travel.departureCity}
                        destinationCity={travel.destinationCity}
                        imageUrl={travel.imageUrl}
                        averagePrice={travel.averagePrice}
                        duration={travel.duration}
                        travelers={travel.travelers}
                        country={travel.country}
                        tags={travel.tags}
                    />
                ))}
            </div>
        </section>
    );
};

export default TravelOptions;