import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";

export const Toast = ({ toast }) => {
  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  }[toast.type];

  return (
    <div
      className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in`}
    >
      {toast.message}
    </div>
  );
};

export const ToastContainer = () => {
  const { toasts } = useContext(ToastContext);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};
