import React, { useState, useEffect } from 'react';

function TypeScriptComponent() {

    const someValue: string = "yay";

    return (
        <div className="tscomp">
            I was written in typescript {someValue}
        </div>
    );
}

export default TypeScriptComponent;
