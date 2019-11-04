import React from 'react'
import styled from 'styled-components'
import { Form, Button, Input, Message } from 'semantic-ui-react'
import * as R from 'ramda'


import Signature from '../Signature'
import useForm from '../../hooks/useForm'
import filterObj from '../../utils/filterObj'

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

const initialFormState = {
    todaysDate: '',
    workersName: '',
    client: '',
    reasonForOvertime: '',
    dateOfAppointment: '',
    anticipatedLength: '',
    compTime: '',
    payment: '',
    dateOvertimeOccurred: '',
    hoursWorkedFrom: '',
    hoursWorkedTo: '',
    regularWorkdayStartTime: '',
    supervisor: '',
    seniorSupervisor: '',
    supervisorsInitials: '',
    signature: ''
}

// Filter out the values of the disabled inputs since 
// the user shouldn't be shown an error and asked to fill out these fields.
const removeFieldsReferencingDisabledInputs = (key, value) => (key !== 'supervisorsInitials')
const initialErrorState = filterObj(removeFieldsReferencingDisabledInputs, initialFormState)
 
export default function OvertimeForm(props) {
    const handleSubmitCb = formState => {
        // hide any error or success messages every time the form is submitted
        setHideErrorMessage(true)
        setHideSuccessMessage(true)
        
        formState = R.evolve(R.__, formState)({
            todaysDate: formatDate,
            dateOfAppointment: formatDate,
            dateOvertimeOccurred: formatDate,
            regularWorkdayStartTime: determineStartTime(startTimeRef),
            signature: getSigDataURL(sigRef, formState, setFormState)
        })
        
        if (validateForm(formState, errors, setErrors)) {
            console.log('form is valid!')
            console.log('FORM TO BE SUBMITTED: ', formState)
            setHideSuccessMessage(false)

            // TODO: send form to server
        } else {
            console.log('form is invalid.')
            console.log('ERRORS:', errors)
            setHideErrorMessage(false)
        }
    }
    
    const [formState, setFormState, handleChange, handleSubmit] = useForm(initialFormState, handleSubmitCb)
    
    const [showOtherStartTimeInput, setShowOtherStartTimeInput] = React.useState(false)

    const [errors, setErrors] = React.useState(initialErrorState)
    const [hideErrorMessage, setHideErrorMessage] = React.useState(true)
    const [hideSuccessMessage, setHideSuccessMessage] = React.useState(true)
    
    const startTimeRef = React.useRef()
    const sigRef = React.useRef()

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

   

    return (
        <FlexContainer>
            <H2>PRIOR AUTHORIZATION -- OVERTIME APPROVAL</H2>

            <Form onSubmit={handleSubmit}>
                <Form.Group widths="equal">
                    <Form.Field error={!!errors.todaysDate}>
                        <label>Today's Date</label>
                        <Input
                            name="todaysDate"
                            type="date"
                            onChange={handleChange}
                            value={formState.todaysDate} 
                        />
                    </Form.Field>

                    <Form.Field error={!!errors.workersName}>
                        <label>Worker's Name</label>
                        <Input
                            name="workersName"
                            onChange={handleChange}
                            value={formState.workersName}
                        />
                    </Form.Field>
                </Form.Group>

                <Form.Field error={!!errors.client}>
                    <label>Client</label>
                    <Input
                        name="client"
                        onChange={handleChange}
                        value={formState.client}
                    />
                </Form.Field>

                <Form.Field error={!!errors.reasonForOvertime}>
                    <label>Reason for Overtime</label>
                    <Input
                        name="reasonForOvertime"
                        onChange={handleChange}
                        value={formState.reasonForOvertime}
                    />
                </Form.Field>

                <Form.Group widths="equal">
                    <Form.Field error={!!errors.dateOfAppointment}>
                        <label>Date of Appointment</label>
                        <Input
                            name="dateOfAppointment"
                            type="date"
                            onChange={handleChange}
                            value={formState.dateOfAppointment}
                        />
                    </Form.Field>

                    <Form.Field error={!!errors.anticipatedLength}>
                        <label>Anticipated Length</label>
                        <Input
                            name="anticipatedLength"
                            onChange={handleChange}
                            value={formState.anticipatedLength}
                        />
                    </Form.Field>
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Field error={!!errors.compTime}>
                        <label>Comp Time</label>
                        <Input
                            name="compTime"
                            onChange={handleChange}
                            value={formState.compTime}
                        />
                    </Form.Field>

                    <Form.Field error={!!errors.payment}>
                        <label>Payment</label>
                        <Input
                            name="payment"
                            onChange={handleChange}
                            value={formState.payment}
                        />
                    </Form.Field>
                </Form.Group>


                <HR />

                
                <Form.Field error={!!errors.dateOvertimeOccurred}>
                    <label>Date Overtime Occured</label>
                    <Input
                        name="dateOvertimeOccurred"
                        type="date"
                        onChange={handleChange}
                        value={formState.dateOvertimeOccurred}
                    />
                </Form.Field>

                <Form.Field error={!!errors.regularWorkdayStartTime}>
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
                            style={{marginTop: ".5rem"}}
                        />
                    }
                </Form.Field>
        
                <span><strong>OT Hours Worked</strong></span>
                <Form.Group widths="equal">
                    <Form.Field error={!!errors.hoursWorkedFrom}>
                        <label>From</label>
                        <Input
                            name="hoursWorkedFrom"
                            onChange={handleChange}
                            value={formState.hoursWorkedFrom}
                        />
                    </Form.Field>

                    <Form.Field error={!!errors.hoursWorkedTo}>
                        <label>To</label>
                        <Input
                            name="hoursWorkedTo"
                            onChange={handleChange}
                            value={formState.hoursWorkedTo}
                        />
                    </Form.Field>
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Field error={!!errors.supervisor}>
                        <label>Supervisor</label>
                        <input 
                            name="supervisor"
                            onChange={handleChange}
                            value={formState.supervisor}
                        />
                    </Form.Field>

                    <Form.Field error={!!errors.seniorSupervisor}>
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

                <Form.Field error={!!errors.workersSignature}>
                    <Signature error={!!errors.signature} title="Worker's Signature" ref={sigRef}  />
                </Form.Field>

                <Button 
                    primary 
                    type="submit"
                    style={{marginTop: '1rem'}}
                >
                    Submit
                </Button>
            </Form>

            <Message 
                    hidden={hideErrorMessage}
                    error
                    header="Error"
                    content="There are some missing fields."
                />

            <Message 
                hidden={hideSuccessMessage}
                positive
                header="Success!"
                content="Your form has been submitted."
            />
        </FlexContainer>
    )
}

/**
 * Helpers
 */

function formatDate(date) {
    const [year, month, day] = date.split('-')
    const formattedDate = [month, day, year].join('-')
    return formattedDate
}
 
function determineStartTime(ref) {
    return function(startTime) {
        return startTime ? startTime : ref.current.value
    }
 }

function getSigDataURL (ref, formState, setFormState) {
    const dataUrl = ref.current.getTrimmedCanvas().toDataURL()

    return function (_) {
        if (ref.current.isEmpty()) {
            return ""
        } else {
            setFormState({...formState, signature: dataUrl})
            return dataUrl
        }
    }
}

function validateForm(formState, errorState, setErrorState) {
    // Make a copy of errorState since we're going to be mutating it.
    errorState = Object.assign({}, errorState)

    // Clear any pre-existing errors each time the form is validated.
    const cleanSlate = {...errorState}
    for (let key in cleanSlate) {
        cleanSlate[key] = ""
    }
    setErrorState(cleanSlate)
    errorState = cleanSlate

    // set an error any time an empty field is found in the formState
    Object.entries(formState).forEach(([key, value]) => {
        // ignore disabled inputs
        if (key !== 'supervisorsInitials') {
            // empty form field?
            if (value === "" || value === "--") {
                // update component state with error message
                setErrorState( (prevState) => ({ ...prevState, [key]: 'Please fill out this field.' }) )
                // mututate local copy of state since the errorState param will now become out of sync with the component state
                errorState[key] = 'Please fill out this field.'
            }
        }
    })

    // check if errorState is an object full of empty strings. 
    // If so, no errors were set and we can return true -- meaning there were no errors and the form is therefore valid.
    // Otherwise, there were errors, so we can return false because the form was invalid.
    const isEmptyString = R.equals("")
    const hasNoErrors = Object.values(errorState).every(isEmptyString) ? true : false 

    return hasNoErrors
}
