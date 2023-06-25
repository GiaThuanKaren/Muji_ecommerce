import React from 'react'

function CardProduct() {
    return (
        <>
            <div className='h-fit max-h-[500px] basis-1/2 md:basis-1/4 p-1'>
                <div className='h-full w-full'>
                    <div className='h-[80%] w-full '>
                        <img
                            className='w-full h-full object-cover'
                            src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/tsn6128-tr1-ssn6020-tit-muu6006-nav-8.jpg?v=1685151599000" alt=""
                        />
                    </div>
                    <div className='h-[20%] w-full'>
                        <p>Áo Thun Nữ In Gấu Bột Ngô</p>
                        <p className='font-medium'>329.000đ</p>

                    </div>
                </div>
            </div>
        </>
    )
}

export default CardProduct