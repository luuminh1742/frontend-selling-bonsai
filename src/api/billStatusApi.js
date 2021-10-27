import axiosClient from "./axiosClient";

const billStatusApi = {
    getAll: (params) => {
        const url = '/BillStatus';
        return axiosClient.get(url, { params });
    },
    create: (data, params) => {
        const url = '/BillStatus';
        return axiosClient.post(url, data, { params });
    }
}

export default billStatusApi;