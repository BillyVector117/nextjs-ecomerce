import { useState } from 'react';
import { helpHttp } from '../helpers/helpHttp';

export const useForm = (initialForm, validateForm) => {
    const [form, setForm] = useState(initialForm)
    const [errors, setErrors] = useState({}); // If empty input has no errors
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null) // refers to form-response (after send data)

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    };
    // When form lose focus
    const handleBlur = (event) => {
        handleChange(event)
        // validate if exist errors, if true, mount it at errors state
        setErrors(validateForm(form))
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // Check for errors
        setErrors(validateForm(form))
        // If 'errors' Object has at least one property, do not submit data.
        if (Object.keys(errors).length === 0) {
            // Load Loader signal
            setLoading(true)
            helpHttp().post("https://formsubmit.co/ajax/billyvecuss@hotmail.com", {
                body: form, // Sending form-values
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
            })
                .then((res) => {
                    setLoading(false); // Remove loading animation
                    setResponse(true);
                    // Clean data
                    setForm(initialForm);
                    setTimeout(() => {
                        setResponse(false) // To remove success message
                    }, 3000);
                })
        } else {
            return;
        }
    };
    return {
        // ES6 (form:form...)
        form, errors, loading, response, handleBlur, handleChange, handleSubmit
    }
}