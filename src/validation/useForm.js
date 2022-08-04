import React, { useEffect, useState } from 'react'

function useForm(callback, validate) {

    const [errors, setErrors] = useState({});
    const [data, setData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    }, [errors]);

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        setErrors(validate(data))
        setIsSubmitting(true);

    }

    const handleChange = (event) => {
        event.persist();
        setData(data => ({ ...data, [event.target.name]: event.target.value }));
      };

    return {
        handleChange,
        handleSubmit,
        data,
        errors,
    }
}

export default useForm