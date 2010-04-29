Menus
=====
##Menu Structure

Menus are composed of two different types of objects. <tt>Titanium.UI.Menu</tt>
and <tt>Titanium.UI.MenuItem</tt>. A <tt>Menu</tt> is a container for
<tt>MenuItem</tt>s, while <tt>MenuItems</tt>s represent a single menu entry.
There are three types of menu items: normal menu items, check menu items and
separator items. A check menu item is a stateful menu item that can either be
on or off, while a separator item is a non-interactive item which simply inserts
a separator line in the menu.

Titanium menus and menu items are <em>live</em>, meaning that you can add them
to any number of menus and use them in any number of places and all instances
will update immediately. For instance, you may construct a menu object, set it
on the current window and the tray item, and then update the first menu item.
The menu item will immediately change on both the tray icon and the window.

##Simple Menus

Here is some code which constructs a simple menu:

	:::javascript
	var createMenuItem = Titanium.UI.createMenuItem;
	var createMenu = Titanium.UI.createMenu;

	var makeItem = function(name)
	{
		var item = createMenuItem(name, function()
		{
			alert("Selected the '" + name + "' item");
		});
		return item;
	};

	var mainMenu = createMenu();
	mainMenu.appendItem(createMenuItem("Characters"));
	mainMenu.appendItem(createMenuItem("Plot Twists"));
	mainMenu.appendItem(createMenuItem("Endings"));

	var menu = createMenu();
	menu.appendItem(makeItem("George, the spy"));
	menu.appendItem(makeItem("Henriette, the scientist"));
	menu.appendItem(makeItem("Ferdinand, the politician"));
	mainMenu.getItemAt(0).setSubmenu(menu);

	var menu = createMenu();
	menu.appendItem(makeItem("Doublecross"));
	menu.appendItem(makeItem("Deux ex machina"));
	menu.appendItem(makeItem("Dinosaurs"));
	mainMenu.getItemAt(1).setSubmenu(menu);

	var menu = createMenu();
	menu.appendItem(makeItem("Sad"));
	menu.addSeparatorItem();
	menu.appendItem(makeItem("Happy"));
	menu.appendItem(makeItem("Surreal"));
	mainMenu.getItemAt(2).setSubmenu(menu);

	Titanium.UI.currentWindow.menu = mainMenu;

A menu can also be cleared:

	:::javascript
	Titanium.UI.currentWindow.menu = null;

##Items with Icons

It's pretty easy to create a menu item with an image. 

	:::javascript
	var createMenuItem = Titanium.UI.createMenuItem;
	var createMenu = Titanium.UI.createMenu;

	var mainMenu = createMenu();
	mainMenu.appendItem(createMenuItem("Characters"));

	var menu = createMenu();
	mainMenu.getItemAt(0).setSubmenu(menu);

	var imageItem = createMenuItem("Swap image",
		function()
		{
			if (imageItem.getIcon() == "app://images/icon1.png")
				imageItem.setIcon("app://images/icon2.png");
			else
				imageItem.setIcon("app://images/icon1.png");
		},
		"app://images/icon1.png"
	);
	menu.appendItem(imageItem);
	menu.addItem("Another item");
	menu.addItem("Another another item");

	Titanium.UI.currentWindow.setMenu(mainMenu);

As you can see it's possible to set the menu image during construction
of the menu item or to change it later via the <tt>setIcon</tt> method.

##Check Menu Items

Check menu items are stateful menu items which have
distinct 'on' and 'off' states which toggle when the
item is selected.

	:::javascript
	var createMenu = Titanium.UI.createMenu;
	var mainMenu = createMenu();
	mainMenu.addItem("Characters");
	var menu = createMenu();
	mainMenu.getItemAt(0).setSubmenu(menu);

	var checkItem = Titanium.UI.createCheckMenuItem("Check state",
		function()
		{
			alert("Previous state of the item: " + checkItem.getState());
		}
	);
	menu.appendItem(checkItem);
	menu.addItem("Another item");
	menu.addSeparatorItem();
	menu.addItem("Another another item");
	Titanium.UI.currentWindow.setMenu(mainMenu);

Sometimes you need more advanced control over whether or not the
check should change states. There are two ways to do this. The first
is to use event handling:

	:::javascript
	var createMenu = Titanium.UI.createMenu;
	var mainMenu = createMenu();
	mainMenu.addItem("Characters");
	var menu = createMenu();
	mainMenu.getItemAt(0).setSubmenu(menu);

	var checkItem = Titanium.UI.createCheckMenuItem("Check state",
		function(event)
		{
			if (!confirm("Should the item change state?"))
				event.preventDefault();
		}
	);
	menu.appendItem(checkItem);
	menu.addItem("Another item");
	menu.addItem("Another another item");
	Titanium.UI.currentWindow.setMenu(mainMenu);

Another approach is to disable auto-checking on the item. The essentially
means that you'll have to manage the state of the item yourself. This is
also useful if you'd like to turn a series of check items into radio buttons.

	:::javascript
	var createMenu = Titanium.UI.createMenu;
	var mainMenu = createMenu();

	mainMenu.addItem("Characters");
	var menu = createMenu();
	mainMenu.getItemAt(0).setSubmenu(menu);
	var checkItem = Titanium.UI.createCheckMenuItem("Check state",
		function()
		{
			if (confirm("Should the item change state?"))
				checkItem.setState(!checkItem.getState())
		}
	);
	checkItem.setAutoCheck(false);
	menu.appendItem(checkItem);
	menu.addItem("Another item");
	menu.addItem("Another another item");
	Titanium.UI.currentWindow.setMenu(mainMenu);

