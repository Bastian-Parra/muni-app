export function convertDate(date) {
    const [year, month, day] = date.split("-")
    return `${day}/${month}/${year}`;
}

export function convertTime(time) {
    const [hours, minutes, seconds] = time.split(":")
    return `${hours}:${minutes}`;
}


