import React from 'react'
import { InputComp, ModalWrapper, SelectInputComp, TableComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'
import { CustomerResponeModel } from 'src/Model/apiModel'
import { DeleteCustomerById, FetchAllCustomer, UpdateCustomerById } from 'src/services/api/customer'
import { ICON, IconSolid } from 'src/utils'

function GetAllUser() {
    const [properties, setProperties] = React.useState<CustomerResponeModel[]>([])
    const [openModal, setOpenModal] = React.useState(false)
    const [value, setValue] = React.useState<CustomerResponeModel>({
        customerEmail: "",
        customerFirstName: "",
        customerId: -1,
        customerLastName: "",
        customerPhone: "",
        enableStatus: false
    })
    const handleInput = function (key: string, value1: any) {
        setValue({
            ...value,
            [key]: value1
        })
    }

    const HandleDelete = async function (id: number) {
        try {
            await DeleteCustomerById(id)
            await FetchApi()
        } catch (error) {

        }
    }
    const handleUpdate = async function () {
        try {
            await UpdateCustomerById(value)
            await FetchApi();
            setOpenModal(false)
        } catch (error) {

        }
    }
    async function FetchApi() {
        try {

            let result = await FetchAllCustomer()
            setProperties(result?.data as CustomerResponeModel[])

        } catch (error) {

        }
    }
    React.useEffect(() => {
        FetchApi()
    }, [])

    return (
        <>
            <MainLayout>
                {
                    openModal && <>
                        <ModalWrapper openModalState={openModal} handleOpenModalState={setOpenModal} >
                            <h3 className='text-center font-medium py-2'>
                                Chỉnh sửa thuộc tính
                            </h3>

                            <InputComp disable valueInput={value?.customerId} leftText='Option ID' widthFull />
                            <InputComp handleOnchange={(e) => {
                                handleInput("customerFirstName", e.target.value)
                            }} valueInput={value?.customerFirstName} leftText='Customer First Name' widthFull />

                            <InputComp handleOnchange={(e) => {
                                handleInput("customerLastName", e.target.value)
                            }} valueInput={value?.customerLastName} leftText='Customer Last Name' widthFull />

                            <InputComp handleOnchange={(e) => {
                                handleInput("customerPhone", e.target.value)
                            }} valueInput={value?.customerPhone} leftText='Customer Phone' widthFull />

                            <InputComp handleOnchange={(e) => {
                                handleInput("customerEmail", e.target.value)
                            }} valueInput={value?.customerEmail} leftText='Customer Email' widthFull />

                            <SelectInputComp defaultValue={value.enableStatus ? 1 : 0} handleOnchange={(e) => {
                                console.log(e.target.value, e.target.value == "1")
                                handleInput("enableStatus", e.target.value == "1")
                            }} leftText='Status Account' >
                                <option value={1}>Active</option>
                                <option value={0}>Disable</option>
                            </SelectInputComp>


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
                    "ID",
                    "First Name",
                    "Last Name",
                    "Customer Phone",
                    "Customer Email",
                    "Enable Status",
                ]} totalData={properties.length} displayEachPage={4} >

                    <tbody>

                        {
                            properties.map((item: CustomerResponeModel, index: number) => {
                                return <>
                                    <tr key={index} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.customerId}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.customerFirstName}
                                        </td>

                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.customerLastName}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.customerPhone}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.customerEmail}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.enableStatus ? "Active" : "Disable"}
                                        </td>

                                        <td className="whitespace-nowrap px-6 py-4">

                                            <ICON onClick={() => {
                                                setOpenModal(true)
                                                setValue(item)
                                            }} className='p-3 bg-yellow-300 mx-2 rounded-full' icon={IconSolid.faPenToSquare} />
                                            <ICON onClick={() => {
                                                let result = confirm("Do you want to delete it ?")
                                                if (result) {
                                                    HandleDelete(item.customerId)
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

export default GetAllUser