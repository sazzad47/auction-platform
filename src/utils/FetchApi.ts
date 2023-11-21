import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { server } from '../config/serverPoint';

const BaseUrl = server + 'api/v1/';

const axiosInstance = axios.create({
    withCredentials: true,
});

const fetchData = async (endPoint: string, token = '', signal?: AbortSignal): Promise<AxiosResponse> => {
    const config: AxiosRequestConfig = {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        signal,
    };

    const response = await axiosInstance.get(`${BaseUrl}${endPoint}`, config);
    return response;
};

const postData = async (endPoint: string, data?: unknown, token = ''): Promise<AxiosResponse> => {
    const config: AxiosRequestConfig = {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    };

    const response = await axiosInstance.post(`${BaseUrl}${endPoint}`, data, config);
    return response;
};

const patchData = async (endPoint: string, data: unknown, token = ''): Promise<AxiosResponse> => {
    const config: AxiosRequestConfig = {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    };

    const response = await axiosInstance.patch(`${BaseUrl}${endPoint}`, data, config);
    return response;
};

export { fetchData, postData, patchData };
