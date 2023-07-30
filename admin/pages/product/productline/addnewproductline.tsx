import React from 'react'
import { InputComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'
import { ProductLineModel } from 'src/Model/apiModel'
import { CreateNewProductLine } from 'src/services/api/productline'

function Addnewproductline() {
    const [properties, setProperties] = React.useState<ProductLineModel>({
        imageProductLine: "",
        nameProductLine: ""
    })
    const handleInput = function (key: string, value: any) {
        setProperties({
            ...properties,
            [key]: value
        })
    }
    const handleCreateNewOption = async function () {
        try {
            let result = await CreateNewProductLine(properties)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <MainLayout>
                <h3 className='font-medium text-lg text-center my-3'>
                    Tạo mới dòng sản phẩm
                </h3>
                <div className='w-full min-h-fit '>
                    <InputComp
                        handleOnchange={(e) => {
                            console.log(e.target.value)
                            handleInput("nameProductLine", e.target.value)
                        }}
                        leftText='ProductLine Name'
                        valueInput={properties.nameProductLine}
                    />
                    <InputComp
                        handleOnchange={(e) => {
                            console.log(e.target.value)
                            handleInput("imageProductLine", e.target.value)
                        }}
                        leftText='ProductLine Image'
                        valueInput={properties.imageProductLine}
                    />
                    <div className='flex items-center justify-end px-5'>
                        <div onClick={handleCreateNewOption} className='mx-2 h-12 bg-blue-500 text-white text-center flex items-center justify-center rounded-lg '>
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

export default Addnewproductline