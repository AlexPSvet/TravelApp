import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    IoAdd, IoTrashOutline, IoArrowForward, IoArrowBack,
    IoChevronDown, IoChevronUp, IoClose, IoPaperPlane,
    IoCheckmarkCircle,
} from 'react-icons/io5';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './Publish.css';

const CONTINENTS       = ['Africa', 'Antarctica', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'];
const TRANSPORT_TYPES  = ['flight', 'train', 'bus', 'ferry', 'car', 'taxi', 'metro', 'other'];
const SEAT_CLASSES     = ['economy', 'business', 'first', 'standard', 'n/a'];
const ACCOMMODATION    = ['hotel', 'airbnb', 'hostel', 'resort', 'guesthouse', 'camping', 'other'];
const ACTIVITY_TYPES   = ['sightseeing', 'food', 'adventure', 'cultural', 'shopping', 'relaxation', 'other'];
const DIFFICULTIES     = ['easy', 'moderate', 'challenging'];

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const mkTransport = () => ({ type: 'flight', provider: '', origin: '', destination: '', duration: '', price: '', seatClass: 'economy', notes: '' });
const mkActivity  = () => ({ name: '', dayNumber: 1, type: 'sightseeing', duration: '', estimatedCost: '', included: false, description: '' });
const mkStop      = () => ({ city: '', country: '', accommodationType: 'hotel', accommodationName: '', pricePerNight: '', nights: '', description: '', amenities: '', activities: [], _open: false });

const Publish = () => {
    const navigate = useNavigate();

    const [step,        setStep]        = useState(1);
    const [errors,      setErrors]      = useState({});
    const [submitting,  setSubmitting]  = useState(false);
    const [submitError, setSubmitError] = useState(null);

    /* Step 1 */
    const [general,   setGeneral]   = useState({ title: '', description: '', coverImage: '', destination: '', country: '', continent: '', difficulty: 'moderate', maxGroupSize: '', tags: [] });
    const [tagInput,  setTagInput]  = useState('');

    /* Step 2 */
    const [transports, setTransports] = useState([mkTransport()]);
    const [stops,      setStops]      = useState([mkStop()]);

    const setGen = (f, v) => setGeneral(p => ({ ...p, [f]: v }));

    const addTag = () => {
        const t = tagInput.trim().replace(/,$/, '');
        if (t && !general.tags.includes(t)) setGen('tags', [...general.tags, t]);
        setTagInput('');
    };

    const updTransport = (i, f, v) =>
        setTransports(p => p.map((t, idx) => idx === i ? { ...t, [f]: v } : t));

    const updStop = (i, f, v) =>
        setStops(p => p.map((s, idx) => idx === i ? { ...s, [f]: v } : s));

    const updActivity = (si, ai, f, v) =>
        setStops(p => p.map((s, i) => i !== si ? s : {
            ...s, activities: s.activities.map((a, j) => j !== ai ? a : { ...a, [f]: v }),
        }));

    const validateStep1 = () => {
        const e = {};
        if (!general.title.trim())       e.title       = 'Title is required';
        if (!general.destination.trim()) e.destination = 'Destination is required';
        setErrors(e);
        return !Object.keys(e).length;
    };

    // Submit
    const handlePublish = async () => {
        setSubmitting(true);
        setSubmitError(null);
        try {
            const body = {
                title:        general.title,
                description:  general.description  || undefined,
                coverImage:   general.coverImage   || undefined,
                destination:  general.destination,
                country:      general.country      || undefined,
                continent:    general.continent    || undefined,
                difficulty:   general.difficulty,
                maxGroupSize: general.maxGroupSize ? Number(general.maxGroupSize) : undefined,
                tags:         general.tags,
                status:       'published',
                itinerary: {
                    transports: transports
                        .filter(t => t.provider && t.origin && t.destination)
                        .map(t => ({
                            type: t.type, provider: t.provider, origin: t.origin,
                            destination: t.destination, duration: Number(t.duration) || 0,
                            price: Number(t.price) || 0, seatClass: t.seatClass,
                            notes: t.notes || undefined,
                        })),
                    stops: stops
                        .filter(s => s.city && s.country)
                        .map(s => ({
                            city: s.city, country: s.country,
                            accommodationType: s.accommodationType,
                            accommodationName: s.accommodationName || undefined,
                            pricePerNight: Number(s.pricePerNight) || 0,
                            nights: Number(s.nights) || 1,
                            description: s.description || undefined,
                            amenities: s.amenities
                                ? s.amenities.split(',').map(a => a.trim()).filter(Boolean)
                                : [],
                            activities: s.activities.filter(a => a.name).map(a => ({
                                name: a.name, dayNumber: Number(a.dayNumber) || 1,
                                type: a.type,
                                duration:      a.duration      ? Number(a.duration)      : undefined,
                                estimatedCost: a.estimatedCost ? Number(a.estimatedCost) : 0,
                                included: a.included,
                                description: a.description || undefined,
                            })),
                        })),
                },
            };

            const res = await fetch('/api/travels', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Failed to publish');
            }

            const travel = await res.json();
            navigate(`/travels/${travel.slug}`);
        } catch (err) {
            setSubmitError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <NavBar />

            <div className="pub-page">

                <div className="pub-stepper">
                    <div className={`pub-step ${step === 1 ? 'pub-step--active' : 'pub-step--done'}`}>
                        <div className="pub-step-circle">
                            {step > 1 ? <IoCheckmarkCircle /> : '1'}
                        </div>
                        <span>General Info</span>
                    </div>
                    <div className={`pub-step-line ${step > 1 ? 'pub-step-line--done' : ''}`} />
                    <div className={`pub-step ${step === 2 ? 'pub-step--active' : ''}`}>
                        <div className="pub-step-circle">2</div>
                        <span>Itinerary</span>
                    </div>
                </div>

                {/* General information */}
                {step === 1 && (
                    <div className="pub-card pub-card--enter">

                        <div className="pub-card-header">
                            <h1 className="pub-heading">General Information</h1>
                            <p className="pub-sub">Tell travelers what your trip is about. Fields marked <span>*</span> are required.</p>
                        </div>

                        <div className="pub-form">

                            {/* Title */}
                            <div className={`pub-field ${errors.title ? 'pub-field--err' : ''}`}>
                                <label className="pub-label">Title <span className="pub-required">*</span></label>
                                <input className="pub-input" type="text" placeholder="e.g. Weekend in Rome"
                                    value={general.title} onChange={e => setGen('title', e.target.value)} />
                                {errors.title && <p className="pub-err-msg">{errors.title}</p>}
                            </div>

                            {/* Description */}
                            <div className="pub-field">
                                <label className="pub-label">Description</label>
                                <textarea className="pub-textarea" rows={4}
                                    placeholder="What makes this trip special? Give travelers a reason to read on."
                                    value={general.description} onChange={e => setGen('description', e.target.value)} />
                            </div>

                            {/* Cover Image */}
                            <div className="pub-field">
                                <label className="pub-label">Cover Image URL</label>
                                <input className="pub-input" type="url"
                                    placeholder="https://images.unsplash.com/..."
                                    value={general.coverImage} onChange={e => setGen('coverImage', e.target.value)} />
                                {general.coverImage && (
                                    <div className="pub-img-preview">
                                        <img src={general.coverImage} alt="Cover preview"
                                            onError={e => { e.target.style.display = 'none'; }} />
                                    </div>
                                )}
                            </div>

                            {/* Destination + Country */}
                            <div className="pub-row">
                                <div className={`pub-field ${errors.destination ? 'pub-field--err' : ''}`}>
                                    <label className="pub-label">Destination <span className="pub-required">*</span></label>
                                    <input className="pub-input" type="text" placeholder="e.g. Rome"
                                        value={general.destination} onChange={e => setGen('destination', e.target.value)} />
                                    {errors.destination && <p className="pub-err-msg">{errors.destination}</p>}
                                </div>
                                <div className="pub-field">
                                    <label className="pub-label">Country</label>
                                    <input className="pub-input" type="text" placeholder="e.g. Italy"
                                        value={general.country} onChange={e => setGen('country', e.target.value)} />
                                </div>
                            </div>

                            {/* Continent + Max Group Size */}
                            <div className="pub-row">
                                <div className="pub-field">
                                    <label className="pub-label">Continent</label>
                                    <select className="pub-select" value={general.continent} onChange={e => setGen('continent', e.target.value)}>
                                        <option value="">— Select —</option>
                                        {CONTINENTS.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="pub-field">
                                    <label className="pub-label">Max Group Size</label>
                                    <input className="pub-input" type="number" min="1" placeholder="e.g. 12"
                                        value={general.maxGroupSize} onChange={e => setGen('maxGroupSize', e.target.value)} />
                                </div>
                            </div>

                            {/* Difficulty */}
                            <div className="pub-field">
                                <label className="pub-label">Difficulty</label>
                                <div className="pub-difficulty">
                                    {DIFFICULTIES.map(d => (
                                        <button key={d} type="button"
                                            className={`pub-diff ${d} ${general.difficulty === d ? 'selected' : ''}`}
                                            onClick={() => setGen('difficulty', d)}>
                                            {cap(d)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="pub-field">
                                <label className="pub-label">Tags</label>
                                <div className="pub-tag-box">
                                    {general.tags.map(tag => (
                                        <span key={tag} className="pub-tag">
                                            {tag}
                                            <button type="button" onClick={() => setGen('tags', general.tags.filter(t => t !== tag))} aria-label={`Remove ${tag}`}>
                                                <IoClose />
                                            </button>
                                        </span>
                                    ))}
                                    <input className="pub-tag-input" type="text"
                                        placeholder="Type a tag, press Enter…"
                                        value={tagInput}
                                        onChange={e => setTagInput(e.target.value)}
                                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(); } }}
                                    />
                                </div>
                                <p className="pub-hint">Press Enter or comma to add a tag</p>
                            </div>

                        </div>

                        <div className="pub-actions">
                            <div />
                            <button className="pub-btn pub-btn--primary"
                                onClick={() => { if (validateStep1()) setStep(2); }}>
                                Next: Add Itinerary <IoArrowForward />
                            </button>
                        </div>

                    </div>
                )}

                {/* Itinerary */}
                {step === 2 && (
                    <div className="pub-card pub-card--enter">

                        <div className="pub-card-header">
                            <h1 className="pub-heading">Itinerary</h1>
                            <p className="pub-sub">Add transport legs and city stops. Activities within each stop are optional but recommended.</p>
                        </div>

                        {/* ── Transport section ── */}
                        <section className="pub-section">
                            <div className="pub-section-hd">
                                <div>
                                    <h2 className="pub-section-title">✈️ Transport</h2>
                                    <p className="pub-section-sub">Each leg of travel between locations.</p>
                                </div>
                            </div>

                            <div className="pub-items">
                                {transports.map((tr, i) => (
                                    <div key={i} className="pub-item">
                                        <div className="pub-item-hd">
                                            <span className="pub-item-label">Leg {i + 1}</span>
                                            {transports.length > 1 && (
                                                <button className="pub-remove" type="button"
                                                    onClick={() => setTransports(p => p.filter((_, idx) => idx !== i))}>
                                                    <IoTrashOutline /> Remove
                                                </button>
                                            )}
                                        </div>
                                        <div className="pub-form">
                                            <div className="pub-row">
                                                <div className="pub-field">
                                                    <label className="pub-label">Type</label>
                                                    <select className="pub-select" value={tr.type} onChange={e => updTransport(i, 'type', e.target.value)}>
                                                        {TRANSPORT_TYPES.map(t => <option key={t} value={t}>{cap(t)}</option>)}
                                                    </select>
                                                </div>
                                                <div className="pub-field">
                                                    <label className="pub-label">Provider</label>
                                                    <input className="pub-input" type="text" placeholder="e.g. Air France"
                                                        value={tr.provider} onChange={e => updTransport(i, 'provider', e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="pub-row">
                                                <div className="pub-field">
                                                    <label className="pub-label">Origin</label>
                                                    <input className="pub-input" type="text" placeholder="e.g. London"
                                                        value={tr.origin} onChange={e => updTransport(i, 'origin', e.target.value)} />
                                                </div>
                                                <div className="pub-field">
                                                    <label className="pub-label">Destination</label>
                                                    <input className="pub-input" type="text" placeholder="e.g. Paris CDG"
                                                        value={tr.destination} onChange={e => updTransport(i, 'destination', e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="pub-row pub-row--3">
                                                <div className="pub-field">
                                                    <label className="pub-label">Duration (min)</label>
                                                    <input className="pub-input" type="number" min="0" placeholder="e.g. 90"
                                                        value={tr.duration} onChange={e => updTransport(i, 'duration', e.target.value)} />
                                                </div>
                                                <div className="pub-field">
                                                    <label className="pub-label">Price ($)</label>
                                                    <input className="pub-input" type="number" min="0" placeholder="e.g. 420"
                                                        value={tr.price} onChange={e => updTransport(i, 'price', e.target.value)} />
                                                </div>
                                                <div className="pub-field">
                                                    <label className="pub-label">Class</label>
                                                    <select className="pub-select" value={tr.seatClass} onChange={e => updTransport(i, 'seatClass', e.target.value)}>
                                                        {SEAT_CLASSES.map(c => <option key={c} value={c}>{cap(c)}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="pub-field">
                                                <label className="pub-label">Notes <span className="pub-optional">(optional)</span></label>
                                                <input className="pub-input" type="text" placeholder="Booking reference, gate, special notes…"
                                                    value={tr.notes} onChange={e => updTransport(i, 'notes', e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="pub-add" type="button" onClick={() => setTransports(p => [...p, mkTransport()])}>
                                <IoAdd /> Add Transport Leg
                            </button>
                        </section>

                        {/* Stop sections*/}
                        <section className="pub-section">
                            <div className="pub-section-hd">
                                <div>
                                    <h2 className="pub-section-title">🏨 Stops</h2>
                                    <p className="pub-section-sub">Each city or location you'll stay in.</p>
                                </div>
                            </div>

                            <div className="pub-items">
                                {stops.map((stop, si) => (
                                    <div key={si} className="pub-item pub-item--stop">
                                        <div className="pub-item-hd">
                                            <span className="pub-item-label">
                                                Stop {si + 1}{stop.city ? ` · ${stop.city}` : ''}
                                            </span>
                                            {stops.length > 1 && (
                                                <button className="pub-remove" type="button"
                                                    onClick={() => setStops(p => p.filter((_, idx) => idx !== si))}>
                                                    <IoTrashOutline /> Remove
                                                </button>
                                            )}
                                        </div>

                                        <div className="pub-form">
                                            <div className="pub-row">
                                                <div className="pub-field">
                                                    <label className="pub-label">City</label>
                                                    <input className="pub-input" type="text" placeholder="e.g. Rome"
                                                        value={stop.city} onChange={e => updStop(si, 'city', e.target.value)} />
                                                </div>
                                                <div className="pub-field">
                                                    <label className="pub-label">Country</label>
                                                    <input className="pub-input" type="text" placeholder="e.g. Italy"
                                                        value={stop.country} onChange={e => updStop(si, 'country', e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="pub-row">
                                                <div className="pub-field">
                                                    <label className="pub-label">Accommodation Type</label>
                                                    <select className="pub-select" value={stop.accommodationType} onChange={e => updStop(si, 'accommodationType', e.target.value)}>
                                                        {ACCOMMODATION.map(t => <option key={t} value={t}>{cap(t)}</option>)}
                                                    </select>
                                                </div>
                                                <div className="pub-field">
                                                    <label className="pub-label">Accommodation Name</label>
                                                    <input className="pub-input" type="text" placeholder="e.g. Hotel Artemide"
                                                        value={stop.accommodationName} onChange={e => updStop(si, 'accommodationName', e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="pub-row">
                                                <div className="pub-field">
                                                    <label className="pub-label">Price / Night ($)</label>
                                                    <input className="pub-input" type="number" min="0" placeholder="e.g. 110"
                                                        value={stop.pricePerNight} onChange={e => updStop(si, 'pricePerNight', e.target.value)} />
                                                </div>
                                                <div className="pub-field">
                                                    <label className="pub-label">Nights</label>
                                                    <input className="pub-input" type="number" min="1" placeholder="e.g. 3"
                                                        value={stop.nights} onChange={e => updStop(si, 'nights', e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="pub-field">
                                                <label className="pub-label">Amenities <span className="pub-optional">(comma-separated)</span></label>
                                                <input className="pub-input" type="text" placeholder="wifi, breakfast included, pool, gym…"
                                                    value={stop.amenities} onChange={e => updStop(si, 'amenities', e.target.value)} />
                                            </div>
                                            <div className="pub-field">
                                                <label className="pub-label">Description</label>
                                                <textarea className="pub-textarea" rows={3}
                                                    placeholder="Describe the neighbourhood, surroundings, and what makes this place special."
                                                    value={stop.description} onChange={e => updStop(si, 'description', e.target.value)} />
                                            </div>
                                        </div>

                                        {/* Activities accordion */}
                                        <div className="pub-accordion">
                                            <button className="pub-accordion-toggle" type="button"
                                                onClick={() => updStop(si, '_open', !stop._open)}>
                                                <span>📅 Daily Activities <em>({stop.activities.length})</em></span>
                                                {stop._open ? <IoChevronUp /> : <IoChevronDown />}
                                            </button>

                                            {stop._open && (
                                                <div className="pub-accordion-body">
                                                    {stop.activities.map((act, ai) => (
                                                        <div key={ai} className="pub-activity">
                                                            <div className="pub-activity-hd">
                                                                <span className="pub-item-label pub-item-label--sm">Activity {ai + 1}</span>
                                                                <button className="pub-remove pub-remove--icon" type="button"
                                                                    onClick={() => updStop(si, 'activities', stop.activities.filter((_, j) => j !== ai))}>
                                                                    <IoTrashOutline />
                                                                </button>
                                                            </div>
                                                            <div className="pub-form">
                                                                <div className="pub-row">
                                                                    <div className="pub-field pub-field--grow">
                                                                        <label className="pub-label">Name</label>
                                                                        <input className="pub-input" type="text" placeholder="e.g. Visit the Colosseum"
                                                                            value={act.name} onChange={e => updActivity(si, ai, 'name', e.target.value)} />
                                                                    </div>
                                                                    <div className="pub-field pub-field--narrow">
                                                                        <label className="pub-label">Day #</label>
                                                                        <input className="pub-input" type="number" min="1"
                                                                            value={act.dayNumber} onChange={e => updActivity(si, ai, 'dayNumber', e.target.value)} />
                                                                    </div>
                                                                </div>
                                                                <div className="pub-row pub-row--3">
                                                                    <div className="pub-field">
                                                                        <label className="pub-label">Type</label>
                                                                        <select className="pub-select" value={act.type} onChange={e => updActivity(si, ai, 'type', e.target.value)}>
                                                                            {ACTIVITY_TYPES.map(t => <option key={t} value={t}>{cap(t)}</option>)}
                                                                        </select>
                                                                    </div>
                                                                    <div className="pub-field">
                                                                        <label className="pub-label">Duration (h)</label>
                                                                        <input className="pub-input" type="number" min="0" step="0.5" placeholder="e.g. 2"
                                                                            value={act.duration} onChange={e => updActivity(si, ai, 'duration', e.target.value)} />
                                                                    </div>
                                                                    <div className="pub-field">
                                                                        <label className="pub-label">Est. Cost ($)</label>
                                                                        <input className="pub-input" type="number" min="0" placeholder="e.g. 20"
                                                                            value={act.estimatedCost} onChange={e => updActivity(si, ai, 'estimatedCost', e.target.value)} />
                                                                    </div>
                                                                </div>
                                                                <div className="pub-field">
                                                                    <label className="pub-label">Description</label>
                                                                    <input className="pub-input" type="text" placeholder="Brief description of the activity"
                                                                        value={act.description} onChange={e => updActivity(si, ai, 'description', e.target.value)} />
                                                                </div>
                                                                <div className="pub-field">
                                                                    <label className="pub-checkbox">
                                                                        <input type="checkbox" checked={act.included}
                                                                            onChange={e => updActivity(si, ai, 'included', e.target.checked)} />
                                                                        <span>Included in travel price</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <button className="pub-add pub-add--sm" type="button"
                                                        onClick={() => updStop(si, 'activities', [...stop.activities, mkActivity()])}>
                                                        <IoAdd /> Add Activity
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                ))}
                            </div>
                            <button className="pub-add" type="button" onClick={() => setStops(p => [...p, mkStop()])}>
                                <IoAdd /> Add Stop
                            </button>
                        </section>

                        {submitError && (
                            <div className="pub-submit-error">⚠️ {submitError}</div>
                        )}

                        <div className="pub-actions">
                            <button className="pub-btn pub-btn--ghost" onClick={() => setStep(1)}>
                                <IoArrowBack /> Back
                            </button>
                            <button className="pub-btn pub-btn--publish" onClick={handlePublish} disabled={submitting}>
                                {submitting ? <span className="pub-spinner" /> : <IoPaperPlane />}
                                {submitting ? 'Publishing…' : 'Publish Travel'}
                            </button>
                        </div>

                    </div>
                )}

            </div>

            <Footer />
        </>
    );
};

export default Publish;
