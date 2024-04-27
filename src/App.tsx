// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import '@/App.css'
import { FileUpload } from '@/components/FilePond'
import { CustomLayout } from '@/components/layout/custom-layout'
import { Table } from '@/components/table/table'
import { useState, useEffect } from 'react'
import { Range } from 'xlsx'
// import moment from 'moment'

const headers: string[] = ['DNI', 'NOMBRE COMPLETO', 'ES ESTUDIANTE', 'ES PARTICIPANTE', 'SEXO', 'FECHA NACIMIENTO', 'TELEFONO', 'CELULAR', 'DEPARTAMENTO', 'MUNICIPIO', 'DIRECCIÓN', '¿TIENE DISCAPACIDAD?', 'TIPO DE DISCAPACIDAD', 'ESPECIFIQUE', 'NIVEL ESCOLAR']

const range: Range = { s: { c: 0, r: 7 }, e: { c: 15, r: 28 } }

function App() {

    const [data, setData] = useState([])
    const [flag, setFlag] = useState(false)
    // const [wb, setWb] = useState()

    const handleDowloadFile = () => {
        console.log('Descargando archivo')
        console.log(data)
    }

    useEffect(() => {
        console.log(data)
        // console.log( data[0]['FECHA NACIMIENTO'] )
        // console.log( moment('01-01-1990').add( data[0]['FECHA NACIMIENTO'] , 'days').format('DD-MM-YYYY') )
        if (data.length > 0) {
            setFlag(true)
        } else {
            setFlag(false)
        }
    }, [data])

    return (
        <CustomLayout>
            <FileUpload
                header={headers}
                range={range}
                setData={setData}
            />

            <button onClick={handleDowloadFile} className='btn hover:scale-110'>Descargar CSV</button>
            <pre></pre>

            {
                data && data.length > 0 && (
                    <Table headers={headers} footers={headers} flag={flag}>
                        {
                            data.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <th className='sticky left-0 bg-slate-500'>{row[headers[0]]}</th>
                                    <th className='sticky left-[106px] bg-slate-500'>{row[headers[1]]}</th>
                                    {
                                        headers.slice(2).map((header, colIndex) => (
                                            <td key={colIndex}>{row[header]}</td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </Table>
                )
            }
        </CustomLayout>
    )
}

export default App
