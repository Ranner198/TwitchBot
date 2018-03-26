var tmi = require('tmi.js');

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
client.on("join", function (channel, username, self) {

	if (self) return;

    client.action("ranner198", username +
    	" has joined chat.");
});

//Commands
client.on("chat", function (channel, userstate, message, self) {
    
	var holdMessage = message.toLowerCase();

    if (self) return;

    //If Not Self

    if (holdMessage == "!help")
    	client.action("ranner198", userstate['display-name'] + "Commands: !help, !twitter, !instagram, !rip, !small, !uptime, !epic, !pcinfo, !fortnite, !overlay");

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
    	client.action("ranner198", "Total Kills: 305, Win: 5%, K/D: 1.04, KPM: 0.2, Level: 32.");

    if (holdMessage == "!overlay")
    	client.action("ranner198", " My Overlay is from: https://wdflat.com/product/fortnite-overlay/ they have some really great overlays go check them out!");

    if (holdMessage.includes("rannerbot"))
    	client.action("ranner198", '@' + userstate['display-name'] + " cmonBruh");

    if (holdMessage.includes("ranner198"))
    	client.action("ranner198", '@' + userstate['display-name'] + " New phone, who dis?");

    if (holdMessage.includes("shit") || holdMessage.includes("fuck") || holdMessage.includes("cock") || holdMessage.includes("dick") || holdMessage.includes("ass"))
    	client.action("ranner198", '@' + userstate['display-name]'] + " Watch yo' profanity.");
});


//Follow Me Loop
setInterval(followMe, 240000);

setInterval(needHelp, 200000);

function followMe(channel)
{
  client.action("ranner198", "The RannerBot is now up and running in Alpha Stage, type !help for the list of avaliable commands");
}

function needHelp(channel)
{
  client.action("ranner198", "Enjoying the stream? Follow me on Twitter: " +
  " https://twitter.com/Ran_Crump" + " and Instagram: https://www.instagram.com/ran_crump");
}
