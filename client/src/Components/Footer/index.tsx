import React from 'react'

function  Footer() {
    return (
        <>
            <div className='bg-[#2a2a86] h-[500px] '>
                <div className='xl:mx-[200px]'>
                    <div className='flex items-center justify-between py-7'>
                        <div className="basis-1/4 text-white">
                            <p>
                                “Đặt sự hài lòng của khách hàng là ưu tiên số 1 trong mọi suy nghĩ hành động của mình” là sứ mệnh, là triết lý, chiến lược.. luôn cùng YODY tiến bước
                            </p>

                            <p className='uppercase my-5'>
                                Đăng ký nhận thông tin
                            </p>

                            <div className='flex items-center'>
                                <input type="text" placeholder='Nhập email đăng ký của bạn ' className='bg-[#9797c4] text-white' />
                                <div className='bg-white'>
                                    <p className='text-yellow-400'>Đăng Ký</p>
                                </div>
                            </div>

                        </div>
                        <div className="basis-1/4 text-white">
                            <p>
                                Về Yody
                            </p>
                            <div className='pl-2'>
                                <p>Giới thiệu</p>
                                <p>Liên hệ</p>
                                <p>Tuyển dụng</p>
                                <p>Tin tức</p>
                                <p>Hệ thống cửa hàng</p>
                                <p>Hàng mới về</p>
                                <p>Ưu đãi hàng Outlet</p>
                            </div>
                        </div>
                        <div className="basis-1/4 text-white">
                            <p>HỖ TRỢ KHÁCH HÀNG</p>
                            <div className='pl-2'>
                                <p>Hướng dẫn chọn size</p>
                                <p>Chính sách khách hàng thân thiết</p>
                                <p>Chính sách bảo hành, đổi/trả</p>
                                <p>Chính sách bảo mật</p>
                                <p>Thanh toán, giao nhận</p>
                                <p>Chính sách Đồng phục</p>
                                <p>Chính sách bảo mật thông tin khách hàng</p>
                            </div>
                        </div>
                        <div className="basis-1/4 text-white">
                            <p>
                                CÔNG TY CP THỜI TRANG YODY
                            </p>
                            <div className='pl-2'>
                                map Công ty cổ phần Thời trang YODY
                                Mã số thuế: 0801206940
                                Địa chỉ: Đường An Định - Phường Việt Hòa - Thành phố Hải Dương - Hải Dương
                                phone Tìm cửa hàng gần bạn nhất
                                phone Liên hệ đặt hàng: 024 999 86 999. Thắc mắc đơn hàng: 024 999 86 999. Góp ý khiếu nại: 1800 2086.
                                phone Email: chamsockhachhang@yody.vn
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer