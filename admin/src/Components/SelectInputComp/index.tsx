import React from 'react'
import { ICON, IconSolid } from 'src/utils'


interface PropsInputComp {
    type?: React.HTMLInputTypeAttribute
    leftText: string

    handleOnchange?: React.ChangeEventHandler<HTMLSelectElement>
    widthFull?: boolean
    disable?: boolean
    children: React.ReactNode
    initValue?: any[]
    handleUpdateListMulti?: (value: any) => any
    value?: string | number | readonly string[] | undefined
    primaryfield?: string
    secondField?: string
    listResultChoose?: boolean
    defaultValue?: string | number | readonly string[] | undefined
    arrData?: any[]
}


function SelectInputComp({ arrData, defaultValue, listResultChoose, handleUpdateListMulti, primaryfield, secondField, value, children, leftText, handleOnchange, type, widthFull }: PropsInputComp) {
    // const [valueSelected, SetvalueSelected] = React.useState<any[]>([])
    const handleListArr = function (item1: any) {
        console.log(item1)
        if (arrData?.includes(item1)) {
            handleUpdateListMulti && handleUpdateListMulti(
                arrData.filter((item: any) => {
                    return item != item1
                })
            )
        } else {
            handleUpdateListMulti && handleUpdateListMulti(
                arrData && [...arrData, item1] as any
            )
        }



        // handleUpdateListMulti && handleUpdateListMulti()
    }
    return (
        <>
            <div className=' items-center'>
                <h3 className='min-w-[100px] text-left font-medium mr-5 mb-4'>
                    {leftText}
                </h3>
                {
                    listResultChoose && arrData && arrData.length > 0 &&

                    <div className='flex flex-wrap  border-[2px] my-3 py-4 px-3'>
                        {
                            arrData?.map((item: any, index: number) => {
                                return <>
                                    <div className='flex w-fit px-3 py-1 items-center border-[2px] border-gray-400 rounded-md mr-5  '>
                                        <ICON
                                            onClick={() => {
                                                handleListArr(item)
                                            }}
                                            className='mr-2 hover:cursor-pointer' icon={IconSolid.faTimes} />
                                        <h3>
                                            {
                                                item
                                            }
                                        </h3>

                                    </div>
                                </>
                            })
                        }
                    </div>
                }
                <select
                    value={value}
                    defaultValue={defaultValue}
                    onChange={(e) => {

                        handleOnchange && handleOnchange(e)
                    }}
                    className={' mb-5 h-12 border-[3px] px-3' + `${widthFull ? " w-full" : " w-1/3"}`}
                    name=""
                    id=""
                >
                    {children}
                </select>
            </div>

        </>
    )
}

export default SelectInputComp