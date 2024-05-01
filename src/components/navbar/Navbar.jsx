import { useEffect } from "react"
import { APP_NAME } from "../../utils/constants";
import useThemeSelector from "../../zustand/useThemeSelector";
import map from "../map/Map";

const Navbar = () => {

    const { isDark, setIsDark } = useThemeSelector();

    useEffect(() => {

        localStorage.setItem('isDark', JSON.stringify(isDark));
        document.documentElement.removeAttribute('data-theme');

        const dark = document.querySelector("#arcgis-maps-sdk-theme-dark");
        const light = document.querySelector("#arcgis-maps-sdk-theme-light");
        const widgets = document.getElementsByClassName("esri-ui");

        if (('isDark' in localStorage)) {
            if (localStorage.isDark === 'true' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                localStorage.setItem('isDark', JSON.stringify(true));
                document.documentElement.setAttribute('data-theme', 'dark');
                light.disabled = true;
                dark.disabled = false;
                map.basemap = dark.disabled ? "gray-vector" : "dark-gray-vector";
            } else if (localStorage.isDark === 'true' && window.matchMedia('(prefers-color-scheme: light)').matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
                light.disabled = true;
                dark.disabled = false;
                map.basemap = dark.disabled ? "gray-vector" : "dark-gray-vector";
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                light.disabled = false;
                dark.disabled = true;
                map.basemap = dark.disabled ? "gray-vector" : "dark-gray-vector";
            }

            for (let i = 0; i < widgets.length; i++) {
                widgets.item(i).classList.toggle("calcite-mode-dark");
            }
        }

    }, [isDark]);

    return (
        <div className="navbar bg-base-100 border-b border-neutral-content">
            <div className="flex-1">
                <a className="btn btn-link text-xl no-underline hover:no-underline text-opacity-90">{APP_NAME}</a>
            </div>
            <div className="navbar-end">
                <div className="mr-2">
                    <label className="swap swap-rotate">

                        {/* this hidden checkbox controls the state */}
                        <input type="checkbox" className="theme-controller" value="synthwave" checked={isDark} onChange={() => setIsDark(!isDark)} />
                        <svg className="swap-off fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                        {/* sun icon */}
                        <svg className="swap-on fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                    </label>
                </div>
            </div>
        </div>
    )
}

export default Navbar