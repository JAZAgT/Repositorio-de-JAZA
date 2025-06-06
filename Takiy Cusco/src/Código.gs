/**
 * Google Apps Script para manejar el formulario de inscripción de Takiy Cusco
 * Este script recibe los datos del formulario y los almacena en una hoja de cálculo de Google
 */

// ID de la hoja de cálculo donde se guardarán los datos
const SPREADSHEET_ID = '1caO9ve5gJ2fEn9yo_DL78jDHHKEdjCFgPt4ul2od0I4';

// Nombres de las hojas
const SHEET_NAME = 'Datos'; // Hoja para el formulario de inscripción
const CHAT_SHEET_NAME = 'Chat'; // Hoja para los mensajes del chatbot

// URL donde redirigir después de enviar el formulario (actualiza a tu URL real)
const SUCCESS_URL = 'https://tu-sitio-web.com/gracias.html';

/**
 * Función doGet para manejar solicitudes GET (puede redirigir a la página principal)
 */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Takiy Cusco - Escuela de Canto')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

/**
 * Función doPost para manejar el envío del formulario
 */
function doPost(e) {
  try {
    Logger.log("Datos recibidos: " + JSON.stringify(e.parameter));

    const formData = e.parameter;
    const timestamp = new Date();

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Fecha',
        'Nombre',
        'Edad',
        'Email',
        'Teléfono',
        'Programa',
        'Experiencia',
        'Comentarios'
      ]);
    }

    const rowData = [
      timestamp,
      formData.nombre || '',
      formData.edad || '',
      formData.email || '',
      formData.telefono || '',
      formData.programa || '',
      formData.experiencia || '',
      formData.comentarios || ''
    ];

    sheet.appendRow(rowData);

    // Enviar correos (modularizado)
    enviarNotificacionAdmin(formData);
    enviarConfirmacionEstudiante(formData);

    return HtmlService.createHtmlOutput(
      '<html><head><style>' +
      'body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; color: #333; }' +
      '.success { color: #3c763d; background-color: #dff0d8; padding: 20px; border-radius: 5px; margin: 0 auto; max-width: 600px; border: 1px solid #d6e9c6; }' +
      'h2 { color: #B8860B; } p { line-height: 1.6; } .logo { margin-bottom: 20px; } .contact-info { margin-top: 30px; font-size: 14px; color: #666; }' +
      '</style></head><body>' +
      '<div class="logo"></div>' +
      '<div class="success">' +
      '<h2>¡Gracias por tu solicitud!</h2>' +
      '<p>Hemos recibido tu información correctamente.</p>' +
      '<p>Un miembro de nuestro equipo se pondrá en contacto contigo en las próximas 24 horas para coordinar tu clase de prueba gratuita.</p>' +
      '<p>Mientras tanto, revisa tu correo electrónico donde te hemos enviado los detalles de tu solicitud.</p>' +
      '</div>' +
      '<div class="contact-info">' +
      '<p>Takiy Cusco - Escuela de Canto<br>Dirección: Av. El Sol 123, Centro Histórico, Cusco<br>Teléfono: +51 984 123 456<br>Email: info@takiycusco.com</p>' +
      '</div></body></html>'
    ).setTitle('Solicitud Recibida - Takiy Cusco');

  } catch (error) {
    Logger.log('Error en doPost: ' + error.toString());
    console.error('Error stack: ' + error.stack);
    return HtmlService.createHtmlOutput(
      '<html><head><style>' +
      'body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; color: #333; }' +
      '.error { color: #a94442; background-color: #f2dede; padding: 20px; border-radius: 5px; margin: 0 auto; max-width: 600px; border: 1px solid #ebccd1; }' +
      'h2 { color: #a94442; } p { line-height: 1.6; } .btn { display: inline-block; background-color: #D4AF37; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px; }' +
      '.btn:hover { background-color: #B8860B; }' +
      '</style></head><body>' +
      '<div class="error">' +
      '<h2>Error al procesar el formulario</h2>' +
      '<p>Lo sentimos, ha ocurrido un error al procesar tu solicitud.</p>' +
      '<p>Por favor, inténtalo nuevamente más tarde o contáctanos directamente.</p>' +
      '<a href="https://tu-sitio-web.com" class="btn">Volver a la página principal</a>' +
      '</div></body></html>'
    ).setTitle('Error - Takiy Cusco');
  }
}

/**
 * Función para manejar los mensajes del chatbot
 */
function doPostChat(e) {
  try {
    const sender = e.parameter.sender;
    const message = e.parameter.message;
    const timestamp = new Date();

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(CHAT_SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Fecha', 'Remitente', 'Mensaje']);
    }

    sheet.appendRow([timestamp, sender, message]);

    return ContentService.createTextOutput('Mensaje guardado');
  } catch (error) {
    Logger.log('Error en doPostChat: ' + error.toString());
    return ContentService.createTextOutput('Error al guardar el mensaje');
  }
}

/**
 * Función para obtener la URL de la aplicación web
 */
function getWebAppURL() {
  return ScriptApp.getService().getUrl();
}

/**
 * Funciones para cargar páginas HTML
 */
function getSolicitud() {
  return HtmlService.createHtmlOutputFromFile('index').getContent();
}

function getResumenPage() {
  return HtmlService.createHtmlOutputFromFile('resumen').getContent();
}
