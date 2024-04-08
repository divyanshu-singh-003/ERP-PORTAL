import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const useGetSingleStudent = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuthContext(); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/auth/getsinglestudent/${authUser._id}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };

    if (authUser) {
      fetchUser();
    }
  }, [authUser]);

  return { user, loading };
};

export default useGetSingleStudent;
