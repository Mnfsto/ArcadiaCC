import HomeHeader from "../components/HomeHeader";

export const About = () => {
    return (
        <>
            <HomeHeader />

            {/* ── Hero Banner ── */}
            <section className="about-hero">
                <div
                    className="about-hero__bg"
                    style={{ backgroundImage: "url('./image/paternWire.png')" }}
                />
                <div className="about-hero__overlay" />
                <div className="about-hero__scanlines" />
                <div className="about-hero__content">
                    <h1 className="about-hero__title" data-text="About Us">About Us</h1>
                    <div className="about-hero__line" />
                    <p className="about-hero__tagline">
                        Looking to join one of the friendliest cycling clubs in Odessa?
                        You've come to the right place.
                    </p>
                </div>
            </section>

            {/* ── Story ── */}
            <section className="about-story">
                <div className="about-story__text">
                    <h2>Our Philosophy</h2>
                    <p>
                        A sports club is a self-organized group of enthusiasts in a particular
                        discipline — people who are passionate about practicing and growing the sport.
                        The word "enthusiasm" is key here: a genuine love for cycling is the
                        cornerstone of every club we build. Clubs are not created by government
                        bodies to fulfill top-down mandates.
                    </p>
                    <p>
                        The club system is organized as a pyramid, with clubs forming its foundation.
                        A club can focus on one sport or many, be small or large, amateur or
                        professional — but they all form the base for both mass participation
                        ("sport&nbsp;for&nbsp;all") and elite-level competition.
                    </p>
                </div>
                <div className="about-story__image">
                    <img
                        src="./image/arcadia2025.jpg"
                        alt="Arcadia Cycling Club 2025"
                    />
                </div>
            </section>

            {/* ── Values ── */}
            <section className="about-values">
                <div className="about-values__header">
                    <h2>Our Principles</h2>
                    <p>The core values that drive every ride</p>
                </div>
                <div className="about-values__grid">
                    <div className="about-values__card">
                        <span className="card-number">01</span>
                        <h3>Self-Organized</h3>
                        <p>
                            Our club is self-organized and membership is entirely voluntary.
                            We come together out of passion, not obligation.
                        </p>
                    </div>
                    <div className="about-values__card">
                        <span className="card-number">02</span>
                        <h3>Foundation of Sport</h3>
                        <p>
                            Clubs form the foundation of the sports pyramid — the bedrock for
                            grassroots participation and competitive excellence alike.
                        </p>
                    </div>
                    <div className="about-values__card">
                        <span className="card-number">03</span>
                        <h3>Built From the Ground Up</h3>
                        <p>
                            The system is built from the bottom up, naturally and organically.
                            Great communities grow from genuine connections.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Visual Break ── */}
            <section className="about-break">
                <img
                    className="about-break__media"
                    src="./image/WaveCorsaRosa_Strawberry.gif"
                    alt="Arcadia ride"
                />
                <div className="about-break__overlay">
                    <div className="about-break__quote">
                        <blockquote>Ride Together. Grow Together.</blockquote>
                        <span className="quote-accent" />
                    </div>
                </div>
            </section>

            {/* ── Team ── */}
            <section className="about-team">
                <div className="about-team__header">
                    <h2>Our Team</h2>
                    <p>The people behind every ride</p>
                </div>
                <div className="about-team__grid">
                    <div className="about-team__card">
                        <div className="about-team__photo-wrap">
                            <img
                                src="./image/Vika.png"
                                alt="Viktoria Bondarenko"
                                className="about-team__photo"
                            />
                        </div>
                        <div className="about-team__info">
                            <h3 className="about-team__name">Viktoria Bondarenko</h3>
                            <span className="about-team__role">Club President, Head Coach</span>
                            <p className="about-team__bio">
                                A multi-time Champion of Ukraine and European Championship medalist.
                                Viktoria transforms her professional racing experience into accessible
                                and intuitive training methods. For her, cycling is about more than
                                just medals — it's about building an open community where everyone
                                can find their path to the top.
                            </p>
                            <a
                                className="about-team__instagram"
                                href="https://www.instagram.com/viktoriia_bonya/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <svg className="about-team__ig-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                </svg>
                                @viktoriia_bonya
                            </a>
                        </div>
                    </div>
                    <div className="about-team__card">
                        <div className="about-team__photo-wrap">
                            <img
                                src="./image/Maxim.png"
                                alt="Maxim Titov"
                                className="about-team__photo"
                            />
                        </div>
                        <div className="about-team__info">
                            <h3 className="about-team__name">Maxim Titov</h3>
                            <span className="about-team__role">Vice President, Sports Director</span>
                            <p className="about-team__bio">
                                The architect of training processes and the club's lead strategist.
                                Maxim is responsible for developing Arcadia as a premier sports hub,
                                coordinating key events and the team's internal growth. His mission
                                is to make a professional approach to sports a natural part of every
                                club member's daily life.
                            </p>
                            <a
                                className="about-team__instagram"
                                href="https://www.instagram.com/maxxim.titov/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <svg className="about-team__ig-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                </svg>
                                @maxxim.titov
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Sponsors ── */}
            <section className="about-sponsors">
                <div className="about-sponsors__header">
                    <h2>Our Partners</h2>
                    <p>The brands that fuel our journey</p>
                </div>
                <div className="about-sponsors__grid">
                    <div className="about-sponsors__card">
                        <img src="./image/logo-ale.svg" alt="Alé Cycling" />
                        <h3>Alé — Made in Italy</h3>
                        <p>
                            Alé celebrates cycling Made in Italy with colour, style and energy.
                            A brand dedicated to performance and elegance on the road.
                        </p>
                        <a className="sponsor-link" href="https://alecycling.com" target="_blank" rel="noreferrer">
                            alecycling.com →
                        </a>
                    </div>
                    <div className="about-sponsors__card"
                        style={{
                            backgroundImage: "url('./image/p4HmLbg9TvL9qcLmxR.webp')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}>
                        <h3>Your Brand Here</h3>
                        <p>
                            Interested in partnering with Arcadia Cycling Club?
                            We'd love to hear from you.
                        </p>
                        <a className="sponsor-link" href="/contact">
                            Get in touch →
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;
