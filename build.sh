#!/bin/sh

VERSION=`grep '"version":' manifest.json | tr -d '[:space:],:"version'`
zip -r subject_cleaner-$VERSION-tb.xpi content defaults locale chrome.manifest install.rdf manifest.json
