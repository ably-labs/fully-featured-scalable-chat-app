import React from "react";

const UrlPreview = ({ message }) => {

    return (
        <div key={message?.id}>
            <h1>Url Preview</h1>
            <p>Title: {message?.data?.title}</p>
        </div>
    );
};

export default UrlPreview;