const useFormat = () => {
  const money = (value: number | string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(+value);
  };

  return {
    money,
  };
};

export default useFormat;
