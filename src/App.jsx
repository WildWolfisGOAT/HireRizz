import { useState } from "react";
import SetUpForm from "./components/SetUpForm";
import InterviewRoom from "./components/InterviewRoom";

const App = ()=>{
    const [formData,setFormData] = useState(null);
    const [currentTab,setCurrentTab] = useState("setup");

    const handleSetUpForm = (formData)=>{
          setFormData(formData);
          setCurrentTab("interviewRoom");
    }

    return(
        <>
          {currentTab==="setup" && <SetUpForm onSetupSubmit={handleSetUpForm}/>}
          {currentTab==="interviewRoom" && <InterviewRoom formData={formData}/>}
        </>
    );
    
}

export default App;