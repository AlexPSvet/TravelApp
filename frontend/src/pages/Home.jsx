import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import HeroSection from '../components/HeroSection';
import AnimatedTitle from '../components/AnimatedTitle';

const Home = () => {

    return (
        <>
            <NavBar />

            <HeroSection
                subtitle="Your next adventure starts here"
                description="
                    Discover travel plans shared by the community,
                    publish your own itineraries, and connect with
                    travelers from around the globe.
                "
            >
                <AnimatedTitle
                    text="Explore the World"
                    emojis={[
                        "✈️",
                        "🌍",
                        "🏔️",
                        "🏝️",
                        "🧳",
                        "🚂"
                    ]}
                />
            </HeroSection>

            <Footer />
        </>
    )
}

export default Home;