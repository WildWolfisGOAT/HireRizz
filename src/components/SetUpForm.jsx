import { useForm } from 'react-hook-form'


const SetUpForm = ({onSetupSubmit}) => {

  const {register,handleSubmit,formState:{errors}}= useForm({
    defaultValues: {
    jobRole: "",
    packageLPA: "3-5",
    experience: "0-2",
    difficulty: "Easy",
    requirements: "",
  }
  })


  return (
    <form onSubmit={handleSubmit(onSetupSubmit)}>
      <label htmlFor="">Job Role:</label>
      <input type="text" {...register("jobRole",{required:"Job Role is required"})}/>
      {errors.jobRole && <span>{errors.jobRole.message}</span>}
      <label htmlFor="">Package (in LPA):</label>
      <select name="" id="" {...register("packageLPA",{required:"Package is required"})}>
          <option value="3-6">3-6 LPA</option>
          <option value="7-10">7-10 LPA</option>
          <option value="11-15">11-15 LPA</option>
          <option value="16-20">16-20 LPA</option>
          <option value="25+">25+ LPA</option>
      </select>
      {errors.packageLPA && <span>{errors.packageLPA.message}</span>}
      <label htmlFor="">Years of Experience:</label>
      <select name="" id="" {...register("experience",{required:"Experience is required"})}>
          <option value="0-2">0-2 Years</option>
          <option value="3-5">3-5 Years</option>
          <option value="6-10">6-10 Years</option>
          <option value="10+">10+ Years</option>
      </select>
      {errors.experience && <span>{errors.experience.message}</span>}
      <label htmlFor="">Difficulty:</label>
      <select name="" id="" {...register("difficulty",{required:"Difficulty is required"})}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
      </select>
      {errors.difficulty && <span>{errors.difficulty.message}</span>}
      <label htmlFor="">Requirements:</label>
      <textarea name="" id="" {...register("requirements")}></textarea>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default SetUpForm
