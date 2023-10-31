import React, { useMemo } from 'react'
import { InputComp, ModalWrapper, SelectInputComp, TableComp } from 'src/Components'
import { Pagination } from 'src/Components/Pagination'
import { MainLayout } from 'src/Layouts'
import { CustomerResponeModel } from 'src/Model/apiModel'
import { DeleteCustomerById, FetchAllCustomer, FetchAllCustomers, UpdateCustomerById } from 'src/services/api/customer'
import { ICON, IconSolid } from 'src/utils'

const CUSTOM_PER_PAGE = 2;

function GetAllUser() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [getTotalCount, setGetTotalCount] = React.useState(0);
    const [indexPage, setIndexPage] = React.useState(1);

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

    const statusStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '5px',
        margin: '5px',
        cursor: 'pointer',
    }
    const dotStyle = {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        marginRight: '10px',
    };
    
    const activeDotStyle = {
        ...dotStyle,
        backgroundColor: 'rgb(21 128 61)',
    };

    const inactiveDotStyle = {
        ...dotStyle,
        backgroundColor: 'rgb(185 28 28)',
    };

    const onPageChange = (page: number) => {
        setCurrentPage(page)
    }

    const HandleToggle = (status: boolean) => {

    };

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
            
            let result = await FetchAllCustomer(currentPage, CUSTOM_PER_PAGE)
            let result2 = await FetchAllCustomer();
            setGetTotalCount(result2?.data.length)

            // setFirstPageIndex((currentPage - 1) * CUSTOM_PER_PAGE);
            // setLastPageIndex(firstPageIndex + CUSTOM_PER_PAGE);

            const firstPageIndex = (currentPage - 1) * CUSTOM_PER_PAGE
            const lastPageIndex = firstPageIndex + CUSTOM_PER_PAGE

            setProperties(result?.data as CustomerResponeModel[])
            
        } catch (error) {

        }
    }
    React.useEffect(() => {
        FetchApi()
    }, [currentPage])

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
                {properties && <TableComp h1="Customer" handleDelete={() => { } } handleEdit={() => { } } headerRow={[
                    "ID",
                    "First Name",
                    "Last Name",
                    "Customer Phone",
                    "Customer Email",
                    "Enable Status",
                ]} totalData={properties.length} displayEachPage={4} 
                
                children1={
                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                        {
                            properties.map((item: CustomerResponeModel, index: number) => {
                                return <>
                                    <tr key={index} className="text-gray-700 dark:text-gray-400">
                                        <td className="px-4 py-3">
                                            {item.customerId}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {item.customerFirstName}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {item.customerLastName}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {item.customerPhone}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {item.customerEmail}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <div onClick={() => HandleToggle(item.enableStatus)}>
                                                <div style={statusStyle}>
                                                    <div style={item.enableStatus ? activeDotStyle : inactiveDotStyle}></div>
                                                    {item.enableStatus ? 'Active' : 'Inactive'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
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
                }

                children2={
                    <Pagination
                        currentPage={currentPage}
                        totalCount={getTotalCount}
                        pageCount={CUSTOM_PER_PAGE}
                        onPageChange={onPageChange}
                    />
                }
                >
                </TableComp>}
            </MainLayout>
        </>
    )
}

export default GetAllUser