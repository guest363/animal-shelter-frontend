import axios from 'axios';
/**
 * @description В сервисе dadata ищет информацию о юридическом
 * лице по ИНН.
 * @param {number} inn ИНН
 * @returns {object}  data.kpp
 *                    data.ogrn
 *                    
 */
export default async (inn) => {
  try {
    const result = await axios({
      method: 'POST',
      data: { query: inn, type: 'LEGAL' },
      url:
        'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party',
      headers: {
        Authorization: `Token 2bcab6c65d4962504c3ee3aa99126ca286943613`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.response.data.error_description || error);
  }
};
