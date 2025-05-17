import { useMutation } from "@tanstack/react-query"
import axiosInstance from "../../axiosConfig";

const useDepoimentosApi = () => {
    const getDepoimentos = useMutation({
        mutationFn: async (params) => {
            const response = await axiosInstance.get('/depoimentos', { params });
            return response.data;
        }
    })

    return { getDepoimentos: getDepoimentos.mutateAsync }
}

export default useDepoimentosApi