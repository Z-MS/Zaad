export default {
    findItem(context, searchKey) {
        // var stringifiedKey = String(searchKey);
        return context.find(elem => elem['id'] === searchKey)
    }
}

// search for an item by its ID in an array. To be used in Vuex