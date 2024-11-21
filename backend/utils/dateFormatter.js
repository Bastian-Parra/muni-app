import moment from 'moment'

export function formatDate(date) {
    return moment(date).format('YYYY-MM-DD')
}

export function formatDateTime(dateTime) {
    return moment(dateTime).format('YYYY-MM-DD HH:mm:ss')
}