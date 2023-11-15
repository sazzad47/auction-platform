import axios, { AxiosResponse } from 'axios';
import { server } from '../config/serverPoint';

const BaseUrl = server + 'api/v1/';

const fetchData = async (endPoint: string, token = ''): Promise<AxiosResponse> => {
    let config = {
        headers: {},
    };
    if (token) {
        config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    }

    let response = await axios.get(`${BaseUrl}${endPoint}`, config);
    return response;
};

const postData = async (endPoint: string, data: any): Promise<AxiosResponse> => {
    let response = await axios.post(`${BaseUrl}${endPoint}`, data);
    return response;
};

const patchData = async (endPoint: string, data: any, token = ''): Promise<AxiosResponse> => {
    let config;
    if (token) {
        config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    }

    let response = await axios.patch(`${BaseUrl}${endPoint}`, data, config);
    return response;
};

export { fetchData, postData, patchData };
