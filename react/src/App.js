import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Snackbar from '@material-ui/core/Snackbar';
import { css } from 'emotion';
import React, { memo, useEffect, useState } from 'react';
import { register } from 'register-service-worker';
import useAlive from './hooks/useAlive';

const refreshButtonCss = css`
  && {
    color: #7fdbff;
  }
`;

const App = () => {
  const checkAlive = useAlive();
  const [update, setUpdate] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    register(`${process.env.PUBLIC_URL}/service-worker.js`, {
      registrationOptions: { scope: './' },
      updated(registration) {
        setUpdate(() => () => {
          if (!checkAlive()) return;
          setRefreshing(true);
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          registration.update().then(() => window.location.reload());
        });
      },
    });
  }, []);
  return (
    <>
      <CssBaseline />
      <div>{process.env.REACT_APP_DATE}</div>
      <Snackbar
        open={update}
        message="New content is available; please refresh."
        action={
          <Button
            className={refreshButtonCss}
            onClick={update}
            disabled={refreshing}
          >
            refresh
          </Button>
        }
      />
    </>
  );
};

export default memo(App);
