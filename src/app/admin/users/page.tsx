'use client'

import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setBreadcrumb} from "@/store/slices/app";
import SearchBar from "@/app/admin/components/SearchBar";
import type {TableProps} from 'antd';
import {Flex} from "antd";
import TableDefault from '@/components/Table'
import {PaginationType, UserProfile} from "../../../../utils/types";
import {PER_PAGE} from "../../../../utils/constants";

interface DataType {
    key: string;
    name: string;
    email: string;
    phone: string | null;
    address: string;
}

export default function UserManagement() {
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [users, setUsers] = useState<UserProfile[] | undefined>([])
    const [pagination, setPagination] = useState<PaginationType>({
        currentPage: 1,
        perPage: PER_PAGE,
        totalRecord: 0
    })
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'STT',
            dataIndex: 'key',
            rowScope: 'row',
            width: 70,
            align: 'center'
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
            width: 250,
            sorter: true
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 250,
            sorter: true,
            render: (text) => <a href={`mailto:${text}`}>{text}</a>
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            width: 250,
            render: (text) => text ? <a href={`tel:${text}`}>{text}</a> :
                <i className={'text-gray-500'}>Đang cập nhật</i>
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            render: (text) => text ? <div>{text}</div> :
                <i className={'text-gray-500'}>Đang cập nhật</i>
        },
    ]

    useEffect(() => {
        dispatch(setBreadcrumb([
            {
                path: '/admin/users',
                name: 'Quản lý người dùng'
            }
        ]))
    }, [])

    return <Flex vertical gap={20}>
        <SearchBar
            className={'w-2/5'}
            value={searchValue} placeholder={'Tìm kiếm theo tên hoặc email người dùng'}
            size={'large'}
        />
        <TableDefault columns={columns} loading={loading} dataSource={users} pagination={pagination}/>
    </Flex>
}
