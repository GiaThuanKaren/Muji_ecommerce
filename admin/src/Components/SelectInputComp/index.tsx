import React from 'react'


interface PropsInputComp {
    type?: React.HTMLInputTypeAttribute
    leftText: string
    valueInput: any[]
    handleOnchange?: React.ChangeEventHandler<HTMLInputElement>
    widthFull?: boolean
    disable?: boolean
    

}


function SelectInputComp({ leftText, valueInput, disable, handleOnchange, type, widthFull }: PropsInputComp) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState()
    return (
        <>
            <h3 className='font-medium mr-5 mb-4'>
                {leftText}
            </h3>
            <select name="" id="">

            </select>
        </>
    )
}

export default SelectInputComp