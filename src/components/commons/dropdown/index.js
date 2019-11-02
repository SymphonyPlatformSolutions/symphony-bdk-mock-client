import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {
  customStyles,
  DropdownIndicator,
  SingleValue,
  Placeholder,
  Option,
  Control,
} from './theme';

const Dropdown = (props) => {
  const {
    value,
    chosenValue,
    noOptionsMessage,
    components,
    clickHandler,
    placeholder,
    label,
    ...rest
  } = props;

  return (
    <div>
      <Select
        styles={customStyles}
        isClearable={false}
        onMenuOpen={clickHandler}
        components={{
          DropdownIndicator: innerProps => DropdownIndicator(innerProps),
          SingleValue,
          Placeholder,
          Option,
          Control: innerProps => Control({
            ...innerProps,
            label,
          }),
          ...components,
        }}
        {...rest}
      />
    </div>
  );
};

Dropdown.propTypes = {
  disabled: PropTypes.bool,
  options: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.object,
  chosenValue: PropTypes.string,
  noOptionsMessage: PropTypes.string,
  theme: PropTypes.object.isRequired,
  components: PropTypes.object,
  clickHandler: PropTypes.func,
  isLoading: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  tooltip: PropTypes.string,
};

Dropdown.defaultProps = {
  disabled: false,
  options: [],
  onChange: null,
  value: null,
  chosenValue: null,
  noOptionsMessage: undefined,
  components: null,
  placeholder: undefined,
  isLoading: false,
  clickHandler: null,
  error: false,
  label: 'Dropdown input',
};

export default Dropdown;
