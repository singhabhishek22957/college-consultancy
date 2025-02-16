import React, { useEffect, useState } from 'react';
import {  restoredArchiveUniversity } from '../../Service/UniversityService.jsx';
import LoadingPopUp from '../User/LoadingPopUp.jsx';
import MessagePopUp from '../MessagePopUp.jsx';

const RestoredArchiveUniversity = ({ isRestored, universityId, universityName }) => {
  const [loading, setLoading] = useState(false);
  
  const [success, setSuccess] = useState({
    success: false,
    message: '',
    badError: true,
  });

 

  useEffect(() => {
    const archive = async () => {
      if (!isRestored) {
        console.log('isRestored is false, skipping archive process   ');
        return;
      }; // Prevent execution if isRestored is false

      try {
        console.log('Restored university...');

        setLoading(true);
        const response = await restoredArchiveUniversity({
          universityId: universityId,
          universityName: universityName,
        });
        console.log(response);

        setLoading(false);
        setSuccess((prev) => ({
            ...prev,
            success: true,
            message: response.data.data.message,
            badError: false,
        })
        );

      } catch (error) {
        setLoading(false);

        const errorMessage = error?.response?.data?.data?.message || 'An error occurred while archiving.';
        setSuccess((prev) => ({
            ...prev,
            success: true,
            message: errorMessage,
        }));

        if (error?.response?.data?.data?.statusCode === 400) {
            setSuccess((prev) => ({
                ...prev,
                badError: true,
            }));
          console.error('Bad request while archiving university:', error);
        } 
      }
    };

    archive();
  }, [isRestored, universityId, universityName]);

  return (
    <div>
        
      <LoadingPopUp loading={loading} />
      <MessagePopUp
        isOpen={success.success}
        message={success.message}
        badError={success.badError}
        onClose={() => setSuccess({ success: false, message: '', badError: false })}
      />
    </div>
  );
};

export default RestoredArchiveUniversity;
