import React from 'react'
import { MainLayout } from 'src/Layouts'
import { Product, ProductModel } from 'src/Model'
import { ProductMock } from 'src/utils/constant'
import { ICON, IconSolid } from 'src/utils/icon'


interface CardCartInf {
    imageProduct?: string,
    nameProduct?: string,
    pricePerProduct?: string,
    quantity?: number
}


function CardCart({ imageProduct, nameProduct, pricePerProduct, quantity }: CardCartInf) {
    const [quantityCart, setQuantityCard] = React.useState<number>(0)
    return <>
        <tr>
            <td className="p-2 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="w=full h-full flex-shrink-0 mr-2 sm:mr-3">
                        <img
                            className="h-full w-full object-contain"
                            src="https://bizweb.dktcdn.net/thumb/compact/100/438/408/products/ao-polo-nam-apm6079-vag-1-yodyvn.jpg"
                            width={40}
                            height={40}
                            alt="Alex Shatov"
                        />
                    </div>
                    <div className="font-medium text-gray-800  h-full">
                        <h3 className='mb-10 whitespace-normal'>
                            Áo Polo Nam Mắt Chim Bo Hiệu Ứng Dệt Nổi
                        </h3>
                        <h3>
                            Vàng/XL
                        </h3>
                    </div>
                </div>
            </td>
            <td className="p-2 whitespace-nowrap">
                {/* <div className="text-left">alexshatov@gmail.com</div> */}
            </td>
            <td className="p-2 whitespace-nowrap">
                {/* <div className="text-left">alexshatov@gmail.com</div> */}
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left font-medium text-green-500">
                    $2,890.66
                </div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-lg text-center">
                    <div className='flex items-center justify-between bg-white border-[1px] border-gray-400 rounded-lg overflow-hidden'>
                        <ICON onClick={() => {
                            setQuantityCard(prev => prev + 1)
                        }} className='bg-white p-2 border-[1px] border-gray-400' icon={IconSolid.faPlus} />
                        <h3 className='bg-white p-1 px-2 '>
                            {/* {quantity} */}
                            {quantityCart}
                        </h3>
                        <ICON onClick={() => {
                            setQuantityCard(prev => prev - 1)

                        }} className='bg-white p-2 border-[1px] border-gray-400' icon={IconSolid.faMinus} />
                    </div>
                </div>
            </td>

        </tr>
    </>
}



function CartProduct() {
    const [productCart, setProductCart] = React.useState<ProductModel[]>([
        ProductMock, ProductMock, ProductMock, ProductMock
    ])

    return (
        <>
            <MainLayout>
                {
                    productCart.length > 0 ? <>
                        <div className='flex flex-col lg:flex-row min-h-[50vh] mt-20'>

                            <div className="basis-4/6 h-full  px-2 ">
                                <div className='w-full h-full bg-white px-3 py-4'>

                                    <div className='flex items-center '>
                                        <p className='uppercase font-medium text-black mr-2'>
                                            Giỏ hàng
                                        </p>
                                        <p className='capitalize'>
                                            ( {productCart.length + 1} ) sản phẩm
                                        </p>
                                    </div>
                                    {/* <CardCart /> */}
                                    <header className="px-5 py-4 border-b border-gray-100">
                                        <h2 className="font-semibold text-gray-800">Customers</h2>
                                    </header>
                                    <div className="p-3">
                                        <div className="overflow-x-auto">
                                            <table className="table-auto w-full">
                                                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                                    <tr>
                                                        <th className="p-2 whitespace-nowrap">
                                                            <div className=" text-left font-medium text-black">
                                                                Sản phẩm
                                                            </div>
                                                        </th>
                                                        <th className="p-2 whitespace-nowrap">
                                                            <div className="font-semibold text-left text-transparent">
                                                                Sản phẩm
                                                            </div>
                                                        </th>
                                                        <th className="p-2 whitespace-nowrap">
                                                            <div className="font-semibold text-left text-transparent">
                                                                Sản phẩm
                                                            </div>
                                                        </th>
                                                        <th className="p-2 whitespace-nowrap">
                                                            <div className=" text-left font-medium text-black">
                                                                Đơn giá
                                                            </div>
                                                        </th>
                                                        <th className="p-2 whitespace-nowrap">
                                                            <div className="text-left font-medium text-black">
                                                                Số lượng
                                                            </div>
                                                        </th>
                                                        <th className="p-2 whitespace-nowrap">
                                                            <div className=" text-center font-medium text-black">
                                                                Tổng tiền
                                                            </div>
                                                        </th>
                                                    </tr>
                                                </thead>


                                                <tbody className="text-sm divide-y divide-gray-100">
                                                    {
                                                        productCart.map((item: ProductModel, index: number) => {
                                                            return <>
                                                                <CardCart />
                                                            </>
                                                        })
                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    {/* <div className='flex items-center justify-between my-3'>
                                        <div className='basis-2/3'>
                                            <p className='font-medium text-black'>
                                                Sản phẩm
                                            </p>
                                        </div>

                                        <div className='basis-1/3'>
                                            <div className='flex items-center justify-between'>
                                                <p className='font-medium text-black'>Đơn giá</p>
                                                <p className='font-medium text-black'>Số lượng</p>
                                                <p className='font-medium text-black'>Tổng tiền</p>
                                            </div>

                                        </div>

                                    </div> */}


                                </div>
                            </div>
                            <div className="basis-2/6 h-full  px-2 ">
                                <div className='w-full h-full bg-white px-3 py-4'>


                                    <div className='flex items-center justify-between'>
                                        <p className='font-medium'>
                                            Tổng đơn hàng ( Tạm tính)
                                        </p>

                                        <p className='font-medium'>
                                            224.300 d
                                        </p>

                                    </div>

                                    <div className='bg-yellow-500 rounded-md my-8'>
                                        <p className='text-center py-3 text-white font-medium'>
                                            Đặt hàng ( {productCart.length + 1} )
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </> : <>
                        <div className='flex items-center justify-center my-10'>
                            <div className='w-[30%]  flex flex-col items-center'>
                                <img
                                    src="https://bizweb.dktcdn.net/100/438/408/themes/913235/assets/blank_cart.svg?1688530181797"
                                    alt="" />
                                <p>
                                    Giỏ hàng của bạn bị trống
                                </p>
                                <div className='border-[2px] w-full my-3'>
                                    <p className='text-center font-medium py-3'>
                                        Mua ngay
                                    </p>
                                </div>

                            </div>
                        </div>
                    </>
                }

            </MainLayout>
        </>
    )
}

export default CartProduct