import { useState } from 'react';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import HeroSection from "../components/HeroSection";
import CitySelector from "../components/CitySelector";
import TravelOptions from "../components/TravelOptions";

const TravelsPage = () => {
    const [departureCity, setDepartureCity] = useState("");
    const [destinationCity, setDestinationCity] = useState("");

    const travels = [
        {
            id: 1,
            title: "Weekend in Paris",
            departure: "London",
            destination: "Paris",
            price: 250
        },
        {
            id: 2,
            title: "Explore Tokyo",
            departure: "Madrid",
            destination: "Tokyo",
            price: 1200
        }
    ];

    const filteredTravels = travels.filter((travel) => {
        const departureMatch =
            departureCity === "" ||
            travel.departure
                .toLowerCase()
                .includes(departureCity.toLowerCase());

        const destinationMatch =
            destinationCity === "" ||
            travel.destination
                .toLowerCase()
                .includes(destinationCity.toLowerCase());

        return departureMatch && destinationMatch;
    });

    return (
        <>
            <NavBar />

            <HeroSection
                title="Discover Travel Plans"
                subtitle="Find your next adventure"
            />

            <CitySelector
                departureCity={departureCity}
                destinationCity={destinationCity}
                onDepartureChange={setDepartureCity}
                onDestinationChange={setDestinationCity}
            />

            <TravelOptions
                travels={filteredTravels}
            />

            <Footer />
        </>
    );
};

export default TravelsPage;