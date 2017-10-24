var p1 = 5, p2 = 20;
//do your processing here.
function gcd(a, b){
	if(a<b){
	  let temp = b;
	  b = a;
	  a = temp;
	}
	if(a%b==0) return b;
	return gcd(b, a%b);
}

if(parseInt(p1)<p1 || parseInt(p2)<p2){
  p1 = 10*p1;
  p2 = 10*p2; 
}

var divisor = gcd(p1, p2);
p1 = p1/divisor;
p2 = p2/divisor;

console.log(p1+'/'+p2);