import { isAxiosError } from "axios";
import swal from "sweetalert";

export const useSwal = () => {
  const showError = (
    err: unknown,
    fallbackMessage = "Something went wrong"
  ) => {
    let text = fallbackMessage;
    if (isAxiosError(err)) {
      text = err.response?.data?.message || fallbackMessage;
    }
    swal("Error", text, "error");
  };

  const showSuccess = (message: string = "Operation successful") => {
    swal("Success", message, "success");
  };

  return { showError, showSuccess };
};
