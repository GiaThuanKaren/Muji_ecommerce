import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/store/app';

function useGlobal() {
    const globalState = useSelector((state: RootState) => state);
    const dispatch = useDispatch();
    return {
        globalState,
        dispatch
    }
}

export default useGlobal