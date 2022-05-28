import React from 'react'

function Alerts(props) {
    const capitalize = (word) => {
        if (word === "danger") {
            word = "Error"
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    return (
        <>
            <div style={{ height: "60px"}}>
                {props.alert && <div className={`alert alert-${props.alert.type}`} role="alert" style={{ overflow: "hidden", zIndex: "10000" }} >
                    <strong>{capitalize(props.alert.type)}</strong>: {props.alert.messege}
                </div>}
            </div>
        </>
    )
}

export default Alerts