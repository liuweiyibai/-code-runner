import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useRef, useState, useEffect } from 'react';
import { Tabs, Select, Button } from 'antd';
const { TabPane } = Tabs;
const { Option } = Select;

export default function Index() {
  const instance = useRef();
  const [value, setValue] = useState(`console.log('hello world!');`);
  const handleChange = value => {
    console.log(`selected ${value}`);
  };

  const [execText, setExecText] = useState('');
  const onClick = () => {
    setExecText(null);
  };

  useEffect(() => {
    if (execText === null) {
      run();
    }
    return () => {};
  }, [execText]);

  const run = () => {
    console.warn(value);
    try {
      new Function(`${applyLog(setExecText)};${value}`)();
    } catch (error) {
      setExecText(error.message);
    }
  };
  const tabBarExtraContent = {
    left: (
      <Select
        defaultValue='lucy'
        style={{ width: 200, marginLeft: 16, marginRight: 16 }}
        onChange={handleChange}
      >
        <Option value='jack'>Jack</Option>
        <Option value='lucy'>Lucy</Option>
        <Option value='disabled' disabled>
          Disabled
        </Option>
        <Option value='Yiminghe'>yiminghe</Option>
      </Select>
    ),
    right: (
      <Button
        style={{
          marginRight: 16,
        }}
        onClick={onClick}
      >
        运行
      </Button>
    ),
  };

  return (
    <main className='container'>
      <Tabs type='card' tabBarExtraContent={tabBarExtraContent}>
        <TabPane tab='JavaScript' key='1'>
          <CodeMirror
            value={value}
            height='100%'
            width='50vw'
            extensions={[javascript({ jsx: true })]}
            onChange={value => {
              setValue(value);
            }}
            ref={instance}
          />
        </TabPane>
      </Tabs>

      <iframe title='My Daily Marathon Tracker' src='/content'></iframe>

      <style jsx>{`
        .container {
          display: flex;
          height: 100vh;
          width: 100vw;
        }
        iframe {
          border: 0 none;
          box-sizing: border-box;
          width: 50vw;
          height: 100vh;
        }
      `}</style>
    </main>
  );
}
