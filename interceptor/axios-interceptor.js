import axios from 'axios';

const customAxios = axios.create({
    baseURL: `https://api.instantwebtools.net/v1/`,
    timeout: 10000, 
});

const requestHandler = request => {
    document.body.classList.add('loading-indicator');
    return request;
};

const responseHandler = response => {
    document.body.classList.remove('loading-indicator');
    return response;
};

const errorHandler = error => {
    return Promise.reject(error);
};

customAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
 );


export default customAxios;