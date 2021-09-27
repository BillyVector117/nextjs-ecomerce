import { Step, StepLabel, Stepper } from "@material-ui/core"

function CheckOutWizard({ activeStep = 0 }) {
    return (
        <Stepper activeStep={activeStep} alternativeLabel>
            {
                ['Login', 'Shipping Address', 'Payment Method', 'Place Order'].map((step, index) => {
                    return (
                        <Step key={index}>
                            <StepLabel>
                                {step}
                            </StepLabel>
                        </Step>
                    )
                })
            }
        </Stepper>
    )
}

export default CheckOutWizard
