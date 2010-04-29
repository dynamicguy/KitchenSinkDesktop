Application
===========
##Useful methods

The API module also contains information about the currently-running Titanium
application, which may be retrieved via <tt>Titanium.API.getApplication</tt>.
The <tt>Application</tt> object that is returned by this method has a multitude of
[useful properties](href="http://developer.appcelerator.com/apidoc/desktop/1.0/Titanium.API.Application.html").

	:::javascript
	var app = Titanium.API.application;
	alert(app.getDataPath());
	alert(app.getGUid());

The App module also contains some very useful API points for dealing
with the currently-running application. In particular you may wan to
convert an <tt>app://</tt> URL into a path.

	:::javascript
	// The two alerts should be the same.
	alert(Titanium.App.appURLToPath("app://images/kitten.png"));
	alert(Titanium.Filesystem.getFile(Titanium.API.application.resourcesPath,
		"images", "kitten.png"));

One of the main benefits of the App module though is that it can
return values from the <tt>tiapp.xml</tt> file. This might be useful for
displaying the application version to the user or presenting a link to
your URL.

	:::javascript
	alert("Welcome to " + Titanium.App.getName() + 
		" " + Titanium.App.getVersion());

##Application properties

Application properties provide a light-weight alternative to HTML5
databases or the Titanium Database module. They come in two varieties:
system properties and user properties. System properties are read-only
properties that are defined via the <tt>tiapp.xml</tt> file, while user properties
can be stored at any file path.

###System properties

In the KitchenSink <tt>tiapp.xml</tt>, the following properties are defined
as children of the `<ti:app>` node:

	:::xml
	<property name="myString" type="string">I am a String</property>
	<property name="myDouble" type="double">1.23</property>
	<property name="myBool" type="boolean">true</property>
	<property name="myInt" type="int">1</property>
	<property name="myList" type="list">1,2,3</property>
	<property name="myDefaultString">I am a default string</property>

It is possible to access these properties by getting an instance of
the system properties object:

	:::javascript
	var properties = Titanium.App.getSystemProperties();
	alert(properties.getString("myString"));
	alert(properties.getInt("myInt"));

System properties are read-only, because an application may not have write
access to it's installation directory (where <tt>tiapp.xml</tt> resides). To
store properties, it's recommended that you write a user properties file to the
application data directory.

###User properties

User properties have the same interface as system properties, but can be stored
in any file on the filesystem. Generally speaking, it's best to store these in
in the application data directory, which is a per-user are to store application
files. On Linux this is in <tt>~/.titanium/appdata/</tt>, on OS X,
<tt>~/Library/Application Support/Titanium/appdata</tt> and on Windows in
<tt>%appdata%/Titanium/appdata</tt>.

Here is an example of reading and writing to a user properties file:

	:::javascript
	var file = Titanium.Filesystem.getFile(
		Titanium.API.application.dataPath, "demo.properties");

	// Load the file if it exists.
	var properties = null;
	if (file.exists())
		properties = Titanium.App.loadProperties(file);

	// If the file doesn't exist, yet just create a new properties object.
	if (properties === null)
		properties = Titanium.App.createProperties({
			val1: true,
			val2: 1.1,
			val3: ['a', 'b', 'c'],
			val4: "123"
		});

	// Update the properties object and save it.
	alert(properties.getString('val4'));
	properties.setString('val4', '321');
	properties.saveTo(file);

##Exiting and restarting

It is possible to exit and restart your application. This is useful
for creating a custom exit button. The application will also exit when
the last top-level window closes. It is alos possible to prevent your
application from exiting by listening for the <tt>EXIT</tt> event.
One complication with this approach is that the <tt>EXIT</tt> event is
fired after the last window closes, so you might need to recreate the
main window. A better approach is to simply catch <tt>CLOSE</tt> events.

	:::javascript
	// Exit KitchenSink
	Titanium.API.addEventListener(Titanium.EXIT, function(event)
	{
		if (!confirm("Are you sure you want to exit?"))
			event.preventDefault();
	});
	Titanium.App.exit();

	// Restart KitchenSink
	Titanium.App.restart();

