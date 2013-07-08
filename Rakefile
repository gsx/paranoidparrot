require 'uglifier'
require 'fileutils'

task :default => [:extension]

task :extension do
  pubkey = "IamQuiteSureThatThisFileIsNotSupposedToExist"
  until File.exist? pubkey and File.readable? pubkey
    print 'Public key file [./testdata/pubkey]: '
    pubkey = gets.strip
    pubkey = './testdata/test_pubkey' if pubkey == ''
  end
  print 'URL to JS file the extension should load [http://localhost:8000/testdata/good_payload.js]: '
  url = gets.strip
  url = 'http://localhost:8000/testdata/good_payload.js' if url == ''
  print 'Directory the generated extension should be written to [./output]: '
  output = gets.strip
  output = './output' if output == ''

  ljs = Uglifier.compile File.read(File.join(File.dirname(__FILE__), 'src/loader.js')), :output => { :max_line_len => 1024**3 }
  ljs.gsub! '____PUBKEY____', File.read(pubkey)
  sjs = Uglifier.compile File.read(File.join(File.dirname(__FILE__), 'src/sandbox.js')), :output => { :max_line_len => 1024**3 }
  sjs.gsub! '____URL____', url

  manifest = File.read(File.join(File.dirname(__FILE__), 'src/manifest.json')).gsub('____URL____', url)

  %w(icon16.png icon19.png icon38.png icon48.png icon128.png sjcl.ecdsa.min.js jquery.ajax.min.js background.js loader.html sandbox.html).each { |file|
    FileUtils.copy File.join(File.dirname(__FILE__), "src/#{file}"), File.join(output, file)
  }

  File.write File.join(output, 'manifest.json'), manifest
  File.write File.join(output, 'loader.js'), ljs
  File.write File.join(output, 'sandbox.js'), sjs
end

# signing: sjcl.codec.hex.fromBits((new sjcl.ecc.ecdsa.secretKey(sjcl.ecc.curves['c384'], sjcl.bn.fromBits(seckey))).sign(sjcl.hash.sha256.hash('DATATOSIGN'), 10))
