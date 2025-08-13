import { isAxiosError } from "axios";
import swal from "sweetalert";
import type { SwalOptions } from "sweetalert/typings/modules/options";

export const useSwal = () => {
  const showError = (
    err: unknown,
    fallbackMessage = "Something went wrong",
    httpStatusMessages?: Record<number, string>,
    options?: Partial<SwalOptions>
  ) => {
    let message = fallbackMessage;

    if (isAxiosError(err)) {
      const status = err.response?.status;
      const mappedMessage = status ? httpStatusMessages?.[status] : undefined;
      message = mappedMessage || err.response?.data?.message || err.message;
    }

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
