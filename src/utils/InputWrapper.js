
import React, { useState, useEffect } from 'react';

import { Input } from 'antd';
import T from 'prop-types';


function InputWrapper (props) {
  const [input, setInput] = useState({
    inputType: null,
    name: '', 
    className: '',
    prefix: '',
    placeholder: '',
    onChange: null,
    value: '',
  });

  useEffect ( () => {
    const { inputType, name, className, prefix, placeholder, value, onChange } = props;
    setInput({...input, 
        inputType: inputType,
        name: name, 
        className: className,
        prefix: prefix,
        placeholder: placeholder, 
        onChange: onChange,
        value: value
    });
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [props]
  );
   
  const renderContent = () => {
    if (input.inputType === 'Password') {
      return (
        <Input.Password 
          name={input.name}
          className={input.className}
          prefix={input.prefix}
          placeholder={input.placeholder}
          onChange={input.onChange}
          value={input.value}
        />
      );
    } 

    return (
      <Input
        name={input.name}
        className={input.className}
        prefix={input.prefix}
        placeholder={input.placeholder}
        onChange={input.onChange}
        value={input.value}
      />
    );
  };

  return (
    renderContent()
  );
}

InputWrapper.propTypes = {
  props: T.object.isRequired,
  onChange: T.func.isRequired,
};

export default InputWrapper;