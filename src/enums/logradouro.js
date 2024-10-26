import { z } from 'zod';

const logradouroSchema = z.object({
    descricao: z.string(),
    valor: z.number(),
});

const Logradouro = z.object({
    AEROPORTO: logradouroSchema,
    ALAMEDA: logradouroSchema,
    AREA: logradouroSchema,
    AVENIDA: logradouroSchema,
    CAMPO: logradouroSchema,
    CHACARA: logradouroSchema,
    COLONIA: logradouroSchema,
    CONDOMINIO: logradouroSchema,
    CONJUNTO: logradouroSchema,
    DISTRITO: logradouroSchema,
    ESPLANADA: logradouroSchema,
    ESTACAO: logradouroSchema,
    ESTRADA: logradouroSchema,
    FAVELA: logradouroSchema,
    FAZENDA: logradouroSchema,
    FEIRA: logradouroSchema,
    JARDIM: logradouroSchema,
    LADEIRA: logradouroSchema,
    LAGO: logradouroSchema,
    LAGOA: logradouroSchema,
    LARGO: logradouroSchema,
    LOTEAMENTO: logradouroSchema,
    MORRO: logradouroSchema,
    NUCLEO: logradouroSchema,
    PARQUE: logradouroSchema,
    PASSARELA: logradouroSchema,
    PATIO: logradouroSchema,
    PRACA: logradouroSchema,
    QUADRA: logradouroSchema,
    RECANTO: logradouroSchema,
    RESIDENCIAL: logradouroSchema,
    RODOVIA: logradouroSchema,
    RUA: logradouroSchema,
    SETOR: logradouroSchema,
    SITIO: logradouroSchema,
    TRAVESSA: logradouroSchema,
    TRECHO: logradouroSchema,
    TREVO: logradouroSchema,
    VALE: logradouroSchema,
    VEREDA: logradouroSchema,
    VIA: logradouroSchema,
    VIADUTO: logradouroSchema,
    VIELA: logradouroSchema,
    VILA: logradouroSchema,
}).strict();

const logradouroOptions = Object.keys(Logradouro.shape).map((value) => ({
    key: value,
    label: value.charAt(0) + value.slice(1).toLowerCase(),
    value: value,
}));

export { logradouroOptions };
export default Logradouro;