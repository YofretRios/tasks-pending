import React from 'react';
import clsx from 'clsx';
import { useIsFetching } from 'react-query';

export default function Loader() {
  const isFetching = useIsFetching();

  const spinnerClass = clsx('lds-ripple', {
    'hidden': !isFetching
  })

  return (
    <div className={spinnerClass}>
      <div></div>
      <div></div>
    </div>
  );
}
