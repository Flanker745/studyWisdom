import React, { createContext, useState, useEffect } from "react";
import cookie from "react-cookies";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [sidebarToggle, setSidebarToggle] = useState(false);
  // const api = "https://serverapi.studywisdom.com";
  const api = "https://serverapi.studywisdom.com"
  const [existUser, setExistUser] = useState(null);
  const [exitUserId, setExitUserId] = useState(null);
  const [exitUserDetails, setExitUserDetails] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true); // Initial loading state
  const id = decodeURIComponent(cookie.load("id"));

  useEffect(() => {
    if (id) {
      const fetchUserData = async () => {
        try {
          let res = await fetch(`${api}/userdata`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
          });
          let data = await res.json();
          if (data.status) {
            setUser(data?.userData);
          }
        } catch (err) {
          console.log(err);
        }
        try {
          let res = await fetch(`${api}/test`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
          });
          let data = await res.json();
          setExistUser(data?.status);
          if (data.status) {
            setExitUserDetails(data.res);
            setExitUserId(data?.exitId);
          }
        } catch (err) {
          console.log(err);
        }

        setInitialLoading(false); // Set initial loading to false after data fetch
      };

      if (id !== "undefined") {
        fetchUserData();
      } else {
        setInitialLoading(false); // If no id, stop loading
      }
    } else {
      setInitialLoading(false); // If no id, stop loading
    }
  }, [id]); // Run only once when the component mounts

  return (
    <UserContext.Provider
      value={{
        id,
        user,
        api,
        existUser,
        exitUserId,
        sidebarToggle,
        setSidebarToggle,
        setExistUser,
        setUser,
        setExitUserId,
        initialLoading,
        exitUserDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
