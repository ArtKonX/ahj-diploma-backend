module.exports = function getTimeAndDate() {
    const date = new Date();

    const formattedDate = date.toLocaleString('ru-RU', {
        timeZone: 'UTC',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    return formattedDate
}