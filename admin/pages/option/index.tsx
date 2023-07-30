import React from 'react'
import { InputComp, ModalWrapper, TableComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'
import { OptionModel } from 'src/Model/apiModel'
import { FetchAllOption } from 'src/services/api/option'
import { ICON, IconSolid } from 'src/utils'


function OptionIndexPage() {
    const [properties, setProperties] = React.useState<OptionModel[]>([])

    const [openModal, setOpenModal] = React.useState(false)
    const [value, setValue] = React.useState<OptionModel>()
    React.useEffect(() => {
        async function FetchApi() {
            try {
                let result = await FetchAllOption();
                setProperties(result?.data as OptionModel[])
            } catch (error) {

            }
        }
        FetchApi()
    }, [])
    
    // console.log(keys<OptionModel>())
    return (
        <>
            <MainLayout>
                {
                    openModal && <>
                        <ModalWrapper openModalState={openModal} handleOpenModalState={setOpenModal} >
                            <h3 className='text-center font-medium py-2'>
                                Chỉnh sửa thuộc tính
                            </h3>

                            <InputComp valueInput={value?.optionID} leftText='Option ID' widthFull />
                            <InputComp valueInput={value?.optionName} leftText='Option Name' widthFull />
                            <div className='flex items-center justify-end px-5'>
                                <div className='mx-2 h-12 bg-blue-500 text-white text-center flex items-center justify-center rounded-lg '>
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
                                            <ICON className='p-3 bg-red-300 rounded-full' icon={IconSolid.faTrash} />
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

export default OptionIndexPage