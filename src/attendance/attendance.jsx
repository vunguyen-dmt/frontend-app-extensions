import Footer from '@edx/frontend-component-footer';
import React, { useEffect, useState } from 'react';
import Header from '@edx/frontend-component-header';
import './attendance.scss';
import { useParams, useLocation } from 'react-router-dom';
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  Hyperlink, Icon, Button, Spinner, ModalLayer, Alert,
} from '@openedx/paragon';
import {
  Info, CheckCircle,
} from '@openedx/paragon/icons';
import { post } from '../services/attendanceService';

const Attendance = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const locationRequired = queryParams.get('locationrequired');
  const { formatMessage } = useIntl();

  useEffect(() => {
    const { courseId } = params;
    const qrConfigId = params.id;
    const request = {
      longitude: '',
      latitude: '',
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        request.latitude = position.coords.latitude;
        request.longitude = position.coords.longitude;
        console.log(position.coords.latitude, position.coords.longitude);
        post(courseId, qrConfigId, request).then(response => {
          setLoading(false);
        }).catch(error => {
          console.log(error);
          setErrorMessage(error.message);
          setLoading(false);
        });
      },
      (error) => {
        console.error(error.message);
        console.log(locationRequired)
        if (locationRequired === 'yes') {
          setErrorMessage('Your location is required. You need to allow this page to access your current location to proceed.');
          setLoading(false);
        } else {
          post(courseId, qrConfigId, request).then(response => {
            setLoading(false);
          }).catch(error1 => {
            console.log(error1);
            setErrorMessage(error1.message);
            setLoading(false);
          });
        }
      },
      {
        enableHighAccuracy: true, // Request a more accurate location (may use GPS)
        timeout: 10000, // Wait 10 seconds before timing out
        maximumAge: 0, // Do not accept a cached position
      },
    );
  }, [params.courseId, params.id]);

  const reload = () => {
    window.location.reload();
  };

  const exit = () => {
    window.close();
  };

  return (
    <>
      <Header />
      <div className="content-body">
        <ModalLayer
          isOpen
          onClose={() => {}}
        >
          <div role="dialog" aria-label="My dialog" className="dialog mw-sm p-5 bg-white mx-auto my-5">
            <h3>Attendance check</h3>
            {loading && <div className="text-center mt-3"><Spinner animation="border" className="mie-3" screenReaderText="loading" /></div>}
            {!loading && !errorMessage
            && (
            <Alert
              variant="success"
              icon={CheckCircle}
              actions={[
                <Button onClick={exit}>Ok</Button>,
              ]}
            >
              <Alert.Heading>Attendance check successful!</Alert.Heading>
              <p>You have successfully checked in! You can now close the current tab.</p>
            </Alert>
            )}
            {!loading && errorMessage && (
            <Alert
              variant="danger"
              icon={Info}
              actions={[
                <Button size="lg" onClick={reload}>Retry</Button>,
                <Button variant="inverse-brand" size="lg" onClick={exit}>Exit</Button>,
              ]}
            >
              <Alert.Heading>Attendance check failed!</Alert.Heading>
              <p>{errorMessage}</p>
            </Alert>
            )}
          </div>
        </ModalLayer>
      </div>
      <Footer />
    </>
  );
};

export default Attendance;
