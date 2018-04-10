var tmi = require('tmi.js');

const opn = require('opn');

var options = {
	options: {
		debug: true
	},
	connection: {
		cluster: "aws",
		reconnect: true
	},
	identity: {
		username: "rannerbot:",
		password: "oauth:u0xmwn51xanm4yg6x1wyd8r24i56d2"
	},
	channels: ["ranner198"]
};

//Timer --------------
var UpSeconds = 50;

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

	currentTime = Hours + ':' + tempHold + Mins + ':' + Seconds + " UpSeconds: ";
}

//Quotes         ---> Blank Quote: "\"\", ."
var Quotes = ["\"Penis Digivolve\", Spartan 2015.", "\"Fuck with me you know I got it!\", Spartan 2015.", "\"SHOW ME THE NUDES!\", Spartan 2015.", "\"I'm so mean, I make medicine sick\", Spartan 2016.",
"\"Y'all fucked me I'ma fuck y'all back even harder\", Spartan 2016.", "\"You went from retarted to even more retarded\", Spartan 2017.", "\"Shut the fuck up. Shut the fuck up right now.\", Spartan 2017.",
 "Ranner: \"Crucible or finish the missions?\". Spartan: \"FINISH THE FUCKING MISSIONS\", 2017.", "\"Yeah Get Mad!\", Ranner 2017.", "\"Oof\", Ranner 2018."];


//Logic --------------
var client = new tmi.client(options);
client.connect();

client.color("#33F9FF");

//Hosted
client.on("hosted", function (channel, user, viewers, autohost) {
    client.action("ranner198", user + 
    	" thank you for the host! Current viewers = " + viewers);
});

//User Joined
var numJoined = 0;

client.on("join", function (channel, username, self) {

	if (self) return;

	numJoined++;

    client.action("ranner198", username +
    	" has joined chat.");

    if (numJoined % 2 == 0)
    {
    	client.action("ranner198", " Hi, I'm RannerBot. I do things, just type !help to see my list of commands.");
    }

});

//Commands
client.on("chat", function (channel, userstate, message, self) {
    
	var holdMessage = message.toLowerCase();

    if (self) return;

    //If Not Self

    if (holdMessage == "!help")
    	client.action("ranner198", userstate['display-name'] + " Commands: !help, !twitter, !instagram, !rip, !small, !uptime, !epic, !pcinfo, !fortnite, !overlay, !quote, !songrequest");

    if (holdMessage == "!twitter")
		client.action("ranner198", "https://twitter.com/Ran_Crump");

    if (holdMessage == "!instagram")
		client.action("ranner198", "https://www.instagram.com/ran_crump");

    //Jokes
    if (holdMessage == "!rip")
    {
    	client.action("ranner198", "Puts a Flower on " + userstate['display-name'] + "'s Grave." );
    	var audio = new Audio('audio_file.mp3');
		audio.play();
    }
	 
	if (holdMessage == "!small")
    	client.action("ranner198", '@' + userstate['display-name'] + " is small!" );

	if (holdMessage == "!uptime")
    	client.action("ranner198", "@" + userstate['display-name'] + " the stream as been running for: " + currentTime + '.');

    if (holdMessage == "!epic")
    	client.action("ranner198", userstate['display-name'] + " Ranner's account is Ranner198.");

    if (holdMessage == "!pcinfo")
    	client.action("ranner198", "Ranner has a 2016 ASUSTek, CPU: Intel i7-6700, GPU: NVIDA GeForce GTX 970, RAM: 16GB, Memory: 2TB, Network Speed: 130/15.");

    if (holdMessage == "!fortnite")
    	client.action("ranner198", "Total Kills: 525, Win: 3%, K/D: 1.20, KPM: 0.4, Level: 51.");

    if (holdMessage == "!overlay")
    	client.action("ranner198", " My Overlay is from: https://wdflat.com/product/fortnite-overlay/ they have some really great overlays go check them out!");

    if (holdMessage.includes("rannerbot"))
    	client.action("ranner198", '@' + userstate['display-name'] + " cmonBruh");

    if (holdMessage.includes("ranner198"))
    	client.action("ranner198", '@' + userstate['display-name'] + " New phone, who dis?");

    if (holdMessage.includes("shit") || holdMessage.includes("fuck") || holdMessage.includes("cock") || holdMessage.includes("dick") || holdMessage.includes("ass") || holdMessage.includes("mf"))
    	client.action("ranner198", '@' + userstate['display-name'] + " Watch yo' profanity.");

    if (holdMessage == ("!quote")) {
    	var rand = Quotes[Math.floor(Math.random() * Quotes.length)];
		client.action("ranner198", rand);
	}
	
	if (holdMessage.includes("songrequest") && holdMessage.includes("youtube.com")) {

		var songTitle = [];

		var whereToStart = message.indexOf("https");

		for (var i = whereToStart; i < message.length; i++) {
			songTitle.push(message[i].toString());
		}		
		var stringName = songTitle.join('');
		opn(stringName);
		client.action("ranner198", stringName);
	}
});


//Follow Me Loop

var tipsAndTricks = ["The RannerBot is now up and running in Alpha Stage, type !help for the list of avaliable commands", "Enjoying the stream? Follow me on Twitter: https://twitter.com/Ran_Crump and Instagram: https://www.instagram.com/ran_crump"]

setInterval(followMe, 1200000);

function followMe(channel)
{
	var randomNum = tipsAndTricks[Math.floor(Math.random() * tipsAndTricks.length+1)];

	client.action("ranner198", randomNum);
}
