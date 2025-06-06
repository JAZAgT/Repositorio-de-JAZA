# 📊 Simulación de Monitoreo - Proyecto Takiy Cusco

## 🎯 Objetivo del monitoreo

Simular el proceso de monitoreo para detectar fallos durante la ejecución del sistema que recibe y procesa formularios de inscripción en la aplicación Takiy Cusco, utilizando `Logger.log()` como herramienta de observación en tiempo de ejecución.

---

## 🔍 Implementación del monitoreo

Se insertaron líneas de log dentro de la función `doPost(e)` en el archivo `Código.gs`. Esto permitió observar:

- La entrada de datos del formulario.
- La conexión con la hoja de cálculo.
- El registro exitoso de datos.
- El envío de correos.

### Ejemplo de logs insertados:

```javascript
Logger.log("🔍 Iniciando procesamiento de formulario");
Logger.log("📦 Datos recibidos: " + JSON.stringify(e.parameter));
Logger.log("📁 Hoja de cálculo abierta correctamente");
Logger.log("✅ Datos guardados exitosamente");
Logger.log("📤 Notificación enviada al administrador");
Logger.log("📩 Confirmación enviada al estudiante");
