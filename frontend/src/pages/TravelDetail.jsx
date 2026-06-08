import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './TravelDetail.css';

// Helpers

const TRANSPORT_ICONS = {
    flight: '✈️', train: '🚂', bus: '🚌', ferry: '⛴️',
    car: '🚗', taxi: '🚕', metro: '🚇', other: '🚌',
};

const ACCOMMODATION_ICONS = {
    hotel: '🏨', airbnb: '🏠', hostel: '🛏️', resort: '🏖️',
    guesthouse: '🏡', camping: '⛺', other: '📍',
};

const ACTIVITY_ICONS = {
    sightseeing: '🏛️', food: '🍽️', adventure: '🧗', cultural: '🎭',
    shopping: '🛍️', relaxation: '🌿', other: '📌',
};

const DIFFICULTY_CONFIG = {
    easy:        { label: 'Easy',        cls: 'badge--easy' },
    moderate:    { label: 'Moderate',    cls: 'badge--moderate' },
    challenging: { label: 'Challenging', cls: 'badge--challenging' },
};

function formatMinutes(mins) {
    if (!mins && mins !== 0) return null;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h > 0) return m > 0 ? `${h}h ${m}m` : `${h}h`;
    return `${m}m`;
}

function groupByDay(activities) {
    return (activities ?? []).reduce((acc, a) => {
        const day = a.dayNumber ?? 1;
        (acc[day] = acc[day] || []).push(a);
        return acc;
    }, {});
}

const TravelDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [travel, setTravel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`/api/travels/${slug}`)
            .then((res) => {
                if (!res.ok) throw new Error(`Error ${res.status}`);
                return res.json();
            })
            .then((data) => setTravel(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) return (
        <><NavBar /><div className="td-state">Loading travel…</div><Footer /></>
    );

    if (error) return (
        <><NavBar /><div className="td-state td-state--error">Failed to load travel: {error}</div><Footer /></>
    );

    if (!travel) return null;

    const itinerary  = travel.itinerary;
    const transports = itinerary?.transports ?? [];
    const stops      = itinerary?.stops ?? [];
    const totalNights = stops.reduce((s, st) => s + (st.nights || 0), 0);
    const diff = DIFFICULTY_CONFIG[travel.difficulty];

    return (
        <>
            <NavBar />

            <div
                className="td-hero"
                style={travel.coverImage ? { backgroundImage: `url(${travel.coverImage})` } : {}}
            >
                <div className="td-hero-overlay" />

                <div className="td-hero-content">
                    <p className="td-breadcrumb">
                        {[travel.continent, travel.country].filter(Boolean).join(' · ')}
                    </p>

                    <h1 className="td-hero-title">{travel.title}</h1>

                    <div className="td-hero-row">
                        <div className="td-hero-tags">
                            {(travel.tags ?? []).map((tag) => (
                                <span key={tag} className="td-tag">{tag}</span>
                            ))}
                        </div>
                        <div className="td-hero-badges">
                            {diff && (
                                <span className={`td-badge ${diff.cls}`}>{diff.label}</span>
                            )}
                            {travel.rating != null && (
                                <span className="td-badge td-badge--rating">⭐ {travel.rating}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="td-stats-bar">
                {totalNights > 0 && (
                    <div className="td-stat">
                        <span className="td-stat-icon">📅</span>
                        <span className="td-stat-value">{totalNights}</span>
                        <span className="td-stat-label">nights</span>
                    </div>
                )}
                {travel.pricePerPerson != null && (
                    <div className="td-stat">
                        <span className="td-stat-icon">💰</span>
                        <span className="td-stat-value">${travel.pricePerPerson}</span>
                        <span className="td-stat-label">per person</span>
                    </div>
                )}
                {travel.maxGroupSize && (
                    <div className="td-stat">
                        <span className="td-stat-icon">👥</span>
                        <span className="td-stat-value">{travel.maxGroupSize}</span>
                        <span className="td-stat-label">max group</span>
                    </div>
                )}
                {travel.destination && (
                    <div className="td-stat">
                        <span className="td-stat-icon">📍</span>
                        <span className="td-stat-value">{travel.destination}</span>
                        <span className="td-stat-label">destination</span>
                    </div>
                )}
            </div>

            <main className="td-wrapper">

                {/* About */}
                {travel.description && (
                    <section className="td-section">
                        <h2 className="td-section-title">About</h2>
                        <p className="td-description">{travel.description}</p>
                    </section>
                )}

                {/* Itinerary */}
                {(transports.length > 0 || stops.length > 0) && (
                    <section className="td-section">
                        <h2 className="td-section-title">Itinerary</h2>

                        {/* Transports */}
                        {transports.length > 0 && (
                            <div className="td-subsection">
                                <h3 className="td-subsection-title">Transport</h3>
                                <div className="td-transports">
                                    {transports.map((tr, i) => (
                                        <div key={i} className="td-transport-card">
                                            <div className="td-transport-top">
                                                <span className="td-transport-type-icon">
                                                    {TRANSPORT_ICONS[tr.type] ?? '🚌'}
                                                </span>
                                                <div className="td-transport-route">
                                                    <span className="td-transport-city">{tr.origin}</span>
                                                    <span className="td-transport-line" />
                                                    <span className="td-transport-dot" />
                                                    <span className="td-transport-city">{tr.destination}</span>
                                                </div>
                                                {tr.price != null && (
                                                    <span className="td-transport-price">${tr.price}</span>
                                                )}
                                            </div>
                                            <div className="td-transport-details">
                                                <span>{tr.provider}</span>
                                                {tr.seatClass && tr.seatClass !== 'n/a' && (
                                                    <span className="td-detail-pill">{tr.seatClass}</span>
                                                )}
                                                {tr.duration && (
                                                    <span className="td-detail-pill">⏱ {formatMinutes(tr.duration)}</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Stops */}
                        {stops.length > 0 && (
                            <div className="td-subsection">
                                <h3 className="td-subsection-title">Stops</h3>
                                <div className="td-stops">
                                    {stops.map((stop, i) => {
                                        const byDay     = groupByDay(stop.activities);
                                        const sortedDays = Object.keys(byDay).map(Number).sort((a, b) => a - b);

                                        return (
                                            <div key={i} className="td-stop-card">

                                                {/* Stop header */}
                                                <div className="td-stop-header">
                                                    <div className="td-stop-location">
                                                        <span className="td-stop-icon">
                                                            {ACCOMMODATION_ICONS[stop.accommodationType] ?? '📍'}
                                                        </span>
                                                        <div>
                                                            <p className="td-stop-city">{stop.city}, {stop.country}</p>
                                                            {stop.accommodationName && (
                                                                <p className="td-stop-name">{stop.accommodationName}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="td-stop-meta">
                                                        <span className="td-stop-nights">
                                                            {stop.nights} night{stop.nights !== 1 ? 's' : ''}
                                                        </span>
                                                        {stop.pricePerNight != null && (
                                                            <span className="td-stop-price">${stop.pricePerNight}/night</span>
                                                        )}
                                                    </div>
                                                </div>

                                                {stop.description && (
                                                    <p className="td-stop-description">{stop.description}</p>
                                                )}

                                                {stop.amenities?.length > 0 && (
                                                    <div className="td-amenities">
                                                        {stop.amenities.map((a) => (
                                                            <span key={a} className="td-amenity">{a}</span>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Activities grouped by day */}
                                                {sortedDays.length > 0 && (
                                                    <div className="td-activities">
                                                        <p className="td-activities-title">Daily Activities</p>
                                                        {sortedDays.map((day) => (
                                                            <div key={day} className="td-day-group">
                                                                <p className="td-day-label">Day {day}</p>
                                                                <ul className="td-activity-list">
                                                                    {byDay[day].map((act, ai) => (
                                                                        <li key={ai} className="td-activity">
                                                                            <span className="td-activity-icon">
                                                                                {ACTIVITY_ICONS[act.type] ?? '📌'}
                                                                            </span>
                                                                            <div className="td-activity-body">
                                                                                <div className="td-activity-name-row">
                                                                                    <p className="td-activity-name">{act.name}</p>
                                                                                    {act.included && (
                                                                                        <span className="td-activity-included">included</span>
                                                                                    )}
                                                                                </div>
                                                                                {act.description && (
                                                                                    <p className="td-activity-desc">{act.description}</p>
                                                                                )}
                                                                                <div className="td-activity-meta">
                                                                                    {act.duration && (
                                                                                        <span>⏱ {act.duration}h</span>
                                                                                    )}
                                                                                    {act.estimatedCost > 0 && (
                                                                                        <span>💵 ${act.estimatedCost}</span>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </section>
                )}

                <button className="td-back-btn" onClick={() => navigate('/travels')}>
                    ← Back to Travels
                </button>

            </main>

            <Footer />
        </>
    );
};

export default TravelDetail;
