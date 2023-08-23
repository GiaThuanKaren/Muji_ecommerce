import React from 'react'
import { ICON, IconSolid } from 'src/utils/icon';

interface Props {
    children: React.ReactNode
    title: string
}

function DropoutComp({ children, title }: Props) {
    const [close, setClose] = React.useState(true);
    return (
        <>
            <div
                onClick={() => {
                    setClose(!close)
                }}
                className='my-2 flex w-full py-1 items-center justify-between transition-all '>
                <p className='font-medium'>{title}</p>
                <div>
                    {close ? <ICON icon={IconSolid.faChevronDown} /> :
                        <ICON icon={IconSolid.faChevronUp} />}
                </div>

            </div>
            <div className={'transition-all w-full  ' + `${close ?
                "h-fit" : "h-0"}`}>
                {
                    close && children
                }
            </div>
        </>
    )
}

export default DropoutComp