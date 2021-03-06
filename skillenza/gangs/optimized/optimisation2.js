var readline = require('readline');

var compositeGang = 0;
var primeGang = 0;
var data = {};

	
	function main(data) {
		var keys = Object.keys(data);

		keys.map(key=>{
		    primeGang = 0;
		    compositeGang = 0;
			let splits = key.split(',');
			let rows = splits[1];
			let columns = splits[2];
			let array = data[key];
			checkForCompositeGangs(array,rows,columns);
			console.log(primeGang+' '+compositeGang);
		});
	}

	function readData(){
	        let rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
                terminal: false
		    });
		    let testCases = 0;
		    let count = 0;
		    let rowColNum = false;
		    let rowCount = 0;
		    let row = 0;
		    let column = 0;
            rl.on('line', function(line){
                if(count === 0){
    				count++;
				    testCases++;
				    rowColNum = true;
			    }else if(rowColNum){
                    let seps = line.split(' ');
				    row = parseInt(seps[0]);
				    column = parseInt(seps[1]);
				    rowCount = 0;
				    rowColNum = false;
                }else{
    				let key = testCases+','+row+','+column;
				    if(data[key] === undefined){
    					data[key] = [];
				    }
				    data[key][rowCount] = [];
				    let seps = line.split(' ');
				    seps.map(number=>{
				        var isPrime = isPrimeNumber(number);
    					data[key][rowCount].push(new Node(number,isPrime));
				    });
				    if(rowCount === row-1){
    					rowColNum = true;
					    testCases++;
				    }
				    rowCount++;
			    }
		    }.bind(this)).on('close',()=>{ main(data);});
    }

	function checkForCompositeGangs(array, rows, columns) {
		var checkFor = null;
		var checkList = [];
		for (var i = 0; i < rows; i++) {
			for (var j = 0; j < columns; j++) {
				var node = array[i][j];
				if(node !== null) {
					var isPrime = node.isPrime;
					if(checkFor === null) {
						checkFor = isPrime;
					}
					if(checkFor === isPrime) {
						node.checked = true;
						checkList.push(i+","+j);
						checkForEight(array,checkFor,checkList,rows,columns);
					}
									
					if(checkFor === true) {
						primeGang++;
					}else {
						compositeGang++;
					}
					if(checkFor !== null) {
						doNull(array,rows,columns);
						checkForCompositeGangs(array,rows,columns);
					}
				}
			}
		}
	}

	function doNull(array,rows,columns) {
		for (var i = 0; i < rows; i++) {
			for (var j = 0; j < columns; j++) {
				var node = array[i][j];
				if(node !== null && node.checked) {
					array[i][j] = null;
				}
			}
		}
	}

	function checkForEight(array,checkFor,checkList,rows,columns) {
			var i = parseInt(checkList[0].split(",")[0]);
			var j = parseInt(checkList[0].split(",")[1]);
			var node;
			var number;
			if(i-1 >= 0 && j >= 0 && array[i-1][j] !== null) {
				node = array[i-1][j];
				if(checkFor === node.isPrime && !node.checked) {				
					node.setChecked(true);
					number = (i-1)+","+(j);
					if(checkList.indexOf(number) === -1) {
						checkList.push(number);
					}
				}
			}
			if(i >= 0 && j-1 >= 0 && array[i][j-1] !== null) {
				node = array[i][j-1];
				if(checkFor === node.isPrime && !node.checked) {				
					node.setChecked(true);
					number = (i)+","+(j-1);
					if(checkList.indexOf(number) === -1) {
						checkList.push(number);
					}
				}
			}
			if(i >= 0 && j+1 < columns && array[i][j+1] !== null) {
				node = array[i][j+1];
				if(checkFor === node.isPrime && !node.checked) {				
				    node.setChecked(true);
					number = (i)+","+(j+1);
					if(checkList.indexOf(number) === -1) {
						checkList.push(number);
					}
				}
			}
			if(i+1 < rows && j >= 0 && array[i+1][j] !== null) {
				node = array[i+1][j];
				if(checkFor === node.isPrime && !node.checked) {
					node.setChecked(true);
					number = (i+1)+","+(j);
					if(checkList.indexOf(number) === -1) {
						checkList.push(number);
					}
				}
			}
			checkList = checkList.filter(obj => obj !== i+","+j);
			if(checkList.length !== 0) {
				checkForEight(array,checkFor,checkList,rows,columns);
			}
		
	}

	function isPrimeNumber(number) {
	    if(parseInt(number) === 2) {
    		return true;
    	}
    	if(parseInt(number) % 2 === 0) {
		    return false;
	    }
	    for (var i = 3; i < parseInt(number)/2; i++) {
    		if(parseInt(number) % i === 0) {
			    return false;
		    }
	    }
	    return true;
    }


class Node{
	constructor(number,isPrime) {
		this.number= number;
		this.isPrime = isPrime;
		this.checked = false;
	}
	
	setChecked(checked){
	    this.checked = checked;
	}
}

readData();