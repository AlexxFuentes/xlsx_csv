// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import '@/App.css'
import { FileUpload } from '@/components/FilePond'
import { CustomLayout } from '@/components/layout/custom-layout'

function App() {

    return (
        <CustomLayout>
            <FileUpload />
        </CustomLayout>
    )
}

export default App
