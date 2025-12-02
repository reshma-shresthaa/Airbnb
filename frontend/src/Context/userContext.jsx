import React, { createContext, useState } from 'react'
import { useContext } from 'react'
import { authDataContext } from './authContext'
import axios from 'axios'
import { useEffect } from 'react'

export const userDataContext = createContext()

function UserContext({ children }) {
    // ✅ ADD SAFE CHECK FOR AUTH CONTEXT
    const authContext = useContext(authDataContext)
    if (!authContext) {
        return (
            <userDataContext.Provider value={{ userData: null, setUserData: () => { } }}>
                {children}
            </userDataContext.Provider>
        )
    }


    let { serverUrl } = useContext(authDataContext)
    let [userData, setUserData] = useState(null)
    let [loading, setLoading] = useState(false)

    useEffect(() => {
        const savedUser = localStorage.getItem("userData")

        if (savedUser) {
            setUserData(JSON.parse(savedUser))
        }
        setLoading(false)
    }, [])

    const getCurrentUser = async () => {
        try {
            setLoading(true)
            if (!serverUrl) return
            // console.error("Server URL is not available")
            // setUserData(null)


            let result = await axios.get(serverUrl + "/api/user/currentuser", { withCredentials: true })

            setUserData(result.data)
            localStorage.setItem("userData", JSON.stringify(result.data))
        } catch (error) {

            console.log("API auth failed – using cached user")

            // ✅ Do NOT logout on refresh
            const savedUser = localStorage.getItem("userData")

            if (savedUser) {
                setUserData(JSON.parse(savedUser))
            }

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (serverUrl) {
            getCurrentUser()
        }
    }, [serverUrl])

    let value = {
        userData,
        setUserData,
        loading

    }

    return (
        <div>
            <userDataContext.Provider value={value}>
                {children}
            </userDataContext.Provider>
        </div>
    )
}

export default UserContext
