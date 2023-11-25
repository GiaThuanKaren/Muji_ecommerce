import React from 'react'
import { InputComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'
import { RoleModel, SupplierModel } from 'src/Model/apiModel'
import { CreateNewOption } from 'src/services/api/option'
import { CreateNewRole } from 'src/services/api/role'
import { CreateNewSupplier } from 'src/services/api/supplier'

function CreateNew() {
    const [properties, setProperties] = React.useState<SupplierModel>({
        supplier_name: ""
    })
    const handleInput = function (key: string, value: any) {
        setProperties({
            ...properties,
            [key]: value
        })
    }
    const handleCreateNewSupplier = async function () {
        try {
            let result = await CreateNewSupplier(properties)
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
                            handleInput("supplier_name", e.target.value)
                        }}
                        leftText='Supplier Name'
                        valueInput={properties.supplier_name}
                    />
                    <InputComp
                        handleOnchange={(e) => {
                            console.log(e.target.value)
                            handleInput("supplier_address", e.target.value)
                        }}
                        leftText='Supplier Address'
                        valueInput={properties.supplier_address}
                    />
                    <div className='flex items-center justify-end px-5'>
                        <div onClick={handleCreateNewSupplier} className='mx-2 h-12 bg-blue-500 text-white text-center flex items-center justify-center rounded-lg '>
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