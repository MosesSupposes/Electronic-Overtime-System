import styled from 'styled-components'
import React from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { Button } from 'semantic-ui-react'


// styles
const SigContainer = styled.div`
    .sigCanvas {
        display: block;
        border: 2px solid black;
        width: 100%;
        margin: .25rem 0;
    }
`  

export default function Signature(props) {
    let sigCanvas = null
    const setSigCanvas = ref => {
        sigCanvas = ref
    }

    const clearSignature = e => {
        sigCanvas.clear()
    }

    const canvasProps = {
        className: 'sigCanvas',
        height: props.height || 200,
    }

    return (
        <>
        <SigContainer>
            {props.title && 
                <span><strong>{props.title}</strong></span>
            }
            <SignatureCanvas 
                canvasProps={canvasProps}
                clearOnResize={props.clearOnResize || false}
                ref={setSigCanvas}
            />

            <Button 
                onClick={clearSignature} 
                type="button"
                secondary
            >
                Clear
            </Button>
        </SigContainer>

        </>
    )
}