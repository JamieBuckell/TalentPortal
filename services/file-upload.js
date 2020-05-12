// file-upload.service.js

import * as axios from 'axios';

const BASE_URL = ' https://ek6z7oe5pk.execute-api.eu-west-2.amazonaws.com/prod';

function upload(formData, auth_token) {
    const url = `${BASE_URL}/image-upload`;
    const headers = {};
    if (typeof auth_token != 'undefined') {
        headers.Authorization = auth_token;
    }
    return axios.post(
        url, 
        formData,
        { headers: headers }
    )
        // get data
        .then(x => x.data)
        // add url field
        .then(x => x.map(img => Object.assign({},
            img, { url: `${BASE_URL}/images/${img.id}` })));
}

export { upload }