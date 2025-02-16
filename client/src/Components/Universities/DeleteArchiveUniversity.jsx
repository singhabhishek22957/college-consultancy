import React, { useEffect, useState } from 'react';
import { archiveUniversity, deleteArchiveUniversity } from '../../Service/UniversityService.jsx';
import LoadingPopUp from '../User/LoadingPopUp.jsx';
import MessagePopUp from '../MessagePopUp.jsx';

const DeleteArchiveUniversity = ({ isArchive, universityId, universityName }) => {
  const [loading, setLoading] = useState(false);
  
  const [success, setSuccess] = useState({
    success: false,
    message: '',
    badError: true,
  });

 

  useEffect(() => {
    const archive = async () => {
      if (!isArchive) {
        console.log('isArchive is false, skipping archive process   ');
        return;
      }; // Prevent execution if isArchive is false

      try {
        console.log('Archiving university...');

        setLoading(true);
        const response = await deleteArchiveUniversity({
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
  }, [isArchive, universityId, universityName]);

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

export default DeleteArchiveUniversity;
