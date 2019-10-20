import styled from 'styled-components'
import React from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { Button } from 'semantic-ui-react'


// styles
const SigContainer = styled.div`
  display: block;
`  

export default function Signature(props) {
    let sigCanvas = null
    const setSigCanvas = ref => {
        sigCanvas = ref
        sigCanvas._canvas.style.border = "1px solid black"
    }

    const clearSignature = e => {
        sigCanvas.clear()
    }

    return (
        <>
        <SigContainer>
            <SignatureCanvas 
                canvasProps={{width: 500, height: 200, className: 'sigCanvas'}}
                ref={setSigCanvas}
            />
        </SigContainer>
        <Button onClick={clearSignature}>Clear</Button>
        </>
    )
}