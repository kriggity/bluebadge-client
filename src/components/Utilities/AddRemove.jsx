import React, { useState, useEffect } from 'react';
import { FormGroup, CustomInput } from 'reactstrap';
import './AddRemoveToggle.css';

export default function AddRemove(props) {
    const [addRemoveToggle, setAddRemoveToggle] = useState(true);
    const [nameClass, setNameClass] = useState('addRemoveToggle gameOwned');
    const toggle = () => {
        setAddRemoveToggle(!addRemoveToggle);
        if (!addRemoveToggle) {
            setNameClass('addRemoveToggle gameOwned');
        } else {
            props.removeGame(props.id);
            setNameClass('addRemoveToggle gameNotOwned')
        }
    }
    useEffect(() => setAddRemoveToggle(props.toggleState), []);
    return (
        <div>
            <FormGroup>
                <CustomInput
                    type="switch"
                    id={'switch' + props.id}
                    label={props.toggleLabel}
                    className={nameClass}
                    onChange={toggle}
                    checked={addRemoveToggle}
                />
            </FormGroup>
        </div>
    );
}