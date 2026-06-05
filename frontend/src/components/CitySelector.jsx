import "./CitySelector.css";

const CitySelector = ({
    departureCity,
    destinationCity,
    onDepartureChange,
    onDestinationChange
}) => {
    return (
        <section className="city-selector">
            <input
                type="text"
                placeholder="Departure city"
                value={departureCity}
                onChange={(e) =>
                    onDepartureChange(e.target.value)
                }
            />

            <input
                type="text"
                placeholder="Destination city"
                value={destinationCity}
                onChange={(e) =>
                    onDestinationChange(e.target.value)
                }
            />
        </section>
    );
};

export default CitySelector;