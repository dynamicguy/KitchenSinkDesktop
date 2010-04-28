var KitchenSink = {};
var Ti = {fs: Titanium.Filesystem};

KitchenSink.init = function()
{
	this.resourceDir = Ti.fs.getResourcesDirectory();

	this.topicMenu = $('#api_list');
	this.topicContentArea = $('#api_content');

	// Load all the topics
	KitchenSink.loadTopics();
}

KitchenSink.loadTopics = function()
{
	this.topics = [];

	var topicDir = Ti.fs.getFile(this.resourceDir, "topics");
	var sink = this;
	topicDir.getDirectoryListing().forEach(function(topicFile)
	{
		var topic = new KitchenSink.Topic(topicFile);
		sink.topicContentArea.append(topic.contentDiv);
		sink.addTopicMenu(topic);
		sink.topics.push(topic);
	});

	this.currentTopic = this.topics[0];
	this.currentTopic.show();
}

KitchenSink.addTopicMenu = function(topic)
{
	// Create topic menu item
	var menuItem = $('<div class="topic_list">' + topic.name + '</div>');
	menuItem.click(function()
	{
		KitchenSink.currentTopic.hide();
		topic.show();
		KitchenSink.currentTopic = topic;
	});

	// Add submenu items
	topic.sections.forEach(function(section)
	{
		var subItem = $('<div class="section_item">' + section + '</div>');
		menuItem.append(subItem);
	});

	this.topicMenu.append(menuItem);
}

KitchenSink.Topic = function(file)
{
	// Load topic content text
	this.contentDiv = $('<div>');
	this.contentDiv.html(file.read().toString());
	this.contentDiv.hide();

	this.name = $('h1', this.contentDiv).first().text();
	this.sections = [];
}

KitchenSink.Topic.prototype.show = function()
{
	this.contentDiv.show();
}

KitchenSink.Topic.prototype.hide = function()
{
	this.contentDiv.hide();
}

$(document).ready(function()
{
	KitchenSink.init();

	function resizeContentDiv()
	{
		var height = window.innerHeight - 50;
		document.getElementById('api_content').style.height = height;
		document.getElementById('api_list').style.height = height;
	}
	resizeContentDiv();
	Titanium.UI.currentWindow.addEventListener(Titanium.RESIZED, resizeContentDiv);
});
