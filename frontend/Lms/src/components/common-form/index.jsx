import { Button } from "../ui/button"
import { FormControls } from "./FormControls"

const CommonForm=({handleSubmit,buttonText, formControls = [], formData, setFormData,isButtonDisabled})=>{
    console.log("j",isButtonDisabled)
return (
   <form onSubmit={handleSubmit}>
    <FormControls
    formControls={formControls}
    formData={formData}
    setFormData={setFormData}/>
    <Button className="w-full mt-5"  disabled={isButtonDisabled} type="submit">
        {buttonText || "Submit"}
    </Button>
   </form>
)
}

export default CommonForm