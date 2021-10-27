import React from 'react'
import { Markup } from 'interweave'

function ProductDescription({ content }) {
    return (
        <div>
            <Markup content={content} />
        </div>
    )
}
export default ProductDescription