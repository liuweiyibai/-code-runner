import { useEffect } from "react";
import { clearLogs, runWithCustomLogs } from "../utils/log";
import RunnerBox from "./RunnerBox";
import { useRouter } from "next/router";

export default function Content() {
  const router = useRouter();
  useEffect(() => {
    const code = router.query.keyword;
    if (code) {
      clearLogs();
      runWithCustomLogs(code);
    }
  }, [router.query.keyword]);
  return <RunnerBox />;
}
