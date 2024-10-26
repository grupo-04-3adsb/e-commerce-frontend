import React, { useEffect, useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';

const MercadoPagoApiComponent = () => {
    const [preferenceId, setPreferenceId] = useState(null);

    useEffect(() => {
        const fetchPreferenceId = async () => {
            try {
                initMercadoPago('APP_USR-0f635356-7212-43f5-af1d-e33c48129c29', { locale: 'pt-BR' });
                
                const response = await axios.post(
                    'http://localhost:8080/api/v1/mercadopago/criar-preferencia',
                    {},
                    { headers: { 'Content-Type': 'application/json' } }
                );

                if (response.status === 200) setPreferenceId(response.data);
                else console.error('Erro ao buscar dados: status inesperado', response.status);
            } catch (error) {
                console.error('Erro na API:', error);
            }
        };

        fetchPreferenceId();
    }, []);

    return (
        <div className="h-[300px] flex items-center justify-center text-gray-500">
            {preferenceId ? (
                <Wallet initialization={{ preferenceId }} />
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
};

export default MercadoPagoApiComponent;
