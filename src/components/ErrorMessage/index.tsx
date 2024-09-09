'use client'

import React, {memo} from "react";

interface ErrorProps {
    message: string
}

const ErrorMessage = memo(function ErrorMessage({message}: ErrorProps) {
    return <span className={'error'}>
        {message}
    </span>
})

export default ErrorMessage
