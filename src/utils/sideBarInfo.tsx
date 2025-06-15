import { v } from "../styles/variables";
import {
  AiOutlineHome,
  AiOutlineApartment,
  AiOutlineSetting,
} from "react-icons/ai";
import { MdOutlineAnalytics } from "react-icons/md";
import { RiDashboard3Line } from "react-icons/ri";
import { TbPig } from "react-icons/tb";

export const AsieUser = [
  {
    text: "Profile",
    icono: v.iconoUser,
    tipo: "myProfile",
  },
  {
    text: "settings",
    icono: v.iconoSettings,
    tipo: "settings",
  },
  {
    text: "sign out",
    icono: v.iconoCerrarSesion,
    tipo: "singOut",
  },
];

export const DataAsideType = [
  {
    text: "Caterogies expenses",
    color: v.colorGastos,
    tipo: "e",
  },
  {
    text: "Categories incomes",
    color: v.colorIngresos,
    tipo: "i",
  },
];

//data SIDEBAR
export const LinksArray = [
  {
    label: "Home",
    icon: <AiOutlineHome />,
    to: "/",
  },
  {
    label: "Categories",
    icon: <MdOutlineAnalytics />,
    to: "/categories",
  },
  {
    label: "movements",
    icon: <AiOutlineApartment />,
    to: "/movements",
  },
  {
    label: "reports",
    icon: <MdOutlineAnalytics />,
    to: "/reports",
  },
  {
    label: "Dashboard",
    icon: <RiDashboard3Line />,
    to: "/dashboard",
  },
];
export const SecondarylinksArray = [
  {
    label: "settings",
    icon: <AiOutlineSetting />,
    to: "/settings",
  },
  {
    label: "About",
    icon: <TbPig />,
    to: "/about",
  },
];
//themes
export const ThemeData = [
  {
    icono: "🌞",
    descripcion: "light",
  },
  {
    icono: "🌚",
    descripcion: "dark",
  },
];
