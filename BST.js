'use strict';

function node(value){
	this.val = value;
	this.l = null;
	this.r = null;
	this.p = null;
}

node.prototype.insert = function(value){
	let root = this,
		newNode = new node(value);

	if(value<root.val){
		if(root.l)
			root.l.insert(value);
		else{
			root.l = newNode;
			newNode.p = root;
		}
	}
	else if(value>root.val){
		if(root.r)
			root.r.insert(value);
		else{
			root.r = newNode;
			newNode.p = root;
		}
	}
	else 
		return undefined;
	return root;
};

node.prototype.search = function(value){
	let root = this;

	if(value<root.val){
		if(root.l)
			return root.l.search(value);
		else
			return undefined;
	}
	else if(value===root.val)
		return root;
	else{
		if(root.r)
			return root.r.search(value);
		else
			return undefined;
	}
};

node.prototype.delete = function(value){
	let node = this.search(value);

	if(node){
		let p = node.p,
			l = node.l,
			r = node.r;
		if(p)
			return null;
		if(l){
			node.p.l = l;
			l.p = node.p;
			l.r = r;
		}
		else{
			node.p.l = r;
			r.p = node.p;
			r.l = l;
		}
		return node;
	}
	else
		return undefined;
};

node.prototype.isBST = function(){
	let helper = function(root, min, max){
		if(root==null) 
			return true;
		
		let rootVal = root.val,
			l = root.l,
			r = root.r;
			
		if((!l || (min<l.val && l.val<rootVal)) && (!r || (rootVal<r.val && r.val<max)))
			return helper(l, min, rootVal) && helper(r, rootVal, max);

		else return false;
	}

	return helper(this, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
};

node.prototype.printBST = function(){
	let queue = [],
		ct = 1,
		str = [];
	queue.push(this);

	while(queue.length!=0){
		let root = queue.shift();
		
		if(root!=null){
			str.push(root.val);
			
			if(root.l) 
				queue.push(root.l);
			else
				queue.push(null);
			if(root.r) 
				queue.push(root.r);
			else
				queue.push(null);
		}
		else 
			str.push("*");	// * indicates null

		if(str.length==ct){
			console.log(str.join(" "));
			str=[];
			ct = ct*2;
		}
	}
};

(function main(){
	var root = new node(6);
	for(let i=0;i<10;i++){
		root.insert(i);
	}
	//root.printBST();
	let isBST = root.isBST();
	console.log(isBST);
})();