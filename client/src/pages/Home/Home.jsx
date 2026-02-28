import HomeHeader from "../../components/HomeHeader";
import { Hero } from "../../components/Hero";
import styles from "./Home.module.scss";
import JoinForm from "../../components/Forms/JoinForm";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
    const [stateModal, setStateModal] = useState(false)
    const [stateButton, setStateButton] = useState("Join the Club")
    const openModal = () => {
        setStateModal(!stateModal);
    }
    useEffect(() => {
        fetch("/auth")
            .then((res) => res.json())
            .then((data) => {
                setStateButton(data.message)
                console.log(data.id)
            });

        // Enable no-scroll for Home page
        document.documentElement.classList.add('page-no-scroll');
        document.body.classList.add('page-no-scroll');

        return () => {
            // Disable no-scroll when leaving Home page
            document.documentElement.classList.remove('page-no-scroll');
            document.body.classList.remove('page-no-scroll');
        };
    }, [stateButton])

    document.body.style.backgroundColor = "#d40000";
    return (
        <div className={styles.pixel}>
            <div className={styles.root}>
                <HomeHeader />
                <div className="container">
                    {stateModal && <JoinForm closeModal={openModal} />}
                    <Hero button={stateButton} modal={openModal} />
                </div>
                <footer style={{
                    padding: '20px',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    color: 'rgba(0, 19, 40, 0.7)',
                    marginTop: 'auto'
                }}>
                    <Link to="/privacy-policy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</Link>
                    {' | '}
                    <Link to="/annual-reports" style={{ color: 'inherit', textDecoration: 'none' }}>Annual Reports</Link>
                    {' | '}
                    <Link to="/safeguarding" style={{ color: 'inherit', textDecoration: 'none' }}>Safeguarding</Link>
                </footer>
            </div>
        </div>
    )
}

export default Home