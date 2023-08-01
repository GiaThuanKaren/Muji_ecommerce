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
            title: "Quản Lý Danh mục sản phẩm",
            childrenItem: [
                {
                    childrenItem: [],
                    title: "Thêm danh mục mới",
                    icon: <ICON icon={IconSolid.faHome} />,
                    link: routingLink.addnewcateogories
                }
            ],
            link: routingLink.danhmucsanpham
        },



        {
            icon: <ICON icon={IconSolid.faHome} />,
            title: "Quản lý Danh mục thuộc tính",
            childrenItem: [
                {
                    childrenItem: [],
                    icon: <></>,
                    title: "Tạo danh thuộc tính mới ",
                    link: routingLink.taothuoctinh
                },
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
            title: "Quản lý người dùng ",
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
            title: "Quản lý sản phẩm",
            childrenItem: [
                {

                    title: "Thêm Sản phẩm",
                    icon: <ICON icon={IconSolid.faHome} />,
                    childrenItem:[]
                },
                {
                    title: "Quản lý dòng sản phẩm",
                    childrenItem: [
                        {
                            title: "Thêm dòng sản phẩm",
                            childrenItem: [],
                            icon: <ICON icon={IconSolid.faHome} />,
                            link: routingLink.addnewproductline
                        }

                    ],
                    icon: <ICON icon={IconSolid.faHome} />,
                    link: routingLink.productline
                },
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
    const [openSideBarUser, setOpenSideBarUser] = React.useState(true);
    console.log(openSideBarUser)
    return (
        <>
            <div className='flex max-w-screen h-screen'>
                <div className={'h-full overflow-y-auto ' + `${openSideBarUser ? " basis-1/6" : " hidden"}`}>
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
                <div className={'h-full overflow-y-auto   relative' + `${openSideBarUser ? " basis-5/6" : " w-full "}`}>
                    <Header handleCloseNav={setOpenSideBarUser} stateSideBar={openSideBarUser} />
                    <div className='w-full min-h-[100vh] '>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainLayout