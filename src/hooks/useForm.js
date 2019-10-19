import { useState } from 'react'

export default function useForm(initialState={}, handleSubmitCb=x=>x) {
    const [formValues, setFormValues] = useState(initialState)

    const handleChange = event => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value })
    }

    const handleSubmit = event => {
        event.prventDefault()
        handleSubmitCb(formValues)
    }

    return [formValues, setFormValues, handleChange]
}