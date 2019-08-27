import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button } from 'reactstrap';
import PortInput from '../form/PortInput';
import PortDate from '../form/PortDate';

const INITIAL_VALUES = {
    title: '',
    description: '',
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: ''
}

const validateInputs = (values) => {
    let errors = {};
    Object.entries(values).forEach(([key, value]) => {
        if (key !== 'startDate' && key !== 'endDate' && !value) {
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

const PortfolioCreateForm = (props) => (
    <div>
        <Formik
            initialValues={INITIAL_VALUES}
            validate={validateInputs}
            onSubmit={props.onSubmit}
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
                        label="Start Date"
                        component={PortDate}
                    />
                    <Field
                        name="endDate"
                        label="End Date"
                        canBeDisabled={true}
                        component={PortDate}
                    />
                    <Button size="lg" outline color="success" type="submit" disabled={isSubmitting}>
                        Create
                    </Button>
                </Form>
            )}
        </Formik>
    </div>
);

export default PortfolioCreateForm;