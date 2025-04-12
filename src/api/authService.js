import { apiClient } from "./baseAPI";

export const authService = {
    signup: async (payload) => {
        try {
            const response = await apiClient.post('/auth/signup', payload);
            const data = response.data;

            return { success: true, data: data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Signup failed. Please try again.',
                data: null,
            };
        }
    },
    emailVerification: async (payload) => {
        try {
            const response = await apiClient.post('/auth/verify', payload);
            const data = response.data;

            return { success: true, data: data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Email verification failed. Please try again.',
                data: null,
            };
        }
    },
    login: async (email, password) => {
        try {
            const response = await apiClient.post('/auth/token', { email, password });
            const { token } = response.data;

            localStorage.setItem("token", token);

            const userResponse = await authService.me();
            if (userResponse.success) {
                return { success: true, user: userResponse.user };
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
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
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
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