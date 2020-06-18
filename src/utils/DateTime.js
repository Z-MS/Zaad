export default {
    getDateTime() {
        var today = new Date();
        var todaysDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
        var currentTime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

        return [todaysDate, currentTime];
    }
}