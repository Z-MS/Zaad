export default {
    snip(text) {
        var endIndex = text.length - 1; // end of the text, by default
            
        /* if(text.length > 250 && text.length < 1000) {
            endIndex = Math.round(text.length / 2); // return half of the text
        } 
        if(text.length > 1000) {
            endIndex = Math.round(text.length / 4); // return a quarter of the text
        } */
        endIndex = 200;
        return text.substring(0, endIndex);
    }
}

// generally, I want the excerpts of long texts to be 1/4 the length of the texts
// find a way to calculate this better with font sizes and stuff