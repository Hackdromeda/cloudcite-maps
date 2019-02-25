const fs = require('fs');
const typeMap = require('./typeMap.json');
let keys = Object.keys(typeMap);
/*
for (let i=0;i<keys.length;i++) {
	for (let j=0; j<typeMap[keys[i]].length; j++) {
		typeMap[keys[i]][j].type = typeMap[keys[i]][j].csl;
		typeMap[keys[i]][j] = {"csl": typeMap[keys[i]][j].csl, "displayText": typeMap[keys[i]][j].displayText, "group": typeMap[keys[i]][j].displayText}
	}
}
fs.writeFile('./typeMapNew.json', JSON.stringify(typeMap), err => {
	console.log(err);
})
*/
function splitTypeMap() {
	for (let i=0;i<keys.length;i++) {
		let fieldMap = typeMap[keys[i]].filter(typeArray => !typeArray.group && typeArray.csl != "" && typeArray.displayText != "");
		let creatorsMap = typeMap[keys[i]].filter(typeArray => typeArray.group && typeArray.group === 'name-variables' && typeArray.csl != "" && typeArray.displayText != "");
		for (let j=0;j<fieldMap.length;j++) {
			fieldMap[j] = {"csl": fieldMap[j].csl, "displayText": fieldMap[j].displayText}
		}
		for (let j=0;j<creatorsMap.length;j++) {
			creatorsMap[j] = {"csl": creatorsMap[j].csl, "displayText": creatorsMap[j].displayText}
		}
		fs.writeFile(`./fields/${keys[i]}.json`, JSON.stringify(fieldMap), (err) => {
			if (err) {
				console.log(err);
			}
		});
		fs.writeFile(`./creators/${keys[i]}.json`, JSON.stringify(creatorsMap), (err) => {
			if (err) {
				console.log(err);
			}
		});
	}
}


/*
for (let i=0;i<keys.length;i++) {
	fs.writeFile(`./fields/${keys[i]}.json`, JSON.stringify(typeMap[keys[i]]), (err) => {
		if (err) {
			console.log(err);
		}
	});
}
*/