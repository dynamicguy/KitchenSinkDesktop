Notifications
=============
##Creating Notifications

Desktop notifications are provided by Growl on OS X, Snarl on Windows
and libnotify on Linux. If a notification provider cannot be found,
notifications will be shown with an HTML / CSS backup.

A simple notification:

	:::javascript
	var cb = function()
	{
		alert("I've been clicked.");
	}

	var notification = Titanium.Notification.createNotification({
		'title': "A nice notification",
		'message': "This notifications was brought to you by the letter 'N'.",
		'timeout': 10,
		'callback': cb
	});
	notification.show();

Not all platforms support notification callback or specifying a custom
timeout. You can also supply an icon with your notification:

	:::javascript
	var cb = function()
	{
		alert("I've been clicked.");
	}

	var notification = Titanium.Notification.createNotification({
		'title': "A nice notification",
		'message': "This notifications was brought to you by the letter 'N'.",
		'timeout': 10,
		'callback': cb,
		'icon': 'app://images/icon2.png'
	});
	notification.show();

The icon supplied should be an absolute <tt>app://</tt>, <tt>ti://</tt> or <tt>file://</tt> URL.

