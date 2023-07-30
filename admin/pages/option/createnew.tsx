import React from 'react'
import { InputComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'
import { OptionModel } from 'src/Model/apiModel'
import { CreateNewOption } from 'src/services/api'

function CreateNew() {
    const [properties, setProperties] = React.useState<OptionModel>({
        optionName: ""
    })
    const handleInput = function (key: string, value: any) {
        setProperties({
            ...properties,
            [key]: value
        })
    }
    const handleCreateNewOption = async function () {
        try {
            let result = await CreateNewOption(properties)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <MainLayout>
                <h3 className='font-medium text-lg text-center my-3'>
                    Tạo mới danh thuộc tính
                </h3>
                <div className='w-full min-h-fit '>
                    <InputComp
                        handleOnchange={(e) => {
                            console.log(e.target.value)
                            handleInput("optionName", e.target.value)
                        }}
                        leftText='Option Name'
                        valueInput={properties.optionName}
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

export default CreateNew