import React from "react";
import styles from './styles.module.scss'
import './styles.scss'
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export default function Menu() {
    const navigate = useNavigate()
    const location = useSelector(state => state.app.location)

    const menu = [
        {
            title: 'Home',
            path: '/'
        },
        {
            title: 'Books',
            path: '/books'
        },
        {
            title: 'Mobiles',
            path: '/mobiles'
        },
        {
            title: 'Clothes',
            path: '/clothes'
        },
    ]

    return <div className={`${styles.menuWrap}`}>
        {
            menu.map(item => (
                <div key={item.path}
                     onClick={() => navigate(item.path)}
                     className={`border-b-2 h-14 flex items-center px-6 py-8 cursor-pointer ${styles.item} 
                     ${location.pathName === item.path ? 'bg-[#eaeded]' : ''}`}>
                    <div className={'font-semibold text-[17px] mb-2 mt-2'}>
                        {item.title}
                    </div>
                </div>
            ))
        }
    </div>
}
