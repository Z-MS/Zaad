var db;

export default {
	async getDb() {
		return new Promise((resolve, reject) => {
			var request = indexedDB.open("zTaskDB");

			request.onerror = function(event) {
				console.log("Why didn't you allow my DB to be created");
				reject('Error' + event);
			};

			request.onsuccess = function(event) {
				db = event.target.result;
				resolve(db)
				console.log("Hello" + db);
			}
			request.onupgradeneeded = event => {
				console.log('onupgradeneeded');
				var db = event.target.result;
				db.createObjectStore("Notes", { autoIncrement: true, keyPath: 'id' });
				db.createObjectStore("Projects", { autoIncrement: true, keyPath: 'id' });
				db.createObjectStore("Tasks", { autoIncrement: true, keyPath: 'id' });
			}
		});
	},
	async getItems(store) {
		var items = [];
		var db = await this.getDb();

		return new Promise(resolve => {
			var transaction = db.transaction(store);
			transaction.oncomplete = function() {
				resolve(items);
			};

			var objStore = transaction.objectStore(store);
			objStore.getAll().onsuccess = function(event) {
				items = event.target.result;
			};
		});
	},
	async addItem(store, item) {
		var db = await this.getDb();

		return new Promise(resolve => {
			var transaction = db.transaction(store, 'readwrite');
			transaction.oncomplete = function() {
				resolve();
			};

			var objStore = transaction.objectStore(store);
			objStore.add(item);
		});
	},
	async editItem(store, itemID, editMethod) {
		var db = await this.getDb();

		return new Promise(resolve => {
			var transaction = db.transaction(store, 'readwrite');
			transaction.oncomplete = function() {
				resolve();
			};

			var objStore = transaction.objectStore(store);
			var req = objStore.get(itemID);
			req.onsuccess = function() {
				const data = req.result;

				editMethod(data); // mutate the db data with a specific method
				const update = objStore.put(data); // update the data in the object store
				update.onsuccess = function() {
					console.log("success!");
				};
			};
		});
	},
	async deleteItem(store, itemID) {
		var db = await this.getDb();

		return new Promise(resolve => {
			var transaction = db.transaction(store, 'readwrite');
			transaction.oncomplete = function() {
				resolve();
			}

			var objStore = transaction.objectStore(store);
			var req = objStore.get(itemID);
			req.onsuccess = function(event) {
				console.log("Record: ", event.target.result);

				req = objStore.delete(itemID);
				req.onsuccess = function(event) {
					console.log("delete successful: ", event.target.result);
				}

				req.onerror = function(event) {
					console.log("ERRORZ: ", event.target.errorCode);
				}
			}

			req.onerror = function(event) {
				console.error("ERRORZ: ", event.target.errorCode);
			}
		})
	}
	
}
