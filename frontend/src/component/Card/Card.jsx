import React from 'react'

function Card({ head, para, icons }) {
    return (
        <div>

            <h3>{head}</h3>
            <p>{para}</p>
            <p>{icons}</p>


        </div>
    )
}

export default Card
