var db;

export default {
	async getDb() {
		return new Promise((resolve, reject) => {
			var request = indexedDB.open("MyTestDB");

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
				db.createObjectStore("Notes", { autoIncrement: true, keyPath: 'id' })
			}
		});
	},
	async getNotes() {
		var notes = [];
		var db = await this.getDb();

		return new Promise(resolve => {
			var transaction = db.transaction('Notes');
			transaction.oncomplete = () => {
				resolve(notes);
			};

			var store = transaction.objectStore('Notes');
			store.openCursor().onsuccess = e => {
				var cursor = e.target.result;
				if(cursor) {
					notes.push(cursor.value);
					cursor.continue();
				}
			};

		});
		
	},
	async saveNotes(noteArray) {
		var db = await this.getDb();

		return new Promise(resolve => {
			var transaction = db.transaction('Notes', 'readwrite');
			transaction.oncomplete = () => {
				resolve();
			};

			var store = transaction.objectStore('Notes');
			noteArray.forEach(note => {
				store.add(note)
			});
		});
			
	}
	
}
