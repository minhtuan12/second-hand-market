import axios from "axios";

const baseUrl = process.env.API_URL!;

const onRejected = (error: any) => {
    return Promise.reject(error)
}

export const apiAxios = axios.create({
    baseURL: `${baseUrl}`,
    headers: {
        'Content-Type': 'application/json',
    }
});

apiAxios.interceptors.request.use((request) => {
    return request;
}, onRejected);

apiAxios.interceptors.response.use(function (response) {
    return response;
}, onRejected);
