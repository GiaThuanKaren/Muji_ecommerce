import Link from 'next/link'
import React from 'react'
import { InputComp, ModalWrapper, SelectInputComp, TableComp } from 'src/Components'
import ExportToExcel from 'src/Components/ExportToExcel'
import { Pagination } from 'src/Components/Pagination'
import { MainLayout } from 'src/Layouts'
import { CategoriesResponeModel, OptionModelRespone, OrderDetailResponeModel, OrderResponeModel, ProductModel, ProductResponeModel } from 'src/Model/apiModel'
import { FetchAllCategories } from 'src/services/api/categories'
import { FetchAllOption } from 'src/services/api/option'
import { DeleteOrderById, FetchAllOrder, FetchAllOrderDetail } from 'src/services/api/order'
import { DeleteProductById, FetchAllProduct, UpdateProductId } from 'src/services/api/product'
import { ICON, IconSolid } from 'src/utils'
import { routingLink } from 'src/utils/routingLink'

const ORDER_PER_PAGE = 5;

function Shipping() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [getTotalCount, setGetTotalCount] = React.useState(0);

    const [properties, setProperties] = React.useState<OrderResponeModel[]>([])
    const [orderDetailList, setOrderDetailList] = React.useState<OrderDetailResponeModel[]>([])
    const [openModal, setOpenModal] = React.useState(false)
    const [value, setValue] = React.useState<OrderResponeModel>({
        list_option: []
    })

    const GetDataOrder = () => {
        return JSON.parse(JSON.stringify(orderDetailList)) as OrderDetailResponeModel[]
    }

    const handleInput = function (key: string, value1: any) {
        setValue({
            ...value,
            [key]: value1,

        })
    }

    const onPageChange = (page: number) => {
        setCurrentPage(page)
    }

    const HandleDelete = async function (id: number) {
        try {
            await DeleteOrderById(id);
            await FetchApi();
        } catch (error) {

        }
    }

    const HanleExportCSV = async (data: OrderDetailResponeModel[]) => {
        try {
            const response = await fetch('/api/exportExcel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    data: data,
                  }),
            })
        } catch (error) {
            console.error('Error exporting data', error);
        }
    }


    async function FetchApi() {
        try {
            let result = await FetchAllOrder(currentPage, ORDER_PER_PAGE);
            let result2 = await FetchAllOrderDetail(value.orderId);

            setProperties(result?.data as OrderResponeModel[])
            setOrderDetailList(result2?.data as OrderDetailResponeModel[])
            setGetTotalCount(result?.total)

        } catch (error) {

        }
    }

    async function FetchApi2() {
        try {
            let result = await FetchAllOrderDetail(value.orderId);
            setOrderDetailList(result?.data as OrderDetailResponeModel[])

        } catch (error) {

        }
    }


    React.useEffect(() => {
        FetchApi()
    }, [currentPage])

    React.useEffect(() => {
        FetchApi2()
    }, [value])

    React.useEffect(() => {
        HanleExportCSV(orderDetailList)
    }, [openModal])

    console.log(value)
    return (
        <>
            <MainLayout >
                <div className='flex justify-between px-5'>
                    <div>

                    </div>
                    {/* <Link href={`${routingLink.addsanpham}`}>
                        <div className='bg-blue-300 px-3 py-2 rounded-md hover:cursor-pointer '>
                            <h3 className='text-white font-medium'>Create New</h3>
                        </div>
                    </Link> */}
                </div>
                {
                    openModal && <>
                        <ModalWrapper openModalState={openModal} handleOpenModalState={setOpenModal} >
                            <ExportToExcel data={orderDetailList} />
                            {orderDetailList && <TableComp h1='Oder detail' handleDelete={() => { }} handleEdit={() => { 
                            }} headerRow={[
                                " #",
                                "Order ID",
                                "Product ID",
                                "Sku ID",
                                "Status",
                                "Handle",

                            ]} totalData={properties.length} displayEachPage={4} 
                            >
                                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                    {
                                        orderDetailList.map((item: OrderDetailResponeModel, index: number) => {
                                            return <>
                                                <tr key={index} className="text-gray-700 dark:text-gray-400">
                                                    <td className="px-4 py-3">
                                                        {item.order_id}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">
                                                        {item.product_id}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">
                                                        {item.sku_id}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">
                                                        {item.status_order_id}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {/* <ICON onClick={() => {

                                                            let result = confirm("Do you want to delete it ?")
                                                            if (result) {
                                                                HandleDelete(item.orderId as number)
                                                            }
                                                        }} className='p-3 bg-red-300 rounded-full' icon={IconSolid.faTrash} /> */}
                                                    </td>
                                                </tr>
                                            </>
                                        })
                                    }
                                </tbody>
                            </TableComp>}
                        </ModalWrapper>
                    </>
                }
                {properties && <TableComp h1="Order" handleDelete={() => { }} handleEdit={() => { 
                    
                }} headerRow={[
                    " #",
                    "Order Date",
                    "Required Date",
                    "Shipping Date",
                    "Handle",

                ]} totalData={properties.length} displayEachPage={4} 
                
                pageable={
                    <Pagination
                        currentPage={currentPage}
                        totalCount={getTotalCount}
                        pageCount={ORDER_PER_PAGE}
                        onPageChange={onPageChange}
                    />
                }
                >
                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                        {
                            properties.map((item: OrderResponeModel, index: number) => {
                                return <>
                                    <tr key={index} className="text-gray-700 dark:text-gray-400">
                                        <td className="px-4 py-3">
                                            {item.orderId}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {item.orderDate}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {item.requiredDate}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {item.shippedDate}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">

                                            <ICON onClick={() => {
                                                setValue({
                                                    ...item,
                                                    // list_option: []
                                                })
                                                setOpenModal(true)
                                                
                                            }} className='p-3 bg-yellow-300 mx-2 rounded-full' icon={IconSolid.faEye} />
                                            <ICON onClick={() => {

                                                let result = confirm("Do you want to delete it ?")
                                                if (result) {
                                                    HandleDelete(item.orderId as number)
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

export default Shipping
