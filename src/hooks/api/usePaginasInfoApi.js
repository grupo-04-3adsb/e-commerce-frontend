import { useMutation } from "@tanstack/react-query"
import axiosInstance from "../../axiosConfig"

const usePaginasInfoApi = () => {

    const getPaginasInfo = useMutation({
        mutationFn: async (params) => {
            const response = await axiosInstance.get('/pagina-infos', { params });
            return response.data;
        }
    })

    return { getPaginasInfo: getPaginasInfo.mutateAsync }
}

export default usePaginasInfoApi