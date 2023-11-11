import React from 'react'


interface Auth {
    role: string
}

interface AuthContextProps {
    auth: Auth,
    setAuth: (userAuthInfo: string) => void,
    isAuthenticated: () => boolean
}

export const AuthContext = React.createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {

    const [auth, setAuth] = React.useState<Auth>({ role: '' });
    const setUserAuthInfo = (data: string) => {
        localStorage.setItem('role', data)

        setAuth({ role: data })
    }
    const isAuthenticated = () => !!auth.role.toString()

    React.useEffect(() => {
        const store = localStorage.getItem('role')
        if (store) {
            setAuth({ role: store})
        }
    }, [])

    return ( 
        <AuthContext.Provider 
            value={{ auth, setAuth: (userAuthInfo) => setUserAuthInfo(userAuthInfo), isAuthenticated }}>
            {children}
        </AuthContext.Provider>
     );
}

export default AuthProvider;
