window.addEventListener('message', function(event) {
  if (event.source == window.top) {
    if (event.data[0]) {
      eval(event.data[1]);
    } else {
      alert(event.data[1]);
    }
  }
});

window.top.postMessage('____URL____', '*');
