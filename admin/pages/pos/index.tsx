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
import useLocalStorage from 'src/utils/useLocalStorage'
import { CreateNewOrder } from 'src/services/api/order'

export interface ProductSkuChooseInf {
    img: string,
    productSkuId: string,
    size: string,
    skuName: string
    productId?: string,
    price: number,
    optionId: string,
    valueId: string
}

export interface CartItem {
    skuId: string;
    productId: string;
    quantity: number;
    optionId: string;
    valuesId: string;
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
        price: 0,
        optionId: "",
        valueId: ""
    })
    const [productChoose, setProductChoose] = React.useState<string>('');
    const [chooseSize, setChooseSize] = React.useState(
        ""
    )
    const [chooseCustomer, setChooseCustomer] = React.useState('');
    const [product, setProduct] = React.useState<ProductResponeModel>();
    const [mujiOrder, setMujiOrder] = React.useState<ProductCartItem[]>([]);
    const [totalValue, setTotalValue] = React.useState<number>(0);
    console.log(mujiOrder);

    const HandleCheckout = async () => {
        const CartCheckout: CartItem[] = []
        // const employeeInfo = localStorage.getItem('employeeInfo')

        mujiOrder.map((item: ProductCartItem) => {
            CartCheckout.push({
                skuId: item.item.productsku,
                productId: item.item.productId,
                quantity: item.quantity,
                optionId: item.item.optionId,
                valuesId: item.item.valueId
            })
        })

        try {
            let result = await CreateNewOrder(CartCheckout, 1, parseInt(chooseCustomer))

            console.log(result);
            
        } catch (e) {

        }
    }

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
                price: result?.data.productSkus[0].price as number,
                optionId: "",
                valueId: ""
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
        const newTotalValue = mujiOrder.reduce((total, item) => {
            return total + item.item.price * item.quantity;
        }, 0);
        setTotalValue(newTotalValue);
    }, [mujiOrder])

    React.useEffect(() => {
        if (debounceSearch) {
            FetchApi3()
        } else {
            setListCustomer([])
            setChooseCustomer('')
        }
    }, [debounceSearch])

    const HandleQuantity = (index: number, newQuantity: number) => {
        const updatedMujiOrder = [...mujiOrder];
        updatedMujiOrder[index].quantity = newQuantity;
        setMujiOrder(updatedMujiOrder);
    }

    const HandleAddCart = async function () {
        try {
            const isProductInCart = mujiOrder.some((item) =>
            item.item.productsku === productSkuChoose.productSkuId && item.item.size === productSkuChoose.size
        );

        if (isProductInCart) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng thêm 1 quantity
            const updatedMujiOrder = mujiOrder.map((item) => {
                if (item.item.productsku === productSkuChoose.productSkuId && item.item.size === productSkuChoose.size) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                }
                return item;
            });

            setMujiOrder(updatedMujiOrder);
        } else {
            // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào giỏ hàng với quantity là 1
            let productAddCart: ProductCartItem = {
                item: {
                    image: productSkuChoose.img,
                    productId: productSkuChoose.productId as string,
                    productsku: productSkuChoose.productSkuId,
                    size: productSkuChoose.size,
                    name: product?.nameProduct as string,
                    price: productSkuChoose.price,
                    optionId: productSkuChoose.optionId,
                    valueId: productSkuChoose.valueId,
                },
                quantity: 1,
            };

            setMujiOrder([...mujiOrder, productAddCart]);
        }
        } catch (error) {

        }
    }

    return (
        <>
            <MainLayout >
                <h1 className='px-3 py-5 font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#11006F] to-[#FCAF17] inline-block'>Point of Sale</h1>
               
                <div className="flex pb-4 w-full h-full">
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
                            <div className='flex justify-end'>
                                <div className='flex flex-col basis-3/5'>
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
                                        product?.products.map((item: Product, index: number) => {
                                            if (
                                                item.option.optionID == 1
                                            ) {
                                                return <>
                                                    {/* `${ item.option.optionName} 123  ${ productSkuChoose.size}` */}
                                                    <h3 className='font-medium '>

                                                        {
                                                            item.option.optionName
                                                        }

                                                        {
                                                            productSkuChoose.size
                                                        }

                                                    </h3>
                                                    <div className='flex flex-wrap  my-3 '>
                                                        {
                                                            item.option.optionValues.map((item1: OptionValue) => {
                                                                if (item1.id.productId == product.productId) {
                                                                    return <>
                                                                    <div onClick={() => {

                                                                        setProductSkuChoose({
                                                                            ...productSkuChoose,
                                                                            size: item1.valuesName,
                                                                            optionId: item1.id.optionId.toString(),
                                                                            valueId: item1.id.valueId.toString()
                                                                        })
                                                                        setChooseSize(item1.valuesName)
                                                                    }} className={'hover:cursor-pointer flex items-center justify-center w-16 mx-2 my-2 py-3 ' + `${chooseSize !== item1.valuesName ? " bg-slate-200" : " bg-yellow-600"}`}>
                                                                        <p className={'font-medium  ' + `${chooseSize !== item1.valuesName ? " text-black " : " text-white"}`}>
                                                                            {item1.valuesName}
                                                                        </p>
                                                                    </div>
                                                                </>
                                                                }
                                                            })
                                                        }
                                                    </div>
                                                </>
                                            }

                                        })
                                    }
                                    <button className='bg-gray-300 rounded-md w-full p-2'
                                        onClick={HandleAddCart}
                                    >Add cart</button>
                                    </div>
                                </div>
                                </div>
                                <div className='flex-1 ml-7'>
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
                                                <ItemToopTip key={index} {...item} setChooseCustomer={setChooseCustomer} setSearchFullName={setSearchFullName} />
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
                                        {mujiOrder.map((item: ProductCartItem, index: number) => {
                                            return <>
                                                <CartItem 
                                                    key={index} 
                                                    {...item}
                                                    onQuantityChange={(newQuantity) => HandleQuantity(index, newQuantity)}
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
                                    <div className='font-medium text-lg'>
                                        {totalValue}
                                    </div>
                                </div>
                                <button onClick={HandleCheckout} className='w-full bg-slate-400 h-9 text-white rounded-md '>Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    )
}

type ToolTipProps =  CustomerResponeModel & { setSearchFullName: (search: string) => void, setChooseCustomer: (customer: string) => void }

function ItemToopTip({ customerId, customerFirstName, customerLastName, setSearchFullName, setChooseCustomer }: ToolTipProps) {

    return (
        <div className='w-full border-b-[1px] border-gray-300 p-2 cursor-pointer' onClick={() => {
            setSearchFullName(customerFirstName + customerLastName)
            setChooseCustomer(customerId.toString())
        }}>
            <span className='font-medium mr-3 text-sm'>#{customerId}</span>
            <span className='text-sm'>{customerFirstName} {customerLastName}</span>
        </div>
    )
}

export default POS
