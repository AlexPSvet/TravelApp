import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import AnimatedTitle from '../components/AnimatedTitle';
import TravelCard from '../components/TravelCard';
import './Home.css';

const FEATURES = [
    {
        icon: '🗺️',
        title: 'Plan Every Detail',
        description:
            'Build day-by-day itineraries with transport legs, hotel stays, and activities. Everything in one place.',
    },
    {
        icon: '✈️',
        title: 'Track Transport',
        description:
            'Log flights, trains, buses and ferries with departure times, durations, and booking references.',
    },
    {
        icon: '🏨',
        title: 'Manage Accommodation',
        description:
            'Compare hotels, Airbnbs, and hostels. Store nightly prices, amenities, and check-in dates.',
    },
    {
        icon: '📅',
        title: 'Daily Activity Planner',
        description:
            'Schedule sightseeing, food experiences, and adventures for each day of your stay.',
    },
    {
        icon: '💰',
        title: 'Automatic Pricing',
        description:
            'Price per person is calculated automatically from transport costs and accommodation rates.',
    },
    {
        icon: '🌍',
        title: 'Community Itineraries',
        description:
            'Browse real itineraries published by fellow travelers. Get inspired before you book.',
    },
];

const STEPS = [
    {
        number: '01',
        title: 'Browse Destinations',
        description:
            'Explore a curated library of travel itineraries across Europe, Asia, the Americas, and beyond.',
    },
    {
        number: '02',
        title: 'Dive into the Details',
        description:
            'Open any travel to see the full day-by-day breakdown — flights, hotels, activities, and costs.',
    },
    {
        number: '03',
        title: 'Publish Your Own',
        description:
            'Travelled somewhere amazing? Share your itinerary so others can follow in your footsteps.',
    },
];

const STATS = [
    { value: '6+',   label: 'Destinations' },
    { value: '30+',  label: 'Activities' },
    { value: '100%', label: 'Free to use' },
    { value: '∞',    label: 'Inspiration' },
];

const TESTIMONIALS = [
    {
        name: 'Sofia M.',
        avatar: '🇫🇷',
        text: 'I planned my entire Paris weekend in under 20 minutes. The day-by-day breakdown is brilliant — nothing was left to chance.',
    },
    {
        name: 'James K.',
        avatar: '🇯🇵',
        text: 'Found an incredible Tokyo itinerary in the community. Copied the structure and customised it to fit my budget perfectly.',
    },
    {
        name: 'Amara D.',
        avatar: '🇰🇪',
        text: 'The automatic price calculator saved me hours of spreadsheet work. I just entered the hotels and it did the rest.',
    },
];

const Home = () => {
    const navigate = useNavigate();

    const [featured, setFeatured] = useState([]);

    // Fetch a small sample of published travels for the preview section
    useEffect(() => {
        fetch('/api/travels')
            .then((r) => r.ok ? r.json() : [])
            .then((data) => setFeatured(data.slice(0, 3)))
            .catch(() => {});
    }, []);

    return (
        <>
            <NavBar />

            <section className="home-hero">
                <div className="home-hero-bg" aria-hidden="true" />

                <div className="home-hero-content">
                    <p className="home-hero-eyebrow">The travel planner built for explorers</p>

                    <AnimatedTitle
                        text="Explore the World"
                        emojis={['✈️', '🌍', '🏔️', '🏝️', '🧳', '🚂']}
                    />

                    <p className="home-hero-subtitle">
                        Discover ready-made itineraries, plan your perfect trip day by day,
                        and share your adventures with a global community of travelers.
                    </p>

                    <div className="home-hero-actions">
                        <button
                            className="home-btn home-btn--primary"
                            onClick={() => navigate('/travels')}
                        >
                            Explore Travels
                        </button>
                        <button
                            className="home-btn home-btn--ghost"
                            onClick={() => navigate('/publish')}
                        >
                            Publish Your Trip
                        </button>
                    </div>
                </div>

                <div className="home-hero-scroll-hint" aria-hidden="true">
                    <span />
                </div>
            </section>

            <div className="home-stats">
                {STATS.map((s) => (
                    <div key={s.label} className="home-stat">
                        <span className="home-stat-value">{s.value}</span>
                        <span className="home-stat-label">{s.label}</span>
                    </div>
                ))}
            </div>

            <section className="home-section home-features-section">
                <div className="home-section-inner">
                    <p className="home-eyebrow">Everything you need</p>
                    <h2 className="home-section-title">Plan smarter, travel better</h2>
                    <p className="home-section-sub">
                        From the first search to the final night, TravelApp covers every step
                        of your journey planning — beautifully and for free.
                    </p>

                    <div className="home-features-grid">
                        {FEATURES.map((f) => (
                            <div key={f.title} className="home-feature-card">
                                <span className="home-feature-icon">{f.icon}</span>
                                <h3 className="home-feature-title">{f.title}</h3>
                                <p className="home-feature-desc">{f.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="home-section home-how-section">
                <div className="home-section-inner">
                    <p className="home-eyebrow">Simple by design</p>
                    <h2 className="home-section-title">How TravelApp works</h2>

                    <div className="home-steps">
                        {STEPS.map((step, i) => (
                            <div key={step.number} className="home-step">
                                <div className="home-step-number">{step.number}</div>
                                {i < STEPS.length - 1 && (
                                    <div className="home-step-connector" aria-hidden="true" />
                                )}
                                <h3 className="home-step-title">{step.title}</h3>
                                <p className="home-step-desc">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {featured.length > 0 && (
                <section className="home-section home-featured-section">
                    <div className="home-section-inner">
                        <p className="home-eyebrow">Fresh from the community</p>
                        <h2 className="home-section-title">Popular itineraries</h2>
                        <p className="home-section-sub">
                            Real trips, real details. See exactly what's included before you go.
                        </p>

                        <div className="home-featured-grid">
                            {featured.map((travel) => (
                                <TravelCard
                                    key={travel.slug}
                                    travelId={travel.slug}
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

                        <div className="home-featured-more">
                            <button
                                className="home-btn home-btn--outline"
                                onClick={() => navigate('/travels')}
                            >
                                View all travels →
                            </button>
                        </div>
                    </div>
                </section>
            )}

            <section className="home-section home-testimonials-section">
                <div className="home-section-inner">
                    <p className="home-eyebrow">Travelers love it</p>
                    <h2 className="home-section-title">What the community says</h2>

                    <div className="home-testimonials">
                        {TESTIMONIALS.map((t) => (
                            <div key={t.name} className="home-testimonial">
                                <p className="home-testimonial-text">"{t.text}"</p>
                                <div className="home-testimonial-author">
                                    <span className="home-testimonial-avatar">{t.avatar}</span>
                                    <span className="home-testimonial-name">{t.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="home-cta">
                <div className="home-cta-inner">
                    <h2 className="home-cta-title">Your next adventure is one click away</h2>
                    <p className="home-cta-sub">
                        Join thousands of travelers who plan, discover, and share unforgettable trips.
                    </p>
                    <div className="home-cta-actions">
                        <button
                            className="home-btn home-btn--white"
                            onClick={() => navigate('/travels')}
                        >
                            Start Exploring
                        </button>
                        <button
                            className="home-btn home-btn--ghost-white"
                            onClick={() => navigate('/publish')}
                        >
                            Share Your Trip
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Home;
