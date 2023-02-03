export const fetchApi = async () => {
  try {
    const result = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await result.json();
    return data;
  } catch (e) {
    throw new Error('Falha na requisição');
  }
};
