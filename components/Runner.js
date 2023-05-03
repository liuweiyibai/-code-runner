import { useEffect } from "react";
import { clearLogs, runWithCustomLogs } from "../utils/log";
import RunnerBox from "./RunnerBox";

export default function Content({ code }) {
  useEffect(() => {
    if (code) {
      clearLogs();
      runWithCustomLogs(code);
    }
  }, [code]);
  return <RunnerBox />;
}
