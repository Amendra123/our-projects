import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";

export const sidebarMenu = [
    // {
    //     title: 'Dashboard',
    //     icon: HomeOutlinedIcon,
    //     path: '/',
    // },
    {
        title: 'Info',
        tag: 'divider'
    },
    {
        title: 'Dashboard',
        icon: PeopleOutlinedIcon,
        path: '/',
    },
    // {
    //     title: 'ITEMS',
    //     icon: ContactsOutlinedIcon,
    //     path: '/items',
    // },
    {
        title: 'Contact Detail',
        icon: ReceiptOutlinedIcon,
        path: '/show',
    },

]