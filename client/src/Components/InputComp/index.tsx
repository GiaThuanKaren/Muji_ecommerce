import React from 'react'

interface PropsInputComp {
    onChangeCallBack: React.ChangeEventHandler<HTMLInputElement>
    placeholder?: string,
    defaultValue?: string | number
    value?: string | number
    leftText?: string | number
    type?: React.HTMLInputTypeAttribute
}
function InputComp({ type, onChangeCallBack, defaultValue, leftText, placeholder, value }: PropsInputComp) {
    return (
        <>
            <div className='w-full items-center  px-2 py-1 my-3'>
                <h3 className='font-medium my-3'>
                    {leftText}
                </h3>
                <input className='border-[1px] rounded-md outline-none w-full py-3 px-2' value={value} placeholder={placeholder}  type={type ? type : "text"} onChange={onChangeCallBack} />
            </div>
        </>
    )
}

export default InputComp