import axiosClient from "./axiosClient";

const productCategoryApi = {
    getAll: (params) => {
        const url = '/ProductCategories';
        return axiosClient.get(url, { params });
    },
    create: (data) => {
        const url = '/ProductCategories';
        return axiosClient.post(url, data);
    },
    edit: (data, params) => {
        const url = '/ProductCategories';
        return axiosClient.put(url, data, { params });
    },
    delete: ( params) => {
        const url = '/ProductCategories';
        return axiosClient.delete(url, { params });
    },
}

export default productCategoryApi;