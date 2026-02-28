import React from 'react';
import HomeHeader from "../../components/HomeHeader";
import styles from "../Home/Home.module.scss";

export const Safeguarding = () => {
    return (
        <div className={styles.root}>
            <HomeHeader />
            <div className="container" style={{ padding: '60px 40px', backgroundColor: 'white', minHeight: 'calc(100vh - 100px)' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#001328' }}>Child Protection Policy (Safeguarding)</h1>
                <div style={{ lineHeight: '1.8', color: '#333' }}>
                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '20px', color: '#D40000' }}>
                        The safety and well-being of every participant is our top priority.
                    </p>
                    <p>
                        As Arcadia Cycling Club works actively with children and youth in training programs and competitions, we have implemented a strict Child Protection Policy (Safeguarding). The goal of this policy is to create a safe, supportive, and inclusive environment for all participants, regardless of age, gender, or skill level.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', marginTop: '30px', marginBottom: '15px', color: '#001328' }}>CORE PRINCIPLES</h2>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginBottom: '20px' }}>
                        <li><strong>Zero tolerance for abuse:</strong> All forms of physical, emotional, psychological, or sexual abuse are strictly prohibited.</li>
                        <li><strong>Staff vetting:</strong> All coaches, volunteers, and staff working with children undergo strict vetting and briefing.</li>
                        <li><strong>"Two Adults" Rule:</strong> A child must never be left alone with a single adult club employee in closed spaces; at least one other adult or parent must always be present.</li>
                        <li><strong>Safe training:</strong> Routes and exercise intensity are always adapted to the children's age, taking traffic rules into account.</li>
                        <li><strong>Parental consent:</strong> Photos and videos of children are published exclusively with the prior consent of parents or guardians.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.8rem', marginTop: '30px', marginBottom: '15px', color: '#001328' }}>REPORTING MECHANISM</h2>
                    <p>
                        If you witness inappropriate behavior or have concerns about a child's safety in the club, please contact our Safeguarding Officer immediately at:
                        <br />
                        <a href="mailto:safeguarding@arcadiacc.com" style={{ color: '#D40000', fontWeight: 'bold', textDecoration: 'none' }}>safeguarding@arcadiacc.com</a>
                    </p>
                    <p style={{ fontStyle: 'italic', marginTop: '10px' }}>
                        All reports are treated confidentially and promptly.
                    </p>
                </div>
            </div>
            <footer style={{ backgroundColor: '#001328', color: 'white', textAlign: 'center', padding: '20px', fontSize: '0.8rem' }}>
                <p>Copyright © 2023 Arcadia Cycling Club. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Safeguarding;
