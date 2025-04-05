"use client";
import React, { createContext, useState, useEffect } from "react";

interface UserData {
  username: string;
  displayName: string;
  email?: string;
  courses?: string[];
  status?: string;
  isAdmin?: boolean;
  isActiveTecnicoStudent?: boolean;
  isActiveLMeicStudent?: boolean;
  isCollab?: boolean;
  isGacMember?: boolean;
  photoUrl?: string; // Add photoUrl to store the user's profile photo
}

interface UserDataContextProps {
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  login: () => void;
  logout: () => void;
  fetchUserData: () => Promise<void>;
}

const UserDataContext = createContext<UserDataContextProps | undefined>(undefined);

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  // Function to fetch user data
  const fetchUserData = async () => {
    const accessToken = window.sessionStorage.getItem("accessToken");

    if (accessToken) {
      try {
        // Fetch user data from the API
        const response = await fetch(`/api/auth/userData/${encodeURIComponent(accessToken)}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();

        if (data?.username) {
          // Fetch the user's profile photo
          const photoUrl = await fetchUserPhoto(data.username, accessToken);

          // Update user data with fetched values
          const updatedUserData = {
            ...data,
            photoUrl, // Add the photo URL to the user data
            courses: data.courses || ["Placeholder Course"], // Mock data
            email: data.email || "placeholder@tecnico.ulisboa.pt", // Mock data
          };

          setUserData(updatedUserData);
          console.log("User data retrieved and updated:", updatedUserData);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setUserData(null); // Clear user data if fetching fails
      }
    }
  };

  // Function to fetch the user's profile photo
  const fetchUserPhoto = async (username: string, accessToken: string): Promise<string> => {
    try {
      const response = await fetch(`/api/auth/userData/photo/${username}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user photo");
      }
  
      return `/api/auth/userData/photo/${username}`;
    } catch (error) {
      console.error("Error fetching user photo:", error);
      return ""; // Return an empty string if the photo cannot be fetched
    }
  };

  // Automatically fetch user data if accessToken exists on page load
  useEffect(() => {
    const accessToken = window.sessionStorage.getItem("accessToken");
    if (accessToken) {
      fetchUserData();
    }
  }, []);

  // Login function
  const login = () => {
    const fenixLoginUrl = `https://fenix.tecnico.ulisboa.pt/oauth/userdialog?client_id=${process.env.NEXT_PUBLIC_FENIX_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_FENIX_REDIRECT_URI}`;
    window.location.href = fenixLoginUrl;
  };

  // Logout function
  const logout = () => {
    window.sessionStorage.removeItem("accessToken");
    setUserData(null);
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  };

  return (
    <UserDataContext.Provider value={{ userData, setUserData, login, logout, fetchUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContext;