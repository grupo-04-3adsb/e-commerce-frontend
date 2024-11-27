import { useMutation } from "@tanstack/react-query"
import axiosInstance from "../../axiosConfig"

const usePedidoApi = () => {
    
    const checkOut = useMutation({
        mutationFn: async (id) => {
            const response = await axiosInstance.post(`/api/v1/mercadopago/pix/${id}`)
            return response
        },
        onError: (error) => {
            console.error("Erro ao fazer pedido")
        },
        onSuccess: (data) => {
            console.log("Pedido bem-sucedido")
        },
    })

    const processarPagamento = useMutation({
        mutationFn: async (id) => {
            const response = await axiosInstance.post(`/api/v1/mercadopago/process_payment/${id}`)
            return response
        },
        onError: (error) => {
            console.error("Erro ao processar pagamento")
        },
        onSuccess: (data) => {
            console.log("Pagamento processado com sucesso")
        },
    })

    return {
        checkOut: checkOut.mutateAsync,
        processarPagamento: processarPagamento.mutateAsync,
    }
}

export default usePedidoApi