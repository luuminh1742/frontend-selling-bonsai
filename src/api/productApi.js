import axiosClient from "./axiosClient";

const productApi = {
    getAll: (params) => {
        const url = '/ListProduct';
        return axiosClient.get(url, { params });
    },
    getOne: (id) => {
        const url = `/Products/${id}`;
        return axiosClient.get(url);
    },
    
    create: (data, params) => {
        const url = '/Products';
        return axiosClient.post(url, data, { params });
    },
    edit: (data, params) => {
        const url = '/Products';
        return axiosClient.put(url, data, { params });
    },
    delete: (params) => {
        const url = '/Products';
        return axiosClient.delete(url, { params });
    },
}

export default productApi;