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
  photo: string;
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
        // Fetch user data from the API route
        const response = await fetch(`/api/auth/userData/${encodeURIComponent(accessToken)}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();

        if (data?.username) {
          // Update user data with fetched values
          setUserData(data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setUserData(null); // Clear user data if fetching fails
      }
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
    window.location.href = "/api/auth/login";
  };

  // Logout function
  const logout = () => {
    window.sessionStorage.removeItem("accessToken");
    setUserData(null);
    window.location.href = "/";
  };

  return (
    <UserDataContext.Provider value={{ userData, setUserData, login, logout, fetchUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContext;