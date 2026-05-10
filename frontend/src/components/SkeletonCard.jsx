function SkeletonCard() {

  return (
    <div className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden">

      <div className="h-[320px] bg-gray-300 dark:bg-gray-700"></div>

      <div className="p-4">

        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded"></div>

        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mt-4 w-2/3"></div>

      </div>

    </div>
  )
}

export default SkeletonCard