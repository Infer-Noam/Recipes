import { isAxiosError } from "axios";
import swal from "sweetalert";

export const useSwal = () => {
  const showError = (
    err: unknown,
    fallbackMessage = "Something went wrong"
  ) => {
    const message: string =
      (isAxiosError(err) && err.response?.data?.message) || fallbackMessage;

    swal("Error", message, "error");
  };

  const showSuccess = (message: string = "Operation successful") => {
    swal("Success", message, "success");
  };

  return { showError, showSuccess };
};
