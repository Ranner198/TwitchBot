//Core Depencies
const tmi = require('tmi.js');
const opn = require('opn');

//JSON List
const json = require('./TwitchBotJson.json');
var string = JSON.stringify(json);
var obj = JSON.parse(string);

var userName = obj.UserData[0]["UserName"];
var chatChannel = obj.UserData[1]["ChatChannel"];
var passWord = obj.UserData[2]["PassWord"];

console.log(userName);
console.log(chatChannel);
console.log(passWord);

var options = {
	options: {
		debug: true
	},
	connection: {
		cluster: "aws",
		reconnect: true
	},
	identity: {
		username: userName,
		password: passWord
	},
	channels: [chatChannel]
};

//Timer ----------------------------------------------------------------------------------------------------------------------------------------------------------------
var UpSeconds = 0;

var currentTime = 0;

//Variables
var Seconds = 0;
var Mins = 0;
var Hours = 0;

setInterval(Timer, 1000); 

function Timer() {

	var tempHold = '';

	UpSeconds = UpSeconds + 1;

	Seconds = UpSeconds;

	if (Seconds < 10 && Seconds.toString().length < 2)
	{
		Seconds = '0' + Seconds
	}
	if (Mins < 10 && Mins.toString().length < 2)
	{
		tempHold = '0';
	}
	else
	{
		tempHold = '';
	}

	if (Seconds >= 60)
	{
		Mins = Mins + 1;
		UpSeconds = 0;
	}

	if (Mins >= 60)
	{
		Hours = Hours + 1;
		Mins = 0;
	}

	currentTime = Hours + ':' + tempHold + Mins + ':' + Seconds;
}

//Logic ----------------------------------------------------------------------------------------------------------------------------------------------------------------
var client = new tmi.client(options);
client.connect();

var colorArray = ["Blue", "BlueViolet", "CadetBlue", "Chocolate", "Coral", "DodgerBlue", "Firebrick", "GoldenRod", "Green", "HotPink", "OrangeRed", "Red", "SeaGreen", "SpringGreen", "YellowGreen"];

var colorIndex = colorArray.length;

var currentColor = 0;

function randomColor() {
	currentColor = Math.floor(Math.random() * colorIndex);
}

client.color(colorArray[currentColor]).then(function(data) {
    return 
}).catch(function(err) {
    console.log(err);
});

//Hosted
client.on("hosted", function (channel, user, viewers, autohost) {
    client.action(chatChannel, user + 
    	" thank you for the host! Current viewers = " + viewers);
});

//User Joined ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var numJoined = 0;

client.on("join", function (channel, username, self) {

	if (self) return;

	numJoined++;
	if(username != chatChannel) {
		client.action(chatChannel, "Hello " + username + " has joined chat, say hi HeyGuys");
	}
    if (numJoined % 3 == 0)
    {
    	client.action(chatChannel, " Hi, I'm RannerBot. I do things, just type !help to see my list of commands.");
    }

});







	//Commands JSON------------------------------------------------------------------------------------------------------------------------------------------------------------
client.on("chat", function (channel, userstate, message, self) {
    
	var holdMessage = message.toLowerCase();

    if (self) return;

	//Command Messages
    if (holdMessage[0] == "!") {

    	var Action = "null";

    	var Head = "";

    	var Tail = "";

    	var position = -1;

    	for (let i = 0; i < json.Commands.length; i++) {
    		if (Object.keys(json.Commands[i]) == holdMessage)
    		{		
    			var charArray = obj.Commands[i][holdMessage];
    			
    			//If ~ exist
    			if (charArray.indexOf('~') != -1) {
    				let indexes = [];

    				for (let i = 0; i < charArray.length; i++) {
    					if (charArray[i] == '~')
    						indexes.push(i);
    				}

    				for (let i = 0; i < indexes.length; i++) {
	    				if(charArray[indexes[i]+1] == 'n') {
	    					Head = '@' + userstate['display-name'];
	    				}
	    				if(charArray[indexes[i]+1] == 't') {
	    					Tail = currentTime + '.';   
	    				}
    				}  	
    				if (charArray.indexOf('~@') != -1)
    				{
    					position = charArray.indexOf('~@');
    				}	
    			}

    			if (Head != "" || Tail != "" || position != -1) {
	    			let temp = charArray.split('');
	    			for (let i = 0; i < temp.length; i++) {
	    				if (temp[i] == '~') {
	    					temp.splice(i, 2);
	    					if (i + 3 != null) {
	    						i = i+3;
	    					}
	    				}
	    			}

	    			Action = temp.join('');
    			}
    			else 
					Action = charArray;
    		}
    	}

		if (holdMessage == "!quote" || holdMessage == "!quotes")
		{
			var rand = obj.Commands[4].quote[Math.floor(Math.random() * obj.Commands[4].quote.length)];
			client.action(chatChannel, rand);
		}

    	if (Action != "null" && position == -1) {
    		if (position != -1) {
    			//client.action(chatChannel)
    		}
    		else {
				client.action(chatChannel, Head + Action + Tail);
    		}
    	}
    }







    //Jokes ----------------------------------------------------------------------------------------------------------------------------------------------------------------
    if (holdMessage == "!rip")
    {
    	client.action(chatChannel, "Puts a Flower on @" + userstate['display-name'] + "'s Grave." );
    	opn('https://www.youtube.com/watch?v=f49ELvryhao');
    }

	//(Include) Jokes -------------------------------------------------------------------------------------------------------------

    if (holdMessage.includes(userName))
    	client.action(chatChannel, '@' + userstate['display-name'] + " cmonBruh");

    if (holdMessage.includes(chatChannel))
    	client.action(chatChannel, '@' + userstate['display-name'] + " New phone, who dis?");

    if (holdMessage.includes("shit") || holdMessage.includes("fuck") || holdMessage.includes("cock") || holdMessage.includes("dick") || holdMessage.includes("ass") || holdMessage.includes("mf"))
    	client.action(chatChannel, '@' + userstate['display-name'] + " Watch yo' profanity.");

	
	if (holdMessage.includes("songrequest") && holdMessage.includes("youtube.com")) {

		var songTitle = [];

		var whereToStart = message.indexOf("https");

		for (var i = whereToStart; i < message.length; i++) {
			songTitle.push(message[i].toString());
		}		
		var stringName = songTitle.join('');
		opn(stringName);
		client.action(chatChannel, stringName);
	}





    //Clear Chat Function -----------------------------------------------------------------------------------------------------------
	if (holdMessage == "!clear") {
		client.clear(chatChannel).then(function(data) {
	    	console.log("chat has been cleared by: " + userstate['display-name']);
		}).catch(function(err) {
		    console.log(err);
		});
	}
/*
	if (holdMessage == "!changecolor") {
		randomColor();
		client.action("ranner198", "My current color is: " + colorArray[currentColor]);
	}


    if (holdMessage == "!overlay")
    	client.action("ranner198", " My Overlay is from: https://wdflat.com/product/fortnite-overlay/ they have some really great overlays go check them out!");
*/

});


//Follow Me Loop ----------------------------------------------------------------------------------------------------------------------------------------------------------------

var tipsAndTricks = ["The userName is now up and running in Alpha Stage, type !help for the list of avaliable commands", "Enjoying the stream? Follow me on Twitter: https://twitter.com/Ran_Crump and Instagram: https://www.instagram.com/ran_crump"]

/*

setInterval(followMe, 1200000);


function followMe(channel)
{
	var randomNum = tipsAndTricks[Math.floor(Math.random() * tipsAndTricks.length)];

	client.action("ranner198", randomNum);
}
*/
