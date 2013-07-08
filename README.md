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

Ruby gem dependencies can be installed by running `bundle install`.

First, a keypair must be generated. This is done using the `rake generate_keys` command, which will output a public and a
secret key to stdout. These should be stored in two separate files, as other rake tasks will ask for a 'public key file' or
'secret key file'.
After having generated a keypair, arbitrary resources can be signed using the `rake sign_file` command. This rake task defaults
to outputting the signature to a file with the same path as the signed file, only '.sig' is appended to the end. This is also
the way the extension tries to load the signature from the server for a given resource.
As the extension itself contains the public key and the URL of a javascript file to bootstrap the application as hardcoded
values, it must be generated from source by running `rake extension`.
