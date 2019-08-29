import React from "react";
import DatePicker from "react-datepicker";
import { Button, Label, FormGroup } from 'reactstrap';

import "react-datepicker/dist/react-datepicker.css";

export default class PortDate extends React.Component {

    constructor(props) {
        super();
        this.state = {
            dateValue: props.initialDate ? new Date(props.initialDate) : new Date(),
            isHidden: props.initialDate ? false : true
            // OR dateValue: moment().toDate()
        }
    }

    setFieldValueAndTouched(date, touched) {
        const { setFieldValue, setFieldTouched } = this.props.form;
        const { name } = this.props.field;

        setFieldValue(name, date, true);
        setFieldTouched(name, touched, true);
    }

    handleChange = date => {
        this.setState({
            dateValue: date
        });

        this.setFieldValueAndTouched(date, true)
    };

    toggleDate = date => {
        this.setState({
            isHidden: !this.state.isHidden
        });

        this.setFieldValueAndTouched(date, true)
    };

    render() {
        const { canBeDisabled, label, field, form: { touched, errors } } = this.props;
        // const { touched, errors } = this.props.form;
        const { dateValue, isHidden } = this.state;
        return (
            <FormGroup>
                <Label>{label}</Label>
                <div className="input-group">
                    {
                        !isHidden &&
                        <DatePicker
                            selected={dateValue}
                            onChange={this.handleChange}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            maxDate={new Date()}
                            dropdownMode="select"
                        />
                    }
                </div>

                {canBeDisabled && !isHidden && <Button onClick={() => this.toggleDate(null)}>Still working here...</Button>}

                {canBeDisabled && isHidden &&
                    <React.Fragment>
                        <span>Still Working Here</span>
                        <Button onClick={() => this.toggleDate(dateValue)}>Set End Date</Button>
                    </React.Fragment>
                }

                {touched[field.name] &&
                    errors[field.name] && <div className="error">{errors[field.name]}</div>}
            </FormGroup>
        );
    }
}