import React from 'react';
import styled from 'styled-components';
import { Warning } from 'styled-icons/material';

const WarningWrapper = styled.div`
  border-radius: 4px;
  padding: 0.6rem;
  background-color: #35383E;
  margin: 12px 0;
  display: flex;
  align-items: center;
`;

const WarningIcon = styled(Warning)`
  margin: 0 14px 0 7px;
  color: #FFC840;
`;

export const WarningBox = (props) => {
  const { hasWarning, children } = props;

  return (
    <WarningWrapper>
      {hasWarning && (<WarningIcon size="30" />)}
      {children}
    </WarningWrapper>
  );
};
