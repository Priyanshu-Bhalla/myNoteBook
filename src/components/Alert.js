import React from 'react'

export default function Alert(props) {
    return (
        props.alert &&
        <div className="alert alert-primary" role="alert">
            this is alert
        </div>

    )
}
