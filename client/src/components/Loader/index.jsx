import React from "react";
import './styles.scss';

function LoaderComponent({ isLoading }) {
    return (
        isLoading ? (
            <div className="page-wrapper">
                <div className="loader">
                    <div className="jelly">
                        <div className="body"></div>
                        <div className="eye"></div>
                        <div className="eye"></div>
                        <div className="mouth"></div>
                    </div>
                    <div className="shadow"></div>
                </div>
            </div>
        ) : null

    )
}

export default LoaderComponent;