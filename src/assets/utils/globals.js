export const transformarData = (dataString) => {
    const [dia, mes, ano] = dataString.split('/');
    return `${ano}-${mes}-${dia}`;
}