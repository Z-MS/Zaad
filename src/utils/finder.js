export default {
    findItem(context, searchKey, value) {
        // var stringifiedKey = String(searchKey);
        const result = context.find(elem => elem[searchKey] === value);
        return result;
    }
}

// search for an item in an array by a specific property 'searchKey'. To be used in Vuex