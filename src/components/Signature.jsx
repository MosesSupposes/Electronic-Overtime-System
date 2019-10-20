import styled from 'styled-components'
import React from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { Button } from 'semantic-ui-react'


// styles
const SigContainer = styled.div`
  display: block;

  .sigCanvas {
      border: 2px solid black;
  }
`  

export default function Signature(props={width:500, height:200}) {
    let sigCanvas = null
    const setSigCanvas = ref => {
        sigCanvas = ref
    }

    const clearSignature = e => {
        sigCanvas.clear()
    }

    return (
        <>
        <SigContainer>
            <SignatureCanvas 
                canvasProps={{width: props.width, height: props.height, className: 'sigCanvas'}}
                ref={setSigCanvas}
            />
        </SigContainer>
        <Button onClick={clearSignature} type="button">Clear</Button>
        </>
    )
}