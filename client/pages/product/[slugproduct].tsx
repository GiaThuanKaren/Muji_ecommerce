import React from 'react'
import { CardProduct, DropoutComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'

function DisplayProductBySludPage2() {
    return <>
        <div className='flex '>
            <div className='basis-1/6 px-1'>
                <div className='w-full min-h-[50vh] '>
                    <DropoutComp title='Loại sản phẩm' >
                        <div className='h-32 bg-red-200 w-full'>

                        </div>
                    </DropoutComp>
                    <DropoutComp title='Loại sản phẩm' >

                    </DropoutComp>
                </div>
            </div>

            <div className='flex-1 px-1'>
                <div className='w-full h-[80vh] bg-red-400'>

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
        <div className='flex flex-wrap w-full'>
            {
                Array.from(Array(20).keys()).map(() => {
                    return <>
                        <CardProduct />
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