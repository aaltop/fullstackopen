import { NotificationContext } from "../contexts";

import { useContext } from "react";

export default function Notification()
{

    const [notifications, notificationMethods] = useContext(NotificationContext);

    if (notifications.length < 1) return null;


    return (
        <div style={{ color: "red"}}>
            {notifications.map((message, i) => {
                return (
                    <div key={i}>
                        {message}
                    </div>
                )
            })}
            <button type="button" onClick={() => notificationMethods.setNotifications([])}>Clear</button>
        </div>
    )
}