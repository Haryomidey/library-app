import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, Portal } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminDashboardHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { useEffect, useRef, useState } from "react";

import { destroyUserSession, getAuthToken, getRefreshToken } from "../../services/auth/auth.service";
import AdminRoutes from "../../pages/routes";
import { Timeout } from "react-number-format/types/types";


export const AdminContainer = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const router = useNavigate()
    const [token, setToken] = useState('')
    const [refreshToken, setRefreshToken] = useState('')
    const [logoutTimer, setLogoutTimer] = useState<any>(null);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const [isOpenAlert, setIsOpen] = useState(false);
    const onCloseAlert = () => setIsOpen(false);
    const [userActive, setUserActive] = useState(true); // Initially assume the user is active
   
    const [refreshTimer, setRefreshTimer] = useState<NodeJS.Timeout | null>(null);
    const [isRefresh, setIsRefresh] = useState<boolean>(false);
    useEffect(() => {
        // Initialize the refresh token timer when the component mounts
        startRefreshTimer();
        const getToken = getAuthToken()
        if (getToken) setToken(getToken)
        const getrefresh = getRefreshToken()
        if (getrefresh) setRefreshToken(getrefresh)
        // Attach event listeners to track user activity
        window.addEventListener('mousemove', handleUserActivity);
        window.addEventListener('keydown', handleUserActivity);

        // Clean up the event listeners when the component unmounts
        return () => {
            window.removeEventListener('mousemove', handleUserActivity);
            window.removeEventListener('keydown', handleUserActivity);

            // Clear the refresh timer when the component unmounts
            if (refreshTimer) {
                clearInterval(refreshTimer);
                setIsRefresh(!isRefresh)
            }
        };
    }, [isRefresh]);
    const handleLogout = () => {
        destroyUserSession();
        router(AdminRoutes.Login);
    };
    const handleUserActivity = () => {
        setUserActive(!userActive);

        // Reset the refresh timer on user activity
        resetRefreshTimer();
    };

    const startRefreshTimer = () => {
        const timer = setInterval(async () => {
            // Implement your token refresh logic here
          
        }, 5 * 60 * 1000); // 5 minutes in milliseconds

        setRefreshTimer(timer);
    };

    const resetRefreshTimer = () => {
        // Clear the existing refresh timer and start a new one
        if (refreshTimer) {
            clearInterval(refreshTimer);
            setIsRefresh(!isRefresh)
        }
        startRefreshTimer();
    };

    useEffect(() => {
        // Initialize the logout timer when the component mounts
        const logoutTimer = setTimeout(() => {
            // Implement your logout logic here
            // This function will run after 5 minutes of inactivity
            handleLogout()
            // Log the user out or show a modal prompting them to stay logged in
        }, 5 * 60 * 1000); // 5 minutes in milliseconds

        return () => {
            clearTimeout(logoutTimer);
        };
    }, [userActive]);


    return (

        <>

            <Flex className="adminCont">
                <Box className="AdminSideBar" w={sidebarOpen ? '18%' : '0%'} display={sidebarOpen ? 'block' : 'none'} position='fixed' top='0' left='0' zIndex='1'>
                    <AdminSidebar />
                </Box>
                <Box className="AdminContent" width={sidebarOpen ? '82%' : '100%'} ml={sidebarOpen ? '18%' : '0%'} >
                    <AdminDashboardHeader toggleFunct={toggleSidebar} toggle={sidebarOpen} />
                    <Box bg='rgba(22, 120, 13, 0.03);' minHeight='90vh' height='auto' pb='1rem' pt='30px' pl='40px' pr='40px'>
                        <Outlet />
                    </Box>

                </Box>
            </Flex>
        </>
    );
};
