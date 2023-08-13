import React from 'react'
import { InputComp, ModalWrapper, TableComp } from 'src/Components';
import { MainLayout } from 'src/Layouts'
import { CategoriesModel, CategoriesResponeModel } from 'src/Model/apiModel'
import { DeleteCatorgiesById, FetchAllCategories, UpdateCategoriesById } from 'src/services/api/categories';
import { ICON, IconSolid } from 'src/utils';

function CatogoriesIndex() {
    const [properties, setProperties] = React.useState<CategoriesResponeModel[]>([])
    const [openModal, setOpenModal] = React.useState(false)
    const [value, setValue] = React.useState<CategoriesModel>({
        catorgoryID: 1,
        nameCategory: "",
        parentID: undefined,

    })

    const HandleDelete = async function (id: number) {
        try {
            await DeleteCatorgiesById(id)
            await FetchApi();
        } catch (error) {

        }
    }
    const HandleUpdate = async function (categoriesModel: CategoriesModel) {
        try {
            await UpdateCategoriesById(categoriesModel);
            await FetchApi();
            setOpenModal(false)
        } catch (error) {

        }
    }
    async function FetchApi() {
        try {
            let result = await FetchAllCategories();
            setProperties(result?.data as CategoriesResponeModel[])
        } catch (error) {

        }
    }
    React.useEffect(() => {

        FetchApi()
    }, [])

    return (
        <>
            <MainLayout>
                {
                    openModal && <>
                        <ModalWrapper openModalState={openModal} handleOpenModalState={setOpenModal} >
                            <h3 className='text-center font-medium py-2'>
                                Chỉnh sửa thuộc tính
                            </h3>
                            <InputComp disable valueInput={value?.catorgoryID} leftText='Option ID' widthFull />
                            <InputComp handleOnchange={(e) => {
                                setValue({
                                    ...value,
                                    nameCategory: e.target.value
                                })
                            }} valueInput={value?.nameCategory} leftText='Option Name' widthFull />
                            {/* <InputComp valueInput={value?.parentID ? value?.parentID : "Không Có"} leftText='Option Name' widthFull /> */}
                            <h3 className='font-medium mr-5 mb-4 px-2'>Parent ID</h3>
                            <select defaultValue={value?.parentID} onChange={(e) => {
                                let id = parseInt(e.target.value)
                                setValue({
                                    ...value,
                                    parentID: id
                                })

                            }} className='w-full mb-5 h-12' name="" id="">
                                <option value="0">
                                    Không
                                </option>
                                {

                                    properties.filter(function (item: CategoriesResponeModel) { return item.catorgoryID !== value?.catorgoryID }).map((item: CategoriesResponeModel, index: number) => {
                                        return <>
                                            
                                            <option value={item.catorgoryID}>
                                                {item.catorgoryID} - {item.nameCategory}
                                            </option>
                                        </>
                                    })
                                }
                            </select>
                            <div className='flex items-center justify-end px-5'>
                                <div onClick={() => {
                                    HandleUpdate(value);
                                }} className='mx-2 h-12 bg-blue-500 text-white text-center flex items-center justify-center rounded-lg '>
                                    <p className='  text-white text-center  px-4'>
                                        Save
                                    </p>
                                </div>

                                <div onClick={() => {
                                    setOpenModal(false)
                                }} className='mx-2 h-12 bg-red-500 text-white text-center flex items-center justify-center rounded-lg '>
                                    <p className='  text-white text-center  px-4'>
                                        Cancel
                                    </p>
                                </div>
                            </div>
                        </ModalWrapper>
                    </>
                }
                <TableComp handleDelete={() => { }} handleEdit={() => { }} headerRow={[
                    "Categories ID",
                    "Categories Name",
                    "Parent Categories ID"
                ]} totalData={properties.length} displayEachPage={4} >

                    <tbody>

                        {
                            properties.map((item: CategoriesResponeModel, index: number) => {
                                return <>
                                    <tr key={index} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.catorgoryID}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.nameCategory}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.parentID ? item.parentID.catorgoryID : "Không Có"}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">

                                            <ICON onClick={() => {
                                                setOpenModal(true)
                                                setValue({
                                                    nameCategory: item.nameCategory,
                                                    catorgoryID: item.catorgoryID,
                                                    parentID: item.parentID ? item.parentID.catorgoryID : undefined
                                                })
                                            }} className='p-3 bg-yellow-300 mx-2 rounded-full' icon={IconSolid.faPenToSquare} />
                                            <ICON onClick={() => {
                                                let result = confirm("Do you want to delete it ?")
                                                if (result) {
                                                    HandleDelete(item.catorgoryID as number);
                                                    // HandleDelete(item.optionID as number)
                                                }
                                            }} className='p-3 bg-red-300 rounded-full' icon={IconSolid.faTrash} />
                                        </td>
                                    </tr>
                                </>
                            })
                        }


                    </tbody>
                </TableComp>
            </MainLayout >
        </>
    )
}

export default CatogoriesIndex