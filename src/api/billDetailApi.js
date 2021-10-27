import axiosClient from "./axiosClient";

const billDetailApi = {
    getAll: (params) => {
        const url = '/BillDetails';
        return axiosClient.get(url, { params });
    },
    create: (data, params) => {
        const url = '/BillDetails';
        return axiosClient.post(url, data, { params });
    }
}

export default billDetailApi;