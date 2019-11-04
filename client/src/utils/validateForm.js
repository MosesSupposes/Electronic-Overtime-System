import * as R from 'ramda'

export default function validateForm(formState, errorState, setErrorState) {
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
