var irc = require("irc");

// For Debugging
//
// console.log(JSON.stringify(me, null, 4));
// console.log(util.inspect(command, false, null));
// var util = require('util');

var config = {
	botname			: "anais",
	shortcuts		: ["a", "as"],
	channels		: ["#mindresin"],
	server			: "192.168.0.2",
	realname		: "http://github.com/gridlok/anais",
	ident			: "nodebot"
};


//	Create the IRC connection
//
var bot = new irc.Client(
	config.server,
	config.botname,
	{
		userName: config.ident,
		realName: config.realname,
		port: 6667,
		debug: true,
		showErrors: true,
		autoRejoin: true,
		autoConnect: true,
		channels: config.channels,
		secure: false,
		selfSigned: false,
		certExpired: false,
		floodProtection: false,
		floodProtectionDelay: 1000,
		sasl: false,
		stripColors: false,
		channelPrefixes: "&#",
		messageSplit: 512
	}
);


// 	Available commands
// 	TODO: Move to dedicated module
// 	
var command = {
	time: function(user, channel) {
		//	Output local time
		console.log('someone asked for the time');
	},
	fire: function(user, channel) {
		console.log('oh shit, fire!');
	},
	roll: function(user, channel, scope) {
		// 	Roll a dice in nDn format. Example: Roll 2d6 will roll two six-sided dice.
		console.log('user wants to roll some dice');
	},
	commands: function() {
		console.log(commandIndex);
	}
};


//	Array that indexes all available commands in the command module
//	
var commandIndex = [];

for (var i in command) {
	if (command.hasOwnProperty(i)) {
		commandIndex.push(i);
	}
}


//	The bot can identify itself from this array of identifiers
//	
var me = [config.botname];

for (var i in config.shortcuts) {
	me.push(config.shortcuts[i]);
}


// 	Listener breaks down string sent to a channel. If the first word is a bot reference,
//	determine if a command is being issued and take action.
// 	
bot.addListener('message', function (from, to, message) {
	//	Splits message string using RegEX using ' ',  ',' and '.' as seperators
	//
	var m = message.split(/[\s,.]+/);

	// Filter out whitespace/undefined
	//
	m = m.filter( function (n) { return n != undefined && n !="" });

	//	Determine if m[0] is a reference. If so,
	//	Determine if m[1] is a command.
	//	If conditions me, reference the command index to commence action.
	//
	if (me.indexOf(m[0]) >= 0 && commandIndex.indexOf(m[1]) >= 0) {
		command[m[1]]();
	}

    console.log(from + ' => ' + to + ': ' + message);
});


//	Listener for private messages.
//
bot.addListener('pm', function (from, message) {
    console.log(from + ' => ME: ' + message);
});


// Listener for error events.
//
bot.addListener('error', function(message) {
    console.log('error: ', message);
});