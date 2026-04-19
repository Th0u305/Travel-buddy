
const Pagination = ({currentPage, setCurrentPage}: {currentPage: number, setCurrentPage: (page: number) => void}) => {
    const totalPages = 5;

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`cursor-pointer mx-1 px-3 py-1 text-[0.9rem] sm:text-[1rem] rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all dark:bg-slate-700 dark:text-[#abc2d3] duration-300 transform hover:scale-105 ${
                        currentPage === i ? "bg-[#3B9DF8]! text-white! shadow-lg" : ""
                    }`}
                >
                    {i}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="flex items-center flex-wrap justify-center mt-8 space-x-4">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="cursor-pointer px-4 py-1 mb-2 sm:mb-0 rounded-full bg-gray-200 text-gray-700 hover:bg-[#3B9DF8] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-200 dark:bg-slate-700 dark:text-[#abc2d3] dark:disabled:bg-slate-800 dark:disabled:text-slate-500 dark:disabled:hover:bg-slate-800 dark:disabled:hover:text-slate-500 disabled:hover:text-gray-700 transition-all duration-300"
            >
                Previous
            </button>
            <div className="flex items-center space-x-2">
                {renderPageNumbers()}
            </div>
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`cursor-pointer px-4 py-1 mt-2 sm:mt-0 rounded-full bg-gray-200 text-gray-700 hover:bg-[#3B9DF8] hover:text-white dark:bg-slate-700 dark:text-[#abc2d3] dark:disabled:bg-slate-800 dark:disabled:text-slate-500 dark:disabled:hover:bg-slate-800 dark:disabled:hover:text-slate-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-700 transition-all duration-300 ${
                    currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                }`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
                    