import "@/src/css/loading.css" 

const Loading = () => {
    return (
        <div className="h-screen flex items-center justify-center absolute top-1/2 left-1/2 right-1/2 z-50">
            <div className="typewriter">
                <div className="slide"><i className=""></i></div>
                <div className="paper"></div>
                <div className="keyboard"></div>
            </div>
        </div>
    )
};

export default Loading;