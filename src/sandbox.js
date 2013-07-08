window.addEventListener('message', function(event) {
  if (event.source == window.top) {
    if (event.data) {
      eval(event.data);
    } else {
      alert("failed to load resource");
    }
  }
});

window.top.postMessage('____URL____', '*');
