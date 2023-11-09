import React from 'react'
import { MainLayout } from 'src/Layouts'
import { DisplayProductBySludPage2 } from './[slugproduct]'
import { ProductModel, ResponeModel } from 'src/Model'
import { Pagination } from 'src/Components/Pagination/Pagination'
import { CardProduct } from 'src/Components'

interface IProduct {
    onCurrentPage: number,
    setListProduct: (listProduct: ResponeModel<ProductModel>) => void
    setGetTotalCount: (getTotalCount: number) => void
}

interface FilterAPI {
    ListProductApi: IProduct,
    FetchType: 'FetchApi' | 'FetchApi2'
}

const PRODUCT_PER_PAGE = 10;

function Search() {
    const [listProduct, setListProduct] = React.useState<ResponeModel<ProductModel>>()
    const [getTotalCount, setGetTotalCount] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);

    const onPageChange = (page: number) => {
        setCurrentPage(page)
    }

    const FetchData = (
        currentPage: number,
        setListProduct: (listProduct: ResponeModel<ProductModel>) => void,
        setGetTotalCount: (getTotalCount: number) => void
    ): FilterAPI => {
        const ProductApi: IProduct = {
            onCurrentPage: currentPage, 
            setListProduct: setListProduct ,
            setGetTotalCount: setGetTotalCount
        }

        const FetchType = 'FetchApi2'

        return { ListProductApi: ProductApi, FetchType }
    }

    console.log('List product -> ', listProduct);
    

    return (
        <>
            <MainLayout>
                <DisplayProductBySludPage2 handle={() => FetchData(currentPage, setListProduct, setGetTotalCount)}>
                    <div className='flex-1 px-2 py-3'>
                        <div className='w-full  flex flex-wrap'>
                            {
                                listProduct?.data &&

                                    listProduct?.data.length > 0 ? <>
                                    {
                                        listProduct.data.map((item: ProductModel, index: number) => {
                                            return <>
                                                <CardProduct key={index} {...item} />
                                            </>
                                        })
                                    }

                                    <Pagination
                                        currentPage={currentPage}
                                        totalCount={getTotalCount}
                                        pageCount={PRODUCT_PER_PAGE}
                                        onPageChange={onPageChange}
                                    />
                                </>
                                    :
                                    <>
                                        <h3 className='text-center w-full font-medium '>
                                            {/* {listProduct?.message} */}
                                            <p>Can't find product</p>
                                        </h3>
                                    </>
                            }
                        </div>
                    </div>
                </DisplayProductBySludPage2>
            </MainLayout>
        </>
    )
}

export default Search