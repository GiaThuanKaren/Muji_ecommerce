import React from 'react';

export function useDebounce<T>(value: T, delay?: number) {
    const [debounceValue, setDebounceValue] = React.useState<T>();

    React.useEffect(() => {
        const timer = setTimeout(() => setDebounceValue(value), delay || 500)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debounceValue
}