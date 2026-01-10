import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";

// Debugging aid: log the imported App module to diagnose 'default' / undefined errors
try {
  console.log('[debug] App module:', App);
  console.log('[debug] App type:', typeof App);
} catch (e) {
  console.error('[debug] Error introspecting App module:', e);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} catch (e) {
  console.error('Render error:', e);
  // show a friendly fallback UI if rendering fails
  root.render(
    <div style={{ padding: 20, fontFamily: 'system-ui', color: '#fff', background: '#111' }}>
      <h2>Render error</h2>
      <pre style={{ whiteSpace: 'pre-wrap', color: '#f88' }}>{String(e)}</pre>
      <p>Check console for module diagnostics.</p>
    </div>
  );
}
