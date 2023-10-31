import { useRouter } from 'next/router'
import React from 'react'
import { CardProduct, DropoutComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'
import { Product, ProductModel, ResponeModel } from 'src/Model'
import { GetAllProductByIdCategories } from 'src/service/api'
import { ProductMock } from 'src/utils/constant'
interface PriceRange {
    min: number,
    max: number
}

function DisplayProductBySludPage2() {
    const { query, isReady } = useRouter()
    const [selectedSize, setSelectedSize] = React.useState<string[]>([]);
    const [listProduct, setListProduct] = React.useState<ResponeModel<ProductModel>>()
    const size: string[] = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "2", "4", "6", "8", "10", "12"]
    const material: string[] = []

    async function FetchApi(idCategories: number) {
        try {
            let resultListProduct = await GetAllProductByIdCategories(idCategories);
            setListProduct(resultListProduct)
        } catch (error) {

        }
    }

    const HandleSelectedSize = (checked: boolean , size: string) => {
        if (checked) {
            setSelectedSize((prev) => [...prev, size])
        } else {
            setSelectedSize(selectedSize.filter((item) => item != size))
        }
    }

    console.log('Selected ', selectedSize);

    React.useEffect(() => {
        if (isReady) {
            console.log(query.slugproduct)
            FetchApi(parseInt(query.slugproduct as string))
        }
    }, [isReady])
    console.log(listProduct)
    return <>
        <div className='flex my-5 py-4 w-full h-full'>
            <div className='hidden md:block basis-1/6 px-1'>
                <div className='w-full min-h-[50vh] '>

                    <div>
                        <ul className='mb-2 overflow-hidden flex flex-wrap'>
                            {selectedSize.map((size, index) => (
                                <li key={index} className='mr-[10px] mb-2 bg-[#fcaf17] px-2 py-0.5 rounded-md font-normal'>
                                    <span className='text-white'>&#215; {size}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <DropoutComp title='Loại sản phẩm' >
                        <div className='max-h-72 overflow-y-auto bg-red-200 w-full'>
                            a
                        </div>
                    </DropoutComp>

                    <DropoutComp title='Kích Thước Sản Phẩm' >
                        <ul className='flex flex-wrap'>
                            {size.map((item, index) => (
                                <li key={index} className='bg-[#F2F2F2] text-[#7A7A9D] rounded-[5px] mr-2 mb-2 cursor-pointer flex items-center justify-center peer-checked:border-[1px]  peer-checked:border-[#fcaf17]'>
                                    <span className='cursor-pointer text-base py-1'>
                                        <label className='relative'>
                                            <input 
                                                type="checkbox" 
                                                className='hidden w-5 h-5 peer'
                                                onChange={(e) => HandleSelectedSize(e.target.checked, item)}
                                            />
                                            <span className='px-3 after:content-[""] after:bg-[url("https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/chose.svg")] after:absolute after:w-[22px] after:h-[22px] after:top-[-5px] after:right-[0px]'>{item}</span>
                                        </label>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </DropoutComp>

                    <DropoutComp title='Màu Sắc' >

                    </DropoutComp>

                    <DropoutComp title='Khoảng Giá' >

                    </DropoutComp>

                    <DropoutComp title='Chất Liệu' >

                    </DropoutComp>

                </div>
            </div>

            <div className='flex-1 px-2 py-3'>
                <div className='w-full  flex flex-wrap'>
                    {
                        listProduct?.data &&

                            listProduct?.data.length > 0 ? <>
                            {
                                listProduct.data.map((item: ProductModel, index: number) => {
                                    return <>
                                        <CardProduct key={index} {...item} />
                                    </>
                                })
                            }
                            {/* {
                                Array.from(Array(8).keys()).map(() => {
                                    return (
                                        <>
                                            <CardProduct {...ProductMock} />
                                        </>
                                    )
                                })
                            } */}
                        </>
                            : <>
                                <h3 className='text-center w-full font-medium '>
                                    {listProduct?.message}
                                </h3>
                            </>
                    }
                </div>
            </div>
        </div>
    </>
}


function DisplayProductBySludPage1() {
    const [data, setData] = React.useState(() => {
        return Array.from(Array(8).keys())
    })

    return <>
        <p className='text-center uppercase font-medium text-xl text-yellow-400'>
            Danh Mục Nổi Bật
        </p>
        <div className='flex flex-wrap w-full my-3 '>
            {
                data.map((item, index) => {
                    return <>
                        <div className='basis-1/5 h-36 px-3 py-1 my-2'>
                            <div className=' h-full w-full border-[1px] '>
                                <div className='w-full h-full flex items-center justify-center'>
                                    <div className='w-12 h-12 rounded-full bg-red-300'>

                                    </div>
                                    <p className='mx-2'>
                                        Ao Polo
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                })
            }
        </div>

        <p className='text-center uppercase font-medium text-xl text-yellow-400'>
            Đề Xuất Cho Bạn
        </p>
        {/* <CardProduct /> */}
        <div className='flex flex-wrap w-full h-full'>
            {
                Array.from(Array(20).keys()).map(() => {
                    return <>
                        {/* <CardProduct /> */}
                    </>
                })
            }
        </div>

        <div className='w-full flex items-center justify-center my-4'>
            <div className='min-w-[200px] px-3 py-1 bg-yellow-300 text-white m'>
                <p className='font-medium text-xl text-center'>Xem thêm </p>
            </div>
        </div>

    </>
}


function DisplayProductBySludPage() {
    const [layoutPage, setlayoutPage] = React.useState<1 | 2>(2)

    // Lấy param trên url để xác định layout trong trả về của useState

    return (
        <>
            <MainLayout>
                {layoutPage == 1 && <DisplayProductBySludPage1 />}
                {layoutPage == 2 && <DisplayProductBySludPage2 />}
            </MainLayout>
        </>
    )
}

export default DisplayProductBySludPage