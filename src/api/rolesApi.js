import axiosClient from "./axiosClient";

const rolesApi = {
    getAll: (params) => {
        const url = '/Roles';
        return axiosClient.get(url, { params });
    }
}

export default rolesApi;