chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // Autocompletar campos según el mensaje del popup
  if (request.action === "autocompletarCampos") {
    var rucElement = document.getElementById("txtRuc");
    if (rucElement) {
      rucElement.value = request.data.ruc;
    }
    var usuarioElement = document.getElementById("txtUsuario");
    if (usuarioElement) {
      usuarioElement.value = request.data.usuario;
    }
    var contrasenaElement = document.getElementById("txtContrasena");
    if (contrasenaElement) {
      contrasenaElement.value = request.data.contrasena;
    }
  }
  // Acciones específicas para el comprobante "Factura"
  if (request.action === "factura") {
    var liEMITIRFACTURAELECTRONICA = document.getElementById('nivel4_11_5_3_1_1');
    // var liEMITIRFACTURAELECTRONICA = document.getElementById('item.subTipoTI02');
    if (liEMITIRFACTURAELECTRONICA) {
      liEMITIRFACTURAELECTRONICA.click();
    } else {
      console.error('No se encontró el elemento con el ID nivel4_11_5_3_1_1');
    }
  }
  // Acciones específicas para el comprobante "Boleta"
  if (request.action === "boleta") {
    var liEMITIRBOLETAELECTRONICA = document.getElementById('nivel4_11_5_4_1_1');
    if (liEMITIRBOLETAELECTRONICA) {
      liEMITIRBOLETAELECTRONICA.click();
    } else {
      console.error('No se encontró el elemento con el ID nivel4_11_5_4_1_1');
    }
  }




  // Variable global para almacenar detalles de venta
  let detallesVenta = [];

  function copiarDatos() {
    // Capturar detalles de venta
    const tbody = document.getElementById('tblDetalleVenta');
    const filas = tbody.getElementsByClassName('detailsaletr');
    detallesVenta = []; // Reiniciar el arreglo para nuevos datos

    for (let i = 0; i < filas.length; i++) {
      const celdas = filas[i].getElementsByTagName('td');
      const filaDatos = {
        descripcion: celdas[1].innerText.trim(),
        cantidad: parseFloat(celdas[2].innerText.trim()),
        precioUnitario: parseFloat(celdas[3].querySelectorAll('label')[1].innerText.trim()),
        precioTotal: parseFloat(celdas[4].querySelectorAll('label')[1].innerText.trim())
      };
      detallesVenta.push(filaDatos);
    }

    // Confirmación de copia
    console.log("Detalles de Venta copiadossss:", detallesVenta);
    this.detallesVenta = detallesVenta;
  }

  function pegarDatos() {
    const elemento = document.querySelector('#id');

    if (elemento) {
      console.log("Editando elemento:", elemento);
      elemento.type = "text";

      console.log("Número de detalles de venta:", this.detallesVenta.length);
      // Seleccionar y hacer clic en el botón
      const botonDetalleVenta = document.querySelector('.btn.btn-block.btn-success.btn-sm.detalleVenta');
      if (botonDetalleVenta) {
        // Hacer 252 clics en el botón
        for (let i = 0; i < (this.detallesVenta.length - 1); i++) {
          botonDetalleVenta.click();
        }
      } else {
        console.log("Botón 'Agregar más producto' no encontrado");
      }

    } else {
      console.log("Elemento con id 'id' no encontrado");
      console.log("Detalles de Venta pegadoaaa:", this.detallesVenta);
    }
  }

  // Simulación de la llamada a la función copiarDatos
  if (request.action === "copiar") {
    copiarDatos();
  }

  // Simulación de la llamada a la función pegarDatos
  if (request.action === "pegar") {
    pegarDatos();
  }

  if (request.action === "editar") {
    const elemento = document.querySelector('#id');

    if (elemento) {
      console.log("editando");
      console.log(elemento);
      elemento.type = "text";
    } else {
      console.log("Elemento con id 'id' no encontrado");
    }
  }

});



