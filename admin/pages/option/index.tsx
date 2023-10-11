import Link from 'next/link'
import React from 'react'
import { InputComp, ModalWrapper, TableComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'
import { OptionModel } from 'src/Model/apiModel'
import { DeleteOptionById, FetchAllOption, UpdateOptionById } from 'src/services/api/option'
import { ICON, IconSolid } from 'src/utils'
import { routingLink } from 'src/utils/routingLink'


function OptionIndexPage() {
    const [properties, setProperties] = React.useState<OptionModel[]>([])

    const [openModal, setOpenModal] = React.useState(false)
    const [openModalDelte, setOpenModalDelte] = React.useState(false)
    const [value, setValue] = React.useState<OptionModel>({
        optionName: "",
        optionID: undefined
    })


    const handleInput = function (key: string, value1: any) {
        setValue({
            ...value,
            [key]: value1
        })
    }
    const handleUpdate = async function () {
        try {
            await UpdateOptionById(value)
            await FetchApi();
            setOpenModal(false)
        } catch (error) {

        }
    }

    const HandleDelete = async function (id: number) {
        try {
            await DeleteOptionById(id)
            await FetchApi();
        } catch (error) {

        }
    }
    async function FetchApi() {
        try {
            let result = await FetchAllOption();
            setProperties(result?.data as OptionModel[])
        } catch (error) {

        }
    }
    React.useEffect(() => {

        FetchApi()
    }, [])

    // console.log(keys<OptionModel>())
    return (
        <>
            <MainLayout>
                <div className='flex justify-between px-5'>
                    <div>

                    </div>
                    <div className='flex items-center'>
                        <Link className='mx-3' href={`${routingLink.taothuoctinh}`}>
                            <div className='bg-blue-300 px-3 py-2 rounded-md hover:cursor-pointer '>
                                <h3 className='text-white font-medium'>Create New</h3>
                            </div>
                        </Link>
                        <Link href={`${routingLink.optionvalue}`}>
                            <div className='bg-blue-300 px-3 py-2 rounded-md hover:cursor-pointer '>
                                <h3 className='text-white font-medium'>Manage Option Value</h3>
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

                            <InputComp disable valueInput={value?.optionID} leftText='Option ID' widthFull />
                            <InputComp handleOnchange={(e) => {
                                handleInput("optionName", e.target.value)
                            }} valueInput={value?.optionName} leftText='Option Name' widthFull />
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
                {properties && <TableComp handleDelete={() => { }} handleEdit={() => { }} headerRow={[
                    "ID",
                    "OptionName"
                ]} totalData={properties.length} displayEachPage={4} >

                    <tbody>

                        {
                            properties.map((item: OptionModel, index: number) => {
                                return <>
                                    <tr key={index} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.optionID}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.optionName}
                                        </td>

                                        <td className="whitespace-nowrap px-6 py-4">

                                            <ICON onClick={() => {
                                                setOpenModal(true)
                                                setValue(item)
                                            }} className='p-3 bg-yellow-300 mx-2 rounded-full' icon={IconSolid.faPenToSquare} />
                                            <ICON onClick={() => {
                                                let result = confirm("Do you want to delete it ?")
                                                if (result) {
                                                    HandleDelete(item.optionID as number)
                                                }
                                            }} className='p-3 bg-red-300 rounded-full' icon={IconSolid.faTrash} />
                                        </td>
                                    </tr>
                                </>
                            })
                        }


                    </tbody>
                </TableComp>}
            </MainLayout>
        </>
    )
}

export default OptionIndexPage