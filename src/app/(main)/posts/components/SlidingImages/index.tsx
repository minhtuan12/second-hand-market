'use client'

import React from "react";
import {Carousel} from "antd";
import Image from "next/image";

export default function SlidingImages({images}: { images: string[] }) {
    return <Carousel autoplay={true} arrows>
        {
            images?.map((image: string, index: number) => (
                <div key={index} className="relative w-full h-full">
                    <Image
                        key={index}
                        src={image}
                        alt={image}
                        quality={90}
                        width={0}
                        height={0}
                        sizes={'100vw'}
                    />
                </div>
            ))
        }
    </Carousel>
}
