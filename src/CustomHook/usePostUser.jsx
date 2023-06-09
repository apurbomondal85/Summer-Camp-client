import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const usePostUser = () => {
    const logUser = useContext(AuthContext)
    const { displayName, email } = logUser;
    const [user, setUser] = useState({});
    useEffect(() => {
        fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ name: displayName, email, role: "user" })
    })
        .then(res => res.json())
        .then(data => setUser(data))
    }, [user])
    return user
}
export default usePostUser