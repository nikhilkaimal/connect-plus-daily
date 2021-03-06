import React from "react";

/**
 * Props:
 * - disabled: boolean
 * - onClick: () => ()
 */
export default function StartButton(props) {
  return (
    <button
      className="btn-simple"
      disabled={props.disabled}
      onClick={props.onClick}
    >
      Click to start a call
    </button>
  );
}
