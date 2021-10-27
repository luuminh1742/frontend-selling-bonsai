import axiosClient from "./axiosClient";

const accountApi = {
    login: (data) => {
        const url = '/Login';
        return axiosClient.post(url, data);
    },
    register: (data) => {
        const url = '/Accounts';
        return axiosClient.post(url, data);
    },
    update: (data, params) => {
        const url = '/Accounts';
        return axiosClient.put(url, data, { params });
    },
    updatePassword: (data, params) => {
        const url = '/UpdatePassword';
        return axiosClient.put(url, data, { params });
    }
}

export default accountApi;