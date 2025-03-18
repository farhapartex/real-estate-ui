import { apiClient } from "./baseAPI";

export const authService = {
    login: async (email, password) => {
        try {
            const response = await apiClient.post('/auth/token', { email, password });
            const { token } = response.data;

            localStorage.setItem("token", token);

            const userResponse = await authService.me();
            if (userResponse.success) {
                return { success: true, user: userResponse.user };
            } else {
                localStorage.remove("token");
                localStorage.remove("refreshToken");
                return { success: false, user: null, error: 'Error to fetch user data.' };
            }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Login failed. Please try again.',
                user: null,
            };
        }
    },

    logout: async () => {
        localStorage.remove("token");
        localStorage.remove("refreshToken");
    },

    me: async () => {
        try {
            const respose = await apiClient.get('/me');
            return { success: true, user: respose.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch user information'
            };
        }
    },

    getHomeRoute: (user) => {
        if (!user || !user.role) return "/login"

        switch (user.role) {
            case 'admin':
                return '/admin/dashboard';
            case 'owner':
                return '/owner/dashboard';
            case 'customer':
                return '/customer/dashboard';
            default:
                return '/login';
        }
    }
}

export default apiClient;