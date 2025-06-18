import React from "react";
import styles from "./Card.module.css";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  variant?: "default" | "primary" | "highlight";
  onClick?: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  variant = "default",
  onClick,
  className = "",
}) => {
  const cardClasses = [
    styles.card,
    styles[variant],
    onClick ? styles.clickable : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const titleClasses = [
    styles.title,
    variant === "primary" ? styles.titlePrimary : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClasses} onClick={onClick}>
      {title && <h3 className={titleClasses}>{title}</h3>}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Card;
