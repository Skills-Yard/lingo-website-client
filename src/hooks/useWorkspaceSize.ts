import { useRef, useState, useEffect } from 'react';

export function useWorkspaceSize() {
  const workspaceRef = useRef<HTMLDivElement>(null);
  const [workspaceHeight, setWorkspaceHeight] = useState(250);

  useEffect(() => {
    if (!workspaceRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWorkspaceHeight(entry.contentRect.height);
      }
    });
    observer.observe(workspaceRef.current);
    return () => observer.disconnect();
  }, []);

  return { workspaceRef, workspaceHeight };
}
