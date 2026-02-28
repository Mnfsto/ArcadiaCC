import React from 'react';
import HomeHeader from "../../components/HomeHeader";
import styles from "../Home/Home.module.scss";

export const AnnualReports = () => {
    return (
        <div className={styles.root}>
            <HomeHeader />
            <div className="container" style={{ padding: '60px 40px', backgroundColor: 'white', minHeight: 'calc(100vh - 100px)' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#001328' }}>Transparency and Accountability (Annual Reports)</h1>
                <div style={{ lineHeight: '1.8', color: '#333' }}>
                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '30px' }}>
                        Financial discipline. How we handle money.
                    </p>
                    <p>
                        Arcadia Cycling Club values transparency and the trust of our community, partners, and sponsors. We regularly publish annual reports of the organization, financial statements, as well as the conclusions of independent audits.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', marginTop: '40px', marginBottom: '20px', color: '#001328', borderBottom: '2px solid #D40000', paddingBottom: '10px' }}>
                        Download Documents
                    </h2>

                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '15px' }}>
                            <a href="#!" onClick={(e) => e.preventDefault()} style={{ color: '#D40000', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                                <i className="fas fa-file-pdf" style={{ marginRight: '10px', fontSize: '1.5rem' }}></i>
                                Annual Report of the Organization for 2022
                            </a>
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <a href="#!" onClick={(e) => e.preventDefault()} style={{ color: '#D40000', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                                <i className="fas fa-file-excel" style={{ marginRight: '10px', fontSize: '1.5rem' }}></i>
                                Financial Statement (Balance Sheet) - 2022
                            </a>
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <a href="#!" onClick={(e) => e.preventDefault()} style={{ color: '#D40000', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                                <i className="fas fa-file-contract" style={{ marginRight: '10px', fontSize: '1.5rem' }}></i>
                                Independent Audit Conclusion (2022)
                            </a>
                        </li>
                    </ul>
                    <p style={{ marginTop: '40px', fontStyle: 'italic', fontSize: '0.9rem', color: '#666' }}>
                        * Documents for the current year will be added after the end of the reporting period and the completion of the audit.
                    </p>
                </div>
            </div>
            <footer style={{ backgroundColor: '#001328', color: 'white', textAlign: 'center', padding: '20px', fontSize: '0.8rem' }}>
                <p>Copyright © 2023 Arcadia Cycling Club. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AnnualReports;
