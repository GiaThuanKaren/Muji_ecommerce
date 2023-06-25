import Head from 'next/head'
import Image from 'next/image'
import React from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import styles from '../styles/Home.module.css'
import { MainLayout } from 'src/Layouts'
import { HorizontalProductList, SliderHome } from 'src/Components'


type Tab = {
  tabslug: "nu" | "nam" | "tre_em",
  name: "Nam" | "Nữ " | "Trẻ Em"

}

function TabNavigationHome() {
  const [tab, setTab] = React.useState<"nu" | "nam" | "tre_em">("nam");
  const [data, setData] = React.useState(() => {
    return Array.from(Array(10).keys())
  })
  let ArrTab: Tab[] = [{
    name: "Nam",
    tabslug: "nam"
  },
  {
    name: "Nữ ",
    tabslug: "nu"
  },
  {
    name: "Trẻ Em",
    tabslug: "tre_em"
  }
  ]
  return <>
    <div className='w-full h-fit my-4'>
      <div className='flex items-center justify-center'>
        {
          ArrTab.map((item: Tab, index: number) => {
            return <>
              <div className='mx-4 border-b-2 w-44 '>
                <p className='text-center w-full my-4 font-medium'>{item.name} </p>
              </div>
            </>
          })
        }


      </div>
      <Swiper
        slidesPerView={7}
        spaceBetween={50}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper h-56 mt-10"
      >
        {
          data.map((item: any, index: number) => {
            return <>
              <SwiperSlide key={index}>
                <div className='h-full  w-full p-2'>
                  <div className='bg-red-500 rounded-full   h-32 w-32'>

                  </div>
                </div>
              </SwiperSlide>
            </>
          })
        }
      </Swiper>
    </div>
  </>
}


export default function Home() {
  return (
    <>
      <MainLayout >
        <SliderHome />
        <TabNavigationHome />
        <HorizontalProductList link='' title='' />
      </MainLayout>
    </>
  )
}
