"use client"
import React, { createContext, useState, useEffect } from "react";

interface UserData {
  username: string;
  displayName: string;
  status?: string;
  isAdmin?: boolean;
  isActiveTecnicoStudent?: boolean;
  isActiveLMeicStudent?: boolean;
  isCollab?: boolean;
  isGacMember?: boolean;
}

interface UserDataContextProps {
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  login: () => void;
  logout: () => void;
}

const UserDataContext = createContext<UserDataContextProps | undefined>(undefined);

// For debug access from console
declare global {
  interface Window {
    __NEIIST_DEBUG__: {
      setMockUser: (userData: UserData) => void;
    };
  }
}

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Initialize debug object for console access
    window.__NEIIST_DEBUG__ = {
      setMockUser: (mockData: UserData) => {
        console.log('Setting mock user:', mockData);
        setUserData(mockData);
      }
    };

    // Fetch user data from API
    fetch("/api/members/currentUser")
      .then((res) => res.json())
      .then((data) => {
        if (data?.username) {
          // Fetch user status
          fetch(`/api/members/status/${data.username}`)
            .then((res) => res.json())
            .then((userStatus) => {
              const updatedUserData = {
                ...data,
                status: userStatus || "NaoSocio"
              };
              setUserData(updatedUserData);
            })
            .catch((err) => console.error("Failed to fetch user status:", err));
        }
      })
      .catch((err) => console.error("Failed to fetch user data:", err));

    // Cleanup
    return () => {
      // Optional: remove debug object on component unmount
      // delete window.__NEIIST_DEBUG__;
    };
  }, []);

  const login = () => {
    const fenixLoginUrl = `https://fenix.tecnico.ulisboa.pt/oauth/userdialog?client_id=${process.env.NEXT_PUBLIC_FENIX_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_FENIX_REDIRECT_URI}`;
    window.location.href = fenixLoginUrl;
  };

  const logout = () => {
    window.sessionStorage.removeItem("userData");
    window.sessionStorage.removeItem("accessToken");
    setUserData(null);
    window.location.href = "/";
  };

  return (
    <UserDataContext.Provider value={{ userData, setUserData, login, logout }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContext;