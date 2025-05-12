import React from 'react';

const Logo = ({ size = 32 }) => {
  return (
    <div
      class="flex items-center justify-center rounded-full bg-green-50 border border-green-200"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <img src="https://www.dubaipolice.gov.ae/portal/public/dubai-police.svg" alt="dp-logo" />
    </div>
  );
};

export default Logo;
