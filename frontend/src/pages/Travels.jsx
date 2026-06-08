import { useState, useEffect } from 'react';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import TravelOptions from '../components/TravelOptions';

const TravelsPage = () => {
    const [travels, setTravels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [destinationCity, setDestinationCity] = useState('');

    useEffect(() => {
        fetch('/api/travels')
            .then((res) => {
                if (!res.ok) throw new Error(`Error ${res.status}`);
                return res.json();
            })
            .then((data) => setTravels(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const filteredTravels = travels.filter((travel) =>
        destinationCity === '' ||
        (travel.destination ?? '')
            .toLowerCase()
            .includes(destinationCity.toLowerCase())
    );

    return (
        <>
            <NavBar />

            <HeroSection
                title="Discover Travel Plans"
                subtitle="Find your next adventure"
                minHeight="40vh"
            />

            {loading && <p style={{ textAlign: 'center', padding: '2rem' }}>Loading travels…</p>}
            {error   && <p style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>Failed to load travels: {error}</p>}

            {!loading && !error && (
                <TravelOptions travels={filteredTravels} />
            )}

            <Footer />
        </>
    );
};

export default TravelsPage;