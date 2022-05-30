import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useRef, useState } from 'react';
import { Tabs, Select, Button } from 'antd';
import { getFileList } from '../utils/files';
const { TabPane } = Tabs;
const { Option } = Select;

export default function Index({ fileList }) {
  const defaultValue = fileList[0].value;
  const instance = useRef();
  const iframeRef = useRef();
  const [value, setValue] = useState(defaultValue);
  let resetValue = defaultValue;

  const handleChange = value => {
    setValue(value);
  };

  const onClick = () => {
    sendMessage();
  };

  const onReset = () => {
    setValue(resetValue);
  };

  const sendMessage = () => {
    if (!iframeRef.current) return;
    iframeRef.current.contentWindow.postMessage({ message: value });
  };

  const tabBarExtraContent = {
    left: (
      <Select
        defaultValue={defaultValue}
        style={{ width: 200, marginLeft: 16, marginRight: 16 }}
        onChange={handleChange}
      >
        {fileList.map((t, index) => {
          return (
            <Option value={t.value} key={index}>
              {t.title}
            </Option>
          );
        })}
      </Select>
    ),
    right: (
      <>
        <Button type='primary' className='mr-16' onClick={onReset}>
          重置
        </Button>
        <Button className='mr-16' onClick={onClick}>
          运行
        </Button>
      </>
    ),
  };

  return (
    <main className='container'>
      <Tabs type='card' tabBarExtraContent={tabBarExtraContent}>
        <TabPane tab='JavaScript' key='1'>
          <div className='overflow-y'>
            <CodeMirror
              value={value}
              width='50vw'
              extensions={[javascript({ jsx: true })]}
              onChange={value => {
                setValue(value);
                resetValue = value;
              }}
              ref={instance}
            />
          </div>
        </TabPane>
      </Tabs>

      <iframe
        ref={iframeRef}
        title='My Daily Marathon Tracker'
        src='/content'
      />

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

        .overflow-y {
          height: calc(100vh - 72px);
          overflow: auto;
          width: 100%;
          box-sizing: border-box;
          padding-bottom: 16px;
          font-size: 16px;
        }
      `}</style>
    </main>
  );
}

export async function getStaticProps() {
  const fileList = await getFileList();

  // 返回的参数将会按照 key 值赋值到 HomePage 组件的同名入参中
  return {
    props: { fileList },
  };
}
