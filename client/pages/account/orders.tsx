import React from 'react'
import { AccountLayouts, MainLayout } from 'src/Layouts'

function OrdersPage() {
    return (
        <>
            <MainLayout>
                <AccountLayouts>
                    <div className='flex items-center justify-between border-b-2  py-3'>
                        <h3 className='text-yellow-300 font-medium'>đơn hàng của tôi </h3>
                        <h3 className='text-yellow-300 font-medium'>0 đơn hàng   </h3>
                    </div>

                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full">
                                        <thead className="bg-white border-b">
                                            <tr>


                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    Mã đơn hàng
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    Ngày mua
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    Đia chỉ
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    Giá trị đơn hàng
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    Trạng thái thanh toán
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    Trạng thái vận chuyển
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-gray-100 border-b">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    1
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    Mark
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    Otto
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    @mdo
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    @mdo
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    @mdo
                                                </td>
                                            </tr>
                                           
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>


                </AccountLayouts>
            </MainLayout>
        </>
    )
}

export default OrdersPage