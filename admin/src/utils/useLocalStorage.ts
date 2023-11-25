import React from 'react'

const useLocalStorage = <T>(key: string, initialValue: T) => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(key) : null
    const initial = stored ? JSON.parse(stored) : initialValue
    const [value, setValue] = React.useState<T>(initial)

    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value]);

    return [value, setValue] as const
}

export default useLocalStorage