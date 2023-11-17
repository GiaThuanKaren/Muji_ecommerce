import React from 'react'
import CardProduct from 'src/Components/CardProduct'
import { MainLayout } from 'src/Layouts'
import { CustomerResponeModel, OptionValue, Product, ProductModel, ProductResponeModel, ProductSkuResponeModel, ResponeModel } from 'src/Model/apiModel'
import {  FetchAllProduct, GetDetailProductById } from 'src/services/api/product'
import { ProductCartItem, localStorageInf } from 'src/utils/constant'
import { CiDiscount1 } from "react-icons/ci";
import { RiUserSearchLine } from "react-icons/ri";
import CartItem from 'src/Components/CardItem'
import { AddProductToLocalStorage } from 'src/services/api'
import { useDebounce } from 'src/utils/useDebounce'
import { GetCustomerByFullName } from 'src/services/api/customer'

export interface ProductSkuChooseInf {
    img: string,
    productSkuId: string,
    size: string,
    skuName: string
    productId?: string,
    price: number
}

function POS() {
    const [listProduct, setListProduct] = React.useState<ResponeModel<ProductResponeModel>>()
    const [storageOrders, setStorageOrders] = React.useState<localStorageInf>()
    const [name, setName] = React.useState('');
    const [searchFullName, setSearchFullName] = React.useState('');
    const debounceSearch = useDebounce(searchFullName, 1000)
    const [listCustomer, setListCustomer] = React.useState<ResponeModel<CustomerResponeModel>>();
    const [productSkuChoose, setProductSkuChoose] = React.useState<ProductSkuChooseInf>({
        img: "",
        productSkuId: "",
        size: "",
        skuName: "",
        productId: "",
        price: 0
    })
    const [productChoose, setProductChoose] = React.useState<string>('');
    const [chooseSize, setChooseSize] = React.useState(
        ""
    )
    const [product, setProduct] = React.useState<ProductResponeModel>();

    console.log('search > ', searchFullName);
    console.log('debounce > ', debounceSearch);
    
    

    // console.log('Product choose -> ', productSkuChoose);

    async function FetchApi() {
        try {
            let result = await FetchAllProduct(
                    1,
                    10,
                    name,
                );

            setListProduct(result)
        } catch (error) {

        }
    }

    async function FetchApi2() {
        try {
            let result = await GetDetailProductById(productChoose as string);
            console.log(result?.data)
            setProduct(result?.data as ProductResponeModel)
            setProductSkuChoose({
                img: result?.data.productSkus[0].imageProduct.toString().trim().startsWith("https://") ? result?.data.productSkus[0].imageProduct : `https://drive.google.com/uc?export=view&id=${result?.data.productSkus[0].imageProduct}` as string,
                productSkuId: result?.data.productSkus[0].id.skuId.toString() as string,
                size: "",
                skuName: result?.data.productSkus[0].skuName as string,
                productId:productChoose as string,
                price: result?.data.productSkus[0].price as number
            })
        } catch (error) {

        }
    }

    async function FetchApi3() {
        try {
            let result = await GetCustomerByFullName(
                    debounceSearch,
                );

            setListCustomer(result)
        } catch (error) {

        }
    }

    React.useEffect(() => {
        FetchApi()
    }, [name])

    React.useEffect(() => {
        FetchApi2()
    }, [productChoose])

    React.useEffect(() => {
        if (debounceSearch) {
            FetchApi3()
        } else {
            setListCustomer([])
        }
    }, [debounceSearch])

    const HandleAddCart = async function () {
        try {

            let productAddCart: ProductCartItem = {
                item: {
                    image: productSkuChoose.img,
                    productId: productSkuChoose.productId as string,
                    productsku: productSkuChoose.productSkuId,
                    size: productSkuChoose.size,
                    name: product?.nameProduct as string,
                    price: productSkuChoose.price
                },
                quantity: 1,
            }


            console.log(productAddCart)
            AddProductToLocalStorage(productAddCart)

            const store = localStorage.getItem('muji_order')
            if (store) setStorageOrders(JSON.parse(store))
        } catch (error) {

        }
    }

    return (
        <>
            <MainLayout >
                <h1 className='px-3 py-5 font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#11006F] to-[#FCAF17] inline-block'>Point of Sale</h1>
               
                <div className='flex pb-4 w-full h-full'>
                    <div className='basis-5/12 px-2'>
                        <div className='flex-col'>
                            <div className='flex justify-between items-end px-2'>
                                <h2 className='font-semibold text-lg'>All Items</h2>
                                <div className='flex'>
                                    <div className='bg-[#f5f5f7] h-9 rounded-[4px] flex items-center min-w-[340px]'>
                                        <span className='h-[34px] w-[39px]'>
                                            <img src="https://booking-my-show.vercel.app/static/media/search.ffba76c11b9eeb31bdf8e6d522c4c46a.svg" className='h-[13px] w-[13px] my-[10px] mx-3' alt="" />
                                        </span>
                                        <input 
                                            type="text"
                                            onChange={(e) => setName(e.target.value)}
                                            className='px-2 py-3 bg-[#f5f5f7] cursor-text font-normal text-sm outline-none w-full h-5' 
                                            placeholder='Search by item name, (eg. Clothes jeans)' 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-wrap justify-between'>
                                {
                                    listProduct?.data && 
                                        listProduct.data.length > 0 ? <>
                                        {
                                            listProduct.data.map((item: ProductResponeModel, index: number) => {
                                                return <>
                                                    <CardProduct 
                                                        product={item}
                                                        setStorageOrders={setStorageOrders}
                                                        setProductChoose={setProductChoose}
                                                        quantity={0}
                                                        key={index}
                                                        {...item}                                           
                                                    />
                                                </>
                                            })
                                        } 
                                        </>
                                        :      
                                        <>
                                            <h3 className='text-center w-full font-medium '>
                                                <p>Can`t find product</p>
                                            </h3>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='basis-4/12 px-2 py-3'>
                        <div>
                            <h1 className='font-semibold text-lg mb-6'>Item Detail</h1>
                            <div className='flex items-end'>
                                <div className='flex flex-col basis-2/4'>
                                    <div className='font-bold text-2xl mb-1'>{product?.nameProduct}</div>
                                        <span className='font-semibold text-lg'>250.000 đ</span>
                                    <div>
                                
                                    <div className='flex flex-wrap w-full my-3'>
                                        {
                                            product?.productSkus.map((item: ProductSkuResponeModel) => {
                                                return <>
                                                    <div onClick={() => {
                                                        setProductSkuChoose({
                                                            ...productSkuChoose,
                                                            img: item.imageProduct,
                                                            productSkuId: item.id.skuId.toString() as string,
                                                            size: "",
                                                            skuName: item.skuName,
                                                            price: item.price
                                                        })
                                                    }} className={'h-16 w-12 my-2 mx-2 border-[3px] hover:border-yellow-500  ' + `${item.id.skuId.toString() == productSkuChoose.productSkuId ? " border-[2px] border-yellow-500  " : " "}`}>
                                                        <img className='w-full h-full object-contain'
                                                            src={item.imageProduct.trim().startsWith("https://") ? item.imageProduct : `https://drive.google.com/uc?export=view&id=${item.imageProduct}`}
                                                        />
                                                    </div>
                                                </>
                                            })
                                        }

                                    {
                                        // product?.products.map((item: Product, index: number) => {
                                        //     if (
                                        //         item.option.optionID == 252
                                        //     ) {
                                        //         return <>
                                        //             {/* `${ item.option.optionName} 123  ${ productSkuChoose.size}` */}
                                        //             <h3 className='font-medium '>

                                        //                 {
                                        //                     item.option.optionName
                                        //                 }

                                        //                 {
                                        //                     productSkuChoose.size
                                        //                 }

                                        //             </h3>
                                        //             <div className='flex flex-wrap  my-3 '>
                                        //                 {
                                        //                     item.option.optionValues.map((item1: OptionValue) => {
                                        //                         return <>
                                        //                             <div onClick={() => {

                                        //                                 setProductSkuChoose({
                                        //                                     ...productSkuChoose,
                                        //                                     size: item1.valuesName,

                                        //                                 })
                                        //                                 setChooseSize(item1.valuesName)
                                        //                             }} className={'hover:cursor-pointer flex items-center justify-center w-16 mx-2 my-2 py-3 ' + `${chooseSize !== item1.valuesName ? " bg-slate-200" : " bg-yellow-600"}`}>
                                        //                                 <p className={'font-medium  ' + `${chooseSize !== item1.valuesName ? " text-black " : " text-white"}`}>
                                        //                                     {item1.valuesName}
                                        //                                 </p>
                                        //                             </div>
                                        //                         </>
                                        //                     })
                                        //                 }
                                        //             </div>
                                        //         </>
                                        //     }

                                        // })
                                    }
                                    <button className='bg-slate-300'
                                        onClick={HandleAddCart}
                                    >Add cart</button>
                                    </div>
                                </div>
                                </div>
                                <div className='flex-1'>
                                    <img src="https://bizweb.dktcdn.net/100/438/408/products/akn4024-xah-5.jpg?v=1690337555127" className='w-32 h-44 rounded-md' alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex-1 px-2 py-3'>
                        <div>
                            <div className='bg-[#f5f5f7] p-3 flex items-center justify-start mb-3 rounded-sm shadow-md'>
                                <RiUserSearchLine style={{minWidth: "22px"}} size={22} color='rgb(17 0 111)' />
                                <div className='ml-5'>
                                    <h1 className='font-semibold text-base'>Walk-in Customer</h1>
                                    <input 
                                        type="text" 
                                        className='bg-[#f5f5f7] py-3 cursor-text font-normal text-sm outline-none w-full h-5 relative' 
                                        placeholder='Enter name to add customer' 
                                        value={searchFullName}
                                        onChange={(e) => setSearchFullName(e.target.value)}
                                    />
                                    <div className='shadow-md absolute bg-slate-100 w-fit'>
                                        {listCustomer?.data &&
                                            listCustomer.data.map((item: CustomerResponeModel, index: number) => (
                                                <ItemToopTip key={index} {...item} setSearchFullName={setSearchFullName} />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className='font-semibold text-lg mb-6'>Order summary</h1>
                            <div className='max-h-[285px] overflow-auto w-fit mb-3'>
                                <div className='flex min-h-[290px]'> 
                                    <div className='flex flex-col'>
                                        {storageOrders?.product.map((item: ProductCartItem, index: number) => {
                                            return <>
                                                <CartItem 
                                                    key={index} 
                                                    {...item}
                                                />
                                            </>
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className='border-2 border-slate-500 border-dotted h-10 pl-3 mb-3 rounded-md flex items-center cursor-pointer'>
                                <CiDiscount1 />
                                <p className='ml-2 text-[12.5px] text-gray-400'>Add Discount</p>
                            </div>
                            <div className='rounded-md font-medium text-sm text-[#636366]'>
                                <div>
                                    <div className='py-1 mx-2'>
                                        <div className='flex justify-between py-0.5'>
                                            <div>Sub Total</div>
                                            <div>62.25</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-between px-2 py-2'>
                                    <div>Total</div>
                                    <div className='font-medium text-lg'>6.500.250 VNĐ</div>
                                </div>
                                <button className='w-full bg-slate-400 h-9 text-white rounded-md '>Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    )
}

type ToolTipProps =  CustomerResponeModel & { setSearchFullName: (search: string) => void }

function ItemToopTip({ customerId, customerFirstName, customerLastName, setSearchFullName }: ToolTipProps) {

    return (
        <div className='w-full border-b-[1px] border-gray-300 p-2 cursor-pointer' onClick={() => setSearchFullName(customerFirstName + customerLastName)}>
            <span className='font-medium mr-3 text-sm'>#{customerId}</span>
            <span className='text-sm'>{customerFirstName} {customerLastName}</span>
        </div>
    )
}

export default POS
