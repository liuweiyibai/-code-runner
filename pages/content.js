// import { useRef, useState, useEffect } from 'react';

// import { applyLog } from '../utils';
import RunnerBox from '../components/RunnerBox';

export default function Content() {
  // 接收到 js 然后执行 然后设置到对应页面
  return (
    <main>
      <RunnerBox text={'execText'} />
    </main>
  );
}
