import React from 'react';
import styled from 'styled-components';
import { Warning } from 'styled-icons/icomoon';

const WarningWrapper = styled.div`
  border-radius: 4px;
  border: 1px solid #2c97e2;
  padding: 0.6rem;
  background-color: #35383E;
  margin: 12px 0;
  display: flex;
  align-items: center;
`;

const WarningIcon = styled(Warning)`
  margin: 0 7px 0 5px;
`;

export const WarningBox = (props) => {
  const { hasWarning, children } = props;

  return (
    <WarningWrapper>
      {hasWarning && (<WarningIcon size={14} color="#2c97e2"/>)}
      {children}
    </WarningWrapper>
  );
};
