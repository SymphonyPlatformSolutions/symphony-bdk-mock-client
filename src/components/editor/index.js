import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/twilight';

const Editor = (props) => {
  const { onChange, value, name } = props;

  return (
    <AceEditor
      placeholder="Placeholder Text"
      mode="json"
      theme="twilight"
      name={name}
      onChange={data => onChange(data)}
      fontSize={14}
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

export default Editor;
