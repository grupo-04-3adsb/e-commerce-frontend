const formatarDataParaISO = (data) => {
  if (data) {
    const partes = data.split("/");
    const dia = partes[0];
    const mes = partes[1];
    const ano = partes[2];
    return `${ano}-${mes}-${dia}`;
  }
  return null;
};

const formatarISOParaDataHora = (dataISO) => {
  if (dataISO) {
    const dataObj = new Date(dataISO);

    const dia = String(dataObj.getDate()).padStart(2, "0");
    const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
    const ano = dataObj.getFullYear();

    const horas = String(dataObj.getHours()).padStart(2, "0");
    const minutos = String(dataObj.getMinutes()).padStart(2, "0");

    return `${dia}/${mes}/${ano} | ${horas}:${minutos}`;
  }
  return null;
};

const formatarISOParaData = (dataISO) => {
  if (dataISO) {
    const dataObj = new Date(dataISO);

    const dia = String(dataObj.getDate()).padStart(2, "0");
    const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
    const ano = dataObj.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }
  return null;
};

const obterDiferencaDias = (dataISO1, dataISO2) => {
  if (dataISO1 && dataISO2) {
    const data1 = new Date(dataISO1);
    const data2 = new Date(dataISO2);

    const diferencaTempo = data2 - data1;
    return Math.ceil(diferencaTempo / (1000 * 60 * 60 * 24));
  }
  return null;
};

export {
  formatarDataParaISO,
  formatarISOParaDataHora,
  formatarISOParaData,
  obterDiferencaDias,
};
