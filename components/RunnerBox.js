export default function RunnerBox() {
  return (
    <div className="runner-box" id="log-container">
      <h3>运行结果</h3>
      <div id="log" className="output"></div>
      <style jsx>{`
        .runner-box {
          box-sizing: border-box;
          padding: 16px;
          padding-left: 0;
          flex: 1;
          margin-left: 20px;
          height: 100vh;

          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}
