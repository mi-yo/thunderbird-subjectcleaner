#!bin/sh

VERSION=`grep em:version install.rdf | tr -d "[:space:]<em:version>/"`
zip -r subject_cleaner-$VERSION-tb.xpi content defaults locale chrome.manifest install.rdf
