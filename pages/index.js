import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useRef, useState } from "react";
import { Tabs, Button, TreeSelect } from "antd";
import { getFileList } from "../utils/files.mjs";
const { TabPane } = Tabs;
let resetValue = undefined;
export default function Index({ fileList }) {
  const instance = useRef();
  const iframeRef = useRef();
  const [value, setValue] = useState();

  const handleChange = (value) => {
    resetValue = value;
    setValue(value);
  };

  const onClick = () => {
    sendMessage();
  };

  const sendMessage = () => {
    if (!iframeRef.current) return;
    iframeRef.current.contentWindow.postMessage({ message: value });
  };

  const tabBarExtraContent = {
    left: (
      <TreeSelect
        style={{ width: 380, marginLeft: 16, marginRight: 16 }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        treeData={fileList}
        placeholder="请选择~~"
        treeDefaultExpandAll
        onChange={handleChange}
      />
    ),
    right: (
      <>
        {/* <Button type='primary' className='mr-16' onClick={onReset}>
          重置
        </Button> */}
        <Button className="mr-16" onClick={onClick}>
          运行
        </Button>
      </>
    ),
  };

  return (
    <main className="container">
      <Tabs type="card" tabBarExtraContent={tabBarExtraContent}>
        <TabPane tab="JavaScript" key="1">
          <div className="overflow-y">
            <CodeMirror
              value={value}
              width="50vw"
              extensions={[javascript({ jsx: true })]}
              onChange={(value) => {
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
        title="My Daily Marathon Tracker"
        src="/content"
      />

      <style jsx>{`
        .container {
          display: flex;
          height: 100vh;
          width: 100vw;
          max-width: 100vw;
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
