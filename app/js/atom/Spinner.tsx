import React from "react";

export const Spinner: React.FC = () => {
    return (
        <div className="spinner">
            <div className="spinner-dot" />
            <div className="spinner-dot" />
            <div className="spinner-dot" />
            <div className="spinner-dot" />
            <div className="spinner-dot" />
            <div className="spinner-dot" />
        </div>
    );
};
