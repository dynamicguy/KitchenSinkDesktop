var KitchenSink = {};
var Ti = {fs: Titanium.Filesystem};

KitchenSink.init = function()
{
	this.resourceDir = Ti.fs.getResourcesDirectory();

	this.topicMenu = $('#topic_menu');
	this.topicContentArea = $('#api_content');

	// Load all the topics
	KitchenSink.loadTopics();

	// Create topic menu accordion
	this.topicMenu.accordion();
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
	// Create the topic header
	var header = $('<h3>' + topic.name + '</h3>');
	header.click(function()
	{
		KitchenSink.currentTopic.hide();
		topic.show();
		KitchenSink.currentTopic = topic;
	});

	// Add topic sections
	var sectionList = $('<div>');
	topic.sections.forEach(function(section)
	{
		var subItem = $('<div class="section_item">' + section + '</div>');
		sectionList.append(subItem);
	});

	this.topicMenu.append(header);
	this.topicMenu.append(sectionList);
}

KitchenSink.Topic = function(file)
{
	// Load topic content text
	this.contentDiv = $('<div>');
	this.contentDiv.html(file.read().toString());
	this.contentDiv.hide();

	this.name = $('h1', this.contentDiv).first().text();

	var sections = [];
	$('h2', this.contentDiv).each(function()
	{
		sections.push($(this).text());
	});
	this.sections = sections;
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
		document.getElementById('topic_menu').style.height = height;
	}
	resizeContentDiv();
	Titanium.UI.currentWindow.addEventListener(Titanium.RESIZED, resizeContentDiv);
});
