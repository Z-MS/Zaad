var db;

export default {
	async getDb() {
		return new Promise((resolve, reject) => {
			var request = indexedDB.open("zTaskDB", 6);

			request.onerror = function(event) {
				console.error("Why didn't you allow my DB to be created");
				reject('Error' + event);
			};

			request.onsuccess = function(event) {
				db = event.target.result;
				resolve(db)
			}
			request.onupgradeneeded = function(event) {
				console.log('upgrading...');
				var db = event.target.result;

				const transaction = event.target.transaction;
				transaction.objectStore('Notes').deleteIndex('index');
				transaction.objectStore('Tasks').deleteIndex('index');

				transaction.objectStore('Notes').createIndex('type', 'indexVal');
				transaction.objectStore('Tasks').createIndex('type', 'indexVal');

				if(event.oldVersion < 1) {
					db.createObjectStore("Notes", { autoIncrement: true, keyPath: 'id' });
					db.createObjectStore("Projects", { autoIncrement: true, keyPath: 'id' });
					db.createObjectStore("Tasks", { autoIncrement: true, keyPath: 'id' });
				}
			}
		});
	},// CREATE A NEW INDEX CALLED TYPE, WITH KEYPATH: INDEXVAL
	async getItem(store, info, index = "type") {
		const db = await this.getDb();
		var item = null;

		return new Promise(resolve => {
			const transaction = db.transaction(store, "readonly");

			transaction.oncomplete = function() {
				resolve(item);
			};

			const objStore = transaction.objectStore(store);
			if(info.indexVal) {
				let storeIndex = objStore.index(index);
				let keyRange = IDBKeyRange.only(info.indexVal);
				storeIndex.openCursor(keyRange).onsuccess = function(event) {
					let cursor = event.target.result;
					if(cursor) {
						if(cursor.primaryKey === info.id)
							item = cursor.value;
						else
							cursor.continue();
					}
				}
			} else {
				objStore.get(info.id).onsuccess = function(event) {
					item = event.target.result;
				};
			}	
		});
	},
	async getItems(store, info, index = "type") {
		var items = [];
		const db = await this.getDb();

		return new Promise(resolve => {
			var transaction = db.transaction(store, "readonly");
			transaction.oncomplete = function() {				
				resolve(items)
			};
			// USE CURSORS TO FETCH PROJRCT TASKS AND NOTES
			const objStore = transaction.objectStore(store);
			if(info.indexVal) {
				let storeIndex = objStore.index(index);
				storeIndex.getAll(info.indexVal).onsuccess = function(event) {
					items = event.target.result;
				}
			} else {
				objStore.getAll().onsuccess = function(event) {
					items = event.target.result;
				};
			}
		});
	},
	async addItem(store, item) {
		const db = await this.getDb();

		return new Promise(resolve => {
			const transaction = db.transaction(store, "readwrite");
			transaction.oncomplete = function() {
				resolve();
			};
			const objStore = transaction.objectStore(store);
			objStore.add(item);
		});
	},
	async editItem(store, info, transform) {
		const db = await this.getDb();
		const item = await this.getItem(store, info)
		return new Promise(resolve => {
			const transaction = db.transaction(store, "readwrite");
			transaction.oncomplete = function() {
				resolve();
			};

			const objStore = transaction.objectStore(store);
			transform(item); // mutate the db data with a specific method
			const update = objStore.put(item); // update the data in the object store
			update.onsuccess = function() {
				console.log("success!");
			};
		});
	},
	async deleteItem(store, info) {
		const db = await this.getDb();
		const item = await this.getItem(store, info);
		return new Promise(resolve => {
			const transaction = db.transaction(store, "readwrite");
			transaction.oncomplete = function() {
				resolve();
			}

			const objStore = transaction.objectStore(store);
			if(item) {
				const req = objStore.delete(info.id);
				req.onsuccess = function(event) {
					console.log("delete successful: ", event.target.result);
				}

				req.onerror = function(event) {
					console.log("ERRORZ: ", event.target.errorCode);
				}
			} else {
				console.log("Item not found");
			}
		});
	}
	
}
