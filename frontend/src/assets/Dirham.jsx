// DirhamSvg.tsx
import React from "react";

const DirhamSvg = (props) => (
  <svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
    <g>
      <circle cx="16" cy="16" r="16" fill="#F4F6FB" />
      <path
        d="M20.5 10.5C20.5 9.39543 19.6046 8.5 18.5 8.5H13.5C12.3954 8.5 11.5 9.39543 11.5 10.5V21.5C11.5 22.6046 12.3954 23.5 13.5 23.5H18.5C19.6046 23.5 20.5 22.6046 20.5 21.5V10.5Z"
        stroke="#1E293B"
        strokeWidth="1.5"
        fill="#fff"
      />
      <path
        d="M14.5 13.5H17.5M14.5 16H17.5M14.5 18.5H17.5"
        stroke="#1E293B"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M16 10.5V21.5"
        stroke="#1E293B"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <text
        x="16"
        y="20.5"
        textAnchor="middle"
        fontFamily="Arial"
        fontWeight="bold"
        fontSize="7"
        fill="#1E293B"
        letterSpacing="0.5"
        dominantBaseline="middle"
      >
        د.إ
      </text>
    </g>
  </svg>
);

export default DirhamSvg;
