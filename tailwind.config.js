/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            backgroundColor: {
                "dashboard-purple": "#73638a",
                "dashboard-blue": "#598fa9",
                "dashboard-red": "#cd6a66",
                "dashboard-green": "#02a34d",
            },
        },
    },
    plugins: [],
};
