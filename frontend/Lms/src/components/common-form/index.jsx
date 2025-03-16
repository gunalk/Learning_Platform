import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { FormControls } from "./FormControls";

const CommonForm = ({
  handleSubmit,
  buttonText,
  formControls = [],
  formData,
  setFormData,
  isButtonDisabled,
  loading,
}) => {
  console.log("j", isButtonDisabled);
  return (
    <form onSubmit={handleSubmit}>
      <FormControls
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
      />
      <Button className="w-full mt-5" disabled={isButtonDisabled} type="submit">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          </>
        ) : (
          <> {buttonText || "Submit"}</>
        )}
      </Button>
    </form>
  );
};

export default CommonForm;
