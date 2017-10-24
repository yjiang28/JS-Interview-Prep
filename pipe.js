function Processor(datastream, f){
	if(f!==null && f!==undefined && typeof f!=="function")
		throw new TypeError("Expected arguments: datastream, function");
	// the previous Processor
	this.head = null;
	// the next Processor
	this.next = null;
	// the operation performed on datastream
	this.func = f;
	this.datastream = datastream;
}

// Process data from the first Processor
Processor.prototype.start = function(){
	return this.head==null ? this.process() : this.head.process();
};

// Apply Processor's func on its dataset.
// Pipe results to the next Processor, if exsits.
Processor.prototype.process = function(){
	if(this.func===undefined || this.func===null)
		// by default, return the datastream as it is.
		return this.datastream; 
	else if(this.next===null || this.next===undefined)
		return (this.func)(this.datastream);
	else{
		let result = (this.func)(this.datastream)
		this.next.datastream = result===null || result===undefined ? this.datastream : result;
		return (this.next).process();
	}
};

Processor.prototype.map = function(func){
	this.next = new Processor(this.ds, ds => ds.map(func));
	this.next.head = this.head===null ? this : this.head;
	return this.next;
};

(function main(){
	var ds = [1,2,3,4,5,6],
		pipe = new Processor(ds, ds => console.log("Init Processor on datastream:", ds)),
		result = pipe.map(elem => elem*2).start();
	console.log(result);
})();