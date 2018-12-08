function loadWordList() {
	var wordList;

	$.ajax({
            url : "lexilink.txt",
            dataType: "text",
            success : function (data) {
            	wordList = data.split("\n");
            },
            async: false
        });
	console.log(wordList);
	return wordList;
}

function pickWords(numWords) {
	var wordList = _.sample(loadWordList(), numWords);
	console.log(wordList);
	return wordList;
}

function generateCode() {
	var code = _.sample([1,2,3,4], 3);
	Cookies.set("code", code);
	revealCode();
}

function revealCode() {
	var code = Cookies.getJSON("code");
	if (!code) {
		code = ['?', '?', '?'];
	}
	showCodeModal(code);
}

function showCodeModal(code) {
	for(idx = 0; idx < 3; idx++) {
		$('#code' + idx).text(code[idx]);
	}
	$('#codeModal').modal('show');	
}


function setWord(word, idx) {
	$('#word' + idx).text(word);
}

function setWords(wordList) {
	for(idx = 0; idx < 4; idx++) {
		setWord(wordList[idx], idx);
	}
}

function loadGame() {
	var wordList = Cookies.getJSON("wordList");
	if (wordList) {
		return wordList;
	} else {
		return null;
	}
}

function newGame() {
	var wordList = pickWords(4);
	Cookies.set("wordList", wordList);
	return wordList;
}

function getWords() {
	var wordList = Cookies.getJSON("wordList");
	if (wordList) {
		console.log("loaded from cookie")
		return wordList;
	} else {
		console.log("no cookie");
		wordList = pickWords(4);
		Cookies.set("wordList", wordList);
		return wordList;
	}
}

function enableFullScreen() {
	if (screenfull.enabled) {
		screenfull.request();
	}

	new NoSleep().enable();
}

function startNewGame() {
	setWords(newGame());
}

function initialize() {
	$('#fullScreenModal').modal('show');

	if (loadGame()) {
		setWords(loadGame());
	} else {
		setWords(['?', '?', '?', '?']);
	}
}
