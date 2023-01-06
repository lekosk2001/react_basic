import React from 'react'

export default function Card(props) {
    return (
        <div className='card mb-3' key={props.id}>
            <div className='card-body'>{props.title}</div>
        </div>
    )
}
