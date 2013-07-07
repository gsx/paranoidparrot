function secureLoadData(url, success, failure) {
  $.ajax(url, { dataType: 'text' }).success(function(data) {
    $.ajax(url+".sig", { dataType: 'text' }).success(function(sig) {
      try {
        var pubkey = new sjcl.ecc.ecdsa.publicKey(sjcl.ecc.curves['c384'], ____PUBKEY____);
        pubkey.verify(sjcl.hash.sha256.hash(data), sjcl.codec.hex.toBits(sig));
        success(data);
      } catch (exception) {
        if (exception.toString && exception.toString() == "CORRUPT: signature didn't check out") {
          failure('wrong signature');
        }
        throw exception;
      }
    }).error(function(xhr, status, error) {
      failure('failed to acquire signature' + error ? ' (' + error + ')' : '');
    });
  }).error(function(xhr, status, error) {
    failure('failed to acquire data' + error ? ' (' + error + ')' : '');
  });
}

document.addEventListener('DOMContentLoaded', function () {
  secureLoadData('____URL____', function(code) {
    eval(code);
  }, function(msg) { document.writeln("Failed to load application. <br />" + msg) });
});
