import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LanguageProvider } from './language/LanguageProvider';
import { TranscriptionProvider } from './transcription/TranscriptionProvider';
import { TranscriptionRequestProvider } from './transcriptionRequest/TranscriptionRequestProvider';
import TranscriptionRequestWorkshop from './transcriptionRequestWorkshop/TranscriptionRequestWorkshop';
import TranscriptionRequestDashboard from './transcriptionRequestDashboard/TranscriptionRequestDashboard';

const ApplicationViews = props => (
  <>
    <Route exact path="/" render={() => <Redirect to="/workshop" />} />
    <Route path="/logout" render={() => {
      localStorage.removeItem('current_user');
      return <Redirect to="/" />;
    }} />

    <TranscriptionRequestProvider>
      <TranscriptionProvider>
        <LanguageProvider>
          <Route path="/workshop" component={TranscriptionRequestWorkshop} />

          <Route path="/dashboard" component={TranscriptionRequestDashboard} />
        </LanguageProvider>
      </TranscriptionProvider>
    </TranscriptionRequestProvider>
  </>
);

export default ApplicationViews;