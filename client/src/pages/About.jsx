import HomeHeader from "../components/HomeHeader";

export const About = () => {
    return (
        <>
            <HomeHeader />

            {/* ── Hero Banner ── */}
            <section className="about-hero">
                <div
                    className="about-hero__bg"
                    style={{ backgroundImage: "url('./image/teaser%20(0-00-03-03).jpg')" }}
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
