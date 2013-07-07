# Paranoid Parrot

## Introduction

Paranoid Parrot is a proof of concept extension to the Chrome (Chromium) browser that allows to load signed web resources (ie.
HTML, CSS, JS, images, but technically any file). The advantage of signing these resources is that therefore the integrity and
authenticity of these files can be guaranteed even if they are received from an untrusted source. The files are signed using
[ECDSA](http://en.wikipedia.org/wiki/ECDSA), as implemented in [SJCL](http://crypto.stanford.edu/sjcl/).

## Current status

It is important to note once again, that Paranoid Parrot is no more than a simple proof of concept in its current stage. This
means that feedback and contributions are welcome, but using it in any real life scenario is strongly discouraged.

## Using

The repository contains a Rakefile which can be used to generate the extension itself after answering a few questions. Simply
run `rake extension`. The Rakefile also contains information on signing files. Rake tasks for creating keypairs and signing
files are not yet implemented.
Ruby gem dependencies can be installed by running `bundle install`.
