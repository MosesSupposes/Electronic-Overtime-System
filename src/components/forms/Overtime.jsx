import React from 'react'
import styled from 'styled-components'
import { Form, Button, Input } from 'semantic-ui-react'
import * as R from 'ramda'


import Signature from '../Signature'
import useForm from '../../hooks/useForm'

 /**
  * Styles
  */
  
const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 1rem;
`

const H2 = styled.h2`
    border-bottom: 1px solid black;
    margin-bottom: 2rem;
`

const HR = styled.hr`
    margin: 2rem 0;
`


/**
 * Component
 */

export default function OvertimeForm(props) {
    const handleSubmitCb = formState => {
        formState = R.evolve(R.__, formState)({
            todaysDate: formatDate,
            dateOfAppointment: formatDate,
            dateOvertimeOccured: formatDate,
            regularWorkdayStartTime: determineStartTime(startTimeRef),
            signature: getSigDataURL
        })
        console.log(formState)
    }
    
    const [formState, setFormState, handleChange, handleSubmit] = useForm({
        todaysDate: '',
        workersName: '',
        client: '',
        reasonForOvertime: '',
        dateOfAppointment: '',
        anticipatedLength: '',
        compTime: '',
        payment: '',
        dateOvertimeOccured: '',
        hoursWorkedFrom: '',
        hoursWorkedTo: '',
        regularWorkdayStartTime: '',
        supervisor: '',
        seniorSupervisor: '',
        supervisorsInitials: '',
        signature: ''

    }, handleSubmitCb)

    const [showOtherStartTimeInput, setShowOtherStartTimeInput] = React.useState(false)
    const conditionallyDisplayOtherStartTimeInput = event => {
        // always hide the custom input field in case the user switches from `other` to another dropdown choice
        setShowOtherStartTimeInput(false)
        // reset regularWorkDayStartTime in case the user entered a custom time and then changed their mind.
        // If we didn't reset it here, even if the user changed their mind and selected one of the dropdown options, 
        // their new choice would get ignored and whetever they typed into the input field would get submitted.
        // See `deterimeStartTime` function to see why this is.
        setFormState({...formState, regularWorkdayStartTime: ''})
        
        if (event.currentTarget.value === 'other') {
            setShowOtherStartTimeInput(true)
        }
    }

    const startTimeRef = React.useRef()
    const sigRef = React.useRef()

    const getSigDataURL = () => {
        setFormState({...formState, signature: sigRef.current.getTrimmedCanvas().toDataURL()})
        return sigRef.current.getTrimmedCanvas().toDataURL()
    }

    return (
        <FlexContainer>
            <H2>PRIOR AUTHORIZATION -- OVERTIME APPROVAL</H2>

            <Form onSubmit={handleSubmit}>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Today's Date</label>
                        <Input
                            name="todaysDate"
                            type="date"
                            onChange={handleChange}
                            value={formState.todaysDate} 
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Worker's Name</label>
                        <Input
                            name="workersName"
                            onChange={handleChange}
                            value={formState.workersName}
                        />
                    </Form.Field>
                </Form.Group>

                <Form.Field>
                    <label>Client</label>
                    <Input
                        name="client"
                        onChange={handleChange}
                        value={formState.client}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Reason for Overtime</label>
                    <Input
                        name="reasonForOvertime"
                        onChange={handleChange}
                        value={formState.reasonForOvertime}
                    />
                </Form.Field>

                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Date of Appointment</label>
                        <Input
                            name="dateOfAppointment"
                            type="date"
                            onChange={handleChange}
                            value={formState.dateOfAppointment}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Anticipated Length</label>
                        <Input
                            name="anticipatedLength"
                            onChange={handleChange}
                            value={formState.anticipatedLength}
                        />
                    </Form.Field>
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Field id="comp-time">
                        <label>Comp Time</label>
                        <Input
                            name="compTime"
                            onChange={handleChange}
                            value={formState.compTime}
                        />
                    </Form.Field>

                    <Form.Field id="payment">
                        <label>Payment</label>
                        <Input
                            name="payment"
                            onChange={handleChange}
                            value={formState.payment}
                        />
                    </Form.Field>
                </Form.Group>


                <HR />

                
                <Form.Field>
                    <label>Date Overtime Occured</label>
                    <Input
                        name="dateOvertimeOccured"
                        type="date"
                        onChange={handleChange}
                        value={formState.dateOvertimeOccured}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Regular Workday Start Time</label>
                    <select 
                        ref={startTimeRef}
                        onChange={conditionallyDisplayOtherStartTimeInput}
                    >
                        <option value="">Please choose an option</option>
                        <option value="8:30 AM">8:30 AM</option>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="other">other</option>
                    </select>
                    {showOtherStartTimeInput && 
                        <Input 
                            name="regularWorkdayStartTime" 
                            onChange={handleChange}
                            value={formState.regularWorkdayStartTime}
                            autoFocus
                            placeholder="enter start time"
                        />
                    }
                </Form.Field>
        
                <span><strong>OT Hours Worked</strong></span>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>From</label>
                        <Input
                            name="hoursWorkedFrom"
                            onChange={handleChange}
                            value={formState.hoursWorkedFrom}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>To</label>
                        <Input
                            name="hoursWorkedTo"
                            onChange={handleChange}
                            value={formState.hoursWorkedTo}
                        />
                    </Form.Field>
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Supervisor</label>
                        <input 
                            name="supervisor"
                            onChange={handleChange}
                            value={formState.supervisor}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Senior Supervisor</label>
                        <input 
                            name="seniorSupervisor"
                            onChange={handleChange}
                            value={formState.seniorSupervisor}
                        />
                    </Form.Field>
                </Form.Group>
                

                <HR />

                
                <Form.Field>
                    <label><strong>Supervisor's Pre-approved Initials</strong></label>
                    <Input
                        name="supervisorsInitials"
                        onChange={handleChange}
                        value={formState.supervisorsInitials} 
                        disabled
                        placeholder="For supervisors only"
                    />
                </Form.Field>   

                <Form.Field>
                    <Signature title="Worker's Signature" ref={sigRef}  />
                </Form.Field>

                <Button 
                    primary 
                    type="submit"
                    style={{marginTop: '1rem'}}
                >
                    Submit
                </Button>
            </Form>
        </FlexContainer>
    )
}

/**
 * Helpers
 */

 function determineStartTime(ref) {
    return function(startTime) {
        return startTime ? startTime : ref.current.value
    }
 }

function formatDate(date) {
    const [year, month, day] = date.split('-')
    const formattedDate = [month, day, year].join('-')
    return formattedDate
}