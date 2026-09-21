import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: false });

function MermaidChart({ code }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.render('mermaid-diagram-' + Math.random(), code).then(({ svg }) => {
        ref.current.innerHTML = svg;
      }).catch(() => {
        ref.current.innerHTML = "<p>Couldn't render diagram.</p>";
      });
    }
  }, [code]);

  return <div ref={ref}></div>;
}

export default MermaidChart;