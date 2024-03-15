import { ArrowRight, Loader2, LogIn } from "lucide-react";
import {
    BsMoonStars,
    BsSun,
    BsChevronLeft,
    BsChevronRight,
    BsChevronUp,
    BsChevronDown,
    BsActivity,
    BsFire,
    BsCheck2,
} from "react-icons/bs"
import {
    AiOutlineEllipsis,
    AiOutlineWarning,
    AiOutlinePlus,
    AiOutlineClose,

} from "react-icons/ai"
import { MdDeleteForever, MdOutlineLogout } from "react-icons/md"
import { BiHistory, BiCalendar } from "react-icons/bi"
import { FaUserAlt, FaSort } from "react-icons/fa"
import { ImSpinner8, ImStatsBars } from "react-icons/im"
import { RxMixerHorizontal, RxUpload } from "react-icons/rx"
import { LuSettings } from "react-icons/lu"
import { BsFillLightningChargeFill } from "react-icons/bs";
import { IoLogoBitbucket } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";



export type IconKeys = keyof typeof icons

type IconsType = {
    [key in IconKeys]: React.ElementType
}

const icons = {
    login: LogIn,
    loader: Loader2,
    //arrow
    right: ArrowRight,
    next: BsChevronRight,
    dashboard: MdSpaceDashboard,
    activity: BsActivity,
    settings: LuSettings,

    // Mode Toggle
    moon: BsMoonStars,
    sun: BsSun,

    // Navigation
    back: BsChevronLeft,

    up: BsChevronUp,
    down: BsChevronDown,
    close: AiOutlineClose,

    // Common
    trash: MdDeleteForever,
    spinner: ImSpinner8,
    userAlt: FaUserAlt,
    ellipsis: AiOutlineEllipsis,
    warning: AiOutlineWarning,
    add: AiOutlinePlus,
    history: BiHistory,
    signout: MdOutlineLogout,
    calendar: BiCalendar,
    sort: FaSort,
    fire: BsFire,
    statsBar: ImStatsBars,
    mixer: RxMixerHorizontal,
    check: BsCheck2,
    upload: RxUpload,
    lightning: BsFillLightningChargeFill,
    bucket: IoLogoBitbucket
}

export const Icons: IconsType = icons;

