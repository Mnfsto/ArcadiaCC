import React from 'react';
import { Link } from 'react-router-dom';
import styles from './success.module.scss';

const Success = () => {
    return (
        <div className={styles.root}>
            <h1 className={styles.glitch} data-text="SUCCESS">SUCCESS</h1>
            <p>Thank you! Your application has been accepted.</p>
            <Link to="/" className={styles.link}>Back to Home</Link>
        </div>
    );
};

export default Success;
