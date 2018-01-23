function getWordList() {

	console.log("hi");

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
};

function pickWords(numWords) {
	var wordList = _.sample(getWordList(), numWords);
	console.log(wordList);
	return wordList;
}

function pickGame() {
	var indexArray = _.shuffle(_.range(25));

	var game = {
		players: [{
			green: indexArray.slice(0,9),
			assassins: [indexArray[13], indexArray[14], indexArray[15]]
		},
		{
			green: indexArray.slice(6,14),
			assassins: [indexArray[0], indexArray[14], indexArray[20]]
		}],
		history: [
/* example */
			{ 
				guesser: 1,
 				clue: { word: "BLAHBLAH", limit: 2 },
 				guesses: [2, 3, 9]
			}
		]
	}
	console.log(game);
	return game;
}

function setupGameFor(game, playerIdx) {
	console.log("Setting up for " + playerIdx);
	// my buttons
	game.players[playerIdx].green.forEach(function(idx) {
		$('#my' + idx).html("<i class='far fa-dot-circle'></i>");
	});
	game.players[playerIdx].assassins.forEach(function(idx) {
		$('#my' + idx).html("<i class='far fa-times-circle'></i>");
	});
}

function fillWords(words) {
	words.forEach(function(word, index) {
		$("<tr><td id='my" + index + "'></td><td id='word" + index + "'>" + word + "</td><td id='other" + index +"'</td></tr>").appendTo("#mainTable");
	});
}
