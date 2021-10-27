import axiosClient from "./axiosClient";

const billApi = {
    getAll: (params) => {
        const url = '/Bills';
        return axiosClient.get(url, { params });
    },
    create: (data, params) => {
        const url = '/Bills';
        return axiosClient.post(url, data, { params });
    }
}

export default billApi;