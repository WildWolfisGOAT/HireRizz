import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <nav className="w-full max-w-[1100px] flex flex-col md:flex-row items-center justify-between px-8 py-4 mb-8 border-2 border-dashed border-[#dcd7c9] rounded-3xl bg-white gap-4 md:gap-0 z-50">
            {/* The Logo now acts as a Home Button */}
            <Link to="/" className="font-heading text-2xl font-extrabold text-retro-green flex items-center gap-2 no-underline">
                <span className="bg-retro-yellow text-retro-green w-8 h-8 inline-flex items-center justify-center rounded-md border-2 border-retro-green text-lg">HR</span>
                HireRizz
            </Link>
            
            <div className="flex gap-6 items-center flex-col md:flex-row">
                <Link to="/" className="text-retro-green-light font-semibold text-[0.95rem] hover:text-retro-green transition-colors">Features</Link>
                <Link to="/" className="text-retro-green-light font-semibold text-[0.95rem] hover:text-retro-green transition-colors">How it Works</Link>
            </div>
            
            <div className="flex gap-3 items-center w-full md:w-auto justify-center">
                <button className="px-4 py-2 font-body text-sm font-semibold text-retro-green bg-transparent border-2 border-retro-green rounded-full cursor-pointer transition-all hover:bg-black/5">Log In</button>
                <button 
                    className="px-4 py-2 font-body text-sm font-semibold text-white bg-retro-green border-2 border-retro-green rounded-full cursor-pointer transition-all hover:bg-retro-green-light" 
                    onClick={() => navigate('/setup')}
                >
                    Practice For Free
                </button>
            </div>
        </nav>
    );
};

export default NavBar;
