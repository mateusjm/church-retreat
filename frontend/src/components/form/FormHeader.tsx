import styles from "./FormHeader.module.css";

type FormHeaderProps = {
  imageSrc: string;
  title: string;
  subtitle?: React.ReactNode;
  alertMessage?: string;
};

export const FormHeader = ({
  imageSrc,
  title,
  subtitle,
  alertMessage,
}: FormHeaderProps) => {
  return (
    <div className={styles.header}>
      <img src={imageSrc} alt={title} className={styles.headerImage} />

      <div className={styles.headerText}>
        <h1>{title}</h1>

        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}

        {alertMessage && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#fff3cd",
              color: "#856404",
              padding: "10px 12px",
              borderRadius: 6,
              marginTop: 12,
              fontSize: 14,
              lineHeight: 1.4,
            }}
          >
            {alertMessage}
          </div>
        )}
      </div>
    </div>
  );
};
