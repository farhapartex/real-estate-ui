import { apiClient, publicApiClient } from "./baseAPI";

export const propertyService = {
    ownerPropertyList: async (page = 1, pageSize = 10) => {
        try {
            const response = await apiClient.get(`/owner/properties?page=${page}&pageSize=${pageSize}`);
            return { success: true, response: response.data };
        } catch (error) {
            return { success: false, response: null };
        }
    },
    createOwnerProperty: async (payload) => {
        try {
            const response = await apiClient.post(`/owner/properties`, payload);
            return { success: true, response: response.data };
        } catch (error) {
            return { success: false, response: null };
        }
    },
    OwnerPropertyDetails: async (id) => {
        try {
            const response = await apiClient.get(`/owner/properties/${id}`);
            return { success: true, response: response.data };
        } catch (error) {
            return { success: false, response: null };
        }
    },
    OwnerPropertyUpdate: async (id, payload) => {
        try {
            const response = await apiClient.patch(`/owner/properties/${id}`, payload);
            return { success: true, response: response.data };
        } catch (error) {
            return { success: false, response: null };
        }
    },
    OwnerPropertyFeatureDetails: async (id) => {
        try {
            const response = await apiClient.get(`/owner/properties/${id}/features`);
            return { success: true, response: response.data };
        } catch (error) {
            return { success: false, response: null };
        }
    },
}