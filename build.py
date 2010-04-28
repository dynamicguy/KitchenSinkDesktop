#!/usr/bin/env python

import os
from markdown import markdown

def markdown_topics():
	"""
	Iterate through all topic files and render
	them into HTML files to be packaged with the application.
	"""
	TOPICS_OUTDIR = 'Resources/topics'
	if not os.path.isdir(TOPICS_OUTDIR):
		os.mkdir(TOPICS_OUTDIR)

	for topic in os.listdir('Topics'):
		content = open(os.path.join('Topics', topic), 'r')
		output = open('%s/%s.html' % (TOPICS_OUTDIR, topic.split('.')[0]), 'w')
		html = markdown(content.read(), ['codehilite'])
		output.write(html)

if __name__ == '__main__':
	markdown_topics()
