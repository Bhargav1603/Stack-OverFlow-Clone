import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { clear } from "../actions/alerts";
import './Notification.css';

const Notification = props => {
    const [exit, setExit] = useState(false);
    const [width, setWidth] = useState(0);
    const [intervalID, setIntervalID] = useState(null);
    const dispatch = useDispatch();

    const handleStartTimer = () => {
        const id = setInterval(() => {
            setWidth(prev => {
                if (prev < 100) {
                    return prev + 0.5;
                }

                clearInterval(id);
                return prev;
            });
        }, 20);

        setIntervalID(id);
    };

    const handlePauseTimer = () => {
        clearInterval(intervalID);
    };

    const handleCloseNotification = () => {
        handlePauseTimer();
        setExit(true);
        setTimeout(() => {
            dispatch(clear());
        }, 400)
    };

    useEffect(() => {
        if (width === 100) {
            handleCloseNotification()
        }
    }, [width])

    useEffect(() => {
        handleStartTimer();
    }, []);

    return (
        <div
            onMouseEnter={handlePauseTimer}
            onMouseLeave={handleStartTimer}
            className={`notification-item ${props.type === "SUCCESS" ? "success" : "error"} ${exit ? "exit" : ""}`}
        >
            <p>{props.message}</p>
            <div className={"bar"} style={{ width: `${width}%` }} />
        </div>
    );
};

export default Notification;