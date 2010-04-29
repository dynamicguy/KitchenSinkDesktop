Basics
======
##The Titanium Object

The Titanium object is top-level namespace for the entire Titanium API. It
is an object shared between all JavaScript contexts. Each frame, including
the top-level frame of each window, has its own JavaScript context. This
makes sharing data between frames a snap:

	Titanium.DataDump = {}
	Titanium.DataDump.value = "foo";
	alert(Titanium.DataDump.value);

Note: Since it's simple to write to the Titanium object, you should be careful
not to overwrite Titanium namespaces and methods, unless you know what you're
doing.

Almost all instantiated objects in Titanium are accessor-objects. This means
that properties can be accessed and modified in two styles. For example, take
this use use of *API.Application.getName()*:

	alert(Titanium.API.getApplication().getName());
	alert(Titanium.API.getApplication().name);
	alert(Titanium.API.application.name);

Likewise a similar method can be used for modifiers:

	Titanium.UI.currentWindow.setTitle("Title1");
	Titanium.UI.currentWindow.title = "Title2";

##Logging

Titanium provides an API for logging.  There are two supported methods.

	Titanium.API.critical("critical message");
	Titanium.API.debug("debug message");
	Titanium.API.error("error message");
	Titanium.API.fatal("fatal message");
	Titanium.API.notice("notice message");
	Titanium.API.trace("trace message");
	Titanium.API.warn("warning message");

	Titanium.API.log(Titanium.API.CRITICAL,"critical message");
	Titanium.API.log(Titanium.API.DEBUG,"debug message");
	Titanium.API.log(Titanium.API.ERROR,"error message");
	Titanium.API.log(Titanium.API.FATAL,"fatal message");
	Titanium.API.log(Titanium.API.INFO,"info message");
	Titanium.API.log(Titanium.API.NOTICE,"notice message");
	Titanium.API.log(Titanium.API.TRACE,"trace message");
	Titanium.API.log(Titanium.API.WARN,"warn message");


Note: You can view the log output via the web inspector (or
a terminal window if you launched your app from the command line).
The Web Inspector only logs WARN messages or higher.

If you want to control the level of logging that is displayed via stdout,
you can set the logging level.

	alert("The current log level is: " + Titanium.API.getLogLevel());
	Titanium.API.setLogLevel(Titanium.API.FATAL);
	alert("The current log level is: " + Titanium.API.getLogLevel());

##Environment Variables

Titanium allows you to access environment variables via the
*Titanium.API.getEnvironment* function. The object returned
by this function is live representation of all environment variables,
which allows you to query and update the environment easily.

	var env = Titanium.API.getEnvironment();
	alert(env['PATH']);
	
	// Modify the PATH environment variable.
	var sep = Titanium.platform == "win32" ? ";" : ":";
	env['PATH'] = env['PATH'] + sep + "/home/titanium/bin";
	alert(env['PATH']);

##Events

Many objects in Titanium can fire and handle events. Sometimes you
may need to inercept all events after they've bubbled up to the
top-level object. This is possible by installing an event handler
on the Titanium object.

	Titanium.API.addEventListener("CustomEvent", function(event)
	{
		alert("Top-level got " + event.type + " event!");
	});
	Titanium.API.fireEvent("CustomEvent");

Not only will *Titanium.API.addEventListener* listen for events
fired with *Titanium.API.fireEvent*, but it will also listen for
events originating from *all* Titanium objects (unless
*preventDefault* or *stopPropagation* was called on that
event).
