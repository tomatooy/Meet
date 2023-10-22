import React from 'react'

const navbarStyle = {
    position: "absolute",
    top: "-2px",
    right: "-5px",
    padding: "3px 6px",
    borderRadius: "50%",
    backgroundColor: " red",
    color: "white",
    fontSize:"10px",
    fontWeight:"bold",
}

const messageStyle = {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    padding: "3px 6px",
    borderRadius: "50%",
    backgroundColor: "red",
    color: "white",
    fontSize:"10px",
    fontWeight:"bold",
}
export default function NotificationBadge({number,type}) {
    let style;
    switch (type) {
        case "message":{
            style = messageStyle;
            break;
        }
        case "navbar" :{
            style = navbarStyle;
            break;
        }
        default :{
            style = navbarStyle;
        }
    }
    return (
        number > 99?
        <div style={ style }>
            ...
        </div>
        :
        <div style={ style }>
            {number}
        </div>
    )
}
