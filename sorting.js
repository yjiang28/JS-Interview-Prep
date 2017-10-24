function quickSort(a, start, end){

	if(start==undefined && end==undefined){
		start = 0;
		end = a.length-1;
	}
	if(start>=end) return;

	// pick pivot
	let length = a.length,
		mid = (start+end)%2==0 ? (start+end)/2 : (start+end-1)/2,
		pivot = a[mid];
	
	// swap pivot with the last element
	let temp = a[end];
	a[end] = pivot;
	a[mid] = temp;
	
	// init head and tail pointers
	let head = start,
		tail = end-1;

	while(head<tail){
		let val = a[head];

		// swap the larger element to the tail
		if(val>=pivot){
			let temp = a[tail];
			a[tail] = val;
			a[head] = temp;
			tail--;
		}
		else
			head++;
	}

	// swap the pivot back to the center
	if(a[head]>=pivot){
		let temp = a[head];
		a[head] = pivot;
		a[end] = temp;
	}
	else{
		let temp = a[head+1];
		a[head+1] = pivot;
		a[end] = temp;
	}	

	// quicksort the left and right partitions
	quickSort(a, start, head);
	quickSort(a, head+1, end);
}

function mergeSort(a, start, end){
	let partition = function(head, tail){
		let part = [];
		for(let i=0;i<tail-head+1;i++){
			part[i] = a[head+i];
		}
		return part;
	};

	let merge = function(p1, p2){
		let len1 = p1.length,
			len2 = p2.length,
			result = [],
			i = 0,
			j = 0;
		while(i<len1 && j<len2){
			if(p1[i]<p2[j]){
				result.push(p1[i]);
				i++;
			}
			else{
				result.push(p2[j]);
				j++;
			}
		}
		while(i<len1){
			result.push(p1[i]);
			i++;
		}
		while(j<len2){
			result.push(p2[j]);
			j++;
		}
		return result;
	};

	if(start==undefined && end==undefined){
		start = 0;
		end = a.length-1;
	}

	let length = a.length;
	
	// base case
	if(length==1) return a;

	let mid = length%2==0 ? length/2-1 : (length-1)/2,
		l = partition(start, mid),
		r = partition(mid+1, end);
	
	return merge(mergeSort(l), mergeSort(r));
}

(function main(){
	var a = [42,4,6,37,2,45,34,10,32],
		b = [42,4,6,37,2,45,34,10,40];

	quickSort(a);
	quickSort(b);
	console.log(a,b);
console.log(quickSort([8, 11, -2, 10]));
	var aOrdered = mergeSort(a),
		bOrdered = mergeSort(b);
	// console.log(aOrdered,bOrdered);

})();

