import React, {useEffect} from "react";
import Skeleton from "../../../../../components/Skeleton";
import {Empty} from "antd";
import Button from "@/components/Button";

export default function SellingTab() {
    // const sellingProducts = useSelector((state: RootState) => state.selling.sellingProducts)
    // const loadingTab = useSelector((state: RootState) => state.selling.loadingTab)
    const loadingTab = false

    const a = [
        {
            _id: '1',
            poster_id: '',
            status: '',
            location: 'ádsdqqasd',
            user_manual: '',
            product: {
                code: '1',
                name: 'san pham 111111111111111111111111111111111111111111111111111111111111111111111111',
                description: 'qqqasdas asdadz zxczcqqsa',
                images: ['asd', 'qweqweq', 'zxczxc'],
                quantity: 1,
                origin: 'viet nam',
                brand: 'asdasd',
                height: 100,
                width: 200,
                length: 300,
                price: 20000,
                condition: 2,
            },
            created_at: '2024-04-07T17:15:57.045+00:00'
        },

        {
            _id: '2',
            poster_id: '',
            status: '',
            location: 'ádsdqqasd',
            user_manual: '',
            product: {
                code: '2',
                name: 'san pham 1',
                description: 'qqqasdas asdadz zxczcqqsa',
                images: ['asd', 'qweqweq', 'zxczxc'],
                quantity: 1,
                origin: 'viet nam',
                brand: 'asdasd',
                height: 100,
                width: 200,
                length: 300,
                price: 20000,
                condition: 2,
            },
            created_at: '2024-04-07T17:15:57.045+00:00'
        },

        {
            _id: '3',
            poster_id: '',
            status: '',
            location: 'ádsdqqasd',
            user_manual: '',
            product: {
                code: '3',
                name: 'san pham 1',
                description: 'qqqasdas asdadz zxczcqqsa',
                images: ['asd', 'qweqweq', 'zxczxc'],
                quantity: 1,
                origin: 'viet nam',
                brand: 'asdasd',
                height: 100,
                width: 200,
                length: 300,
                price: 20000,
                condition: 2,
            },
            created_at: '2024-04-07T17:15:57.045+00:00'
        },

        {
            _id: '4',
            poster_id: '',
            status: '',
            location: 'ádsdqqasd',
            user_manual: '',
            product: {
                code: '4',
                name: 'san pham 1',
                description: 'qqqasdas asdadz zxczcqqsa',
                images: ['asd', 'qweqweq', 'zxczxc'],
                quantity: 1,
                origin: 'viet nam',
                brand: 'asdasd',
                height: 100,
                width: 200,
                length: 300,
                price: 20000,
                condition: 2,
            },
            created_at: '2024-04-07T17:15:57.045+00:00'
        },

        {
            _id: '5',
            poster_id: '',
            status: '',
            location: 'ádsdqqasd',
            user_manual: '',
            product: {
                code: '5',
                name: 'san pham 1',
                description: 'qqqasdas asdadz zxczcqqsa',
                images: ['asd', 'qweqweq', 'zxczxc'],
                quantity: 1,
                origin: 'viet nam',
                brand: 'asdasd',
                height: 100,
                width: 200,
                length: 300,
                price: 20000,
                condition: 2,
            },
            created_at: '2024-04-07T17:15:57.045+00:00'
        },

        {
            _id: '7',
            poster_id: '',
            status: '',
            location: 'ádsdqqasd',
            user_manual: '',
            product: {
                code: '7',
                name: 'san pham 1',
                description: 'qqqasdas asdadz zxczcqqsa',
                images: ['asd', 'qweqweq', 'zxczxc'],
                quantity: 1,
                origin: 'viet nam',
                brand: 'asdasd',
                height: 100,
                width: 200,
                length: 300,
                price: 20000,
                condition: 2,
            },
            created_at: '2024-06-22T17:15:57.045+00:00'
        },


    ]

    useEffect(() => {

    }, [])

    return <div className={'min-h-auto'}>
        <div className={'font-semibold text-[19px]'}>Sản phẩm đang bán ({a?.length || 0})</div>
        <div className={'mt-5'}>
            {
                !loadingTab ? (
                        !(a?.length > 0) ?
                            <></>
                            // <div columns={{xl: '5', lg: '4'}} gap={'6'} rows={'repeat(2, 350px)'} width={'auto'}>
                            //     {
                            //         a.map(item => (
                            //             <SellingItem key={item._id} item={item}/>
                            //         ))
                            //     }
                            // </div>
                            : <Empty description={'Bạn chưa đăng tin nào'} image={Empty.PRESENTED_IMAGE_SIMPLE}>
                                <Button reverseColor size={"large"}>ĐĂNG TIN NGAY</Button>
                            </Empty>
                    )
                    : <Skeleton loading={loadingTab}/>
            }
        </div>
    </div>
}
