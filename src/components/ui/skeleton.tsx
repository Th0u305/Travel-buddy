const Skeleton = () => {

    return (
        <div className="grid w-full px-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

            <div
                className="relative space-y-5 border border-slate-100 dark:border-slate-700 overflow-hidden rounded-2xl bg-gray-300 p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-slate-100/10 before:bg-linear-to-r before:from-transparent before:via-slate-100/70 dark:before:via-slate-100/10 before:to-transparent">
                <div className="h-24 rounded-lg dark:bg-slate-700 bg-slate-100/80"></div>
                <div className="space-y-3">
                    <div className="h-3 w-3/5 rounded-lg dark:bg-slate-700 bg-slate-100/50"></div>
                    <div className="h-3 w-4/5 rounded-lg dark:bg-slate-700 bg-slate-100/60"></div>
                    <div className="h-3 w-2/5 rounded-lg dark:bg-slate-700 bg-slate-100/60"></div>
                </div>
            </div>

            <div
                className="relative space-y-5 border border-slate-100 dark:border-slate-700 overflow-hidden rounded-2xl bg-gray-300 p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-slate-100/10 before:bg-linear-to-r before:from-transparent before:via-slate-100/70 dark:before:via-slate-100/10 before:to-transparent">
                <div className="h-24 rounded-lg dark:bg-slate-700 bg-slate-100/80"></div>
                <div className="space-y-3">
                    <div className="h-3 w-3/5 rounded-lg dark:bg-slate-700 bg-slate-100/50"></div>
                    <div className="h-3 w-4/5 rounded-lg dark:bg-slate-700 bg-slate-100/60"></div>
                    <div className="h-3 w-2/5 rounded-lg dark:bg-slate-700 bg-slate-100/60"></div>
                </div>
            </div>

            <div
                className="relative space-y-5 border border-slate-100 dark:border-slate-700 overflow-hidden rounded-2xl bg-gray-300 p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-slate-100/10 before:bg-linear-to-r before:from-transparent before:via-slate-100/70 dark:before:via-slate-100/10 before:to-transparent">
                <div className="h-24 rounded-lg dark:bg-slate-700 bg-slate-100/80"></div>
                <div className="space-y-3">
                    <div className="h-3 w-3/5 rounded-lg dark:bg-slate-700 bg-slate-100/50"></div>
                    <div className="h-3 w-4/5 rounded-lg dark:bg-slate-700 bg-slate-100/60"></div>
                    <div className="h-3 w-2/5 rounded-lg dark:bg-slate-700 bg-slate-100/60"></div>
                </div>
            </div>

        </div>
    );
};

export default Skeleton;