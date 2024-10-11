import { NotificationContext } from "./contexts";

import { useState, PropsWithChildren } from "react";

function NotificationProvider(props: PropsWithChildren)
{
    const [notifications, setNotifications] = useState<string[]>([]);
    const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined);

    function notifyWithTimeout(notifications: string[], delayMilli: number = 5000)
    {
        clearTimeout(timeoutId);
        setNotifications(notifications);
        const newTimeoutId = setTimeout(() => setNotifications([]), delayMilli);
        setTimeoutId(newTimeoutId);
    }

    const notifyMethods = {
        notifyWithTimeout,
        setNotifications
    }

    return (
        <NotificationContext.Provider value={[notifications, notifyMethods]} >
            {props.children}
        </NotificationContext.Provider>
    )
}

export default function Provider(props: PropsWithChildren)
{
    return(
        <NotificationProvider>
            {props.children}
        </NotificationProvider>
    )
}