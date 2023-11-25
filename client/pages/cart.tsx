import { useRouter } from 'next/router'
import React from 'react'
import { MainLayout } from 'src/Layouts'
import { NewOrderInf, Product, ProductModel } from 'src/Model'
import { FetchDataFromStorageByKey, UpdateProductToLocalStorage, addNewOrder } from 'src/service/api'
import { ProductCart, ProductCartItem, ProductMock } from 'src/utils/constant'
import { ICON, IconSolid } from 'src/utils/icon'
import { linkRouting } from 'src/utils/routelink'
import { useSelector, useDispatch } from "react-redux"
import { _pickProductToPay, _unPickProductToPay, _updateProductToLocalStorage } from 'src/store/app/slices/cartSlices'
import { RootState } from 'src/store/app'
import { useGlobal } from 'src/hook'
interface CardCartInf extends ProductCartItem {

    onChooseProduct?: (item: ProductCartItem) => any
}


function CardCart({ item, quantity, onChooseProduct }: CardCartInf) {
    // const globalState = useSelector((state: RootState) => state)

    // const dispatch = useDispatch();
    const { dispatch, globalState } = useGlobal()
    console.log("Global State ", globalState)
    const checkBoxInputRed = React.useRef<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>(null);
    const [quantityCart, setQuantityCard] = React.useState<number>(quantity as number)
    const [totalPrice, setTotalPrice] = React.useState(quantity * item.price)
    console.log(quantity * item.price)
    const {
        push
    } = useRouter()

    React.useEffect(() => {
        console.log(checkBoxInputRed.current?.checked)
    }, [])
    return <>
        <tr className='hover:cursor-pointer hover:bg-slate-50 mt-10 transition-all' onClick={() => {
            // push(`${linkRouting.detailproduct}/${item.productId}`)
        }} >
            <td>
                <input className='p-3 ml-4' onChange={(e) => {
                    if (e.target.checked) {
                        dispatch(_pickProductToPay({
                            item,
                            quantity
                        }))

                    } else {
                        dispatch(_unPickProductToPay({
                            item,
                            quantity
                        }))
                    }

                    console.log(e.target.checked)
                }} type='checkbox' ref={checkBoxInputRed} name="" id="" />
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="w=full h-full flex-shrink-0 mr-2 sm:mr-3">
                        <img
                            className="h-20 w-20 object-contain"
                            src={item.image}
                            width={40}
                            height={40}
                            alt="Alex Shatov"
                        />
                    </div>
                    <div className="font-medium text-gray-800  h-full">
                        <h3 className='mb-10 whitespace-normal'>
                            {item.name}
                        </h3>
                        <h3>
                            {
                                item.size
                            }
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
                <div className="text-left font-medium ">
                    $ {item.price}
                </div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-lg text-center">
                    <div className='flex items-center justify-between bg-white border-[1px] border-gray-400 rounded-lg overflow-hidden'>
                        <ICON onClick={(e) => {
                            e.stopPropagation()
                            setQuantityCard(prev => {
                                dispatch(
                                    _updateProductToLocalStorage(
                                        {
                                            item,
                                            quantity: prev + 1
                                        }
                                    )
                                )
                                return prev + 1
                            }
                            )

                        }} className='bg-white p-2 border-[1px] border-gray-400' icon={IconSolid.faPlus} />
                        <h3 className='bg-white p-1 px-2 '>
                            {/* {quantity} */}
                            {quantityCart}
                        </h3>
                        <ICON onClick={(e) => {
                            e.stopPropagation()
                            setQuantityCard(prev => {
                                dispatch(
                                    _updateProductToLocalStorage(
                                        {
                                            item,
                                            quantity: prev - 1
                                        }
                                    )
                                )
                                return prev - 1
                            })




                        }} className='bg-white p-2 border-[1px] border-gray-400' icon={IconSolid.faMinus} />
                    </div>
                </div>
            </td>
            <td>
                <h3 className='font-medium text-center'>
                    {
                        quantityCart * item.price
                    }
                    {
                        " "
                    }
                    đ
                </h3>

            </td>

        </tr>
    </>
}



function CartProduct() {
    const { dispatch, globalState } = useGlobal()
    const [productCart, setProductCart] = React.useState<ProductModel[]>([
        ProductMock, ProductMock, ProductMock, ProductMock
    ])
    const [isLoading, setIsLoading] = React.useState(true);
    // const [listProduct, setListProduct] = React.useState<ProductCartItem[]>(() => {

    // })
    const [chooseProduct, setChooseProduct] = React.useState<ProductCartItem[]>([])

    React.useEffect(() => {
        if (typeof window != undefined) {
            // let data = FetchDataFromStorageByKey();
            // console.log(data?.product)
            // setListProduct(data?.product as ProductCartItem[])
        }
    }, [])


    const handleAddOrder = async function () {
        try {
            let userId = globalState.auth.user?.customerId
            let orderListProduct = globalState.cartUser.chooseProduct.map((item: ProductCartItem, index: number) => {
                return {
                    "skuId": item.item.productsku as any,
                    "productId": item.item.productId as any,
                    "quantity": item.quantity as any,
                    "optionId": item.item.optionId as any,
                    "valuesId": item.item.valuesId as any
                }
            })
            let newOrder: NewOrderInf = {
                "customerId": userId,
                "statusID": 2,
                "shippingTypeID": 2,
                "listproductOrdered": orderListProduct
            }
            console.log(
                globalState.cartUser.chooseProduct
            )
            console.log(
                newOrder
            )
            let result = await addNewOrder(newOrder)
            
        } catch (error) {

        }
    }


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
                                            ( {globalState.cartUser.listProduct.length} ) sản phẩm
                                        </p>
                                    </div>
                                    {/* <CardCart /> */}
                                    {/* <header className="px-5 py-4 border-b border-gray-100">
                                        <h2 className="font-semibold text-gray-800">Customers</h2>
                                    </header> */}
                                    <div className="p-3">

                                        <div className="overflow-x-auto">
                                            {
                                                globalState.cartUser.listProduct.length == 0 && <>
                                                    <div className='w-full'>
                                                        <img
                                                            className='w-full'
                                                            src="https://th.bing.com/th/id/OIP.r6aijQ7gtefVW3pa7N_t7AHaFQ?pid=ImgDet&rs=1"
                                                            alt=""
                                                        />

                                                        {/* <h3 className='text-center font-medium text-xl my-5'>
                                                    Giỏ hàng đang bị trống
                                                </h3> */}
                                                    </div>
                                                </>
                                            }
                                            {
                                                globalState.cartUser.listProduct.length > 0 &&


                                                <table className="table-auto w-full">
                                                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                                        <tr>
                                                            <th>

                                                            </th>
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
                                                            globalState.cartUser.listProduct.map((item: ProductCartItem, index: number) => {
                                                                console.log(item)
                                                                return <>
                                                                    <CardCart onChooseProduct={() => {

                                                                    }} key={index}    {...item} />
                                                                </>
                                                            })
                                                        }

                                                    </tbody>
                                                </table>
                                            }
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
                                            {/* 224.300 d */}
                                            {
                                                globalState.cartUser.chooseProduct.reduce((prev, curent, index) => {
                                                    return prev + curent.item.price
                                                }, 0)
                                            }
                                            {" "}
                                            đ
                                        </p>

                                    </div>

                                    <div onClick={() => {
                                        handleAddOrder()
                                    }} className='bg-yellow-500 rounded-md my-8'>
                                        <p className='text-center py-3 text-white font-medium'>
                                            Đặt hàng ( {globalState.cartUser.chooseProduct.length} )
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