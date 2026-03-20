import { handleAuthError } from "@/utils/authHelper";

const API_URL = "/api";

export interface UserProfile {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  avatarUrl?: string;
  address?: string;
  roles?: string[];
}

export const UserService = {
  async getProfile(token: string): Promise<UserProfile> {
    const headers: any = {};
    if (token && token !== "session") {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}/users/profile`, {
      headers,
      cache: "no-store",
      credentials: "include",
    });
    if (!res.ok) {
        handleAuthError(res.status);
        throw new Error("Failed to fetch profile");
    }
    return await res.json();
  },

  async updateProfile(data: Partial<UserProfile>, token: string): Promise<UserProfile> {
    const headers: any = {
      "Content-Type": "application/json",
    };
    if (token && token !== "session") {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}/users/profile`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (!res.ok) {
        handleAuthError(res.status);
        const errorText = await res.text();
        console.error("Update profile failed:", errorText);
        throw new Error(errorText || "Failed to update profile");
    }
    return await res.json();
  },

  async changePassword(oldPassword: string, newPassword: string, token: string): Promise<void> {
    const headers: any = {
      "Content-Type": "application/json",
    };
    if (token && token !== "session") {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}/users/change-password`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ oldPassword, newPassword }),
      credentials: "include",
    });
    
    if (!res.ok) {
        handleAuthError(res.status);
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
             const errorJson = await res.json();
             throw new Error(errorJson.message || "Failed to change password");
        } else {
             const errorText = await res.text();
             throw new Error(errorText || "Failed to change password");
        }
    }
  },

  async uploadAvatar(file: File, token: string): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const headers: any = {};
    if (token && token !== "session") {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}/users/avatar`, {
      method: "POST",
      headers,
      body: formData,
      credentials: "include",
    });

    if (!res.ok) {
        handleAuthError(res.status);
        throw new Error("Failed to upload avatar");
    }
    const data = await res.json();
    return data.avatarUrl; 
  },
};
