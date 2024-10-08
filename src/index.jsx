import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';

import FooterSlot from '@openedx/frontend-slot-footer';
import {
  Route, Routes,
} from 'react-router-dom';
import messages from './i18n';
import './index.scss';
import Head from './Head';
import Attendance from './attendance/attendance';
import NotFoundPage from './notFoundPage';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider>
      {/* <Header /> */}
      <Head />
      <Routes>
        <Route exact path="/attendance/courses/:courseId/:id" element={<Attendance />} />
        <Route path="*" element={<NotFoundPage />} />
        {/* <Route exact path="/faq" element={<FAQPage />} /> */}
      </Routes>
      {/* <FooterSlot /> */}
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages,
  requireAuthenticatedUser: true,
});
