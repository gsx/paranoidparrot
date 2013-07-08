require 'uglifier'
require 'fileutils'
require 'v8'
require 'securerandom'

task :default => [:extension]

def ask(what)
  what.to_a.map { |q|
    input = nil
    q[1] = [q.last] unless q.last.is_a? Array
    until input and (q.last.last.respond_to? :call)? q.last.last.call(input || '') : input
      print "#{q.first}#{(q.last.first)? " [#{q.last.first}]" : ''}: "
      input = $stdin.gets.strip
      input = q.last.first if input == '' and q.last.first
    end
    input
  }
end

def sjcl
  cxt = V8::Context.new
  cxt.load 'src/sjcl.ecdsa.min.js'
  cxt['rubyEntropy'] = SecureRandom.random_bytes(4*32).unpack('L*')
  cxt.eval('sjcl.random.addEntropy(rubyEntropy, 1024, "crypto.getRandomValues")')
  cxt
end

task :extension do
  pubkey, url, output = ask({
    'Public key file' => ['./testdata/test_pubkey', lambda{ |pubfile| File.exist? pubfile and File.readable? pubfile}],
    'URL to JS file the extension should load' => 'http://localhost:8000/testdata/good_payload.js',
    'Directory the generated extension should be written to' => './output'
  })

  icons = %w(16 19 38 48 128).map { |size| "icon#{size}.png" }

  (icons + %w(sjcl.ecdsa.min.js jquery.ajax.min.js loader.html sandbox.html)).each { |file|
    FileUtils.copy File.join(File.dirname(__FILE__), "src/#{file}"), File.join(output, file)
  }

  {
    'loader.js' => { :uglify => true, :substitute => { 'PUBKEY' => File.read(pubkey) } },
    'sandbox.js' => { :uglify => true, :substitute => { 'URL' => url } },
    'background.js' => { :uglify => true },
    'manifest.json' => { :substitute => { 'URL' => url } }
  }.each { |file, properties|
    source = File.read(File.join(File.dirname(__FILE__), "src/#{file}"))
    (properties[:substitute] || {}).each { |pattern, value|
      source.gsub!("____#{pattern}____", value)
    }
    source = Uglifier.compile(source, :output => { :max_line_len => 1024**3 }) if properties[:uglify]
    File.write File.join(output, file), source
  }
end

task :generate_keys do
  cxt = sjcl
  cxt.eval('keys = sjcl.ecc.ecdsa.generateKeys()')
  pub = cxt.eval('pub = keys.pub.get(); sjcl.bitArray.concat(pub.x, pub.y)')
  sec = cxt.eval('keys.sec.get()')

  puts "Public key: [#{pub}]"
  puts "Secret key: [#{sec}]"
end

task :sign_file do
  seckey, input = ask({
    'Secret key file' => ['./testdata/test_seckey', lambda{ |secfile| File.exist? secfile and File.readable? secfile }],
    'File to sign' => ['./testdata/good_payload.js', lambda{ |file| File.exist? file and File.readable? file }]
  })
  output, = ask 'File to write signature to' => "#{input}.sig"

  seckey = File.read(seckey)

  cxt = sjcl
  cxt.eval "seckey = new sjcl.ecc.ecdsa.secretKey(sjcl.ecc.curves['c384'], sjcl.bn.fromBits(#{seckey}))"
  cxt['data'] = File.read(input)
  sig = cxt.eval 'sjcl.codec.hex.fromBits(seckey.sign(sjcl.hash.sha256.hash(data), 10))'

  File.write(output, sig)
end
