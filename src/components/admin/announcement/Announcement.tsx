import React from 'react'
import Header from '../Header';
import ComingSoon from '../../ComingSoon';

function Announcement() {
  return (
    <div>
      <Header headerName="Announcement" />
      <div className="relative">
        <ComingSoon />
      </div>
    </div>
  );
}

export default Announcement