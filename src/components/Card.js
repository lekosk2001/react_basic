import PropTypes from 'prop-types'
import React from 'react'

export default function Card({title,children,onClick}) {
    return (
        <div 
            className='card mb-3 list-group-item-action'
            style={{ cursor:"pointer" }}
            onClick={onClick}
        >
            <div className='py-2 card-body d-flex align-items-center'>
                <div className='card-title flex-grow-1'>{title}</div>
                {children&&<>{children}</>}
            </div>
        </div>
    )
}

Card.propTypes ={
    title:PropTypes.string.isRequired,
    children:PropTypes.element,
    onClick:PropTypes.func
}

Card.defaultProps = {
    children:null,
    onClick:()=>{}
}