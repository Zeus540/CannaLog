import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import {store} from  './store.js'
import { BrowserRouter as Router } from 'react-router-dom'
import { StrictMode } from 'react'

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "http://f3c498e29a4614e717ab96623056cbf0@95.111.252.42:9000/2",
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost:5173","https://api.cannalog.co.za/", /^https:\/\/yourserver\.io\/api/],
    }), 
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
)
