import axiosClient from "./axiosClient";

const billApi = {
    getAll: (params) => {
        const url = '/Bills';
        return axiosClient.get(url, { params });
    },
    getBillFilter: (params) => {
        const url = '/BillsFilter';
        return axiosClient.get(url, { params });
    },
    create: (data, params) => {
        const url = '/Bills';
        return axiosClient.post(url, data, { params });
    },
    update: (params) => {
        const url = `/UpdateBill?id=${params.id}&code=${params.code}`;
        return axiosClient.put(url);
    }
}

export default billApi;