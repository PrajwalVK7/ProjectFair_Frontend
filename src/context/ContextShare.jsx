import React, { createContext, useState } from "react"

export const addProjectResponseContext = createContext()
export const editProjectResponseContext = createContext();
export const isAuthTokenContext = createContext()

function ContextShare({ children }) {
    // children is apre defined props used to share data between all components.
    // create a state that need to shared
    const [addProjectResponse, setAddProjectResponse] = useState({})

    const [editProjectResponse, seteditProjectResponse] = useState({})
    const [isAuthToken, setIsAuthToken] = useState(false)
    return (
        <addProjectResponseContext.Provider value={{ addProjectResponse, setAddProjectResponse }}>
            <editProjectResponseContext.Provider value={{ editProjectResponse, seteditProjectResponse }}>

                <isAuthTokenContext.Provider value={{ isAuthToken, setIsAuthToken }}>
                    {children}
                </isAuthTokenContext.Provider>
            </editProjectResponseContext.Provider>
        </addProjectResponseContext.Provider>
    )
}

export default ContextShare