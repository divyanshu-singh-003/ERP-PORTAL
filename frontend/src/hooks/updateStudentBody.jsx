import { useState } from 'react';

const updateStudent = (formData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/updatestudent" , {
        method:"POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body :JSON.stringify(formData),

      });
      setIsUpdated(true);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit, isLoading, error, isUpdated };
};

export default updateStudent;
