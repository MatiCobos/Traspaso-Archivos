const fs = require('fs');
const path = require('path');

const origen = 'C:\\Users\\mcobos\\Desktop\\Origen'; // Ruta de la carpeta de origen
const destino = 'C:\\Users\\mcobos\\Desktop\\Destino'; // Ruta de la carpeta de destino

let archivosCopiados = new Set(); // Conjunto para mantener un registro de archivos copiados

// Función para copiar archivos
function copiarArchivos(carpeta) {
    // Leer contenido de la carpeta
    fs.readdir(carpeta, (err, files) => {
        if (err) {
            console.error(`Error al leer la carpeta ${carpeta}:`, err);
            return;
        }

        // Iterar sobre los archivos y subcarpetas
        files.forEach(file => {
            const rutaArchivo = path.join(carpeta, file);

            // Comprobar si es un archivo o una carpeta
            fs.stat(rutaArchivo, (err, stats) => {
                if (err) {
                    console.error(`Error al obtener información de ${rutaArchivo}:`, err);
                    return;
                }

                if (stats.isFile()) {
                    // Si es un archivo, copiarlo si no se ha copiado antes
                    if (!archivosCopiados.has(file)) {
                        const destinoArchivo = path.join(destino, file);
                        fs.copyFile(rutaArchivo, destinoArchivo, err => {
                            if (err) {
                                console.error(`Error al copiar el archivo ${file}:`, err);
                            } else {
                                console.log(`Archivo ${file} copiado a ${destino}`);
                                archivosCopiados.add(file); // Registrar el archivo copiado
                            }
                        });
                    }
                } else if (stats.isDirectory()) {
                    // Si es una carpeta, explorar recursivamente
                    copiarArchivos(rutaArchivo);
                }
            });
        });
    });
}

// Llamar a la función para iniciar la operación
copiarArchivos(origen);
