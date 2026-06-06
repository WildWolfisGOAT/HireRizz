import { useForm } from 'react-hook-form'

const SetUpForm = ({onSetupSubmit}) => {
  const {register, handleSubmit, formState:{errors}} = useForm({
    defaultValues: {
      jobRole: "",
      packageLPA: "3-6",
      experience: "0-2",
      difficulty: "Easy",
      requirements: "",
    }
  })

  return (
    <div className="setup-container">
      <div className="setup-header">
        <h1>HireRizz</h1>
        <p>AI-powered mock interviews to ace your next opportunity</p>
      </div>
      <div className="setup-card">
        <form onSubmit={handleSubmit(onSetupSubmit)}>
          <div className="form-group">
            <label>Job Role</label>
            <input type="text" placeholder="e.g. Frontend Developer" {...register("jobRole", {required: "Job Role is required"})} />
            {errors.jobRole && <span className="error-text">{errors.jobRole.message}</span>}
          </div>
          <div className="form-group">
            <label>Package (LPA)</label>
            <select {...register("packageLPA", {required: "Package is required"})}>
              <option value="3-6">3-6 LPA</option>
              <option value="7-10">7-10 LPA</option>
              <option value="11-15">11-15 LPA</option>
              <option value="16-20">16-20 LPA</option>
              <option value="25+">25+ LPA</option>
            </select>
            {errors.packageLPA && <span className="error-text">{errors.packageLPA.message}</span>}
          </div>
          <div className="form-group">
            <label>Experience</label>
            <select {...register("experience", {required: "Experience is required"})}>
              <option value="0-2">0-2 Years</option>
              <option value="3-5">3-5 Years</option>
              <option value="6-10">6-10 Years</option>
              <option value="10+">10+ Years</option>
            </select>
            {errors.experience && <span className="error-text">{errors.experience.message}</span>}
          </div>
          <div className="form-group">
            <label>Difficulty</label>
            <select {...register("difficulty", {required: "Difficulty is required"})}>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            {errors.difficulty && <span className="error-text">{errors.difficulty.message}</span>}
          </div>
          <div className="form-group">
            <label>Requirements (optional)</label>
            <textarea placeholder="e.g. Must know React, Node.js, SQL..." {...register("requirements")}></textarea>
          </div>
          <button type="submit" className="submit-btn">Start Interview →</button>
        </form>
      </div>
    </div>
  )
}

export default SetUpForm
