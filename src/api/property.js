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
}