# Repositorio-de-JAZA
# 📘 Documentación del Proceso - Proyecto Takiy Cusco

## 🔧 Refactorización Realizada

Durante la actividad se aplicaron los siguientes cambios significativos al proyecto original:

### ✅ Modularización
Se separaron las funciones relacionadas al envío de correos en un nuevo archivo llamado `emailService.gs`, dejando el archivo principal (`Código.gs`) más limpio y centrado en la lógica del formulario.

Funciones movidas:
- `enviarNotificacionAdmin(formData)`
- `enviarConfirmacionEstudiante(formData)`

### ✅ Limpieza del código
- Se eliminaron comentarios duplicados y líneas innecesarias.
- Se organizó mejor la estructura del código con bloques separados por tipo de función.

---

## 🐞 Errores Corregidos o Problemas Detectados

### ⚠️ Problema: Código acoplado
Antes de la refactorización, todas las funciones estaban en un solo archivo. Esto hacía difícil mantener el código y encontrar errores.

**Solución**: Se modularizó el código en varios archivos, mejorando la organización y mantenibilidad.

---

### ⚠️ Error: Simulación de fallo en procesamiento

Se simuló un fallo con la línea:

```javascript
const falla = formData.inexistente.propiedad;

