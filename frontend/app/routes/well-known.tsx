import { useEffect } from 'react';

export default function WellKnown() {
  useEffect(() => {
    document.title = "Well Known";
  }, []);

  return null;
}
