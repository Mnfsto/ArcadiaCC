
import { motion } from "framer-motion";


export default function logo() {
    const icon = {
        hidden: {
            opacity: 0,
            pathLength: 0,
            offsetdistance: "0%",
            scale: 10,
            fill: "#000204ff"
        },
        visible: {
            opacity: 1,
            pathLength: 1,
            offsetdistance: "100%",
            scale: 1,
            fill: "#001328"
        }
    };
    return (

        <svg className="glitch" width={152} viewBox="0 0 56.2 11.1">
            <g id="Layer_1-2" data-name="Layer 1">

                <motion.path
                    variants={icon}
                    initial="hidden"
                    animate="visible"
                    className="b"
                    d="m14.05,5.41v-1.98h-.69v7.49h.69v-2.88c.03-2.36.77-4.11,2.45-4.11.15,0,.4.03.57.09v-.69c-.15-.03-.36-.06-.54-.06-1.36,0-2.15.89-2.48,2.14Z" />
                <motion.path
                    variants={icon}
                    initial="hidden"
                    animate="visible"
                    d="m21.7,3.89c.48,0,1.37.09,2.23.72l.35-.5c-.98-.7-2.01-.85-2.6-.85v.02c-2.71,0-4.24,1.75-4.24,3.94.04,2.16,1.55,3.88,4.24,3.88.59,0,1.62-.16,2.6-.85l-.35-.5c-.86.61-1.75.72-2.23.72-2.21,0-3.5-1.43-3.55-3.29.03-1.86,1.35-3.29,3.55-3.29Z" />
                <motion.path
                    variants={icon}
                    initial="hidden"
                    animate="visible"
                    d="m32.48,5.29c-.53-1.21-1.72-2.04-3.23-2.04-2.39,0-3.87,1.71-3.87,3.9s1.55,3.93,3.85,3.93c1.48,0,2.71-.83,3.25-2.05v1.88h.69V3.42h-.69v1.87Zm.01,1.87c0,1.85-1.33,3.31-3.23,3.31s-3.17-1.51-3.17-3.31,1.21-3.28,3.16-3.28,3.25,1.48,3.25,3.28h-.01Z" />
                <motion.path
                    variants={icon}
                    initial="hidden"
                    animate="visible"
                    d="m42.26,5.29c-.53-1.21-1.72-2.04-3.23-2.04-2.39,0-3.87,1.71-3.87,3.9s1.55,3.93,3.85,3.93c1.48,0,2.71-.83,3.25-2.05v1.89h.69V0h-.69v5.29Zm.01,1.87c0,1.85-1.33,3.31-3.23,3.31s-3.17-1.51-3.17-3.31,1.21-3.28,3.16-3.28,3.25,1.48,3.25,3.28h-.01Z" />
                <motion.path
                    variants={icon}
                    initial="hidden"
                    animate="visible" d="m45.94.18c-.31,0-.54.24-.54.6s.23.6.54.6.54-.24.54-.6-.22-.6-.54-.6Z" />
                <rect className="b" x="45.61" y="3.43" width=".69" height="7.49" />
                <motion.path
                    variants={icon}
                    initial="hidden"
                    animate="visible"
                    d="m55.46,3.42v1.87c-.53-1.21-1.72-2.04-3.23-2.04-2.39,0-3.87,1.71-3.87,3.9s1.55,3.93,3.85,3.93c1.48,0,2.71-.83,3.25-2.05v1.88h.69V3.42h-.69Zm0,3.74c0,1.85-1.33,3.31-3.23,3.31s-3.17-1.51-3.17-3.31,1.21-3.28,3.16-3.28,3.25,1.48,3.25,3.28h-.01Z" />
                <motion.path
                    variants={icon}
                    initial="hidden"
                    animate="visible"
                    d="m0,10.89h1.46l.63-.96v.02c1.13-.6,2.4-.92,3.7-.92,1.86,0,3.64.65,5.02,1.83h.02s.02.03.02.03h1.41L6.49.9,0,10.89Zm5.79-3.08c-.88,0-1.75.14-2.58.38l3.22-4.95,3.11,5.38c-1.16-.53-2.43-.81-3.75-.81Z" />
            </g>

        </svg>

    )
}
