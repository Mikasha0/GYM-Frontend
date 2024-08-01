export default function SuccessAlert({message}:{message:string}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-lg">
      <div className="text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 p-4 mb-4" role="alert">
        <span className="font-medium">Success alert!</span> {message}
      </div>
      <button
        // onClick={onClose}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Close
      </button>
    </div>
  </div>
  );
}
