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
		username: "rannerbot",
		password: "oauth:u0xmwn51xanm4yg6x1wyd8r24i56d2"
	},
	channels: ["ranner198"]
};

var client = new tmi.client(options);
client.connect();

client.color("#33F9FF");

//Hosted
client.on("hosted", function (channel, user, viewers, autohost) {
    client.action("ranner198", user['display-name'] + 
    	" thank you for the host! Current viewers = " + viewers);
});

//User Joined
client.on("join", function (channel, user, self) {
    client.action("ranner198", user['display-name'] +
    	" has joined Hurrah! Hurrah! Hurrah!");
});

//Commands
client.on("chat", function (channel, userstate, message, self) {
    
    //Just For Testing - To Delete 
    if (message == "!help")
    	    client.action("ranner198", userstate['display-name'] +
    	" Help Requested");

    if (self) return;
    if (message == "!help")
    	    client.action("ranner198", userstate['display-name'] +
    	" Help Requested");
});


//Follow Me Loop
setInterval(followMe, 120000);

function followMe(channel)
{
  client.action("ranner198", "Enjoying the stream? Follow me on Twitter: " +
  " https://twitter.com/Ran_Crump" + " and Instagram: https://www.instagram.com/ran_crump");
}