import { Timestamp } from "firebase/firestore";


export const formatDateTime = (date: Timestamp) => {

new Date(date.seconds * 1000).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: "numeric",
        minute: "numeric"

    })
};