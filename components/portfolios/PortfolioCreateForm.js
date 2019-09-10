import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Alert, Button } from 'reactstrap';
import PortInput from '../form/PortInput';
import PortDate from '../form/PortDate';

const validateInputs = (values) => {
    let errors = {};
    Object.entries(values).forEach(([key, value]) => {
        // endDate is not required!
        if (key !== 'endDate' && !value) {
            errors[key] = `Field ${key} is required!`;
        }
    });
    const startDate = values.startDate;
    const endDate = values.endDate;
    if (startDate && endDate && startDate > endDate) {
        errors.endDate = 'End Date can not be before Start Date!'
    }
    return errors;
}
// const PortfolioCreateForm = (props) => (
// destruct from PROPS
const PortfolioCreateForm = ({ initialValues, onSubmit, error }) => (
    <div>
        <Formik
            initialValues={initialValues}
            validate={validateInputs}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field
                        type="text"
                        name="title"
                        label="Title"
                        component={PortInput}
                    />
                    <Field
                        type="text"
                        name="description"
                        label="Description"
                        component={PortInput}
                    />
                    <Field
                        type="text"
                        name="company"
                        label="Company"
                        component={PortInput}
                    />
                    <Field
                        type="text"
                        name="position"
                        label="Position"
                        component={PortInput}
                    />
                    <Field
                        type="text"
                        name="location"
                        label="Location"
                        component={PortInput}
                    />
                    <Field
                        name="startDate"
                        initialDate={initialValues.startDate}
                        label="Start Date"
                        component={PortDate}
                    />
                    <Field
                        name="endDate"
                        initialDate={initialValues.endDate}
                        label="End Date"
                        canBeDisabled={true}
                        component={PortDate}
                    />

                    {
                        error &&
                        <Alert color="danger">
                            {error}
                        </Alert>
                    }
                    <Button size="lg" outline color="success" type="submit" disabled={isSubmitting}>
                        {initialValues.title ? 'Update' : 'Create'}
                    </Button>
                </Form>
            )}
        </Formik>
    </div>
);

export default PortfolioCreateForm;