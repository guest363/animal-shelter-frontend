/* id для DOM элементов, генерируется рандомно вида 'idXXXXXX' */
export default () => {
    return `id${(~~(Math.random() * 1e8)).toString(16)}`;
};