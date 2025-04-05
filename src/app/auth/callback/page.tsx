"use client";
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import UserDataContext from "../../../context/UserDataContext";

export default function AuthCallback() {
  const router = useRouter();
  const { fetchUserData } = useContext(UserDataContext) || {};

  useEffect(() => {
    const fetchAccessToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        try {
          const response = await fetch(`/api/auth/accessToken/${code}`);
          const data = await response.json();

          if (data.access_token) {
            // Store the access token in sessionStorage
            window.sessionStorage.setItem("accessToken", data.access_token);

            // Fetch user data after login
            if (fetchUserData) {
              await fetchUserData();
            }

            // Redirect to the homepage
            router.push("/");
          } else {
            console.error("Failed to retrieve access token");
          }
        } catch (err) {
          console.error("Error during login:", err);
        }
      }
    };

    fetchAccessToken();
  }, [router, fetchUserData]);

  return <p>Logging in...</p>;
}