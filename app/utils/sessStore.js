class sessStore {
    constructor() {
        this.store = new Map();
    }

    get(key, maxAge, { rolling }) {

        console.log(rolling);
        return this.store.get(key)
    }

    set(key, sess, maxAge, { rolling, changed }) {

        this.store.set(key, sess);
        console.log(this.store);
    }

    destroy(key) {
        this.store.delete(key);
    }
}


module.exports = new sessStore();