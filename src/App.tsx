import { useState } from "react";
import SetUpForm from "./components/SetUpForm";
import InterviewRoom from "./components/InterviewRoom";
import LandingPage from "./components/LandPage";

export interface InterviewFormData {
  jobRole: string;
  jobDescription: string;
  experience: string;
}


const App = ()=>{
    const [formData,setFormData] = useState<InterviewFormData | null>(null); 
    const [currentTab,setCurrentTab] = useState("landingPage");

    const handleSetUpForm = (formData:InterviewFormData)=>{
          setFormData(formData);
          setCurrentTab("interviewRoom");
    }

    return(
        <>
          {currentTab==="landingPage" && <LandingPage onStart={()=>{setCurrentTab("setup")}}/>}
          {currentTab==="setup" && <SetUpForm onSetupSubmit={handleSetUpForm}/>}
          {currentTab==="interviewRoom" && <InterviewRoom formData={formData}/>}
        </>
    );
    
}

export default App;