import Link from 'next/link'
import React from 'react'
import { InputComp, ModalWrapper, TableComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'
import { OptionValueResponeModel } from 'src/Model/apiModel'
import { FetchAllOptionValue } from 'src/services/api/optonValue'
import { ICON, IconSolid } from 'src/utils'
import { routingLink } from 'src/utils/routingLink'

function OptionValueIndexPage() {
    const [openModal, setOpenModal] = React.useState(false)
    const [properties, setProperties] = React.useState<OptionValueResponeModel[]>([])
    const [value, setValue] = React.useState<OptionValueResponeModel>({})

    async function FetchApi() {
        try {
            let listOptionValue = await FetchAllOptionValue()
            setProperties(listOptionValue?.data as OptionValueResponeModel[])
        } catch (error) {

        }
    }
    const handleUpdate = async function () {
        try {
            // await UpdateOptionById(value)
            await FetchApi();
            setOpenModal(false)
        } catch (error) {

        }
    }
    const handleInput = function (key: string, value1: any) {
        setValue({
            ...value,
            [key]: value1
        })
    }
    React.useEffect(() => {
        FetchApi()
    }, [])



    return (
        <>
            <MainLayout>
                <div className='flex justify-between px-5'>
                    <div>

                    </div>
                    <div className='flex items-center'>
                        <Link className='mx-3' href={`${routingLink.createNewOptionValue}`}>
                            <div className='bg-blue-300 px-3 py-2 rounded-md hover:cursor-pointer '>
                                <h3 className='text-white font-medium'>Create New</h3>
                            </div>
                        </Link>

                    </div>

                </div>
                {
                    openModal && <>
                        <ModalWrapper openModalState={openModal} handleOpenModalState={setOpenModal} >
                            <h3 className='text-center font-medium py-2'>
                                Chỉnh sửa thuộc tính
                            </h3>

                            <InputComp disable valueInput={value?.id?.optionId} leftText='Option ID' widthFull />
                            <InputComp disable valueInput={value?.id?.productId} leftText='Option ID' widthFull />
                            <InputComp disable valueInput={value?.id?.valueId} leftText='Option ID' widthFull />
                            <InputComp handleOnchange={(e) => {
                                handleInput("valuesName", e.target.value)
                            }} valueInput={value?.valuesName} leftText='Value Name' widthFull />
                            <div className='flex items-center justify-end px-5'>
                                <div onClick={handleUpdate} className='mx-2 h-12 bg-blue-500 text-white text-center flex items-center justify-center rounded-lg '>
                                    <p className='  text-white text-center  px-4'>
                                        Save
                                    </p>
                                </div>

                                <div onClick={() => {
                                    setOpenModal(false)
                                }} className='mx-2 h-12 bg-red-500 text-white text-center flex items-center justify-center rounded-lg '>
                                    <p className='  text-white text-center  px-4'>
                                        Cancel
                                    </p>
                                </div>
                            </div>
                        </ModalWrapper>
                    </>
                }
                <TableComp handleDelete={() => { }} handleEdit={() => { }} headerRow={[
                    "Option ID",
                    "Product ID",
                    "Value ID",
                    "OptionName"
                ]} totalData={properties.length} displayEachPage={4} >

                    <tbody>

                        {
                            properties.map((item: OptionValueResponeModel, index: number) => {
                                return <>
                                    <tr key={index} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.id?.optionId}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.id?.productId}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.id?.valueId}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.valuesName}
                                        </td>

                                        <td className="whitespace-nowrap px-6 py-4">

                                            <ICON onClick={() => {
                                                setOpenModal(true)
                                                setValue(item)
                                            }} className='p-3 bg-yellow-300 mx-2 rounded-full' icon={IconSolid.faPenToSquare} />
                                            <ICON onClick={() => {
                                                let result = confirm("Do you want to delete it ?")
                                                if (result) {
                                                    // HandleDelete(item.optionID as number)
                                                }
                                            }} className='p-3 bg-red-300 rounded-full' icon={IconSolid.faTrash} />
                                        </td>
                                    </tr>
                                </>
                            })
                        }


                    </tbody>
                </TableComp>
            </MainLayout>
        </>
    )
}

export default OptionValueIndexPage