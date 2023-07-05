import React from 'react'
import { MainLayout } from 'src/Layouts'

function CartProduct() {
    const [quantity, setquantity] = React.useState(() => {
        return Array.from(Array(10).keys())
    })
    return (
        <>
            <MainLayout>
                {
                    quantity.length > 0 ? <>
                        <div className='flex min-h-[50vh] '>

                            <div className="basis-4/6 h-full  px-2">
                                <div className='w-full h-full '>
                                    <div className='flex items-center '>
                                        <p className='uppercase font-medium text-black mr-2'>
                                            Giỏ hàng
                                        </p>
                                        <p className='capitalize'>
                                            ( {quantity.length + 1} ) sản phẩm
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="basis-2/6 h-full  px-2">
                                <div className='w-full h-full '>
                                    <div className='flex items-center justify-between'>
                                        <p className='font-medium'>
                                            Tổng đơn hàng ( Tạm tính)
                                        </p>

                                        <p className='font-medium'>
                                            224.300 d
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