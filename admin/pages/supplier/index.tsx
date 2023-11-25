import Link from 'next/link'
import React from 'react'
import { InputComp, ModalWrapper, TableComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'
import { OptionModel, SupplierModel } from 'src/Model/apiModel'
import { DeleteOptionById, FetchAllOption, UpdateOptionById } from 'src/services/api/option'
import { DeleteSupplierById, FetchAllSupplier, UpdateSupplierById } from 'src/services/api/supplier'
import { ICON, IconSolid } from 'src/utils'
import { routingLink } from 'src/utils/routingLink'


function Supplier() {
    const [properties, setProperties] = React.useState<SupplierModel[]>([])
    const [openModal, setOpenModal] = React.useState(false)
    const [value, setValue] = React.useState<SupplierModel>({
    })


    const handleInput = function (key: string, value1: any) {
        setValue({
            ...value,
            [key]: value1
        })
    }
    const handleUpdate = async function () {
        try {
            await UpdateSupplierById(value)
            await FetchApi();
            setOpenModal(false)
        } catch (error) {

        }
    }

    const HandleDelete = async function (id: number) {
        try {
            await DeleteSupplierById(id)
            await FetchApi();
        } catch (error) {

        }
    }
    async function FetchApi() {
        try {
            let result = await FetchAllSupplier();
            setProperties(result?.data as SupplierModel[])
        } catch (error) {

        }
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
                        <Link className='mx-3' href={`${routingLink.taonhacungcap}`}>
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

                            <InputComp disable valueInput={value?.supplier_id} leftText='Supplier ID' widthFull />
                            <InputComp handleOnchange={(e) => {
                                handleInput("supplier_name", e.target.value)
                            }} valueInput={value?.supplier_name} leftText='Supplier Name' widthFull />
                            <InputComp handleOnchange={(e) => {
                                handleInput("supplier_address", e.target.value)
                            }} valueInput={value?.supplier_address} leftText='Supplier Address' widthFull />
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
                {properties && <TableComp h1='Supplier' handleDelete={() => { }} handleEdit={() => { }} headerRow={[
                    "ID",
                    "Supplier Name",
                    "Supplier Address"
                ]} totalData={properties.length} displayEachPage={4} >

                    <tbody>

                        {
                            properties.map((item: SupplierModel, index: number) => {
                                return <>
                                    <tr key={index} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.supplier_id}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.supplier_name}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.supplier_address}
                                        </td>

                                        <td className="whitespace-nowrap px-6 py-4">

                                            <ICON onClick={() => {
                                                setOpenModal(true)
                                                setValue(item)
                                            }} className='p-3 bg-yellow-300 mx-2 rounded-full' icon={IconSolid.faPenToSquare} />
                                            <ICON onClick={() => {
                                                let result = confirm("Do you want to delete it ?")
                                                if (result) {
                                                    HandleDelete(item.supplier_id as number)
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

export default Supplier