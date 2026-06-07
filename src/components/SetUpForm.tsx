import { useState } from "react";
import { InterviewFormData } from "../App";
import { useNavigate } from "react-router-dom";



const SetUpForm = () => {
    const [formData, setFormData] = useState<InterviewFormData>({
        jobRole: "",
        requirements: "",
        experience: "",
        packageLPA: "",
        difficulty: ""
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.jobRole || !formData.requirements || !formData.experience || !formData.packageLPA || !formData.difficulty) {
            setError("Please fill out all fields!");
            return;
        }
        setError("");
        navigate('/interview',{state:{formData}});
    }

    return (
        <div className="w-full max-w-[500px] m-auto animate-[fadeInUp_0.6s_ease]">
            <div className="text-center mb-8">
                <h1 className="text-[2.5rem] font-extrabold mb-2 tracking-tight font-heading text-retro-green">Configure Interview</h1>
                <p className="text-retro-green-light text-lg">Customize Mr. Stone for your specific needs</p>
            </div>

            <div className="bg-cream border-2 border-retro-green rounded-2xl p-10 shadow-retro">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-retro-green mb-2">Job Role / Position</label>
                        <input
                            type="text"
                            name="jobRole"
                            value={formData.jobRole}
                            onChange={handleChange}
                            placeholder="e.g. Frontend Developer"
                            className="w-full px-4 py-3 bg-white border-2 border-[#dcd7c9] rounded-lg text-retro-green font-body text-base outline-none transition-all focus:border-retro-green"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-retro-green mb-2">Job Requirements / Tech Stack</label>
                        <textarea
                            name="requirements"
                            value={formData.requirements}
                            onChange={handleChange}
                            placeholder="e.g. React, Node.js, AWS, MongoDB..."
                            className="w-full px-4 py-3 bg-white border-2 border-[#dcd7c9] rounded-lg text-retro-green font-body text-base outline-none transition-all focus:border-retro-green min-h-[100px] resize-y"
                        ></textarea>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-retro-green mb-2">Target Package (LPA)</label>
                            <input
                                type="text"
                                name="packageLPA"
                                value={formData.packageLPA}
                                onChange={handleChange}
                                placeholder="e.g. 15 LPA"
                                className="w-full px-4 py-3 bg-white border-2 border-[#dcd7c9] rounded-lg text-retro-green font-body text-base outline-none transition-all focus:border-retro-green"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-retro-green mb-2">Difficulty</label>
                            <select
                                name="difficulty"
                                value={formData.difficulty}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border-2 border-[#dcd7c9] rounded-lg text-retro-green font-body text-base outline-none transition-all focus:border-retro-green cursor-pointer appearance-none"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23152c1b' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', paddingRight: '40px' }}
                            >
                                <option value="">Select Difficulty</option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-retro-green mb-2">Years of Experience</label>
                        <select
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border-2 border-[#dcd7c9] rounded-lg text-retro-green font-body text-base outline-none transition-all focus:border-retro-green cursor-pointer appearance-none"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23152c1b' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', paddingRight: '40px' }}
                        >
                            <option value="">Select Experience Level</option>
                            <option value="0-1">Fresher (0-1 years)</option>
                            <option value="1-3">Junior (1-3 years)</option>
                            <option value="3-5">Mid-Level (3-5 years)</option>
                            <option value="5+">Senior (5+ years)</option>
                        </select>
                    </div>

                    {error && <span className="block text-retro-red text-sm mt-1 font-semibold">{error}</span>}

                    <button type="submit" className="w-full p-4 mt-4 bg-retro-green text-white font-body text-lg font-semibold border-2 border-retro-green rounded-full cursor-pointer transition-all hover:bg-retro-green-light hover:-translate-y-0.5 shadow-retro hover:shadow-retro-hover">
                        Start Interview
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SetUpForm;
