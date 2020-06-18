export default {
    snip(text, snipLength = 10) {
        return text.length < snipLength ? `${text.substring(0)}...` : `${text.substring(0, 10)}...`;
    }
}