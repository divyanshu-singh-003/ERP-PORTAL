import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from "../context/AuthContext";

export const useGetAllStudents = () => {
  const { authUser } = useAuthContext();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        if (!authUser) {
          throw new Error('User not authenticated');
        }
        const response = await axios.get(`/api/auth/allstudents/${authUser._id}`);
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchStudents();

  }, [authUser]);

  return { students, loading, error };
};
