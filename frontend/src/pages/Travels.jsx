import { useState } from 'react';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import HeroSection from "../components/HeroSection";
import TravelOptions from "../components/TravelOptions";

const TravelsPage = () => {
    const [departureCity, setDepartureCity] = useState("");
    const [destinationCity, setDestinationCity] = useState("");

    const travels = [
        {
            id: 1,
            title: "Weekend in Paris",
            description: "Discover the Eiffel Tower, Montmartre, and the best Parisian cafés.",
            departureCity: "London",
            destinationCity: "Paris",
            averagePrice: 250,
            rating: 4.5,
            duration: "3 days",
            travelers: 24,
            country: "France",
            imageUrl: "paris.png",
            tags: ["Culture", "Food", "City Break"]
        },
        {
            id: 2,
            title: "Explore Tokyo",
            description: "Experience Tokyo's vibrant nightlife, temples, and world-class cuisine.",
            departureCity: "Madrid",
            destinationCity: "Tokyo",
            averagePrice: 1200,
            rating: 4.8,
            duration: "10 days",
            travelers: 42,
            country: "Japan",
            imageUrl: "paris.png",
            tags: ["Technology", "Food", "Culture"]
        },
        {
            id: 3,
            title: "Backpacking Thailand",
            description: "Travel through Bangkok, Chiang Mai, and Phuket on a budget-friendly adventure.",
            departureCity: "Berlin",
            destinationCity: "Bangkok",
            averagePrice: 950,
            rating: 4.9,
            duration: "14 days",
            travelers: 57,
            country: "Thailand",
            imageUrl: "paris.png",
            tags: ["Adventure", "Beach", "Food"]
        },
        {
            id: 4,
            title: "Road Trip Across Iceland",
            description: "Drive the Ring Road and witness waterfalls, glaciers, and volcanoes.",
            departureCity: "Amsterdam",
            destinationCity: "Reykjavik",
            averagePrice: 1800,
            rating: 4.9,
            duration: "8 days",
            travelers: 18,
            country: "Iceland",
            imageUrl: "paris.png",
            tags: ["Nature", "Photography", "Adventure"]
        },
        {
            id: 5,
            title: "Greek Island Escape",
            description: "Relax on the beaches of Santorini and Mykonos with breathtaking sea views.",
            departureCity: "Rome",
            destinationCity: "Santorini",
            averagePrice: 850,
            rating: 4.7,
            duration: "7 days",
            travelers: 31,
            country: "Greece",
            imageUrl: "paris.png",
            tags: ["Beach", "Relaxation", "Luxury"]
        },
        {
            id: 6,
            title: "New York City Experience",
            description: "Visit Times Square, Central Park, Broadway, and iconic NYC landmarks.",
            departureCity: "Paris",
            destinationCity: "New York",
            averagePrice: 1400,
            rating: 4.6,
            duration: "6 days",
            travelers: 67,
            country: "United States",
            imageUrl: "paris.png",
            tags: ["City", "Shopping", "Culture"]
        },
        {
            id: 7,
            title: "Safari in Kenya",
            description: "Observe wildlife in their natural habitat across Kenya's national parks.",
            departureCity: "Brussels",
            destinationCity: "Nairobi",
            averagePrice: 2200,
            rating: 5.0,
            duration: "12 days",
            travelers: 12,
            country: "Kenya",
            imageUrl: "paris.png",
            tags: ["Safari", "Nature", "Wildlife"]
        },
        {
            id: 8,
            title: "Northern Lights Expedition",
            description: "Chase the Aurora Borealis and explore the Arctic wilderness.",
            departureCity: "Copenhagen",
            destinationCity: "Tromsø",
            averagePrice: 1600,
            rating: 4.8,
            duration: "5 days",
            travelers: 21,
            country: "Norway",
            imageUrl: "paris.png",
            tags: ["Nature", "Winter", "Photography"]
        }
    ];

    const filteredTravels = travels.filter((travel) => {
        const departureMatch =
            departureCity === "" ||
            travel.departureCity
                .toLowerCase()
                .includes(departureCity.toLowerCase());

        const destinationMatch =
            destinationCity === "" ||
            travel.destinationCity
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
                minHeight="40vh"
            />

            <TravelOptions
                travels={filteredTravels}
            />

            <Footer />
        </>
    );
};

export default TravelsPage;