import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { darken, transparentize } from 'polished';
import { components } from 'react-select';

const colors = {
  primary: '#33b1ff',
  secondary: '#3cb2d7',
  danger: '#f74a6f',
  submit: '#006CAF',
  grey: '#464B53',
  white: '#fff',
  black: '#000',
  blue: '#1066F2',
  darkgrey: '#868C97',
  lightgrey: '#9197a152',
  basegrey: '#F1F2F3',
  inputgrey: '#2F3237',
  spancolor: '#fff',
  bordergrey: '#6f747c',
  orange: '#f58b3a',
  dark: '#17191C',
  darkaccent: '#25272A',
  link: '#4489F8',
};

export const getColor = () => (colors.basegrey);

function getLabelColor({
  error, disabled, menuIsOpen, hasValue,
}) {
  if (disabled) {
    return colors.darkgrey;
  }
  if (error && (menuIsOpen || hasValue)) {
    return colors.danger;
  }

  if (menuIsOpen) {
    return colors.primary;
  }

  return colors.spancolor;
}

const getLineColor = ({ disabled }) => (disabled ? colors.darkgrey : colors.spancolor);

const getBorderColor = () => colors.bordergrey;

export const customStyles = ({
  container: provided => ({
    ...provided,
    pointerEvents: 'auto',
    marginTop: '16px',
  }),
  control: (provided, state) => ({
    ...provided,
    width: '100%',
    boxShadow: 'none',
    border: 'none',
    borderRadius: 0,
    borderColor: state.menuIsOpen
      ? colors.primary
      : getBorderColor(),
    color: getColor(),
    minHeight: '0',
    backgroundColor: transparentize(0.86, darken(0.4, colors.white)),
    margin: '0',
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor:
       transparentize(0.82, darken(0.15, colors.white)),
    },
    cursor: 'pointer',
    padding: 0,
  }),
  indicatorSeparator: provided => ({ ...provided, display: 'none' }),
  menu: provided => ({
    ...provided,
    marginTop: 0,
    borderRadius: 0,
    color: colors.white,
    backgroundColor: colors.inputgrey,
    border: `1px solid ${getBorderColor()}`,
    borderTop: 'none',
    zIndex: 100,
  }),
  option: (provided, state) => ({
    ...provided,
    color: 'inherit',
    backgroundColor: colors.inputgrey,
    ':active': {
      ...state[':active'],
      backgroundColor: colors.primary,
    },
    '&:focus': {
      background: 'none',
    },
    '&:hover': {
      color: colors.white,
      backgroundColor: colors.primary,
    },
  }),
  singleValue: provided => ({
    ...provided,
    transition: 'all 0.3s',
    backgroundColor: 'rgba(0,0,0,0)',
  }),
  valueContainer: provided => ({
    ...provided,
    padding: '9px 5px 7px 7px',
  }),
  input: provided => ({
    ...provided,
    padding: 0,
    color: colors.spancolor,
  }),
});

const ArrowContainer = styled.div`
  margin-right: 8px;
`;

const IconContainer = styled.div`
  align-items: center;
  display: flex;
`;

const SmallArrow = styled.div`
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid ${() => getBorderColor()};
  transform: ${({ turn }) => (turn ? 'rotate(180deg)' : null)};
  transition: all 0.4s;
`;

export const DropdownIndicator = (props) => {
  const {
    selectProps: { menuIsOpen },

  } = props;

  return (
    <IconContainer>
      <ArrowContainer>
        <SmallArrow turn={menuIsOpen} />
      </ArrowContainer>
    </IconContainer>
  );
};

export const SingleValue = (props) => {
  const { children } = props;
  return (
    <components.SingleValue {...props}>
      <span
        type="primary"
        size="small"
        style={{
          color: 'white',
          lineHeight: 'inherit',
        }}
      >
        {children}
      </span>
    </components.SingleValue>
  );
};

export const Option = ({ children, ...props }) => (
  <components.Option {...props}>
    <span
      type="primary"
      size="small"
      style={{ color: 'inherit', lineHeight: 'inherit' }}
    >
      {children}
    </span>
  </components.Option>
);

const PlaceholderContainer = styled.div`
  opacity: ${({ isFocused }) => (isFocused ? '1' : '0')};
  transition: all 0.2s;
`;

export const Placeholder = (props) => {
  const { children, isDisabled, isFocused } = props;
  return (
    <components.Placeholder {...props}>
      <PlaceholderContainer isFocused={isFocused}>
        <span
          type="primary"
          size="small"
          style={{
            color: 'inherit',
            fontStyle: isDisabled ? 'italic' : 'normal',
            lineHeight: 'inherit',
          }}
        >
          {children}
        </span>
      </PlaceholderContainer>
    </components.Placeholder>
  );
};

export const InputLine = styled.span`
  width: 100%;
  display: block;
  position: absolute;
  bottom: 0;

  &:before {
    content: "";
    height: 1px;
    width: 100%;
    bottom: 0;
    position: absolute;
    border-bottom: 1px solid ${({ disabled }) => getLineColor({ disabled })};
  }

  &:after {
    content: "";
    height: 1px;
    width: ${({ error }) => (error ? '100%' : 0)};
    bottom: 0;
    position: absolute;
    background: ${({ error }) => (error ? colors.danger : colors.primary)};
    transition: all 0.4s;
    width: ${({ menuIsOpen, error }) => (menuIsOpen || error ? '100%' : '0')};
  }
`;

const Label = styled.label`
  position: absolute;
  top: ${({ menuIsOpen, hasValue }) => (menuIsOpen || hasValue ? '-18px' : '10px')};
  font-size: ${({ menuIsOpen, hasValue }) => (menuIsOpen || hasValue ? '12px' : '1em')};
  transition: all 0.2s;
  left: ${({ menuIsOpen, hasValue }) => (menuIsOpen || hasValue ? '2px' : '7px')};
  color: ${props => getLabelColor(props)};
  font-style: ${({ disabled }) => (disabled ? 'italic' : 'normal')};
  z-index: 1;
`;

export const Control = (props) => {
  const {
    children,
    label,
    menuIsOpen,
    hasValue,
    isDisabled,
    error,
  } = props;

  return (
    <components.Control {...props}>
      {children}
      <Label
        menuIsOpen={menuIsOpen}
        hasValue={hasValue}
        error={error}
        disabled={isDisabled}
      >
        {label}
      </Label>
      <InputLine
        menuIsOpen={menuIsOpen}
        disabled={isDisabled}
        error={error}
      />
    </components.Control>
  );
};

export const NoOptionsMessage = ({ children, ...props }) => (
  <components.NoOptionsMessage {...props}>
    <span
      type="primary"
      size="small"
      style={{ color: 'inherit', lineHeight: 'inherit' }}
    >
      {children}
    </span>
  </components.NoOptionsMessage>
);

DropdownIndicator.propTypes = {
  selectProps: PropTypes.shape({
    menuIsOpen: PropTypes.bool.isRequired,
  }).isRequired,
};

DropdownIndicator.propTypes = {
  selectProps: PropTypes.shape({
    menuIsOpen: PropTypes.bool.isRequired,
  }).isRequired,
};
