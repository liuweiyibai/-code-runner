export default function RunnerBox() {
  return (
    <div className="runner-box" id="log-container">
      <h3>运行结果</h3>
      <div id="log" className="output"></div>
      <style jsx>{`
        .runner-box {
          box-sizing: border-box;
          padding: 16px;
          width: 50vw;
          height: 100vh;
          border-left: 1px dashed #efefef;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}
