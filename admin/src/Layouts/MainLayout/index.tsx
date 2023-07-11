import React from 'react'
import { Header } from 'src/Components'
import DropOutItem from 'src/Components/DropOutItem'
import { DropOutSideBarItem } from 'src/Model'
import { ICON, IconSolid } from 'src/utils'
import { routingLink } from 'src/utils/routingLink'

interface Props {
    children: React.ReactNode
}

function MainLayout({ children }: Props) {
    let data: DropOutSideBarItem[] = [
        {
            icon: <ICON icon={IconSolid.faHome} />,
            title: "Dashboard",
            childrenItem: [],
            link: routingLink.dashboard
        },
        {
            icon: <ICON icon={IconSolid.faHome} />,
            title: "Danh mục sản phẩm",
            childrenItem: [
                // {
                //     childrenItem: [],
                //     title: "Thêm danh mục mới",
                //     icon: <ICON icon={IconSolid.faHome} />
                // }
            ],
            link: routingLink.danhmucsanpham
        },



        {
            icon: <ICON icon={IconSolid.faHome} />,
            title: "Danh mục thuộc tính",
            childrenItem: [
                // {
                //     childrenItem: [],
                //     icon: <ICON icon={IconSolid.faHome} />,
                //     title: "Get All User"
                // },
                // {
                //     childrenItem: [],
                //     icon: <ICON icon={IconSolid.faHome} />,
                //     title: "Create New User"
                // },
                // {
                //     childrenItem: [],
                //     icon: <ICON icon={IconSolid.faHome} />,
                //     title: "Get Detail;"
                // },
            ],
            link: routingLink.thuoctinh
        },
        {
            icon: <ICON icon={IconSolid.faHome} />,
            title: "User",
            childrenItem: [
                // {
                //     childrenItem: [],
                //     icon: <ICON icon={IconSolid.faHome} />,
                //     title: "Get All User"
                // },
                // {
                //     childrenItem: [],
                //     icon: <ICON icon={IconSolid.faHome} />,
                //     title: "Create New User"
                // },
                // {
                //     childrenItem: [],
                //     icon: <ICON icon={IconSolid.faHome} />,
                //     title: "Get Detail;"
                // },
            ],
            link: routingLink.nguoidung
        },
        {
            title: "Product",
            childrenItem: [
                // {
                //     title: "Get All Product",
                //     childrenItem: [],
                //     icon: <ICON icon={IconSolid.faHome} />
                // }
                // ,
                // {
                //     title: "Add New Product",
                //     childrenItem: [],
                //     icon: <ICON icon={IconSolid.faHome} />
                // }
            ],
            icon: <ICON icon={IconSolid.faHome} />,
            link: routingLink.sanpham
        },
        {
            title: "Quản lý đơn hàng",
            childrenItem: [
                // {
                //     title: "Get All Shipping Status In All Product",
                //     childrenItem: [],
                //     icon: <ICON icon={IconSolid.faHome} />
                // }


            ],
            icon: <ICON icon={IconSolid.faHome} />,
            link: routingLink.donhang
        },

    ]
    return (
        <>
            <div className='flex max-w-screen h-screen'>
                <div className='h-full overflow-y-auto basis-1/6'>
                    <div className='w-full min-h-[100vh] py-3 '>
                        {
                            data.map((item: DropOutSideBarItem, index: number) => {
                                return <>
                                    <DropOutItem {...item} />
                                </>
                            })
                        }
                    </div>
                </div>
                <div className='h-full overflow-y-auto  basis-5/6 relative'>
                    <Header />
                    <div className='w-full min-h-[100vh] '>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainLayout