import { toast } from "sonner";

const getProductDetail = async (id: string) => {
    try {
        const res = await fetch(`/api/product/${id}`);
        const data = await res.json();

        if (!res.ok) {
            return;
        }
        return data;
    } catch (error: any) {
        console.log(error);
        toast.error(  error.message || "Something went wrong");
    }
}

export {getProductDetail}