const LandingPage = ({ onStart }) => {
    return (
        <div className="landing">
            <nav className="landing-nav">
                <div className="nav-logo">
                    <span className="nav-logo-icon">HR</span>
                    HireRizz
                </div>
                <div className="nav-links">
                    <a href="#features">Features</a>
                    <a href="#how-it-works">How it Works</a>
                    <a href="#pricing">Pricing</a>
                </div>
                <div className="nav-actions">
                    <button className="btn-outline-sm">Log In</button>
                    <button className="btn-primary-sm" onClick={onStart}>Practice For Free</button>
                </div>
            </nav>

            {/* Hero */}
            <section className="hero-section">
                <div className="hero-badge">Next-Gen AI Interviewer</div>
                <h1 className="hero-title">
                    AI Interviewer get your dream <br />
                    <span className="highlight-yellow">top talent.</span>
                </h1>
                <p className="hero-subtitle">
                    Configure custom interview questions, practice with our advanced AI, 
                    and get comprehensive performance analysis on every session. Evaluate 
                    your skills fairly while focusing your time on what matters.
                </p>
                <div className="hero-actions">
                    <button className="btn-primary" onClick={onStart}>
                        Practice For Free · Try Now
                    </button>
                    <a href="#features" className="btn-outline">See How It Works</a>
                </div>
            </section>

            {/* Features */}
            <section className="features-section" id="features">
                <h2 className="section-title">Why HireRizz?</h2>
                <p className="section-subtitle">Bridge the gap between preparation and the actual interview</p>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>Voice Interaction</h3>
                        <p>Speak your answers naturally. Our speech recognition captures every word in real-time.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Adaptive Questions</h3>
                        <p>Mr. Stone probes deeper based on your answers — no scripted questions, pure conversation.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Role Specific</h3>
                        <p>Customize for any role — Frontend, Backend, Data Science, DevOps — with adjustable difficulty.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Smart Feedback</h3>
                        <p>Get detailed analysis of your performance with actionable tips to improve.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Package Aligned</h3>
                        <p>Questions calibrated to your target salary range — from 3 LPA to 25+ LPA.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Private & Safe</h3>
                        <p>Practice without judgment. Make mistakes, learn, and build confidence in a safe space.</p>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="steps-section">
                <h2 className="section-title">How It Works</h2>
                <div className="steps-grid">
                    <div className="step-card">
                        <div className="step-number">01</div>
                        <h3>Configure</h3>
                        <p>Set your job role, experience, package range, and difficulty level.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">02</div>
                        <h3>Interview</h3>
                        <p>Mr. Stone greets you and starts asking questions. Respond naturally by voice.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">03</div>
                        <h3>Improve</h3>
                        <p>Review your transcript and AI-generated feedback to level up.</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section">
                <h2>Ready to Crush Your Next Interview?</h2>
                <p>No signup required. Start practicing in seconds.</p>
                <br/>
                <button className="btn-primary" onClick={onStart}>Start Free Interview</button>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <p>Built for students who deserve better interview prep.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
