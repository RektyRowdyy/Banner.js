const AlertBanner = ({ message, type, onClose }) => {
  const getClassNames = () => {
    switch (type) {
      case 'success':
        return 'border-green-500 bg-green-100 text-green-600';
      case 'error':
        return 'border-red-500 bg-red-100 text-red-600';
      default:
        return 'border-gray-500 bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className={`fixed left-0 w-full rounded-sm border-l-4 p-4 ${getClassNames()} z-50`}>
      <div className="flex items-center justify-between space-x-4">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={`h-6 w-6 ${getClassNames().split(' ')[2]}`}
          >
            {type === 'success' ? (
              <>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </>
            ) : (
              <>
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </>
            )}
          </svg>
        </div>
        <div>
          <p className={`text-sm font-medium ${getClassNames().split(' ')[2]}`}>
            {message}
          </p>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={`h-6 w-6 cursor-pointer ${getClassNames().split(' ')[2]}`}
            onClick={onClose} // Call the onClose function when clicked
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AlertBanner;
