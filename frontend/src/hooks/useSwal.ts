import { isAxiosError } from "axios";
import swal from "sweetalert";
import type { SwalOptions } from "sweetalert/typings/modules/options";

export const useSwal = () => {
  const showError = (
    err?: unknown,
    fallbackMessage = "Something went wrong",
    options?: Partial<SwalOptions>
  ) => {
    const message = isAxiosError(err)
      ? err.response?.data?.message || err.message
      : fallbackMessage;

    return swal("Error", message, "error", { ...options });
  };

  const showSuccess = (
    message: string = "Operation successful",
    options?: Partial<SwalOptions>
  ) => swal("Success", message, "success", { ...options });

  const showWarning = (message: string, options?: Partial<SwalOptions>) =>
    swal("Warning", message, "warning", { ...options });

  return { showError, showSuccess, showWarning };
};
