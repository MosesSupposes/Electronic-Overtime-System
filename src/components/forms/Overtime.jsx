import React from 'react'
import styled from 'styled-components'
import { Form, Button } from 'semantic-ui-react'
import Signature from '../Signature'

 /**
  * Styles
  */
  
const Containter = styled.div`
    border: 5px solid green;
    display: flex;
    flex-direction: column;
    align-items: center;

    .field {
        margin-bottom: 1rem;

        label {
            margin-right: .5rem;
        }
    
        input {
            padding: .5rem;
        }
    }
`

const H2 = styled.h2`
    border-bottom: 1px solid black;
    margin-bottom: 2rem;
`

const HR = styled.hr`
    margin: 2rem;
`

const FormGroup = styled.div`
    display: flex;
    justify-content: space-between;

    .field#payment, .field#comp-time {
        margin-bottom: 0;
    }
    
`

/**
 * Component
 */

export default function OvertimeForm(props) {

    return (
        <Containter>
            <H2>PRIOR AUTHORIZATION -- OVERTIME APPROVAL</H2>

            <Form reply>
                <FormGroup>
                    <Form.Field>
                        <label>Today's Date</label>
                        <input type="date" />
                    </Form.Field>

                    <Form.Field>
                        <label>Worker's Name</label>
                        <input />
                    </Form.Field>
                </FormGroup>

                <Form.Field>
                    <label>Client</label>
                    <input />
                </Form.Field>

                <Form.Field>
                    <label>Reason for Overtime</label>
                    <input />
                </Form.Field>

                <FormGroup>
                    <Form.Field>
                        <label>Date of Appointment</label>
                        <input />
                    </Form.Field>

                    <Form.Field>
                        <label>Anticipated Length</label>
                        <input />
                    </Form.Field>
                </FormGroup>

                <FormGroup>
                    <Form.Field id="comp-time">
                        <label>Comp Time</label>
                        <input />
                    </Form.Field>

                    <Form.Field id="payment">
                        <label>Payment</label>
                        <input />
                    </Form.Field>
                </FormGroup>

                <HR />
                
                <FormGroup>
                    <Form.Field>
                        <label>Supervisor's Pre-approved Initials</label>
                        <input disabled />
                    </Form.Field>   
                    <Form.Field>
                        <label>Worker's Signature</label>
                        <Signature />
                    </Form.Field>
                </FormGroup>

                <Button>Submit</Button>
            </Form>
        </Containter>
    )
}