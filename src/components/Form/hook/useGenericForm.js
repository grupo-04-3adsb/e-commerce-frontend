import { useState, useEffect } from 'react';

const useGenericForm = (initialValues, onSubmit) => {
  const [formData, setFormData] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
  };
};

export default useGenericForm;
