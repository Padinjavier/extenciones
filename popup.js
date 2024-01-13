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



let selectedProduct = ''; 
let selectedProductIGV = false;  

document.getElementById('searchInput').addEventListener('input', function() {
  const searchValue = this.value.toUpperCase();
  // Simula una llamada AJAX para obtener la lista de productos desde productos.json
  fetch('productos.json')
    .then(response => response.json())
    .then(data => {
      const productList = data.productos;
      // Filtra la lista de productos basándose en la búsqueda
      const filteredList = productList.filter(product => product.nombre.toUpperCase().includes(searchValue));
      // Muestra los resultados en forma de lista
      displayResultList(filteredList);
    })
    .catch(error => console.error('Error al obtener los productos:', error));
});

function displayResultList(results) {
  const resultListElement = document.getElementById('resultList');
  // Limpia la lista antes de agregar nuevos resultados
  resultListElement.innerHTML = '';
  // Agrega un elemento de lista por cada resultado
  results.forEach(product => {
    const listItem = document.createElement('li');
    listItem.textContent = `${product.nombre} - IGV: ${product.igv ? 'Sí' : 'No'}`;
    // Al hacer clic en el elemento de lista, almacena el nombre y el estado de IGV en las variables globales
    listItem.addEventListener('click', function() {
      selectedProduct = product.nombre;
      selectedProductIGV = product.igv;
      document.getElementById('searchInput').value = selectedProduct;
    });
    resultListElement.appendChild(listItem);
  });
}




document.getElementById('cargardatos').addEventListener('click', function() {
  var cantidad = document.getElementById('cantidad').value;
  var precio = document.getElementById('precio').value;
  var Producto = selectedProduct;  // Utiliza el nombre del producto seleccionado
  // Verifica si el producto tiene IGV y ajusta el precio en consecuencia
  if (selectedProductIGV) {
    precio = (parseFloat(precio) / 1.18).toFixed(2);
  }

  // Enviar datos a conten.js
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { action: 'enviarDatos', data: {Producto: Producto, precio: precio, cantidad: cantidad}});
  });

  
});
