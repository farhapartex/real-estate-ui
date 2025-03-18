import { apiClient } from "./baseAPI"

export const locationService = {
    countryList: async (page = 1, pageSize = 10) => {
        try {
            const response = await apiClient.get(`/admin/countries?page=${page}&pageSize=${pageSize}`)
            return { success: true, response: response };;
        } catch (error) {
            return { success: false };
        }
    },
    createCountry: async (name, code) => {
        try {
            const response = await apiClient.post("/admin/countries", { name, code })
            return { success: true, response: response };
        } catch (error) {
            return { success: false };
        }
    }
}