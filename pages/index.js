import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useEffect, useRef, useState } from "react";
import { Tabs, Button, Cascader } from "antd";
import { getFileList } from "../utils/files.mjs";
import Runner from "../components/Runner.js";
import { useRouter } from "next/router.js";
import { flattenTree } from "../utils";

let resetValue;
let selectedValue;
export default function Index({ fileList, allList }) {
  const router = useRouter();

  const instance = useRef();
  const [value, setValue] = useState();
  const [defaultValue, _setDefaultValue] = useState([]);

  const handleChange = (value, selectedOptions) => {
    const item = selectedOptions[selectedOptions.length - 1];
    resetValue = item.text;
    selectedValue = value.join(",");
    setValue(item.text);
  };

  const onRun = () => {
    router.replace({
      pathname: "/",
      query: { keyword: value, selectedValue: selectedValue || "" },
    });
  };

  const onReset = () => {
    setValue(resetValue);
  };

  const displayRender = (label) => {
    return label[label.length - 1];
  };

  const tabBarExtraContent = {
    left: (
      <Cascader
        style={{ width: 380, marginLeft: 16, marginRight: 16 }}
        options={fileList}
        onChange={handleChange}
        placeholder="Please select"
        showSearch
        displayRender={displayRender}
        value={defaultValue}
      />
    ),
    right: (
      <>
        <Button className="mr-16" onClick={onRun}>
          运行
        </Button>
        <Button className="mr-16" onClick={onReset}>
          重置
        </Button>
      </>
    ),
  };

  const items = [
    {
      key: "1",
      label: "JavaScript",
      children: (
        <>
          <div className="overflow-y">
            <CodeMirror
              value={value}
              height="100%"
              width="100%"
              extensions={[javascript({ jsx: true })]}
              onChange={(value) => {
                setValue(value);
              }}
              ref={instance}
            />
          </div>
          <style jsx>
            {`
              .overflow-y {
                height: 100%;
                overflow: auto;
                width: 100%;
                box-sizing: border-box;
                padding-bottom: 16px;
                font-size: 16px;
                .cm-theme-light {
                  height: 100%;
                }
              }
            `}
          </style>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (router.query?.selectedValue) {
      const selected = router.query?.selectedValue?.split(",");
      const item = allList.find(
        (t) => t.value === selected?.[selected.length - 1]
      );

      if (item) {
        _setDefaultValue(selected);
        setValue(item.text);
      }
    }
  }, [router.query.selectedValue]);

  return (
    <main className="container">
      <Tabs type="card" tabBarExtraContent={tabBarExtraContent} items={items} />
      <Runner />
      <style jsx>{`
        .container {
          display: flex;
          height: 100vh;
          width: 100vw;
          max-width: 100vw;
          .ant-tabs {
            width: 50%;
            .ant-tabs-content {
              height: 100%;
              .ant-tabs-tabpane {
                height: 100%;
              }
            }
          }
        }
      `}</style>
    </main>
  );
}

export async function getStaticProps() {
  const fileList = await getFileList();
  const allList = flattenTree(fileList);

  // 返回的参数将会按照 key 值赋值到 HomePage 组件的同名入参中
  return {
    props: { fileList, allList },
  };
}
