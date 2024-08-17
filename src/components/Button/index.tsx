import React, {MouseEventHandler} from "react";
import styles from "./styles.module.scss";

export default function ButtonDefault({children, onClick, className = ""}: {
    children: React.ReactNode,
    onClick: MouseEventHandler<HTMLButtonElement>,
    className: string
}) {
    return (
        <button className={`${styles.wrapper} ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}
