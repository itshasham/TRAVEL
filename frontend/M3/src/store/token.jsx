import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);

  // Function to authenticate the user and fetch user data
  const userAuthentication = async () => {
    if (!token) return;

    try {
      const response = await fetch("http://localhost:8080/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched user data: ", data.msg);
        setUser(data.msg);

      } else {
        console.error("Error fetching user data");
        handleLogout();  // Clear data on failed authentication
      }
    } catch (error) {
      console.error("Authentication error:", error);
      handleLogout();  // Clear data on error
    }
  };

  // Effect to trigger user authentication when token changes
  useEffect(() => {
    userAuthentication();
  }, [token]);

  // Effect to log user state when it updates
  useEffect(() => {
    if (user) {
      console.log("User state updated: ", user);  // Now you can access user.admin, user.email, etc.
    }
  }, [user]);

  // Function to store token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  // Logout function to clear token and user data
  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  // Function to fetch services
  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/Provider/Service", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setServices(data);
      } else {
        console.error("Error fetching services");
        setServices([]);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      setServices([]);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, storeTokenInLS, handleLogout, user, getServices, services }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use authentication context
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};
