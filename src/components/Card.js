import PropTypes from 'prop-types'
import React from 'react'

export default function Card({title,children,onClick}) {
    return (
        <div 
            className='card mb-3 list-group-item-action'
            style={{ cursor:"pointer" }}
            onClick={onClick}
        >
            <div className='card-body'>
                <div className='d-flex justify-content-between'>
                    <div className='card-title'>{title}</div>
                    {children&&<>{children}</>}
                </div>
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