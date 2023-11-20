import { icon } from '@fortawesome/fontawesome-svg-core'
import { type } from 'os'
import React from 'react'
import { Header } from 'src/Components'
import DropOutItem from 'src/Components/DropOutItem'
import { DropOutSideBarItem } from 'src/Model'
import { PermissionResponeModel } from 'src/Model/apiModel'
import { FindPermissionByRole } from 'src/services/api/permission'
import { ICON, IconSolid } from 'src/utils'
import { routingLink } from 'src/utils/routingLink'
import { LiaUser } from 'react-icons/lia'
import { PiShirtFolded } from 'react-icons/pi'
import { IoShirtOutline } from 'react-icons/io5'
import { LiaShippingFastSolid } from 'react-icons/lia'
import { SiAdminer } from 'react-icons/si'
import { PiOptionLight } from 'react-icons/pi'
import { LiaProductHunt } from 'react-icons/lia'
import { LuLayoutDashboard } from 'react-icons/lu'
import { CiLogout } from 'react-icons/ci'
import { BsCartPlus } from "react-icons/bs";
import { TfiPieChart } from "react-icons/tfi";
import { TbPackageExport } from "react-icons/tb";
import useAuth from 'src/utils/useAuth'
import Unauthorized from 'pages/unauthorized'
interface Props {
    children: React.ReactNode
    errorFetch?: boolean
}

enum IconFunction {
    CATEGORIES = "danhmucsanpham",
    OPTION = "thuoctinh",
    USER = "nguoidung",
    PRODUCT = "sanpham",
    SHIPPING = "donhang",
    PERMISSION = "phanquyen",
    SUPPLIER = "supplier",
    POS = "pos",
    STATISTIC = "statistic"
}

const HandleIconFunction  = (icon: IconFunction) => {
    switch (icon) {
        case IconFunction.CATEGORIES:
            return <LiaProductHunt style={{minWidth: "22px"}} size={25} color='rgb(17 0 111)' />
        case IconFunction.OPTION:
            return <PiOptionLight style={{minWidth: "22px"}} size={25} color='rgb(17 0 111)' />
        case IconFunction.USER:
            return <LiaUser style={{minWidth: "22px"}} size={25} color='rgb(17 0 111)' />
        case IconFunction.PRODUCT:
            return <IoShirtOutline style={{minWidth: "22px"}} size={25} color='rgb(17 0 111)' />
        case IconFunction.SHIPPING:
            return <LiaShippingFastSolid style={{minWidth: "22px"}} size={25} color='rgb(17 0 111)' />
        case IconFunction.PERMISSION:
            return <SiAdminer style={{minWidth: "22px"}} size={25} color='rgb(17 0 111)' />
        case IconFunction.SUPPLIER:
            return <TbPackageExport style={{minWidth: "22px"}} size={25} color='rgb(17 0 111)' />
        case IconFunction.POS:
            return <BsCartPlus style={{minWidth: "22px"}} size={25} color='rgb(17 0 111)' />
        case IconFunction.STATISTIC:
            return <TfiPieChart style={{minWidth: "22px"}} size={25} color='rgb(17 0 111)' />
        default:
            return <LuLayoutDashboard style={{minWidth: "22px"}} size={25} color='rgb(17 0 111)' />
    }
}

function ErrorFetching() {
    return <>
        <div className='w-full min-h-[100vh] flex items-center justify-center '>
            <div className='w-full h-full '>
                <img
                    className='h-full w-full object-cover'
                    src="https://cdn.dribbble.com/users/2593544/screenshots/16395075/media/4a46fb5afcd61660301eb42c1194ea79.jpg?resize=1000x750&vertical=center" alt=""
                />
            </div>
        </div>
    </>
}

function MainLayout({ children, errorFetch }: Props) {

    const [rolePermission, setRolePermission] = React.useState<PermissionResponeModel[]>([]);
    const authContext = useAuth();

    // console.log('Employee Authentication With Role ', authContext?.isAuthenticated());

    const FetchApi = async () => {
        try {
            let result = await FindPermissionByRole(Number(authContext?.auth.role))
            console.log(result.data);
            
            setRolePermission(result.data)
        } catch (error) {
            
        }
    }

    React.useEffect(() => {
        FetchApi()
    }, []);

    // NOTE >> Menu navbar
    
    let data: DropOutSideBarItem[] = rolePermission.map((item: PermissionResponeModel, index: number) => ({
        icon: HandleIconFunction(item.slug),
        title: item.function_name,
        childrenItem: [],
        link: routingLink[item.slug],
    }));
        
        // {
        //     icon: <ICON icon={IconSolid.faHome} />,
        //     title: "Dashboard",
        //     childrenItem: [],
        //     link: routingLink.dashboard
        // },
        // {
        //     icon: <ICON icon={IconSolid.faHome} />,
        //     title: "Quản Lý Danh mục sản phẩm",
        //     childrenItem: [
        //         // {
        //         //     childrenItem: [],
        //         //     title: "Thêm danh mục mới",
        //         //     icon: <ICON icon={IconSolid.faHome} />,
        //         //     link: routingLink.addnewcateogories
        //         // }
        //     ],
        //     link: routingLink.danhmucsanpham
        // },



        // {
        //     icon: <ICON icon={IconSolid.faHome} />,
        //     title: "Quản lý Danh mục thuộc tính",
        //     childrenItem: [
        //         // {
        //         //     childrenItem: [],
        //         //     icon: <></>,
        //         //     title: "Tạo danh thuộc tính mới ",
        //         //     link: routingLink.taothuoctinh
        //         // },
        //         // {
        //         //     childrenItem: [],
        //         //     icon: <ICON icon={IconSolid.faHome} />,
        //         //     title: "Create New User"
        //         // },
        //         // {
        //         //     childrenItem: [],
        //         //     icon: <ICON icon={IconSolid.faHome} />,
        //         //     title: "Get Detail;"
        //         // },
        //     ],
        //     link: routingLink.thuoctinh
        // },
        // {
        //     icon: <ICON icon={IconSolid.faHome} />,
        //     title: "Quản lý người dùng ",
        //     childrenItem: [

        //     ],
        //     link: routingLink.nguoidung
        // },

        // {
        //     title: "Quản lý sản phẩm",
        //     childrenItem: [




        //     ],
        //     icon: <ICON icon={IconSolid.faHome} />,
        //     link: routingLink.sanpham
        // },
        // {

        //     title: "Quản lý mã Sản phẩm",
        //     icon: <ICON icon={IconSolid.faHome} />,
        //     childrenItem: [],
        //     link: routingLink.productsku
        // },
        // {
        //     title: "Quản lý dòng sản phẩm",
        //     childrenItem: [

        //     ],
        //     icon: <ICON icon={IconSolid.faHome} />,
        //     link: routingLink.productline
        // },
        // {
        //     title: "Quản lý đơn hàng",
        //     childrenItem: [
        //         // {
        //         //     title: "Get All Shipping Status In All Product",
        //         //     childrenItem: [],
        //         //     icon: <ICON icon={IconSolid.faHome} />
        //         // }


        //     ],
        //     icon: <ICON icon={IconSolid.faHome} />,
        //     link: routingLink.donhang
        // },
        // {
        //     title: "Phân Quyền",
        //     childrenItem: [
        //         // {
        //         //     title: "Get All Shipping Status In All Product",
        //         //     childrenItem: [],
        //         //     icon: <ICON icon={IconSolid.faHome} />
        //         // }


        //     ],
        //     icon: <ICON icon={IconSolid.faHome} />,
        //     link: routingLink.phanquyen
        // },

    // ]

    const [openSideBarUser, setOpenSideBarUser] = React.useState(true);

    return (
        authContext?.isAuthenticated() ? 
        <>
            <div className='flex max-w-screen h-screen bg-[#f5f5f7]'>
                <div className={'h-full overflow-y-auto transition-all ease-in-out duration-500 bg-white border-r-2 border-r-[#F5F5F7] ' + `${openSideBarUser ? " w-[220px]" : " w-[56px] bg-slate-200"}`}>
                    <div className='w-full py-5 '>
                        <div className='px-3 py-6'>
                            <img src="https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/logo.svg?1698399319969" alt="" />
                        </div>
                        <div className='px-2 w-full h-[10px] '>
                            <div className='bg-gray-400 w-full h-[1px]'></div>
                        </div>
                        <p className='px-3 pt-6 pb-1 font-medium text-[13px] text-[#FCAF17]'>Main</p>
                        {
                            data.map((item: DropOutSideBarItem, index: number) => {
                                return <>
                                    <DropOutItem {...item} />
                                </>
                            })
                        }
                        <p className='px-3 pt-6 pb-1 font-medium text-[13px] text-[#fcaf17]'>Oth</p>
                        <DropOutItem 
                            icon={<CiLogout style={{minWidth: "22px"}} size={25} color='rgb(17 0 111)' />}
                            title='Logout'
                            link='/logout'
                            childrenItem={[]}
                        />
                    </div>
                </div>
                
                <div className={'h-full overflow-y-auto relative' + `${openSideBarUser ? " basis-5/6" : " w-full "}`}>
                    <Header handleCloseNav={setOpenSideBarUser} stateSideBar={openSideBarUser} />
                    {
                        errorFetch ? <ErrorFetching /> :
                            <div className='w-full min-h-[100vh]'>
                                <div className='mx-5 my-5 bg-white rounded-lg'>
                                    {children}
                                </div>
                            </div>
                    }
                </div>
            </div>
            
        </> : <Unauthorized />
    )
}

export default MainLayout