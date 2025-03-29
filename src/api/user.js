import { apiClient, publicApiClient } from "./baseAPI";

export const userService = {
    adminUserList: async (page = 1, pageSize = 10, filters = {}) => {
        try {
            let params = {
                page,
                page_size: pageSize
            };
            if (filters.role) params.role = filters.role;
            if (filters.status) params.status = filters.status;
            if (filters.emailVerified !== undefined) params.email_verified = filters.emailVerified;
            if (filters.search) params.search = filters.search;
            if (filters.sortBy) params.sort_by = filters.sortBy;
            if (filters.sortOrder) params.sort_order = filters.sortOrder;

            const response = await apiClient.get(`/admin/users`, { params });
            return { success: true, response: response.data };
        } catch (error) {
            return { success: false, response: null };
        }
    }
}