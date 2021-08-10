'use strict';

const granted = (async () => {
    let granted = false;
    if (Notification.permission === 'granted') {
        granted = true;
    } else if (Notification.permission !== 'denied') {
        let permission = await Notification.requestPermission();
        granted = permission === 'granted' ? true : false;
    }
    return granted;
})();

const showNotification = (title, msg, icon) => {
    const notification = new Notification(title, {
        body: msg,
        icon: icon
    });
    
    setTimeout(() => {
        notification.close();
    }, 5 * 1000);

    notification.onclick = () => {
        window.focus();
    }
}