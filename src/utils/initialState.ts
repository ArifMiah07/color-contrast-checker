// src/utils/initialState.js
type FontSize = "normal" | "large";
type FontWeight = "normal" | "bold";

interface Layer {
  name: string;
  bgColor: string;
  textColor: string;
  text: string;
  fontSize: FontSize;
  fontWeight: FontWeight;
  children: Layer[];
}
  

  export const initialLayerState :Layer = {
    name: "Root Layer",
    bgColor: "#ffffff",
    textColor: "#000000",
    text: "Root Layer Text - Welcome to the Contrast Checker",
    fontSize: "normal",
    fontWeight: "normal",
    children: [
      {
        name: "Primary Content",
        bgColor: "#f0f0f0",
        textColor: "#333333",
        text: "This is primary content with good contrast",
        fontSize: "normal",
        fontWeight: "normal",
        children: []
      },
      {
        name: "Accent Section",
        bgColor: "#4a6da7",
        textColor: "#ffffff",
        text: "This is an accent section with light text",
        fontSize: "large",
        fontWeight: "bold",
        children: [
          {
            name: "Nested Card",
            bgColor: "#2c4977",
            textColor: "#e0e0e0",
            text: "Nested card with darker background",
            fontSize: "normal",
            fontWeight: "normal",
            children: []
          }
        ]
      },
      {
        name: "Warning Section",
        bgColor: "#fff3cd",
        textColor: "#856404",
        text: "Warning section with amber background",
        fontSize: "normal",
        fontWeight: "bold",
        children: []
      }
    ]
  };