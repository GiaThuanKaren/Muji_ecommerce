import React from 'react'
import { InputComp, ModalWrapper, SelectInputComp, TableComp } from 'src/Components'
import { MainLayout } from 'src/Layouts'
import { FunctionModel, RoleModel, PermissionModel } from 'src/Model/apiModel'
import { DeleteRoleById, FetchAllRole, UpdateRoleById } from 'src/services/api/role'
import { DeleteFunctionById, FetchAllFunction, UpdateFunctionById } from 'src/services/api/function'
import { CreatePermission, DeletePermissionById, FetchAllPermission, UpdatePermissionById } from 'src/services/api/permission'
import { ICON, IconSolid } from 'src/utils'
import { log } from 'console'
import Link from 'next/link'
import { routingLink } from 'src/utils/routingLink'


function GetAllPermission() {
    const [properties, setProperties] = React.useState<RoleModel[]>([])
    const [openModal, setOpenModal] = React.useState(false)
    const [value, setValue] = React.useState<RoleModel>({
        roleName: "",
        roleId: -1,
    })
    const handleInput = function (key: string, value1: any) {
        setValue({
            ...value,
            [key]: value1
        })
    }

    const [roles, setRoles] = React.useState<RoleModel[]>([]);
    const [functions, setFunctions] = React.useState<FunctionModel[]>([]);
    const [permissions, setPermissions] = React.useState<PermissionModel[]>([]);
    const [selectedRole, setSelectedRole] = React.useState<number>();
    const [checked, setChecked] = React.useState([]);

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRoleId = event.target.value;
        setSelectedRole(selectedRoleId);
    };

    const HandlePermission = async function (id: number) {

        const isChecked = permissions.some((permission) =>
            permission.permission.roleId == selectedRole &&
            permission.permission.functionId == id
        )

        setPermissions(prev => {

            if (isChecked) {
                return permissions.filter(Per => Per.permission.functionId != id)
            } else {
                return [...prev, { permission: { roleId: selectedRole, functionId: id } }]
            }
        })



        try {
            if (isChecked) {

                await DeletePermissionById(selectedRole, id)
                await FetchApi()
            } else {
                await CreatePermission(
                    { permission: { roleId: selectedRole, functionId: id } }
                )
                await FetchApi()
            }
        } catch (error) {

        }

    }
    const HandleUpdate = async function () {
        try {
            await UpdateRoleById(value)
            await FetchApi();
            setOpenModal(false)
        } catch (error) {

        }
    }
    const HandleDelete = async function (id: number) {
        try {
            await DeleteRoleById(id)
            await FetchApi();
        } catch (error) {

        }
    }
    async function FetchApi() {
        try {

            let [role, func, permission] = await Promise.all([FetchAllRole(), FetchAllFunction(), FetchAllPermission()])

            setRoles(role?.data as RoleModel[])
            setFunctions(func?.data as FunctionModel[])
            setPermissions(permission?.data as PermissionModel[])

        } catch (error) {
            console.error(error);
        }
    }
    React.useEffect(() => {
        FetchApi()
    }, [])

    return (
        <>
            <MainLayout>
                <div className='flex justify-between px-5'>
                    <div className='flex items-center'>
                        <Link className='mx-3' href={`${routingLink.taorole}`}>
                            <div className='bg-blue-300 px-3 py-2 rounded-md hover:cursor-pointer '>
                                <h3 className='text-white font-medium'>Create New</h3>
                            </div>
                        </Link>
                    </div>

                </div>
                {
                    openModal && <>
                        <ModalWrapper openModalState={openModal} handleOpenModalState={setOpenModal} >
                            <h3 className='text-center font-medium py-2'>
                                Chỉnh sửa thuộc tính
                            </h3>

                            <InputComp disable valueInput={value?.roleId} leftText='Role ID' widthFull />
                            <InputComp handleOnchange={(e) => {
                                handleInput("roleName", e.target.value)
                            }} valueInput={value?.roleName} leftText='Role name' widthFull />
                            <div className='flex items-center justify-end px-5'>
                                <div onClick={HandleUpdate} className='mx-2 h-12 bg-blue-500 text-white text-center flex items-center justify-center rounded-lg '>
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
                {roles && <TableComp h1='Role' handleDelete={() => { } } handleEdit={() => { } } headerRow={[
                    "ID",
                    "Role Name",
                ]} totalData={roles.length} displayEachPage={4} >

                    <tbody>
                        {
                            roles.map((item: RoleModel, index: number) => {
                                return <>
                                    <tr key={index} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.roleId}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {item.roleName}
                                        </td>

                                        <td className="whitespace-nowrap px-6 py-4">

                                            <ICON onClick={() => {
                                                setOpenModal(true)
                                                setValue(item)
                                            }} className='p-3 bg-yellow-300 mx-2 rounded-full' icon={IconSolid.faPenToSquare} />
                                            <ICON onClick={() => {
                                                let result = confirm("Do you want to delete it ?")
                                                if (result) {
                                                    HandleDelete(item.roleId)
                                                }
                                            }} className='p-3 bg-red-300 rounded-full' icon={IconSolid.faTrash} />
                                        </td>
                                    </tr>
                                </>
                            })
                        }

                    </tbody>
                </TableComp>}
                <div>
                    <label>Chọn vai trò:</label>
                    <select onChange={handleRoleChange} value={selectedRole}>
                        <option value="">Chọn vai trò</option>
                        {roles.map((role) => (
                            <option key={role.roleId} value={role.roleId}>{role.roleName}</option>
                        ))}
                    </select>
                    <div>
                        {selectedRole && (
                            <div>
                                <h2>Danh sách chức năng cho vai trò {selectedRole}</h2>
                                <ul>
                                    {functions.map((func) => (
                                        <li key={func.functionId}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    onChange={() => HandlePermission(func.functionId)}
                                                    checked={permissions.some((permission) =>
                                                        permission.permission.roleId == selectedRole &&
                                                        permission.permission.functionId == func.functionId
                                                    )}
                                                />
                                                {func.functionName}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </MainLayout>
        </>
    )
}

export default GetAllPermission