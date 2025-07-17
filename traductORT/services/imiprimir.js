import { Platform, Alert } from "react-native"

export const generateAndPrintHistorialPDF = async (historial) => {
  console.log("=== generateAndPrintHistorialPDF iniciado ===")
  console.log("Platform.OS:", Platform.OS)
  console.log("Historial recibido:", historial?.length, "elementos")

  if (!historial || historial.length === 0) {
    console.log("Error: Historial vacío en printService")
    return Promise.reject(new Error("No hay traducciones para imprimir."))
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Historial de Traducciones</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #333; text-align: center; margin-bottom: 20px; }
        ul { list-style: none; padding: 0; }
        li { background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 15px; padding: 15px; }
        strong { color: #007AFF; }
      </style>
    </head>
    <body>
      <h1>Historial de Traducciones</h1>
      <ul>
        ${historial
          .map(
            (item) => `
          <li>
            <strong>Original:</strong> ${item.textoOriginal}<br/>
            <strong>Traducido:</strong> ${item.textoTraducido}
          </li>
        `,
          )
          .join("")}
      </ul>
    </body>
    </html>
  `

  if (Platform.OS === "web") {
    try {
      console.log("Ejecutando lógica de impresión para web")

      // Verificar si window está disponible
      if (typeof window === "undefined") {
        throw new Error("Window no está disponible")
      }

      console.log("Abriendo ventana de impresión...")
      const printWindow = window.open("", "_blank")

      if (printWindow) {
        printWindow.document.write(htmlContent)
        printWindow.document.close()
        printWindow.focus()

        // Dar tiempo para que se cargue el contenido antes de imprimir
        setTimeout(() => {
          console.log("Ejecutando window.print()")
          printWindow.print()
          printWindow.close()
        }, 1000)

        console.log("Ventana de impresión abierta exitosamente")
      } else {
        throw new Error("No se pudo abrir la ventana de impresión (popup bloqueado?)")
      }

      return Promise.resolve()
    } catch (error) {
      console.error("Error en printService (Web):", error)
      Alert.alert("Error de Impresión", `Error: ${error.message}`)
      return Promise.reject(error)
    }
  } else {
    try {
      console.log("Ejecutando lógica de impresión para plataforma nativa")

      Alert.alert(
        "Funcionalidad de Impresión (Nativa)",
        "La impresión de PDF solo está disponible en compilaciones nativas de la aplicación (iOS/Android) y requiere las librerías 'react-native-html-to-pdf' y 'react-native-print'.",
      )
      return Promise.resolve()
    } catch (error) {
      console.error("Error en printService (Nativa):", error)
      return Promise.reject(new Error("No se pudo generar el PDF en la plataforma nativa."))
    }
  }
}
