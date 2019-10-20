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

export default React.forwardRef((props, ref) => {
    const canvasProps = {
        className: 'sigCanvas',
        height: props.height || 200,
    }

    const clearSignature = e => {
        console.log(ref)
        ref.current.clear()
    }

    return (
        <>
        <SigContainer>
            {props.title && 
                <span><strong>{props.title}</strong></span>
            }
            <SignatureCanvas 
                {...props}
                canvasProps={canvasProps}
                clearOnResize={props.clearOnResize || false}
                ref={ref}
                // forwarededRef={ref}
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
})

