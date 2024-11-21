export const convertTo12HourFormat = (time) => {
    let [hours, minutes] = time.split(":")
    hours = parseInt(hours)

    const period = hours >= 12 ? "PM" : "AM"
    hours = hours % 12 || 12

    return `${hours}:${minutes} ${period}`
}

export const truncateText = (text, maxLength) => {
    if(text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
}
