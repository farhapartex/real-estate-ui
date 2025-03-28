import { apiClient } from "./baseAPI"

export const locationService = {
    countryList: async (page = 1, pageSize = 10) => {
        try {
            const response = await apiClient.get(`/admin/countries?page=${page}&pageSize=${pageSize}`);
            console.log(response.data);
            return { success: true, response: response.data };
        } catch (error) {
            return { success: false, response: null };
        }
    },
    createCountry: async (name, code) => {
        try {
            const response = await apiClient.post("/admin/countries", { name, code });
            return { success: true, response: response.data };
        } catch (error) {
            return { success: false, response: null };
        }
    },
    updateCountry: async (id, validatedData) => {
        try {
            const response = await apiClient.patch(`/admin/countries/${id}`, validatedData);
            return { success: true, response: response.data };
        } catch (error) {
            return { success: false, response: null };
        }
    },
    deleteCountry: async (id) => {
        try {
            const response = await apiClient.delete(`/admin/countries/${id}`);
            return { success: true, response: response.data };
        } catch (error) {
            return { success: false, response: null };
        }
    },
    divisionList: async (page = 1, pageSize = 10) => {
        try {
            const response = await apiClient.get(`/admin/divisions?page=${page}&pageSize=${pageSize}`);
            console.log(response.data);
            return { success: true, response: response.data };
        } catch (error) {
            return { success: false, response: null };
        }
    },
    createDivision: async (name, country_id) => {
        try {
            const response = await apiClient.post("/admin/divisions", { name, country_id });
            return { success: true, response: response.data };
        } catch (error) {
            return { success: false, response: null };
        }
    },
}