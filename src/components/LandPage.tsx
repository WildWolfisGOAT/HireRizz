
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();
    
    return (
        <div className="w-full max-w-[1100px] animate-[fadeInUp_0.6s_ease]">           

            {/* Hero */}
            <section className="text-center pt-16 pb-24 relative">
                <div className="inline-block px-4 py-1.5 text-sm font-bold font-heading text-retro-green bg-retro-yellow border-2 border-retro-green rounded-full mb-8 shadow-retro-sm">Next-Gen AI Interviewer</div>
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-retro-green mb-6 tracking-tight font-heading">
                    AI Interviewer get your dream <br />
                    <span className="bg-retro-yellow px-2 py-1 rounded inline-block -rotate-1 shadow-retro-sm">top talent.</span>
                </h1>
                <p className="text-xl text-retro-green-light max-w-2xl mx-auto mb-10 leading-relaxed">
                    Configure custom interview questions, practice with our advanced AI, 
                    and get comprehensive performance analysis on every session. Evaluate 
                    your skills fairly while focusing your time on what matters.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-20">
                    <button className="w-full md:w-auto px-7 py-3 font-body text-base font-semibold text-white bg-retro-green border-2 border-retro-green rounded-full cursor-pointer transition-all hover:bg-retro-green-light hover:-translate-y-0.5 shadow-retro-sm" onClick={() => navigate('/setup')}>
                        Practice For Free · Try Now
                    </button>
                    <a href="#features" className="w-full md:w-auto px-7 py-3 font-body text-base font-semibold text-retro-green bg-transparent border-2 border-retro-green rounded-full cursor-pointer transition-all hover:bg-black/5 hover:-translate-y-0.5 text-center shadow-retro-sm">See How It Works</a>
                </div>
            </section>

            {/* Features */}
            <section className="py-20" id="features">
                <h2 className="text-center text-5xl font-extrabold font-heading text-retro-green mb-4 tracking-tight">Why HireRizz?</h2>
                <p className="text-center text-retro-green-light text-lg mb-16">Bridge the gap between preparation and the actual interview</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feature Cards */}
                    {[
                      { title: "Voice Interaction", desc: "Speak your answers naturally. Our speech recognition captures every word in real-time." },
                      { title: "Adaptive Questions", desc: "Mr. Stone probes deeper based on your answers — no scripted questions, pure conversation." },
                      { title: "Role Specific", desc: "Customize for any role — Frontend, Backend, Data Science, DevOps — with adjustable difficulty." },
                      { title: "Smart Feedback", desc: "Get detailed analysis of your performance with actionable tips to improve." },
                      { title: "Package Aligned", desc: "Questions calibrated to your target salary range — from 3 LPA to 25+ LPA." },
                      { title: "Private & Safe", desc: "Practice without judgment. Make mistakes, learn, and build confidence in a safe space." },
                    ].map((feature, i) => (
                      <div key={i} className="bg-white border-2 border-retro-green rounded-2xl p-8 transition-all hover:-translate-y-1 shadow-retro hover:shadow-retro-hover">
                          <h3 className="font-heading text-xl font-extrabold text-retro-green mb-3">{feature.title}</h3>
                          <p className="text-base text-retro-green-light leading-relaxed">{feature.desc}</p>
                      </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
