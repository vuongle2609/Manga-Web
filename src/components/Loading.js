export default function Loading() {
  return (
    <div className="grid wide">
      <div className="row">
        <div className="bg-white dark:bg-bdark w-full mx-auto p-2 sm:p-4 sm:h-64 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none ">
          <div className="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-200 dark:bg-sdarks animate-pulse"></div>
          <div className="flex flex-col flex-1 gap-5 sm:p-2">
            <div className="flex flex-1 flex-col gap-3">
              <div className="bg-gray-200 dark:bg-sdarks w-full animate-pulse h-14 rounded-2xl"></div>
              <div className="bg-gray-200 dark:bg-sdarks w-full animate-pulse h-3 rounded-2xl"></div>
              <div className="bg-gray-200 dark:bg-sdarks w-full animate-pulse h-3 rounded-2xl"></div>
              <div className="bg-gray-200 dark:bg-sdarks w-full animate-pulse h-3 rounded-2xl"></div>
              <div className="bg-gray-200 dark:bg-sdarks w-full animate-pulse h-3 rounded-2xl"></div>
            </div>
            <div className="mt-auto flex gap-3">
              <div className="bg-gray-200 dark:bg-sdarks w-20 h-8 animate-pulse rounded-full"></div>
              <div className="bg-gray-200 dark:bg-sdarks w-20 h-8 animate-pulse rounded-full"></div>
              <div className="bg-gray-200 dark:bg-sdarks w-20 h-8 animate-pulse rounded-full ml-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
