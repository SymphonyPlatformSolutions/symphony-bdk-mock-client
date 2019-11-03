import React from 'react';
import AceEditor from 'react-ace';
import PropTypes from 'prop-types';
import 'brace/mode/json';
import 'brace/theme/terminal';

const Editor = (props) => {
  const { onChange, value, name } = props;

  return (
    <AceEditor
      placeholder="Placeholder Text"
      mode="json"
      theme="terminal"
      name={name}
      onChange={data => onChange(data)}
      fontSize={14}
      height="300px"
      showPrintMargin
      showGutter
      highlightActiveLine
      wrapEnabled
      value={value}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Editor;
