import styles from "./ForKids.module.scss"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ─── pixel SVG border helper ─────────────────────────────── */
const PIXEL_BORDER_DARK = `url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M3 1 h1 v1 h-1 z M4 1 h1 v1 h-1 z M2 2 h1 v1 h-1 z M5 2 h1 v1 h-1 z M1 3 h1 v1 h-1 z M6 3 h1 v1 h-1 z M1 4 h1 v1 h-1 z M6 4 h1 v1 h-1 z M2 5 h1 v1 h-1 z M5 5 h1 v1 h-1 z M3 6 h1 v1 h-1 z M4 6 h1 v1 h-1 z" fill="rgb(33,37,41)" /></svg>')`;

export default function ForKids() {
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [orderModal, setOrderModal] = useState(null); // 'starter' | 'pro' | 'semi-starter' | 'semi-pro'

    const openModal = () => setModal(!modal);

    useEffect(() => {
        document.body.style.backgroundColor = "#d40000";
        document.body.style.backgroundImage = "url('./image/backgroundWebForKids.gif')";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center center";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundSize = "cover";

        const wrapper = document.getElementsByClassName('wrapper')[0];
        if (wrapper) wrapper.style.backgroundColor = "transparent";

        return () => {
            document.body.style.backgroundImage = "";
            document.body.style.backgroundAttachment = "";
            if (wrapper) wrapper.style.backgroundColor = "";
        };
    }, []);

    return (
        <div className={styles.body}>
            {/* ── Header ─────────────────────────────────────── */}
            <header className={styles.header}>
                <div className="head clearfix">
                    <div className={styles.logo}>
                        <a href="/"><img alt="Arcadia CC" src="/image/logoArcadia.svg" /></a>
                    </div>
                    <nav className={styles.nav}>
                        <ul>
                            <li><a href="https://www.facebook.com/ArcadiaCyclingClub"><img alt="Facebook" src="/image/iconFacebook.svg" /></a></li>
                            <li><a href="https://www.instagram.com/arcadia_cycling_club/"><img alt="Instagram" src="/image/iconInstagram.svg" /></a></li>
                        </ul>
                    </nav>
                </div>
                <div className={styles.heroText}>
                    <img className={styles.gameon} src="/image/gameon.svg" alt="Game On" />
                    <img src="/image/PIXEL_FIGHTER.svg" alt="Pixel Fighter" />
                </div>
            </header>

            <main className="clearfix">

                {/* ── About the training system link ─────────── */}
                <section className={styles.aboutSection}>
                    <p>
                        About the{" "}
                        <a onClick={openModal} href="#modal">training system</a>
                        <img src="/image/cup.svg" alt="" />
                    </p>
                </section>

                {/* ── Training System Modal ──────────────────── */}
                {modal && (
                    <div id="myModal" onClick={openModal} className={styles.modal}>
                        <div className={styles.modalContent}>
                            <span className="close">&times;</span>
                            <p>Our cycling club offers a unique motivation system for children — <strong>Pixels for Active Participation</strong>. Every training session earns a child a Pixel token; extra Pixels are awarded for competitions and team events. Tokens can be exchanged for cycling accessories, t-shirts, books, and more.</p>
                            <p>Pixel holders can also unlock exclusive events — mountain biking, cycling tours, and bike trips. Each year we hold an awards ceremony recognising our top young athletes.</p>
                            <img src="/image/cup.svg" alt="Cup Award" />
                        </div>
                    </div>
                )}

                {/* ── Coach Section ──────────────────────────── */}
                <section className={styles.coachSection}>
                    <div className={styles.coachCard}>
                        <div className={styles.coachPhotoWrap}>
                            <img
                                src="/image/Vika.png"
                                alt="Viktoria Bondarenko"
                                className={styles.coachPhoto}
                                onError={e => { e.target.style.display = 'none'; }}
                            />
                        </div>
                        <div className={styles.coachInfo}>
                            <span className={styles.coachLabel}>▶ HEAD COACH</span>
                            <h2 className={styles.coachName}>VIKTORIA<br />BONDARENKO</h2>
                            <div className={styles.pixelDivider} />
                            <p className={styles.coachBio}>
                                Multi-time Champion of Ukraine and European Championship medalist.
                                For over <strong>4&nbsp;years</strong> Viktoria has been coaching children in cycling —
                                and has already raised more than one little champion.
                                She turns professional racing experience into fun, accessible training
                                that every child can follow. For her, cycling is about building
                                a community where every young rider finds their path to the top.
                            </p>
                            <a
                                className={styles.igLink}
                                href="https://www.instagram.com/viktoriia_bonya/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                                @viktoriia_bonya
                            </a>
                        </div>
                    </div>
                </section>

                {/* ── Membership (Monthly) ───────────────────── */}
                <section className={styles.plansSection}>
                    <h2 className={styles.plansTitle}>▶ MEMBERSHIPS</h2>
                    <p className={styles.plansSub}>Choose the right plan for your young racer</p>

                    <div className={styles.plansGrid}>
                        {/* Starter */}
                        <div className={styles.planCard}>
                            <div className={styles.planBadge}>STARTER</div>
                            <div className={styles.planPrice}>
                                <span className={styles.planAmount}>3 600</span>
                                <span className={styles.planCurrency}>UAH/mo</span>
                            </div>
                            <div className={styles.pixelDivider} />
                            <ul className={styles.planFeatures}>
                                <li>▸ 12 group training sessions</li>
                                <li>▸ Monthly training plan</li>
                                <li>▸ Access to the club community</li>
                            </ul>
                            <button
                                className={styles.pixelBtn}
                                onClick={() => setOrderModal('starter')}
                            >
                                ORDER
                            </button>
                        </div>

                        {/* Pro */}
                        <div className={`${styles.planCard} ${styles.planCardPro}`}>
                            <div className={styles.planBadgeHot}>⭐ PIXEL FIGHTER</div>
                            <div className={styles.planPrice}>
                                <span className={styles.planAmount}>9 000</span>
                                <span className={styles.planCurrency}>UAH/mo</span>
                            </div>
                            <div className={styles.pixelDivider} />
                            <ul className={styles.planFeatures}>
                                <li>▸ 12 group training sessions</li>
                                <li>▸ 2 individual training sessions</li>
                                <li>▸ Access to the <strong>Pixel Fighter</strong> programme</li>
                                <li>▸ Personalised plan (adjusted weekly)</li>
                            </ul>
                            <button
                                className={`${styles.pixelBtn} ${styles.pixelBtnPro}`}
                                onClick={() => setOrderModal('pro')}
                            >
                                ORDER
                            </button>
                        </div>
                    </div>
                </section>

                {/* ── Semi-Annual Plans ──────────────────────── */}
                <section className={styles.semiSection}>
                    <h2 className={styles.plansTitle}>▶ SIX MONTHS ON PIXELS</h2>
                    <p className={styles.plansSub}>Save more and level up over 6 months straight</p>

                    <div className={styles.plansGrid}>
                        {/* Semi Starter */}
                        <div className={styles.planCard}>
                            <div className={styles.planBadge}>STARTER × 6</div>
                            <div className={styles.planPrice}>
                                <span className={styles.planAmount}>19 440</span>
                                <span className={styles.planCurrency}>UAH / 6 mo</span>
                            </div>
                            <div className={styles.semiSaving}>Save 2 160 UAH</div>
                            <div className={styles.pixelDivider} />
                            <ul className={styles.planFeatures}>
                                <li>▸ 72 group training sessions</li>
                                <li>▸ Monthly training plan</li>
                                <li>▸ Access to the club community</li>
                            </ul>
                            <button
                                className={styles.pixelBtn}
                                onClick={() => setOrderModal('semi-starter')}
                            >
                                ORDER
                            </button>
                        </div>

                        {/* Semi Pro */}
                        <div className={`${styles.planCard} ${styles.planCardPro}`}>
                            <div className={styles.planBadgeHot}>⭐ PIXEL FIGHTER × 6</div>
                            <div className={styles.planPrice}>
                                <span className={styles.planAmount}>48 600</span>
                                <span className={styles.planCurrency}>UAH / 6 mo</span>
                            </div>
                            <div className={styles.semiSaving}>Save 5 400 UAH</div>
                            <div className={styles.pixelDivider} />
                            <ul className={styles.planFeatures}>
                                <li>▸ 72 group training sessions</li>
                                <li>▸ 12 individual training sessions</li>
                                <li>▸ 6 months of the <strong>Pixel Fighter</strong> programme</li>
                                <li>▸ Weekly plan adjustments</li>
                            </ul>
                            <button
                                className={`${styles.pixelBtn} ${styles.pixelBtnPro}`}
                                onClick={() => setOrderModal('semi-pro')}
                            >
                                ORDER
                            </button>
                        </div>
                    </div>
                </section>

                {/* ── Join Form ──────────────────────────────── */}
                <section className={styles.joinSection}>
                    <h2 className={styles.joinTitle}>▶ JOIN PIXEL FIGHTER</h2>
                    <form
                        className={styles.form}
                        id="contact-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            navigate('/success');
                        }}
                    >
                        <fieldset>
                            <input className="is-circle" type="text" name="name" placeholder="Full Name" required />
                            <input className="is-circle" type="email" name="email" placeholder="Email" required />
                            <input className="is-circle" type="tel" name="phone" placeholder="Phone" required />
                            <input className="is-circle" type="submit" value="SUBMIT" />
                        </fieldset>
                    </form>
                </section>

                {/* ── JoinUs Banner ──────────────────────────── */}
                <div className={styles.joinUsBanner}>
                    <img src="/image/JoinUs.svg" alt="Join Us" />
                </div>

                <footer className={styles.footer}>
                    <p>Copyright © 2025. All rights reserved.</p>
                </footer>
            </main>

            {/* ── Order Modal ────────────────────────────────── */}
            {orderModal && (
                <div className={styles.modal} onClick={() => setOrderModal(null)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <span className={styles.closeBtn} onClick={() => setOrderModal(null)}>&times;</span>
                        <h3 className={styles.modalTitle}>
                            {orderModal === 'starter' && '🎮 STARTER MEMBERSHIP'}
                            {orderModal === 'pro' && '⭐ PIXEL FIGHTER'}
                            {orderModal === 'semi-starter' && '🎮 STARTER × 6 MONTHS'}
                            {orderModal === 'semi-pro' && '⭐ PIXEL FIGHTER × 6 MONTHS'}
                        </h3>
                        <p>Leave a request and we will contact you within the day to confirm and arrange payment.</p>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setOrderModal(null);
                                navigate('/success');
                            }}
                        >
                            <input className="is-circle" type="text" name="name" placeholder="Full Name" required />
                            <input className="is-circle" type="email" name="email" placeholder="Email" required />
                            <input className="is-circle" type="tel" name="phone" placeholder="Phone" required />
                            <input className="is-circle" type="submit" value="SEND REQUEST" />
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
