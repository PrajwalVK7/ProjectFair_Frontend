import React, { createContext,useState } from "react"
export const addProjectResponseContext = createContext()
function ContextShare({children}) {
    // children is apre defined props used to share data between all components.
    // create a state that need to shared
    const [addProjectResponse, setAddProjectResponse] = useState({})
    return (
        <addProjectResponseContext.Provider value={{ addProjectResponse, setAddProjectResponse }}>
            {children}
        </addProjectResponseContext.Provider>
    )
}

export default ContextShare