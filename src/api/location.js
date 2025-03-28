import { apiClient, publicApiClient } from "./baseAPI"

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
    getPublicCountries: async (page = 1, pageSize = 10) => {
        try {
            const response = await publicApiClient.get('/countries', {
                params: { page, page_size: pageSize }
            });
            return { success: true, response: response.data };
        } catch (error) {
            return { success: false, response: null };
        }
    },
    getDivisionsByCountry: async (countryId, page = 1, pageSize = 10) => {
        try {
            const response = await publicApiClient.get(`/countries/${countryId}/divisions`, {
                params: { page, page_size: pageSize }
            });
            return { success: true, response: response.data };
        } catch (error) {
            console.error(`Error fetching divisions for country ${countryId}:`, error);
            throw error;
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
    updateDivision: async (id, validatedData) => {
        try {
            const response = await apiClient.patch(`/admin/divisions/${id}`, validatedData);
            return { success: true, response: response.data };
        } catch (error) {
            return { success: false, response: null };
        }
    },
    deleteDivision: async (id) => {
        try {
            const response = await apiClient.delete(`/admin/divisions/${id}`);
            return { success: true, response: response.data };
        } catch (error) {
            return { success: false, response: null };
        }
    },
    districtList: async (page = 1, pageSize = 10) => {
        try {
            const response = await apiClient.get(`/admin/districts?page=${page}&pageSize=${pageSize}`);
            console.log(response.data);
            return { success: true, response: response.data };
        } catch (error) {
            return { success: false, response: null };
        }
    },
    createDistrict: async (name, division_id) => {
        try {
            const response = await apiClient.post("/admin/districts", { name, division_id });
            return { success: true, response: response.data };
        } catch (error) {
            return { success: false, response: null };
        }
    },
    updateDistrict: async (id, validatedData) => {
        try {
            const response = await apiClient.patch(`/admin/districts/${id}`, validatedData);
            return { success: true, response: response.data };
        } catch (error) {
            return { success: false, response: null };
        }
    },
    deleteDistrict: async (id) => {
        try {
            const response = await apiClient.delete(`/admin/districts/${id}`);
            return { success: true, response: response.data };
        } catch (error) {
            return { success: false, response: null };
        }
    },
}