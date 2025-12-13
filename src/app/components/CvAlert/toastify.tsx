import toast from "react-hot-toast";

interface ToastType {
    label: string;
    type?: "success" | "error" | "warning";
    postion?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right",
}

const notify = ({ label, type = "success", postion = "top-right" }: ToastType) => {
    switch (type) {
        case "success":
            return toast.success(label, {
                duration: 5000,
                position: postion,
            });
        case "error":
            return toast.error(label, {
                duration: 5000,
                position: postion,
            });
        case "warning":
            return toast(label, { // Default toast for warnings (yellow color needs custom styling)
                duration: 5000,
                position: postion,
                style: { background: "#facc15", color: "#000" }, // Yellow background for warning
            });
        default:
            return toast(label, { duration: 5000, position: postion });
    }
};

export default notify;