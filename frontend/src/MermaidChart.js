import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: false });

let diagramCounter = 0;

function MermaidChart({ code }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      diagramCounter += 1;
      const id = 'mermaid-diagram-' + diagramCounter;
      mermaid.render(id, code).then(({ svg }) => {
        ref.current.innerHTML = svg;
      }).catch((err) => {
        console.error("Mermaid render error:", err);
        ref.current.innerHTML = "<pre style='white-space:pre-wrap'>" + code + "</pre>";
      });
    }
  }, [code]);

  return <div ref={ref}></div>;
}

export default MermaidChart;