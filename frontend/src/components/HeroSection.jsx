import "./HeroSection.css";

const HeroSection = ({
    title,
    subtitle,
    description,
    backgroundColor = "#a0645a",
    textColor = "#FFFFFF",
    minHeight = "80vh",
    children,
}) => {
    return (
        <section
            className="hero-section"
            style={{
                backgroundColor,
                color: textColor,
                minHeight
            }}
        >
            <div className="hero-content">
                {title && (
                    <h1 className="hero-title">
                        {title}
                    </h1>
                )}

                {children && (
                    <div className="hero-actions">
                        {children}
                    </div>
                )}

                {subtitle && (
                    <h2 className="hero-subtitle">
                        {subtitle}
                    </h2>
                )}

                {description && (
                    <p className="hero-description">
                        {description}
                    </p>
                )}
            </div>
        </section>
    );
};

export default HeroSection;