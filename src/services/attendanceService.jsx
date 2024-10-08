import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';

export const post = (courseId, qrConfigId, request) => {
  const url = `${getConfig().LMS_BASE_URL}/api/goamazing_openedx_extensions_app/attendance/courses/${courseId}/${qrConfigId}`;
  return getAuthenticatedHttpClient().post(url, request);
};

