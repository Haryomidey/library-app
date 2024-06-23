import postService from "../crud-requests/postService";

const CONFIG_API_URL = process.env.REACT_APP_API_BASE_URL;

export const destroyUserSession = () => {
  sessionStorage.removeItem("card_user_token");
  sessionStorage.removeItem("card_user_user");
  sessionStorage.removeItem("UserFromToken");
};

export const getLocalUserProfile = (): any | null => {
  const user = sessionStorage.getItem("card_user_user");
  if (user) {
    try {
      const userModel = JSON.parse(user);
      return userModel;
    } catch (error) {
      console.error("Error parsing user profile:", error);
      return null;
    }
  }
  return null;
};

export const getAuthToken = (): string | null => {
  const token = sessionStorage.getItem("card_user_token");
  if (token) {
    return token;
  }
  return null;
};

export const getRefreshToken = (): string | null => {
  const refreshToken = sessionStorage.getItem("card_user_refresh");
  if (refreshToken) {
    return refreshToken;
  }
  return null;
};

class AuthService {
  async login(data: any) {
    try {
      const response = await postService.post(
        `${CONFIG_API_URL}Account/Authenticate`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  async accessToken(data: any) {
    try {
      const response = await postService.post(
        `${CONFIG_API_URL}Account/AccessToken`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Access token error:", error);
      throw error;
    }
  }

  async forgot_password(data: any) {
    try {
      const response = await postService.post(
        `${CONFIG_API_URL}Account/ForgotPassword`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Forgot password error:", error);
      throw error;
    }
  }

  async resetPassword(data: any) {
    try {
      const response = await postService.post(
        `${CONFIG_API_URL}Account/ResetPassword`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    }
  }

  async verifyCode(data: any) {
    try {
      const response = await postService.post(
        `${CONFIG_API_URL}Account/VerifyCode`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Verify code error:", error);
      throw error;
    }
  }

  async changeDefaultPassword(data: any) {
    try {
      const response = await postService.post(
        `${CONFIG_API_URL}Account/ChangeDefaultPassword`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Change default password error:", error);
      throw error;
    }
  }
}

export default new AuthService();
