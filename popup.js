document.getElementById("autocompletarsoluciones").addEventListener("click", function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "autocompletarCampos", data: {ruc: "20557341863", usuario: "OGYRIPOL", contrasena: "olitzanic"}});
  });
});

document.getElementById("autocompletarvillafuerte").addEventListener("click", function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "autocompletarCampos", data: {ruc: "10154142121", usuario: "IOUNTION", contrasena: "odandebeg"}});
  });
});

document.getElementById("factura").addEventListener("click", function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "factura"});
  });
});

document.getElementById("boleta").addEventListener("click", function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "boleta"});
  });
});

document.getElementById("imprimir").addEventListener("click", function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "imprimir"});
  });
});


document.getElementById("copiar").addEventListener("click", function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "copiar"});
  });
});

document.getElementById("pegar").addEventListener("click", function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "pegar"});
  });
});





document.getElementById("editar").addEventListener("click", function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "editar"});
  });
});
document.getElementById("imprimrtikrt").addEventListener("click", function() {
console.log("ddd")
  const contenidoDiv = document.getElementById('vistaboleta').innerHTML;
      window.print();
});












// Escuchar mensajes del content script o del background script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "datosObtenidos") {
    const datos = message.datos;
    // Filtrar los datos para obtener solo "Total Venta"
    const totalVenta = datos.find(dato => dato.label === "Total Venta");
    if (totalVenta) {
      // Mostrar el dato "Total Venta" en el popup.html
      const vistaboleta = document.getElementById('vistaboleta');
      vistaboleta.innerHTML = `
      <td style="padding: 0px;text-align: center;"><img src="./logo.png" alt="Girl in a jacket" width="90" height="75"></td>
      <p>${totalVenta.label}: ${totalVenta.valor}</p>
      <p>${totalVenta.label}: ${totalVenta.valor}</p>
      `;
    }
  }
});

{/* <p>${totalVenta.label}: ${totalVenta.valor}</p> */}