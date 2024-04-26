/* eslint-disable @typescript-eslint/no-explicit-any */
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import { useState } from 'react'
import { read, utils } from 'xlsx';
// import * as XLSX from 'xlsx';
import { FilePondFile } from 'filepond'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

export function FileUpload() {

    const [files, setFiles] = useState<FilePondFile[]>([])

    const handleFileLoad = (file: FilePondFile) => {
        console.log("Se ejecuta handleFileLoad");
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
            const data = new Uint8Array(event?.target?.result as ArrayBuffer);
            const workbook = read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = utils.sheet_to_json(worksheet);

            // Aquí puedes realizar la limpieza de datos necesaria en jsonData
            
            console.log(jsonData);
        };
        reader.readAsArrayBuffer(file.file);
    };

    return (
        <div className='max-w-md mx-auto'>
            <FilePond
                files={files as any[]}
                onupdatefiles={setFiles}
                allowMultiple={true}
                maxFiles={3}
                name="files"
                labelIdle='Arrastra y suelta tus archivos o <span class="filepond--label-action">clic aquí</span>'
                //server="/"
                onaddfile={(error, file: FilePondFile) => {
                    if (error) {
                        alert(`Error al cargar el archivo ${error}`);
                    }
                    handleFileLoad(file);
                }}
            />
        </div>
    )
}