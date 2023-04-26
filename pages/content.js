import { useEffect } from "react";
import { clearLogs, runWithCustomLogs } from "../utils/log";
import RunnerBox from "../components/RunnerBox";

export default function Content() {
  useEffect(() => {
    window.addEventListener("message", function (e) {
      clearLogs();
      runWithCustomLogs(e.data.message);
    });
  }, []);
  return <RunnerBox />;
}
