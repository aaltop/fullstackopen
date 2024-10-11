import { createContext } from "react";

interface notificationMethods {
    notifyWithTimeout: (notifications: string[], delayMilli: number) => void,
    setNotifications: (notifications: string[]) => void
}

const emptyMethods = {
    notifyWithTimeout: () => { },
    setNotifications: () => { }
}

export const NotificationContext = createContext<[
    string[],
    notificationMethods
]>
([[], emptyMethods]);