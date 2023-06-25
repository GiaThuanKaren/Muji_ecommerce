import Link from 'next/link';
import React from 'react'
import { ICON, IconSolid } from 'src/utils/icon';

interface Props {
    title: string;
    link: string;
}

function HorizontalProductList({ link, title }: Props) {
    return (
        <>
            <div className='w -full h-fit'>
                <div className='flex items-center justify-between'>
                    <p className='font-medium'>Breast Cancer Semantic Segmentation (BCSS) dataset</p>
                    <Link className='flex items-center' href={link}>
                        <p className='font-medium '>Xem Thêm </p>
                        <ICON className='ml-3' icon={IconSolid.faChevronRight} />
                    </Link>
                </div>

            </div>
        </>
    )
}

export default HorizontalProductList