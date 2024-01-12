import Head from 'next/head'
import Image from 'next/image'
import React from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import styles from '../styles/Home.module.css'
import { MainLayout } from 'src/Layouts'
import { HorizontalProductList, SliderHome, Spinner } from 'src/Components'
import { useQueryClient, useQuery } from "react-query"
import { FetchAllProductLine } from 'src/service/api';
import { CategoriesModel, ProductLineModel } from 'src/Model';
import Link from 'next/link';
import { linkRouting } from 'src/utils/routelink';
import { useRouter } from 'next/router';

type Tab = {
  tabslug: "nu" | "nam" | "tre_em",
  name: "Nam" | "Nữ" | "Trẻ Em"

}

function TabNavigationHome() {
  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery("header_categories", FetchAllProductLine)

  console.log(data)
  const [tab, setTab] = React.useState<"Nam" | "Nữ" | "Trẻ Em">("Nam");

  let ArrTab: Tab[] = [{
    name: "Nam",
    tabslug: "nam"
  },
  {
    name: "Nữ",
    tabslug: "nu"
  },
  {
    name: "Trẻ Em",
    tabslug: "tre_em"
  }
  ]
  return <>
    <div className='w-full h-fit my-4 ove'>
      <div className='flex items-center justify-center'>
        {
          ArrTab.map((item: Tab, index: number) => {
            return <>
              <div onClick={(e) => {
                setTab(item.name)
              }} className={'mx-4 border-b-4 w-44 hover:cursor-pointer ' + `${item.name == tab ? "  border-yellow-300 text-yellow-500" : " text-gray-300" }` }>

              <p className='text-lg lg:text-base text-center w-full my-4 font-bold  uppercase  '>
                {item.name}
              </p>

            </div >

            </>
          })
        }
    </div>

    {
      data?.map((item: ProductLineModel, index: number) => {
        console.log(item.nameProductLine == tab)
        if (item.nameProductLine.trim() == tab.trim())
          return <>
            <Swiper
              slidesPerView={7}
              spaceBetween={100}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper h-56 mt-10 "
            >
              {
                item?.categoriesList.map((item: CategoriesModel, index: number) => {
                  if (item.parentID != null)
                    return <>
                      <SwiperSlide key={index}>
                        <Link href={`${linkRouting.listproduct}/${item.catorgoryID}`}>
                          <div className='h-fit  w-fit '>
                            <div className=' bg-red-500 rounded-full h-20 w-20  lg:h-32 lg:w-32'>
                              <img className='h-full w-full ' src={item.imageCategory as string}
                                alt={item.catorgoryID.toString()}
                              />
                            </div>
                            <h3 className='text-center text-xs lg:text-base my-4 font-medium'>
                              {item.nameCategory}
                            </h3>
                          </div>
                        </Link>
                      </SwiperSlide>
                    </>
                })
              }

            </Swiper>
          </>
      })
    }




  </div >
  </>
}


interface HorizontalProducItemListINf {
  id: string,
  link: string,
  title: string
}

export default function Home() {
  const {
    isReady
  } = useRouter()
  const HorizontalProducItemList: HorizontalProducItemListINf[] = [
    {
      id: "1090",
      link: `${linkRouting.listproduct}/${1179}`,
      title: "Áo khoác nữ"
    },
    {
      id: "838",
      link: `${linkRouting.listproduct}/${1179}`,
      title: "Chân Váy"
    },
    {
      id: "1179",
      link: `${linkRouting.listproduct}/${1179}`,
      title: "Áo Khoác"
    },
    {
      id: "1057",
      link: `${linkRouting.listproduct}/${1179}`,
      title: "Áo Sơ Mi"
    },
  ]
  return (
    <>
      <MainLayout >
        <SliderHome />
        <TabNavigationHome />
        {
          HorizontalProducItemList.map((item: HorizontalProducItemListINf, index: number) => {
            return <>
              <HorizontalProductList
                id={item.id}
                link={item.link}
                title={item.title}
              />
            </>
          })
        }

        {/* <HorizontalProductList id='1179' link={`${linkRouting.listproduct}/${1179}`} title='' />
        <HorizontalProductList id='1179' link={`${linkRouting.listproduct}/${1179}`} title='' />
        <HorizontalProductList id='1179' link={`${linkRouting.listproduct}/${1179}`} title='' /> */}
      </MainLayout>
    </>
  )
}
