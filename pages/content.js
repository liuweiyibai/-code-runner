import { useEffect } from 'react';
import { applyLog } from '../utils';
import RunnerBox from '../components/RunnerBox';

export default function Content() {
  function execCode(value) {
    try {
      new Function(`${applyLog()};${value}`)();
    } catch (error) {
      console.error(error.message);
    }
  }

  function clearTextContent() {
    const e = document.querySelector('#console code');
    e.innerText = '';
  }

  useEffect(() => {
    window.addEventListener('message', function (e) {
      clearTextContent();
      execCode(e.data.message);
    });
  }, []);
  return <RunnerBox text={'execText'} />;
}
