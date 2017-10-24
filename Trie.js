function node(value){
	this.val = value;
	this.children = {};
	this.isTerminus = false;
    this.numPrefix = 0;
}

function Trie(){
	this.root = new node("$");
}

// return the inserted node if it's new
// return the existing node with the same value as the input otherwise
node.prototype.insert = function(char){
	if(!this.children[char])
		this.children[char] = new node(char);
    
    this.numPrefix++;
	return this.children[char];
};

Trie.prototype = {
	insert: function(str){
		//str = str.toLowerCase();
        if(this.search(str))
            return;
        
		let root = this.root;
		for(let i=0;i<str.length;i++){
			let char = str.charAt(i);
			root = root.insert(char);
		}
		root.isTerminus = true;
		root.numPrefix++;
        //console.log("# Strings in Trie",this.root.numPrefix);
		return this;
	},

    search: function(str){
		//str = str.toLowerCase();
        if(str=="") return true;
		let root = this.root;
		for(let i=0;i<str.length;i++){
			let char = str.charAt(i);
			if(!root.children[char]) return false;
			root = root.children[char];
		}
		return root.isTerminus;
	},
    
	// return the number of strings with the input as their prefixes
	numPrefix: function(str){
		//str = str.toLowerCase();
		let root = this.root;
		for(let i=0;i<str.length;i++){
			let char = str.charAt(i);
			//console.log(char);
			if(!root.children[char]) 
                return 0;
            //console.log(root.numPrefix);
            root = root.children[char];
            //console.log(root.numPrefix);
		}

        return root.numPrefix;
    },

    display: function(){
		let root = this.root,
			queue = [];
		queue.push(root);
		while(queue.length>0){
			let root = queue.shift();
			for(var child in root.children){
				queue.push(root.children[child]);
			}
		}
	}
};

(function main(){
	var t = new Trie();

	t.insert("sssss");
	t.insert("ssss");
	t.insert("sss");
	t.insert("ss");
	t.insert("s");

	var b1 = t.search("s"),
		b2 = t.search("ss"),
		b3 = t.search("sss"),
		b4 = t.search("ssss"),
		b5 = t.search("sssss");
	console.log(b1,b2,b3,b4,b5);
	
	var num1 = t.numPrefix("s"),
		num2 = t.numPrefix("ss"),
		num3 = t.numPrefix("sss"),
		num4 = t.numPrefix("ssss"),
		num5 = t.numPrefix("sssss"),
		num6 = t.numPrefix("ssssss");
	console.log(num1, num2, num3, num4, num5, num6);

	t.insert("hack").insert("hackerrank");
	console.log(t.numPrefix("hac"), t.numPrefix("hak"));
})();