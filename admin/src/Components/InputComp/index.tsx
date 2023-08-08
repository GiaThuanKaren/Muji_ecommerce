import React from 'react'

interface PropsInputComp {
    type?: React.HTMLInputTypeAttribute
    leftText: string
    valueInput?: string | number | readonly string[] | undefined
    placehorder?: string
    handleOnchange?: React.ChangeEventHandler<HTMLInputElement>
    widthFull?: boolean
    disable?: boolean
}

function InputComp({ disable, widthFull, handleOnchange, type, leftText, valueInput, placehorder }: PropsInputComp) {
    return (
        <>
            <div className='flex items-center   px-2 py-3 mb-3 flex-wrap'>
                <h3 className='font-medium mr-5 mb-4'>
                    {leftText}
                </h3>
                <input
                    disabled={disable}
                    onChange={handleOnchange}
                    placeholder={placehorder}
                    value={valueInput}
                    className={'outline-gray-400 border-[3px] rounded-sm py-1' + `${widthFull ? " w-full" : " w-1/3 "}`}
                    type={type || "text"}
                />
            </div>
        </>
    )
}

export default InputComp