/**
 * Servicio de correos para Takiy Cusco
 * Contiene funciones para enviar notificación al administrador y confirmación al estudiante
 */

/**
 * Enviar notificación al administrador
 */
function enviarNotificacionAdmin(formData) {
  const emailAdmin = '022101099h@uandina.edu.pe'; // Reemplazar con el correo real
  const subject = 'Nueva solicitud de inscripción - Takiy Cusco';

  let body = 'Se ha recibido una nueva solicitud de inscripción:\n\n';
  body += 'Nombre: ' + formData.nombre + '\n';
  body += 'Edad: ' + formData.edad + '\n';
  body += 'Email: ' + formData.email + '\n';
  body += 'Teléfono: ' + formData.telefono + '\n';
  body += 'Programa: ' + formData.programa + '\n';
  body += 'Experiencia: ' + formData.experiencia + '\n';
  body += 'Comentarios: ' + formData.comentarios + '\n\n';
  body += 'Por favor, contactar al estudiante lo antes posible.';

  MailApp.sendEmail(emailAdmin, subject, body);
}

/**
 * Enviar confirmación al estudiante
 */
function enviarConfirmacionEstudiante(formData) {
  const email = formData.email;
  const subject = 'Confirmación de solicitud - Takiy Cusco';

  let body = 'Estimado/a ' + formData.nombre + ',\n\n';
  body += 'Gracias por tu interés en Takiy Cusco, Escuela de Canto.\n\n';
  body += 'Hemos recibido tu solicitud para el programa "' + formData.programa + '".\n';
  body += 'Un miembro de nuestro equipo se pondrá en contacto contigo en las próximas 24 horas para coordinar tu clase de prueba gratuita.\n\n';
  body += 'Si tienes alguna pregunta adicional, puedes responder a este correo o llamarnos al +51 984 123 456.\n\n';
  body += 'Atentamente,\n';
  body += 'El equipo de Takiy Cusco\n';
  body += '"La música es el lenguaje del alma, ¡cántala con nosotros!"\n\n';
  body += 'Dirección: Av. El Sol 123, Centro Histórico, Cusco\n';
  body += 'Teléfono: +51 984 123 456\n';
  body += 'Email: info@takiycusco.com\n';
  body += 'Web: www.takiycusco.com';

  MailApp.sendEmail(email, subject, body);
}
