import SetUpForm from "./components/SetUpForm";
import InterviewRoom from "./components/InterviewRoom";
import LandingPage from "./components/LandPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";

export interface InterviewFormData {
  jobRole: string;
  requirements: string;
  experience: string;
  packageLPA: string;
  difficulty: string;
}

const App = () => {
    return(
        <Router>
            <div className="min-h-screen bg-cream bg-grid-paper font-body text-retro-green flex flex-col items-center px-5 sm:px-10 py-3 sm:py-6">
                <NavBar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/setup" element={<SetUpForm />} />
                    <Route path="/interview" element={<InterviewRoom />} />
                </Routes>

            </div>
        </Router>
    );
}



export default App;