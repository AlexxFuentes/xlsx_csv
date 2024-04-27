/* eslint-disable @typescript-eslint/no-explicit-any */
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import { read, utils, Range } from 'xlsx'
import { FilePondFile } from 'filepond'
import { useState } from 'react'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

interface props {
    header: string[];
    range: Range;
    setData: (file: any) => void;
}

export function FileUpload({ header, range, setData } : props) {

    const [file, setFile] = useState<FilePondFile[]>([])


    const handleFileLoad = (file: FilePondFile) => {
        const reader = new FileReader()
        reader.onload = (event: ProgressEvent<FileReader>) => {
            const f: ArrayBuffer = new Uint8Array(event?.target?.result as ArrayBuffer)

            const wb = read(f, { type: 'array'});
            const ws = wb.Sheets[wb.SheetNames[0]]
            const jsonData = utils.sheet_to_json(ws, { header: header, range: range })            
            
            // console.log(jsonData)
            setData(jsonData)
        };
        reader.readAsArrayBuffer(file.file)
    };

    return (
        <div className='max-w-md mx-auto'>
            <FilePond
                files={file as any[]}
                onupdatefiles={setFile}
                allowMultiple={true}
                maxFiles={3}
                name="files"
                labelIdle='Arrastra y suelta tus archivos o <span class="filepond--label-action">clic aquí</span>'
                //server="/"
                onaddfile={(error, file: FilePondFile) => {
                    if (error) {
                        alert(`Error al cargar el archivo ${error}`)
                    }
                    handleFileLoad(file)
                }}
                onremovefile={() => {
                    setData([])
                }}
            />
        </div>
    )
}