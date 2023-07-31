import React from 'react'
import { InputComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'
import { CategoriesModel, CategoriesResponeModel, ProductLineModel } from 'src/Model/apiModel'
import { CreateNew, FetchAllCategories } from 'src/services/api/categories'
import { FetchAll } from 'src/services/api/productline'

function Addnewcateogories() {
    const [productLine, setproductLine] = React.useState<ProductLineModel[]>([])
    const [categories, setCategories] = React.useState<CategoriesResponeModel[]>([])
    const [value, setValue] = React.useState<CategoriesModel>({
        nameCategory: "",

    })

    async function FetchApi() {
        try {
            let result = await FetchAll();
            let result1 = await FetchAllCategories()
            setCategories(result1?.data as CategoriesResponeModel[])
            setproductLine(result?.data as ProductLineModel[])
        } catch (error) {

        }
    }
    const handleInput = function (key: string, value1: any) {
        setValue({
            ...value,
            [key]: value1
        })
    }

    const handleCreateCategories = async function(){
        try {
            await CreateNew(value);
            
        } catch (error) {
            
        }
    }
    React.useEffect(() => {
        FetchApi()
    }, [])
    console.log(value)
    return (
        <>
            <MainLayout>
                <h3 className='font-medium text-lg text-center my-3'>
                    Tạo mới danh mục sản phẩm
                </h3>

                <div className='w-full min-h-fit '>
                    <InputComp
                        handleOnchange={(e) => {
                            console.log(e.target.value)
                            handleInput("nameCategory", e.target.value)
                        }}
                        leftText='Categories Name'
                    // valueInput={categories.optionName } 
                    />

                    <h3 className='font-medium mr-5 mb-4 px-2'>Parent ID</h3>
                    <select onChange={(e) => {
                        handleInput("parentID", parseInt(e.target.value) as number)
                    }} className='w-1/2 mb-5 h-12 border-[3px] px-3' name="" id="">
                        <option value={-1}>
                            0 - Không Có
                        </option>
                        {

                            categories.map((item: CategoriesResponeModel, index: number) => {
                                return <>
                                    <option value={item.catorgoryID}>
                                        {item.catorgoryID} - {item.nameCategory}
                                    </option>
                                </>
                            })
                        }
                    </select>
                    <h3 className='font-medium mr-5 mb-4 px-2'>ProductLine ID</h3>
                    <select onChange={(e) => {
                        handleInput("product_lineid", e.target.value)
                    }} className='w-1/2 mb-5 h-12 border-[3px] px-3' name="" id="">
                        {
                            productLine.map((item: ProductLineModel, index: number) => {
                                return <>
                                    <option value={item.productLineId}>
                                        {item.nameProductLine} - {item.productLineId}
                                    </option>
                                </>
                            })
                        }
                    </select>
                    <div className='flex items-center justify-end px-5'>
                        <div onClick={()=>{
                            handleCreateCategories();
                        }} className='mx-2 h-12 bg-blue-500 text-white text-center flex items-center justify-center rounded-lg '>
                            <p className='  text-white text-center  px-4'>
                                Save
                            </p>
                        </div>

                        <div className='mx-2 h-12 bg-red-500 text-white text-center flex items-center justify-center rounded-lg '>
                            <p className='  text-white text-center  px-4'>
                                Cancel
                            </p>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    )
}

export default Addnewcateogories