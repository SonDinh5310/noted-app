import React from "react";
import Markdown from "react-native-markdown-display";

const Preview = ({ children }) => {
    return (
        <Markdown style={{ body: { fontFamily: "sans-serif" } }}>
            {children}
        </Markdown>
    );
};

export default Preview;
