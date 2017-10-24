function NaiveDict(){
    this.keys = [];
    this.values = [];
}

NaiveDict.prototype.set = function(key, value){
    this.keys.push(key);
    this.values.push(value);
}

NaiveDict.prototype.get = function(lookupKey){
    for (var i=0;i<this.keys.length;i++){
        var key = this.keys[i];
        if (key === lookupKey) {
            return this.values[i];
        }
    }
}

function HashTable(){
	this.bucketCount = 100;
    this.buckets = [];
    for (var i=0; i< this.bucketCount;i++){
        this.buckets.push(new NaiveDict());
    }
}

HashTable.prototype.hashFunction = function(key){
    var hash = 0;
    for (var i=0;i< key.length;i++){
        hash += key.charCodeAt(i);
    }
    return hash;
}

HashTable.prototype.getBucketIndex = function(key){
    return this.hashFunction(key) % this.bucketCount;
}

HashTable.prototype.getBucket = function(key){
    return this.buckets[this.getBucketIndex(key)];
}

HashTable.prototype.set = function(key, value){
   this.getBucket(key).set(key, value)
}

HashTable.prototype.get = function(lookupKey){
    return this.getBucket(lookupKey).get(lookupKey)
}

function Trie(){
	this.head = {
		key: '',
		children: {}
	};

	
}