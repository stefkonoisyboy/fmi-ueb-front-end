import { toast, ToastOptions } from "react-toastify";
import { ToastPosition } from "react-toastify/dist/types";

export type Options = {
  position: ToastPosition;
  autoClose: number;
  hideProgressBar: boolean;
  closeOnClick: boolean;
  pauseOnHover: boolean;
  draggable: boolean;
  progress: undefined;
  theme: string;
} & ToastOptions;

export const defaultSettings: Options = {
  position: toast.POSITION.BOTTOM_LEFT,
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

const configure = () => defaultSettings;

/**
 * This function takes a type and returns a function that takes a text and an options object and
 * returns a toast notification.
 * @param type - success or error
 */
export const notify = (type: string) => (text: string) => {
  const settings = configure();
  switch (type) {
    case "success":
      toast.success(text, settings);
      break;
    case "error":
      toast.error(text, settings);
      break;
    default:
      toast.info(text, settings);
      break;
  }
};

/**
 * It returns a function that takes a text parameter and calls notify with the text parameter and the
 * string 'success'.
 * @param text - The text to display in the notification.
 */
export const messageSuccess = (text: string) => notify("success")(text);

/**
 * It returns a function that takes a text parameter and calls the notify function with the 'error'
 * parameter and the text parameter.
 * @param text - The text to display in the notification.
 */
export const messageError = (text: string) => notify("error")(text);
