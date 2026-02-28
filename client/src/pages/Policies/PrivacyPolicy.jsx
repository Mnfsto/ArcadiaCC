import React from 'react';
import HomeHeader from "../../components/HomeHeader";
import styles from "../Home/Home.module.scss";

export const PrivacyPolicy = () => {
    return (
        <div className={styles.root}>
            <HomeHeader />
            <div className="container" style={{ padding: '60px 40px', backgroundColor: 'white', minHeight: 'calc(100vh - 100px)' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#001328' }}>Privacy Policy</h1>
                <div style={{ lineHeight: '1.8', color: '#333' }}>
                    <p>
                        We, Arcadia Cycling Club, are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and disclose your personal information when you visit our website or participate in our events.
                    </p>
                    <h2 style={{ fontSize: '1.8rem', marginTop: '30px', marginBottom: '15px', color: '#001328' }}>1. Information Collection</h2>
                    <p>
                        We may collect personal data such as your name, email address, and phone number when you voluntarily provide them to us, for example, when filling out contact forms or club membership applications.
                    </p>
                    <h2 style={{ fontSize: '1.8rem', marginTop: '30px', marginBottom: '15px', color: '#001328' }}>2. Use of Information</h2>
                    <p>
                        The collected information is used exclusively for:
                    </p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginBottom: '20px' }}>
                        <li>Providing our services and communicating with you.</li>
                        <li>Organizing training sessions, competitions, and club events.</li>
                        <li>Sending important notices and updates.</li>
                    </ul>
                    <h2 style={{ fontSize: '1.8rem', marginTop: '30px', marginBottom: '15px', color: '#001328' }}>3. Data Protection (GDPR)</h2>
                    <p>
                        We comply with the General Data Protection Regulation (GDPR). Your data is stored securely, and we do not share it with third parties without your explicit consent, except as required by law. You have the right to request access to your data, its correction, or deletion at any time by contacting us.
                    </p>
                    <h2 style={{ fontSize: '1.8rem', marginTop: '30px', marginBottom: '15px', color: '#001328' }}>4. Changes to Policy</h2>
                    <p>
                        We reserve the right to update this policy. Any changes will be published on this page.
                    </p>
                    <p style={{ marginTop: '40px', fontStyle: 'italic', fontSize: '0.9rem' }}>
                        Last updated: October 2023
                    </p>
                </div>
            </div>
            <footer style={{ backgroundColor: '#001328', color: 'white', textAlign: 'center', padding: '20px', fontSize: '0.8rem' }}>
                <p>Copyright © 2023 Arcadia Cycling Club. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default PrivacyPolicy;
