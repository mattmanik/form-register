import React, { useEffect, useState } from 'react'
import validate from './validation'


function useForm(callback) {

    const [errors, setErrors] = useState({});
    const [data, setData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        isSubmitting
    }
}

export default useForm