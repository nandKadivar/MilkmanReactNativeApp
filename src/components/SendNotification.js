import React,{useState,useRef} from 'react'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const SendNotification = async(to,MessageTitle,MessageBody) => {
    // console.log(expoPusToken)
    // const [notification, setNotification] = useState(false);
    // const notificationListener = useRef();
    // const responseListener = useRef();
    const expoPushToken = to
    const title = MessageTitle
    const body = MessageBody
    
    // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //     setNotification(notification);
    // });

    // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //     console.log(response);
    // });
    // sendPushNotification(expoPushToken)
    
    // async function sendPushNotification(token) {
        // console.log('Hiiiiiiiiiiiiiiiiiiiii')
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: title,
            body: body,
            data: { someData: 'goes here' },
        };
    
        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    // }
    return 
}


export default SendNotification