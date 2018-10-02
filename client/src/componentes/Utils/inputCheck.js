import React from "react";
import { Input, Icon } from "semantic-ui-react";

const InputCheckageInner = ({ mutation, callback, mutationProps, ...props }) => {
    const changedHandler = (evt) => {
        if (callback)
            callback(evt, mutation);
    }

    return (<Input loading={props.loading} {...props} autoFocus onChange={changedHandler} ></Input>);
}
const InputCheck = ({ ...props }) => <InputCheckageInner  {...props}></InputCheckageInner>;
export default InputCheck;