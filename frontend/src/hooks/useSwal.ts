import { isAxiosError } from "axios";
import swal from "sweetalert";
import type { SwalOptions } from "sweetalert/typings/modules/options";

export const useSwal = () => {
  const showError = (
    err: unknown,
    fallbackMessage = "Something went wrong"
  ) => {
    const message = isAxiosError(err)
      ? err.response?.data?.message || err.message
      : fallbackMessage;

    return swal("Error", message, "error");
  };

  const showSuccess = (message: string = "Operation successful") =>
    swal("Success", message, "success");

  const showWarning = (message: string, options?: Partial<SwalOptions>) =>
    swal("Warning", message, "warning", { ...options });

  return { showError, showSuccess, showWarning };
};
