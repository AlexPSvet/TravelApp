import "./TravelOptions.css";

const TravelOptions = ({ travels }) => {
    return (
        <section className="travel-grid">
            {travels.map((travel) => (
                <article
                    key={travel.id}
                    className="travel-card"
                >
                    <h3>{travel.title}</h3>

                    <p>
                        {travel.departure}
                        {" → "}
                        {travel.destination}
                    </p>

                    <p>
                        ${travel.price}
                    </p>
                </article>
            ))}
        </section>
    );
};

export default TravelOptions;