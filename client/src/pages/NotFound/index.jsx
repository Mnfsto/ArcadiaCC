import styles from "./notfound.module.scss"
import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <>
            <div className={styles.root} >
                <div className={styles.glitch} data-text="☹">☹</div>
                <h1 className={styles.glitch} data-text="404">404</h1>
                <p>Page Not Found</p>
                <Link to="/" className={styles.link}>Back to Home</Link>
            </div>
        </>
    )
}

export default NotFound;