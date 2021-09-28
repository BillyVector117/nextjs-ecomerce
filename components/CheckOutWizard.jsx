import { Step, StepLabel, Stepper } from "@material-ui/core"
import { useStyles } from "../utils/styles"

function CheckOutWizard({ activeStep = 0 }) {
    const classes = useStyles()
    return (
        <Stepper className={classes.transparentBackground} activeStep={activeStep} alternativeLabel>
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
