export default function DiscoverButton({ onRevealContent }) {
  return (
    <button onClick={onRevealContent} className="group discover-button">
      {/* Magnetic field effect */}
      <div className="magnetic-field"></div>

      {/* Main button content */}
      <div className="button-core">
        {/* Pulse rings */}
        <div className="pulse-rings">
          <div className="pulse-ring pulse-ring-1"></div>
          <div className="pulse-ring pulse-ring-2"></div>
        </div>

        {/* Central icon */}
        <div className="central-power-icon">
          <div className="icon-energy"></div>⚡
        </div>

        {/* Button text */}
        <div className="button-text">
          <span className="main-text">Discover TruFlo</span>
          <span className="sub-text">Click to unlock your potential</span>
        </div>

        {/* Arrow indicator */}
        <div className="arrow-indicator">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </button>
  );
}
