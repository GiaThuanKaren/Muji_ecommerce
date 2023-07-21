import React from 'react'
import SearchInput from '../Search'
import { ICON, IconSolid } from 'src/utils'

interface Props {
    handleCloseNav: React.Dispatch<React.SetStateAction<boolean>>
    stateSideBar: boolean
}

function Header({ handleCloseNav, stateSideBar }: Props) {
    const [openNavUser, setOpenNavUser] = React.useState(false);
    return (
        <>
            <div className='flex items-center justify-between  bg-white px-4 py-4 w-full'>

                <ICON onClick={() => {
                    handleCloseNav(!stateSideBar)
                }} icon={IconSolid.faBars} />
                <div className='h-12 w-12 rounded-full bg-red-500 overflow-hidden'>
                    <img
                        className='h-full w-full '
                        src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/7066410426036125697.jpeg?x-expires=1689246000&x-signature=hsOwgZmg1LgKxeNTGZTQvgddlvM%3D" alt="" />
                </div>




                {/* <div className=''>
                    <SearchInput />
                </div>
                <div className='basis-3/12'>
                    <div className='flex items-center  w-full'>
                        <div className='w-11 h-11 bg-red-300 rounded-full'>

                        </div>
                        <ICON className='mx-3' icon={IconSolid.faBell} />
                        <ICON className='mx-3' icon={IconSolid.faEnvelope} />
                        <div className='w-11 h-11 bg-red-300 rounded-full'>

                        </div>
                       
                    </div>

                </div> */}



            </div>

        </>
    )
}

export default Header