// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
/* eslint-disable @typescript-eslint/no-explicit-any */
import '@/App.css'
import { FileUpload } from '@/components/FilePond'
import { CustomLayout } from '@/components/layout/custom-layout'
import { useState, useEffect } from 'react'
import { Range } from 'xlsx'
// import { v4 as uuidv4 } from 'uuid'
import { CustomTable } from '@/components/table/table'
// import moment from 'moment'

const headers: string[] = ['DNI', 'NOMBRE COMPLETO', 'ES ESTUDIANTE', 'ES PARTICIPANTE', 'SEXO', 'FECHA NACIMIENTO', 'TELEFONO', 'CELULAR', 'DEPARTAMENTO', 'MUNICIPIO', 'DIRECCIÓN', '¿TIENE DISCAPACIDAD?', 'TIPO DE DISCAPACIDAD', 'ESPECIFIQUE', 'NIVEL ESCOLAR']

const range: Range = { s: { c: 0, r: 7 }, e: { c: 15, r: 28 } }

function App() {

    const [data, setData] = useState<any>([])

    const handleDowloadFile = () => {
        console.log('Descargando archivo')
        console.log(data)
    }

    useEffect(() => {
        console.log(data)
        // console.log( data[0]['FECHA NACIMIENTO'] )
        // console.log( moment('01-01-1990').add( data[0]['FECHA NACIMIENTO'] , 'days').format('DD-MM-YYYY') )
    }, [data])

    return (
        <CustomLayout>
            <FileUpload
                header={headers}
                range={range}
                setData={setData}
            />
            {
                data.length > 0 && (<button onClick={handleDowloadFile} className='btn hover:scale-110'>Descargar CSV</button>)
            }
            <CustomTable 
                nodes={data}
                footers={headers}
                headers={headers}
                setData={setData}
            />
        </CustomLayout>
    )
}

export default App
