import { useRouter } from 'next/router'
import React from 'react'
import { CardProduct, DropoutComp } from 'src/Components'
import { Pagination } from 'src/Components/Pagination/Pagination'
import { MainLayout } from 'src/Layouts'
import { Product, ProductModel, ResponeModel } from 'src/Model'
import { GetAllProductByIdCategories } from 'src/service/api'
import { ProductMock } from 'src/utils/constant'
interface PriceRange {
    min: number,
    max: number
}

const PRODUCT_PER_PAGE = 10;

function DisplayProductBySludPage2() {
    const { query, isReady } = useRouter()
    const [name, setName] = React.useState<string>();
    const [selectedSize, setSelectedSize] = React.useState<string[]>([]);
    const [selectedColor, setSelectedColor] = React.useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = React.useState<string>();
    const [checkedPrice, setCheckedPrice] = React.useState<string | null>(null);
    const [listProduct, setListProduct] = React.useState<ResponeModel<ProductModel>>()

    const [currentPage, setCurrentPage] = React.useState(1);
    const [getTotalCount, setGetTotalCount] = React.useState(0);

    const size: string[] = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "2", "4", "6", "8", "10", "12"]
    const color: {name: string, hex: string, icon: string} [] = [
        { name: "Đen", hex: "#000000", icon: "den" },
        { name: "Trắng", hex: "#FFFFFF", icon: "trang" },
        { name: "Xanh navy", hex: "#03204C", icon: "xanh-navy" },
        { name: "Xanh lá", hex: "#62BF5E", icon: "xanh-la" },
        { name: "Nâu", hex: "#613B0D", icon: "nau" },
        { name: "Xanh mint", hex: "#8CD6C4", icon: "xanh-mint" },
        { name: "Xám", hex: "#C1C5C0", icon: "xam" },
    ]
    const material: string[] = []

    const onPageChange = (page: number) => {
        setCurrentPage(page)
    }

    async function FetchApi(idCategories: number) {
        try {
            let listProductFilter = await GetAllProductByIdCategories(
                    idCategories,
                    currentPage,
                    PRODUCT_PER_PAGE,
                    selectedPrice,
                    name,
                    selectedSize,
                    selectedColor
                );
            let listAllProduct = await GetAllProductByIdCategories(idCategories);

            setListProduct(listProductFilter)
            setGetTotalCount(listProductFilter?.total)
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

    console.log('size -> ', selectedSize);
    

    const HandleSelectedColor = (checked: boolean , color: any) => {
        if (checked) {
            setSelectedColor((prev) => [...prev, color.name])
        } else {
            setSelectedColor(selectedColor.filter((item) => item != color.name))
        }
    }

    const HandleSelectedPrice = (checked: boolean , price: any) => {
        if (checkedPrice === price) {
            setCheckedPrice(null); 
            setSelectedPrice('')
          } else {
            setCheckedPrice(price);
            setSelectedPrice(price)
          }
    }

    React.useEffect(() => {
        if (isReady) {
            console.log(query.slugproduct)
            FetchApi(parseInt(query.slugproduct as string))
        }
    }, [isReady, currentPage, selectedPrice, selectedColor, selectedSize])

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
                            {selectedColor.map((colour, index) => (
                                <li key={index} className='mr-[10px] mb-2 bg-[#fcaf17] px-2 py-0.5 rounded-md font-normal'>
                                    <span className='text-white'>&#215; {colour}</span>
                                </li>
                            ))}
                            {selectedPrice && (
                                <li className='mr-[10px] mb-2 bg-[#fcaf17] px-2 py-0.5 rounded-md font-normal'>
                                    <span className='text-white'>&#215; {selectedPrice}</span>
                                </li>
                            )}
                        </ul>
                    </div>

                    <DropoutComp title='Loại sản phẩm' >
                        <div className='max-h-72 overflow-y-auto bg-red-200 w-full'>
                        </div>
                    </DropoutComp>

                    <DropoutComp title='Kích Thước Sản Phẩm' >
                        <ul className='flex flex-wrap'>
                            {size.map((item, index) => (
                                <li key={index} className='bg-[#F2F2F2] rounded-[5px] text-[#7A7A9D] mr-2 mb-2 cursor-pointer flex items-center justify-center text-base border-[1px] border-transparent'>
                                    <span>
                                        <label className='relative flex'>
                                            <input 
                                                type="checkbox" 
                                                className='hidden w-5 h-5 peer'
                                                onChange={(e) => HandleSelectedSize(e.target.checked, item)}
                                            />
                                            <span className='peer-checked:border-[#fcaf17] leading-[33px] px-3 rounded-[5px] border-[1px] border-transparent  hover:border-[#fcaf17] peer-checked:after:content-[""] peer-checked:after:bg-[url("https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/chose.svg")] peer-checked:after:absolute peer-checked:after:w-[22px] peer-checked:after:h-[22px] peer-checked:after:top-[-1px] peer-checked:after:right-[0px]'>{item}
                                            </span>
                                        </label>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </DropoutComp>

                    <DropoutComp title='Màu Sắc' >
                    <ul className='flex flex-wrap'>
                            {color.map((item, index) => (
                                <li key={index} className='bg-[#F2F2F2] rounded-[5px] text-[#7A7A9D] mr-2 mb-2 cursor-pointer flex items-center justify-center text-base border-[1px] border-transparent'>
                                    <span>
                                        <label className='relative flex'>
                                            <input 
                                                type="checkbox" 
                                                className='hidden w-5 h-5 peer'
                                                onChange={(e) => HandleSelectedColor(e.target.checked, item)}
                                            />
                                            <span className={`peer-checked:border-[#fcaf17] 
                                            leading-[33px] px-3 rounded-[5px] border-[1px] border-transparent  hover:border-[${item.hex}] flex items-center
                                            peer-checked:after:content-[""] 
                                            peer-checked:after:bg-[url("https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/chose.svg")] 
                                            peer-checked:after:absolute 
                                            peer-checked:after:w-[22px] 
                                            peer-checked:after:h-[22px] 
                                            peer-checked:after:top-[-1px] 
                                            peer-checked:after:right-[0px] 
                                            peer-checked:after:border-l-transparent 
                                            peer-checked:after:border-t-[24px] 
                                            peer-checked:after:border-l-[24px] 
                                            peer-checked:after:border-t-[${item.hex}]
                                            peer-checked:before:content-[""]
                                            peer-checked:before:bg-[url("https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/x-white.svg")]
                                            peer-checked:before:absolute 
                                            peer-checked:before:w-[8px]
                                            peer-checked:before:h-[8px]
                                            peer-checked:before:top-[1px] 
                                            peer-checked:before:right-[1px]
                                            peer-checked:before:z-10 
                                            `}>
                                                <i className={`fa ${item.icon} bg-[${item.hex}] w-5 h-5 mr-1.5 inline-block rounded-2xl`}></i>
                                                {item.name}
                                            </span>
                                        </label>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </DropoutComp>

                    <DropoutComp title='Khoảng Giá' >
                        <ul className='flex flex-col flex-wrap'>
                            <li className='cursor-pointer mb-2.5 mr-2.5'>
                                <span>
                                    <label className='relative pl-7'>
                                        <input 
                                            type="checkbox" 
                                            className='hidden w-5 h-5 peer'
                                            value="<100000"
                                            checked={checkedPrice === "<100000"}
                                            onChange={(e) => HandleSelectedPrice(e.target.checked, "<100000")}
                                        />
                                        <i className={`fa before:content-[""] 
                                            before:absolute
                                            before:top-0
                                            before:left-0
                                            before:bg-[url("https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/uncheck.png")] 
                                            before:w-[20px]
                                            before:h-[20px]
                                            peer-checked:before:bg-[url("https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/check.png")]
                                        `}></i>
                                        Nhỏ hơn 100.000đ
                                    </label>
                                </span>
                            </li>
                            <li className='cursor-pointer mb-2.5 mr-2.5'>
                                <span>
                                    <label className='relative pl-7'>
                                        <input 
                                            type="checkbox" 
                                            className='hidden w-5 h-5 peer'
                                            value=">=100000 AND <=200000"
                                            checked={checkedPrice === ">=100000 AND <=200000"}
                                            onChange={(e) => HandleSelectedPrice(e.target.checked, ">=100000 AND <=200000")}
                                        />
                                        <i className={`fa before:content-[""] 
                                            before:absolute
                                            before:top-0
                                            before:left-0
                                            before:bg-[url("https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/uncheck.png")] 
                                            before:w-[20px]
                                            before:h-[20px]
                                            peer-checked:before:bg-[url("https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/check.png")]
                                        `}></i>
                                        Từ 100.000đ - 200.000đ
                                    </label>
                                </span>
                            </li>
                            <li className='cursor-pointer mb-2.5 mr-2.5'>
                                <span>
                                    <label className='relative pl-7'>
                                        <input 
                                            type="checkbox" 
                                            className='hidden w-5 h-5 peer'
                                            value=">=200000 AND <=350000"
                                            checked={checkedPrice === ">=200000 AND <=350000"}
                                            onChange={(e) => HandleSelectedPrice(e.target.checked, ">=200000 AND <=350000")}
                                        />
                                        <i className={`fa before:content-[""] 
                                            before:absolute
                                            before:top-0
                                            before:left-0
                                            before:bg-[url("https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/uncheck.png")] 
                                            before:w-[20px]
                                            before:h-[20px]
                                            peer-checked:before:bg-[url("https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/check.png")]
                                        `}></i>
                                        Từ 200.000đ - 350.000đ
                                    </label>
                                </span>
                            </li>
                            <li className='cursor-pointer mb-2.5 mr-2.5'>
                                <span>
                                    <label className='relative pl-7'>
                                        <input 
                                            type="checkbox" 
                                            className='hidden w-5 h-5 peer'
                                            value=">=350000 AND <=500000"
                                            checked={checkedPrice === ">=350000 AND <=500000"}
                                            onChange={(e) => HandleSelectedPrice(e.target.checked, ">=350000 AND <=500000")}
                                        />
                                        <i className={`fa before:content-[""] 
                                            before:absolute
                                            before:top-0
                                            before:left-0
                                            before:bg-[url("https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/uncheck.png")] 
                                            before:w-[20px]
                                            before:h-[20px]
                                            peer-checked:before:bg-[url("https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/check.png")]
                                        `}></i>
                                        Từ 350.000đ - 500.000đ
                                    </label>
                                </span>
                            </li>
                            <li className='cursor-pointer mb-2.5 mr-2.5'>
                                <span>
                                    <label className='relative pl-7'>
                                        <input 
                                            type="checkbox" 
                                            className='hidden w-5 h-5 peer'
                                            value=">=500000 AND <=700000"
                                            checked={checkedPrice === ">=500000 AND <=700000"}
                                            onChange={(e) => HandleSelectedPrice(e.target.checked, ">=500000 AND <=700000")}
                                        />
                                        <i className={`fa before:content-[""] 
                                            before:absolute
                                            before:top-0
                                            before:left-0
                                            before:bg-[url("https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/uncheck.png")] 
                                            before:w-[20px]
                                            before:h-[20px]
                                            peer-checked:before:bg-[url("https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/check.png")]
                                        `}></i>
                                        Từ 500.000đ - 700.000đ
                                    </label>
                                </span>
                            </li>
                            <li className='cursor-pointer mb-2.5 mr-2.5'>
                                <span>
                                    <label className='relative pl-7'>
                                        <input 
                                            type="checkbox" 
                                            className='hidden w-5 h-5 peer'
                                            value=">700000"
                                            checked={checkedPrice === ">700000"}
                                            onChange={(e) => HandleSelectedPrice(e.target.checked, ">700000")}
                                        />
                                        <i className={`fa before:content-[""] 
                                            before:absolute
                                            before:top-0
                                            before:left-0
                                            before:bg-[url("https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/uncheck.png")] 
                                            before:w-[20px]
                                            before:h-[20px]
                                            peer-checked:before:bg-[url("https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/check.png")]
                                        `}></i>
                                        Lớn hơn 700.000đ
                                    </label>
                                </span>
                            </li>
                        </ul>
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
                            <Pagination
                                currentPage={currentPage}
                                totalCount={getTotalCount}
                                pageCount={PRODUCT_PER_PAGE}
                                onPageChange={onPageChange}
                            />
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