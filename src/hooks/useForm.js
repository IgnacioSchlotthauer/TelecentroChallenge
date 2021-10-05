import React, { useState } from 'react'

export const useForm = (initialState = { }) => {
    
    const [values, setValues] = useState(initialState)

    const handleInputChange = ({target}) => {

        setValues({
            ...values,
            [target.name]: target.value
        });
        
    }

    return [values, handleInputChange ];

}
//Este hook se encarga de actualizar constantemente el dato de la value cuando se modifica