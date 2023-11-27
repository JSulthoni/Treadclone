const { useSession } = require("next-auth/react");

// This function returns true if user has session/ logged in
const loggedIn = () => {
    const { status } = useSession()
    if (status === 'authenticated') {
        return true || false
    }
}

export default loggedIn;