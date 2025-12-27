export default function PageLoader() {
    return (
        <div className="h-[90vh] w-full flex justify-center items-center bg-white">
            <style>
                {`
                /* Standard animation with fill */
                @keyframes drawAndFill {
                    0% { stroke-dashoffset: 1; fill: transparent; }
                    25% { stroke-dashoffset: 0; fill: transparent; }
                    40%, 75% { stroke-dashoffset: 0; fill: rgb(44, 7, 53); }
                    100% { stroke-dashoffset: 1; fill: transparent; }
                }

                /* Animation for the dot (Elem 18) */
                @keyframes drawAndFillSpecial {
                    0%, 25% { stroke-dashoffset: 1; fill: transparent; }
                    40%, 75% { stroke-dashoffset: 0; fill: rgb(78, 20, 140); }
                    100% { stroke-dashoffset: 1; fill: transparent; }
                }

                /* NEW: Animation for Compass (Elem 16 & 17) - No Fill */
                @keyframes drawOnly {
                    0% { stroke-dashoffset: 1; }
                    25%, 75% { stroke-dashoffset: 0; }
                    100% { stroke-dashoffset: 1; }
                }

                svg path {
                    stroke: rgb(44, 7, 53);
                    stroke-width: 0.6; 
                    stroke-dasharray: 1;
                    stroke-dashoffset: 1;
                    animation: drawAndFill 2s cubic-bezier(0.47, 0, 0.745, 0.715) infinite;
                }

                /* Staggered delays */
                .svg-elem-1  { animation-delay: 0.00s; }
                .svg-elem-2  { animation-delay: 0.05s; }
                .svg-elem-3  { animation-delay: 0.10s; }
                .svg-elem-4  { animation-delay: 0.15s; }
                .svg-elem-5  { animation-delay: 0.20s; }
                .svg-elem-6  { animation-delay: 0.25s; }
                .svg-elem-7  { animation-delay: 0.30s; }
                .svg-elem-8  { animation-delay: 0.35s; }
                .svg-elem-9  { animation-delay: 0.40s; }
                .svg-elem-10 { animation-delay: 0.45s; }
                .svg-elem-11 { animation-delay: 0.50s; }
                .svg-elem-12 { animation-delay: 0.55s; }
                .svg-elem-13 { animation-delay: 0.60s; }
                .svg-elem-14 { animation-delay: 0.65s; }
                .svg-elem-15 { animation-delay: 0.70s; }

                /* Compass elements (No Fill) */
                .svg-elem-16 { 
                    animation-name: drawOnly;
                    animation-delay: 0.75s; 
                    stroke: rgb(78, 20, 140); /* Keeping the purple stroke */
                    stroke-width: 1.5; /* Making icon lines slightly thicker */
                }
                .svg-elem-17 { 
                    animation-name: drawOnly;
                    animation-delay: 0.80s; 
                    stroke: rgb(78, 20, 140);
                    stroke-width: 1.5;
                }

                /* Final dot */
                .svg-elem-18 { 
                    animation-name: drawAndFillSpecial;
                    animation-delay: 0.85s; 
                }
                `}
            </style>
            <svg width="343" height="76" viewBox="0 0 343 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Text Elements */}
                <path pathLength="1" className="svg-elem-1" d="M142.322 21.936..." />
                <path pathLength="1" className="svg-elem-2" d="M105.397 0H112.525..." />
                <path pathLength="1" className="svg-elem-3" d="M56.7812 0H77.0132..." />
                <path pathLength="1" className="svg-elem-4" d="M44.221 18.936..." />
                <path pathLength="1" className="svg-elem-5" d="M7.56 6.288H0..." />
                <path pathLength="1" className="svg-elem-6" d="M87.9102 41..." />
                <path pathLength="1" className="svg-elem-7" d="M61.2344 41..." />
                <path pathLength="1" className="svg-elem-8" d="M46.0175 55.64..." />
                <path pathLength="1" className="svg-elem-9" d="M1.65625 41..." />
                <path pathLength="1" className="svg-elem-10" d="M204.559 41..." />
                <path pathLength="1" className="svg-elem-11" d="M179.062 41..." />
                <path pathLength="1" className="svg-elem-12" d="M150.512 41..." />
                <path pathLength="1" className="svg-elem-13" d="M342.962 41..." />
                <path pathLength="1" className="svg-elem-14" d="M280.05 56.8158..." />
                <path pathLength="1" className="svg-elem-15" d="M259.432 66.1518..." />
                
                {/* Compass Icon Elements (Outline Only) */}
                <path pathLength="1" className="svg-elem-16" d="M128.165 72.596C136.679 72.596 143.581 65.6938 143.581 57.1794C143.581 48.665 136.679 41.7627 128.165 41.7627C119.65 41.7627 112.748 48.665 112.748 57.1794C112.748 65.6938 119.65 72.596 128.165 72.596Z" />
                <path pathLength="1" className="svg-elem-17" d="M132.361 51.4227C133.114 51.1717 133.491 51.0461 133.741 51.1354C133.959 51.2132 134.131 51.3847 134.209 51.6026C134.298 51.853 134.172 52.2296 133.921 52.9828L131.628 59.8627C131.557 60.0772 131.521 60.1844 131.46 60.2735C131.406 60.3524 131.338 60.4206 131.259 60.4745C131.17 60.5355 131.063 60.5712 130.848 60.6427L123.968 62.936C123.215 63.1871 122.838 63.3126 122.588 63.2233C122.37 63.1456 122.199 62.9741 122.121 62.7561C122.031 62.5057 122.157 62.1291 122.408 61.3759L124.701 54.4961C124.773 54.2815 124.809 54.1743 124.87 54.0852C124.924 54.0063 124.992 53.9382 125.071 53.8842C125.16 53.8233 125.267 53.7875 125.481 53.716L132.361 51.4227Z" />
                
                {/* Final Dot Element (Filled) */}
                <path pathLength="1" className="svg-elem-18" d="M238.664 69.1797C238.664 71.1127 237.097 72.6797 235.164 72.6797C233.231 72.6797 231.664 71.1127 231.664 69.1797C231.664 67.2467 233.231 65.6797 235.164 65.6797C237.097 65.6797 238.664 67.2467 238.664 69.1797Z" />
            </svg>
        </div>
    );
}