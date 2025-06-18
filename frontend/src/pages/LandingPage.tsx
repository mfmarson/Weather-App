import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.appContainer}>
        {/* Title Section */}
        <div className={styles.titleSection}>
          <h1 className={styles.title}>The Daily Drizzle</h1>
          <p className={styles.subtitle}>
            Rain or shine, we've got you covered
          </p>
        </div>

        {/* Features Section */}
        <div className={styles.featuresSection}>
          <div className={styles.featureList}>
            <div className={styles.feature}>
              <span className={styles.checkmark}>✅</span>
              <div className={styles.featureContent}>
                <strong>GPS Location</strong>
                <p>Instant weather for where you are</p>
              </div>
            </div>

            <div className={styles.feature}>
              <span className={styles.checkmark}>✅</span>
              <div className={styles.featureContent}>
                <strong>City Search</strong>
                <p>Any city, anywhere in the world</p>
              </div>
            </div>

            <div className={styles.feature}>
              <span className={styles.starIcon}>⭐️</span>
              <div className={styles.featureContent}>
                <strong>Save Favorites</strong>
                <p>
                  Quick access to your places <em>(account only)</em>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className={styles.actionSection}>
          <button
            className={`${styles.button} ${styles.primaryButton}`}
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <div className={styles.divider}>
            <span>or</span>
          </div>

          <button
            className={`${styles.button} ${styles.secondaryButton}`}
            onClick={() => navigate("/guest")}
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
