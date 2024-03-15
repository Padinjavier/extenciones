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




  // En content.js de tu extensión
  if (request.action === "enviarDatos") {
    // var servicio = document.getElementById('item.descripcion');
    //     if (servicio) {
    //       servicio.value=request.data.Producto;
    //       console.log(request.data.Producto);
    //     } else {
    //       console.error('No se encontró el elemento con el atributo data-dojo-attach-point="focusNode"');
    //     }


    console.log("¡Hola desde content.js en la página de SUNAT!");

  }


  if (request.action === "prueba") {
    ejecutarCodigoDojo();
  }


});

// content.js

function ejecutarCodigoDojo() {
  // Verificar si Dojo está definido en el contexto global
  if (typeof dijit !== 'undefined') {
    // Obtener el elemento por su clase y establecer valores
    dijit.byId("item.cantidad").set("value", 123);
    dijit.byId("item.descripcion").set("value", "34");
  } else {
    console.error('Dojo no está definido en el contexto global. Asegúrate de que Dojo esté cargado en la página.');
  }
}
