import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://cavatica-api.sbgenomics.com/v2/',
    headers: { 'X-SBG-Auth-Token': '95f7dd11628547e5a3530c220a73a265' }
});

export default instance;