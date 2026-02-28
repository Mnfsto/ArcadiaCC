import styles from "./ForKids.module.scss"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Index() {
    const navigate = useNavigate();
    const [modal, setModal] = useState(false)
    const openModal = () => {
        setModal(!modal)
    }
    useEffect(() => {
        document.body.style.backgroundColor = "#d40000";
        document.body.style.backgroundImage = "url('./image/backgroundWebForKids.gif')"
        document.body.style.backgroundRepeat = "no-repeat"
        document.body.style.backgroundPosition = "center center"
        document.body.style.backgroundAttachment = "fixed"
        document.body.style.backgroundSize = "cover"

        const wrapper = document.getElementsByClassName('wrapper')[0]
        wrapper.style.backgroundColor = "transparent";

    }, []);


    return (
        <div className={styles.body}>
            <header className={styles.header}>
                <div className="head clearfix">
                    <div className={styles.logo}><a href="/">
                        <img alt="Logo TM" src="/image/logoArcadia.svg" />
                    </a></div>

                    <nav className={styles.nav}>
                        <ul>
                            <li><a href="https://www.facebook.com/ArcadiaCyclingClub"><img alt="Logo TM" src="/image/iconFacebook.svg" /></a></li>
                            <li><a href="https://www.instagram.com/arcadia_cycling_club/"><img alt="Logo TM" src="/image/iconInstagram.svg" /></a></li>
                        </ul>
                    </nav>
                </div>
                <div className={styles.heroText}>
                    <img className={styles.gameon} src="/image/gameon.svg" alt="" />
                    <img src="/image/PIXEL_FIGHTER.svg" alt="" />
                </div>
            </header>

            <main className="clearfix">
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
                        <input className="is-circle" type="tel" name="phone" placeholder="Telephone" required />
                        <input className="is-circle" type="submit" value="Send" />

                    </fieldset>
                </form>
                <section className="about">
                    <p>About the <a onClick={() => openModal()} href="#modal" id="modal">training system</a><img src="/image/cup.svg" alt="" /></p>
                </section>

                {modal ? <div id="myModal" onClick={() => openModal()} className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className="close">&times;</span>
                        <p>Our cycling club offers a unique motivation system for children who engage in cycling with our club. We call
                            it "Pixels for Active Participation", and it allows children to earn rewards for their efforts in preparation
                            and participation in competitions.
                        </p>
                        <p>
                            Every time a child attends a training session, they receive a Pixel token. Additionally, if they perform well
                            in competitions or participate in team-building events, they can earn extra Pixels. These tokens can be
                            exchanged for various prizes, such as cycling accessories, t-shirts, plush toys, books, and more.
                        </p>
                        <p>
                            In addition, we offer additional opportunities to motivate children. For example, children who have earned a
                            certain number of Pixels can receive an invitation to exclusive events, such as mountain biking, cycling
                            tours, and bike trips.
                        </p>
                        <p>
                            We also recognize the best cyclists in our club. Every year, we hold an awards ceremony where we recognize
                            children who have achieved the greatest success in cycling. This can be either the best athlete, the one who
                            has improved the most, the most active participant in training sessions, or the most active participant in
                            social events.
                        </p>
                        <p>
                            In our club, we not only help children develop their cycling skills, but also create a cycling community where
                            children can feel like part of a team and receive motivation to develop their skills. Our Pixel Tokens for
                            Active Participation system is one of the ways we help children achieve their best results and stay motivated
                            throughout their training with our club.</p>
                        <img src="/image/cup.svg" alt="Cup Award" />
                    </div>
                </div> : ""}
                <footer className={styles.footer}>
                    <p>Copyright © 2023. All rights reserved.</p>
                </footer>
            </main>
        </div>
    )
}

