'use client'

import React, {useEffect, useState} from "react";
import {setBreadcrumb} from "@/store/slices/app";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/configureStore";
import {Attribute, Category} from "../../../../../utils/types";
import _ from "lodash";
import {Button, Flex, Input, Modal, Popconfirm, Select, Switch, Table, TableProps} from "antd";
import {DeleteOutlined, PlusOutlined, ReloadOutlined} from "@ant-design/icons";
import {ADDABLE_INPUT_TYPE, ATTRIBUTE_INPUT_TYPE} from "../../../../../utils/constants";
import {submitValidation} from "@/app/admin/categories/[action]/validate";
import ErrorMessage from "@/components/ErrorMessage";
import {capitalizeOnlyFirstLetter, getNotification} from "../../../../../utils/helper";
import {requestCreateCategory, requestGetCategoryById} from "@/api/category";
import {setCurrentCategory} from "@/store/slices/category";
import {useRouter} from "next/navigation";

type DataType = {
    key: number,
    label: string,
    input_type: string,
    initial_value: string[] | null,
    is_required: boolean,
    is_deleted: boolean
}

interface AttributeWithKey extends Attribute {
    key: number
}

interface ErrorSubmit {
    name: string,
    attribute: {
        label: string,
        initialValues: string
    }
}

const Label = ({label, isRequired = false, className = ''}: {
    label: string,
    isRequired?: boolean,
    className?: string
}) =>
    <div className={`font-medium text-[16px] mb-1.5 ${className}`}>
        {label} {isRequired ? <span className={'text-[red]'}>*</span> : ''}
    </div>

const initialAttribute: Attribute = {
    label: '',
    initial_value: null,
    input_type: ATTRIBUTE_INPUT_TYPE.TEXT.VALUE,
    is_required: true,
    is_deleted: false
}

const initialCategory: Category = {
    name: '',
    description: '',
    attributes: []
}

export default function CategoryAction({params}: { params: { action: string } }) {
    const currentCategory = useSelector((state: RootState) => state.category.currentCategory)
    const [category, setCategory] = useState<Category>(initialCategory)
    const inputTypeOptions = Object.values(ATTRIBUTE_INPUT_TYPE).map(item => ({
        label: item.LABEL,
        value: item.VALUE
    }))
    const [currentAttributeIndex, setCurrentAttributeIndex] = useState<number>(-1)
    const [currentAttributeToAddInitialValue, setCurrentAttributeToAddInitialValue] = useState<Attribute | undefined>(undefined)
    const [initialValues, setInitialValues] = useState<string[]>([''])
    const [selectedAttributes, setSelectedAttributes] = useState<AttributeWithKey[]>([])
    const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false)
    const AddButton = ({isAddable, index, children}: { isAddable: boolean, index: number, children: any }) =>
        <Button
            disabled={!isAddable}
            rootClassName={`w-full border-none h-[64px] text-[#1677ff]`}
            onClick={() => handleOpenModalAddInitialValue(index)}
        >
            {children}
        </Button>
    const attributeTableColumns: TableProps<DataType>['columns'] = [
        {
            title: 'Tên thuộc tính',
            dataIndex: 'label',
            width: 200,
            render: (text: string, _, index: number) => <Input
                placeholder={'Nhập tên thuộc tính'}
                value={text}
                onChange={e => handleChangeAttribute(e.target.value, 'label', index)}
            />
        },
        {
            title: 'Kiểu đầu vào',
            dataIndex: 'input_type',
            width: 200,
            render: (text: string, _, index: number) =>
                <Select
                    rootClassName={'w-full'}
                    className={'main-select'}
                    options={inputTypeOptions}
                    placeholder={'Nhập tên thuộc tính'}
                    value={text}
                    onChange={e => handleChangeAttribute(e, 'input_type', index)}
                />
        },
        {
            title: 'Các lựa chọn',
            dataIndex: 'initial_value',
            align: 'center',
            width: 150,
            render: (text: any, record: DataType, index: number) => {
                const isAddable: boolean = ADDABLE_INPUT_TYPE?.includes(category.attributes?.[index].input_type)
                const options: string[] | null = category?.attributes?.[index]?.initial_value ?
                    category?.attributes?.[index]?.initial_value?.filter(item => item !== '') : null
                return (!options || options?.length === 0) ?
                    <AddButton index={index} isAddable={isAddable}><PlusOutlined/></AddButton> :
                    <AddButton index={index} isAddable={isAddable}>Bấm để xem</AddButton>
            }
        },
        {
            title: 'Bắt buộc',
            dataIndex: 'is_required',
            align: 'center',
            width: 120,
            render: (text: boolean, _, index: number) => <Switch
                onChange={e => handleChangeAttribute(e, 'is_required', index)}
                className={'main-switch'}
                checked={text}
            />
        },
        {
            title: '',
            align: 'center',
            width: 80,
            render: (text, _, index: number) => {
                return <Popconfirm
                    okButtonProps={{className: 'bg-[#1677ff]'}}
                    title="Xóa thuộc tính này?"
                    onConfirm={() => handleDeleteAttribute(index)}
                >
                    <div className={'text-[red] cursor-pointer'}>Xóa</div>
                </Popconfirm>
            }
        }
    ]
    const [errorSubmit, setErrorSubmit] = useState<ErrorSubmit>({
        name: '',
        attribute: {
            label: '',
            initialValues: ''
        }
    })
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        let breadcrumb = [{
            path: '/admin/categories',
            name: 'Quản lý danh mục'
        }]
        if (params.action !== 'create') {
            if (!_.isEmpty(currentCategory)) {
                setCategory(currentCategory)
            } else {
                requestGetCategoryById(params.action)
                    .then(res => {
                        dispatch(setCurrentCategory(res.data.category))
                        setCategory(res.data.category)
                    })
                    .catch(err => {
                        getNotification('error', 'Không lấy được thông tin danh mục')
                        router.push('/admin/categories')
                    })
            }
            dispatch(setBreadcrumb([...breadcrumb, {name: currentCategory?.name}]))
        } else {
            dispatch(setBreadcrumb([...breadcrumb, {name: 'Tạo mới'}]))
        }
    }, [currentCategory, dispatch, params.action])

    const handleResetAttributeErrorSubmit = () => {
        setErrorSubmit({
            ...errorSubmit,
            attribute: {
                label: '',
                initialValues: ''
            }
        })
    }

    const handleOpenModalAddInitialValue = (attributeIndex: number): void => {
        handleResetAttributeErrorSubmit()
        setCurrentAttributeIndex(attributeIndex)
        const selectedAttribute = category.attributes?.find((item: Attribute, index: number) => index === attributeIndex)
        setCurrentAttributeToAddInitialValue(selectedAttribute)
        if (selectedAttribute?.initial_value) {
            setInitialValues(selectedAttribute?.initial_value)
        }
    }

    const handleAddAttribute = () => {
        // @ts-ignore
        setCategory({
            ...category,
            attributes: [
                ...category?.attributes,
                initialAttribute
            ]
        })
    }

    const handleChangeCategory = (value: string, type: string) => {
        if (type === 'name') {
            setErrorSubmit({
                ...errorSubmit,
                name: ''
            })
        }
        setCategory({
            ...category,
            [type]: value
        })
    }

    const handleDeleteAttribute = (index: number) => {
        handleResetAttributeErrorSubmit()
        let afterCategory: Category = _.cloneDeep(category)
        if (!category.attributes?.[index]?._id) {
            afterCategory = {
                ...afterCategory,
                attributes: afterCategory.attributes?.filter((item, currentIndex) => currentIndex !== index)
            }
        } else {
            afterCategory = {
                ...afterCategory,
                attributes: [
                    ...afterCategory.attributes?.slice(0, index),
                    {
                        ...afterCategory.attributes?.[index],
                        is_deleted: true
                    },
                    ...afterCategory.attributes?.slice(index + 1)
                ]
            }
        }
        setCategory(afterCategory)
    }

    const handleChangeAttribute = (value: string | boolean, type: string, index: number) => {
        handleResetAttributeErrorSubmit()
        let initialValue = null
        if (type === 'input_type') {
            initialValue = ADDABLE_INPUT_TYPE.includes(value as string) ? [''] : null
            setInitialValues([''])
        }
        setCategory({
            ...category,
            attributes: [
                ...category.attributes?.slice(0, index),
                {
                    ...category.attributes[index],
                    [type]: value,
                    initial_value: initialValue
                },
                ...category.attributes?.slice(index + 1)
            ]
        })
    }

    const handleSetInitialValueForAttribute = () => {
        let currentAttribute: Attribute | undefined = _.cloneDeep(currentAttributeToAddInitialValue)
        const okInitialValues: string[] = initialValues?.filter(item => item !== '')
        if (currentAttribute && okInitialValues?.length > 0) {
            currentAttribute = {
                ...currentAttribute,
                initial_value: okInitialValues
            }
            setCategory({
                ...category,
                attributes: [
                    ...category.attributes?.slice(0, currentAttributeIndex),
                    currentAttribute,
                    ...category.attributes?.slice(currentAttributeIndex + 1)
                ]
            })
            setCurrentAttributeToAddInitialValue(undefined)
        }
    }

    const handleSelectMultipleAttribute = (_: any, selectedRows: DataType[]) => {
        // @ts-ignore
        setSelectedAttributes(selectedRows)
    }

    const handleDeleteMultipleAttribute = () => {
        handleResetAttributeErrorSubmit()
        if (selectedAttributes?.length > 0) {
            let remainingAttributes: Attribute[] = _.cloneDeep(category.attributes)
            const selectedKeys: number[] = selectedAttributes?.map((item: AttributeWithKey) => item.key)
            remainingAttributes = remainingAttributes.map((item: Attribute, index: number) => {
                return selectedKeys?.includes(index) ? {
                    ...item,
                    is_deleted: true
                } : item
            })
            setCategory({
                ...category,
                attributes: remainingAttributes
            })
        }
    }

    const handleSubmit = () => {
        const {isError, errorDetail} = submitValidation(category)
        if (isError) {
            setErrorSubmit(errorDetail)
        } else {
            setIsLoadingSubmit(true)
            let submitCategory: Category = _.cloneDeep(category)
            submitCategory = {
                name: capitalizeOnlyFirstLetter(submitCategory.name),
                description: capitalizeOnlyFirstLetter(submitCategory.description),
                attributes: submitCategory.attributes
                    ?.filter((item: Attribute) => {
                        if (!item?._id && item.is_deleted) {
                            return
                        }
                        return item
                    })
                    ?.map((item: Attribute): Attribute => {
                        delete item.is_deleted
                        return {
                            ...item,
                            label: capitalizeOnlyFirstLetter(item.label),
                            initial_value: item.initial_value ?
                                item.initial_value?.map((option: string) => capitalizeOnlyFirstLetter(option)) : null
                        }
                    })
            }
            requestCreateCategory(submitCategory)
                .then(res => {
                    getNotification('success', 'Tạo mới thành công')
                })
                .catch(err => {
                    console.log(err)
                    getNotification('error', 'Đã có lỗi xảy ra')
                })
                .finally(() => {
                    setIsLoadingSubmit(false)
                })
        }
    }

    return <div className={'h-full'}>
        <div className={'font-semibold text-[22px]'}>
            {params.action === 'create' ? 'Tạo mới danh mục' : `Cập nhật ${category?.name}`}
        </div>
        <Flex vertical className={'h-full'}>
            <Flex className={'mt-8'} gap={50}>
                <Flex gap={20} vertical>
                    <Flex vertical>
                        <Label label={'Tên danh mục'} isRequired/>
                        <Input
                            value={category?.name}
                            onChange={e => handleChangeCategory(e.target.value, 'name')}
                            placeholder={'Nhập tên danh mục'}
                            rootClassName={'h-[40px] w-[300px]'}
                        />
                        {errorSubmit.name ? <ErrorMessage message={errorSubmit.name}/> : ''}
                    </Flex>
                    <Flex vertical>
                        <Label label={'Mô tả'}/>
                        <Input.TextArea
                            value={category?.description}
                            onChange={e => handleChangeCategory(e.target.value, 'description')}
                            placeholder={'Nhập mô tả'}
                            rootClassName={'!min-h-[40px] max-h-[280px] w-[300px] pt-[6px] scrollbar-thin '}
                        />
                    </Flex>
                </Flex>
                <div className={'flex flex-col py-6 px-8 shadow-[rgba(0,_0,_0,_0.1)_0px_4px_12px] rounded-xl flex-1'}>
                    <Flex align={'center'} justify={'space-between'}>
                        <Label label={'Các thuộc tính'}/>
                        <Flex gap={30}>
                            <Flex
                                align={'center'} gap={3}
                                className={`${!(selectedAttributes?.length > 0) ? 'cursor-not-allowed text-gray-400'
                                    : 'cursor-pointer text-[red]'} text-[14px] mb-1.5 select-none w-fit`}
                                onClick={handleDeleteMultipleAttribute}
                            >
                                <DeleteOutlined/> Xóa nhiều
                            </Flex>
                            <Flex
                                className={'text-[#1677ff] text-[14px] cursor-pointer mb-1.5 select-none w-fit'}
                                align={'center'} gap={3}
                                onClick={handleAddAttribute}
                            >
                                <PlusOutlined style={{fontSize: '8px'}}/> Thêm mới
                            </Flex>
                        </Flex>
                    </Flex>
                    {
                        category?.attributes?.length === 0 ?
                            <i className={'text-gray-500 mt-2'}>
                                Chưa có thuộc tính nào
                            </i> : <Table
                                rowSelection={{
                                    selectedRowKeys: selectedAttributes?.map(item => item.key),
                                    onChange: handleSelectMultipleAttribute
                                }}
                                className={'attribute-table mt-2'}
                                bordered
                                pagination={false}
                                columns={attributeTableColumns}
                                dataSource={category?.attributes
                                    ?.filter((item: Attribute) => item.is_deleted === false)
                                    ?.map((item: Attribute, index: number): DataType => ({
                                            label: item?.label,
                                            input_type: item?.input_type,
                                            initial_value: item?.initial_value,
                                            is_required: item?.is_required,
                                            is_deleted: item?.is_deleted,
                                            key: index
                                        }) as DataType
                                    )}
                                scroll={{y: 'calc(100vh - 430px)'}}
                            />
                    }
                    {
                        (errorSubmit.attribute.initialValues || errorSubmit.attribute.label) ?
                            Object.values(errorSubmit.attribute).map((error: string, index: number) => (
                                <ErrorMessage message={error} key={index}/>
                            )) : ''
                    }
                </div>
            </Flex>
            <div className={'w-fit mt-[22px]'}>
                <Button
                    size={'large'} className={'bg-[#1677ff]'}
                    type={'primary'} onClick={handleSubmit}
                    loading={isLoadingSubmit}
                >
                    {params.action === 'create' ? 'Tạo mới' : 'Cập nhật'}
                </Button>
            </div>
        </Flex>

        <Modal
            title={<div className={'text-[17px]'}>
                Thêm các lựa chọn cho thuộc tính&nbsp;
                <span className={'text-danger-700'}>{currentAttributeToAddInitialValue?.label || '...'}</span>
            </div>
            }
            open={currentAttributeToAddInitialValue !== undefined}
            onOk={handleSetInitialValueForAttribute}
            onCancel={() => {
                setCurrentAttributeIndex(-1)
                setCurrentAttributeToAddInitialValue(undefined)
            }}
            okButtonProps={{className: 'bg-[#1677ff]'}}
            okText='Xong'
            width={400}
        >
            <Flex className={'py-3'} vertical>
                <Flex className={'w-full'} justify={'space-between'}>
                    <Flex
                        className={'text-[green] text-[14px] cursor-pointer mb-1.5 select-none w-fit'}
                        align={'center'} gap={4}
                        onClick={() => {
                            setInitialValues([''])
                        }}
                    >
                        <ReloadOutlined style={{fontSize: '10px', marginTop: '1px'}}/> Làm mới
                    </Flex>
                    <Flex
                        className={'text-[#1677ff] text-[14px] cursor-pointer mb-1.5 select-none w-fit'}
                        align={'center'} gap={3}
                        onClick={() => {
                            setInitialValues([...initialValues, ''])
                        }}
                    >
                        <PlusOutlined style={{fontSize: '8px'}}/> Thêm giá trị
                    </Flex>
                </Flex>
                <Flex
                    style={{scrollbarGutter: 'stable'}}
                    className={'max-h-[300px] overflow-hidden hover:overflow-y-auto scrollbar-thin mr-[-23px]'}
                    vertical
                    gap={10}
                >
                    {
                        initialValues.map((value: string, index: number) => (
                            <Flex key={index}>
                                <Input
                                    value={value}
                                    placeholder={'Nhập giá trị'}
                                    onChange={(e) => {
                                        let newInitialValues: string[] = _.cloneDeep(initialValues)
                                        newInitialValues[index] = e.target.value
                                        setInitialValues(newInitialValues)
                                    }}
                                />
                                {
                                    initialValues?.length > 1 ? <DeleteOutlined
                                        style={{color: 'red', fontSize: '15px'}}
                                        className={'cursor-pointer ml-3 mr-3'}
                                        onClick={() => {
                                            setInitialValues(initialValues.filter((_: string, currentIndex: number) => currentIndex !== index))
                                        }}
                                    /> : ''
                                }
                            </Flex>
                        ))
                    }
                </Flex>
            </Flex>
        </Modal>
    </div>
}
