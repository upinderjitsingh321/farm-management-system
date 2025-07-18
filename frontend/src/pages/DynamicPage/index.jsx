import React from 'react'
import { useParams } from 'react-router'

function DynamicPage() {
    const router = useParams()
    console.log(router, "checkrouters")
    return (
        <div>
             {router?.name}
        </div>
    )
}

export default DynamicPage
