import React from 'react'
import { useNavigate } from 'react-router-dom';
import { createContext, useState } from 'react';

export const context = createContext();

export function ContextProvider({ children }) {

    const [quesIndex, setquesIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [personName, setPersonName] = useState([]);
    const [gender, setGender] = React.useState("Male");
    const [department, setDepartment] = React.useState("");
    const navigate = useNavigate();

    const data = {
        score,
        setScore,
        quesIndex,
        setquesIndex,
        personName,
        setPersonName,
        gender,
        setGender,
        department,
        setDepartment,
        navigate,
    }

  return (
    <context.Provider value={data}>
        { children }
    </context.Provider>
  )

}
