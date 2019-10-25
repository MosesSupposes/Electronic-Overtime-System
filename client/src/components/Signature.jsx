import styled from 'styled-components'
import React from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { Button } from 'semantic-ui-react'


export default React.forwardRef((props, ref) => {
    const SigContainer = styled.div`    
        .sigCanvas {
            display: block;
            border: ${props.error ? '2px solid #e0b4b4;' : '2px solid black;'} 
            width: 100%;
            margin: .25rem 0;
        }

        span {
            color: ${props.error ? '#9f3a38;' : 'black;'}
        }
    `  
    
    const canvasProps = {
        className: 'sigCanvas',
        height: props.height || 200,
    }

    const clearSignature = e => {
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

