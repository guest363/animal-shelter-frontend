import axios from 'axios';
export default async (value, type = '') => {
    switch (type) {
        case 'city':
            try {
                return await axios({
                    method: 'POST',
                    data: {
                        query: value,
                        count: 5,
                        "from_bound": {
                            "value": "city"
                        },
                        "to_bound": {
                            "value": "settlement"
                        }
                    },
                    url: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
                    headers: {
                        Authorization: `Token 2bcab6c65d4962504c3ee3aa99126ca286943613`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                });
            } catch (error) {
                throw new Error(error.response.data.error_description || error);
            }
            break;

        default:
            break;
    }

};