/**
 * @param {number[]} prices
 * @return {number}
 */
// [7, 6, 5, 8, 7, 1]
var maxProfit = function(prices) {
    if(prices.length==1) return 0;
    if(prices.length==2) return prices[1]-prices[0]>0 ? prices[1]-prices[0] : 0;
    
    let len = prices.length,
        l = prices[0], 
        r = prices[len-1], 
        maxDiff = 0,
        i = 1,
        j = len-2;

    while(i<j){
        if(prices[i]<l)
            l = prices[i];
        if(prices[j]>r)
            r = prices[j];
        i++;
        j--;
    }
    return r-l>0 ? r-l : 0;
};

(function main(){
	var p = [7, 6, 4, 3, 1],
		result = maxProfit(p);
	console.log(result);
})();