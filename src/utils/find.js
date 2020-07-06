export default {
    findItem(context, searchKey) {
        // var stringifiedKey = String(searchKey);
        return context.find(elem => elem['id'] === searchKey)
    }
}

// find an item in an array. To be used in Vuex