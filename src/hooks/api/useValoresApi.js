import { useMutation } from "@tanstack/react-query"
import axiosInstance from "../../axiosConfig";

const useValoresApi = () => {

    const getValores = useMutation({
        mutationFn: async (params) => {
            const response = await axiosInstance.get('/valores', { params });
            return response.data;
        }
    })

    return { getValores: getValores.mutateAsync }
}

export default useValoresApi