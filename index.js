const fs = require('fs');
const typeMap = require('./typeMap.json');

function renameTypeMapKeys() {
	let newTypeMap = {};
	const types = Object.keys(typeMap);
	for (let i = 0; i < types.length; i++) {
		newTypeMap[types[i]] = [];
		for (let j = 0; j < typeMap[types[i]].length; j++) {
			if (typeMap[types[i]][j].csl && typeMap[types[i]][j].UI) {
				newTypeMap[types[i]].push({"csl": typeMap[types[i]][j].csl, "displayText": typeMap[types[i]][j].UI})
			}
		}
	}
	fs.writeFile('newTypeMap.json', JSON.stringify(newTypeMap), (err) => {
		if (err) {
			console.log(err);
		}
	});
}

function splitTypeMap() {
	const types = Object.keys(typeMap);
	for (let i = 0; i < types.length; i++) {
		fs.writeFile(`./fields/${types[i]}.json`, JSON.stringify(typeMap[types[i]]), (err) => {
			if (err) {
				console.log(err);
			}
		});
	}
}