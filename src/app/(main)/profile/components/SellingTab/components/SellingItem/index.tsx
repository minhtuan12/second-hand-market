import React from "react";
import DefaultImage from '../../../../../../assets/images/logos/default-image.jpeg'
import {handleExportTimeAgo} from "../../../../../../../../utils/helper";
import {Avatar, Flex} from "antd";

type ItemProp = {
    product: {
        name: string,
        price: number
    },
    location: string,
    created_at: string
}

export default function SellingItem({item}: {item: ItemProp}) {
    const postTime = handleExportTimeAgo(item.created_at)

    // @ts-ignore
    return <div className={'border-2 p-3'}>
        <Flex vertical gap={'2'} className={'w-full h-full'}>
            <div className={'w-full h-[60%]'}>
                <Avatar
                    fallback={''}
                    src={DefaultImage}
                    className={'!w-full !h-full'}
                />
            </div>
            <Flex vertical gap={'2'} className={'flex-1 h-auto'}>
                <div className={'text-lg h-[40%] line-clamp-3'}>{item.product.name}</div>
                <Flex vertical className={'flex-1'} gap={'2'}>
                    <div className={'text-[#009B49] font-semibold'}>
                        {
                            new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'})
                                .format(item.product.price)
                        }
                    </div>
                    <div className={'text-xs text-gray-500 font-semibold'}>
                        {postTime} - {item.location}
                    </div>
                </Flex>
            </Flex>
        </Flex>
    </div>
}
