import { Avatar, Flex, HStack, Text, Image, Box, IconButton, Menu, MenuButton, MenuItem, MenuList, Center, Portal } from "@chakra-ui/react"
import { BiNotification } from 'react-icons/bi';
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { destroyUserSession, getLocalUserProfile } from "../../services/auth/auth.service";
import AdminRoutes from "../../pages/routes";
import { FiMaximize, FiMinimize } from "react-icons/fi";

const AdminDashboardHeader = ({ toggle, toggleFunct }: { toggle: boolean; toggleFunct: any }) => {
    const [user, setUserProfile] = useState<any>();
    const [isOpen, setIsOpen] = useState(false);
    const [messageCount, setMessageCount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useNavigate();
    let location = useLocation()
    const [ischangePassword, setIsChangePassword] = useState(false);
    const [isSetPin, setIsSetPin] = useState(false);
    const [isChangePin, setIsChangePin] = useState(false);
    const [isOpenProfile, setIsOpenProfile] = useState(false);

    useEffect(() => {
       const user = getLocalUserProfile()
       if(user) setUserProfile(user)
    }, [])
    const openSetPin = () => {
        setIsSetPin(true)
        setIsChangePin(false)
        setIsChangePassword(false)
        setIsOpenProfile(false)

    };
    const openChangePin = () => {
        setIsSetPin(false)
        setIsChangePin(true)
        setIsChangePassword(false)
        setIsOpenProfile(false)
    };
    const openChangePassword = async () => {
        setIsSetPin(false)
        setIsChangePin(false)
        setIsChangePassword(true)
        setIsOpenProfile(false)
    };
    useEffect(() => {
      
    }, []);


    const handleLogout = () => {
        destroyUserSession();
        router(AdminRoutes.Login);
    };

    return (

        <Box >
            <Box pr={12}>

                <Flex height="45px" bg="#FFFFFF" color='#616161' direction="row" mt='10px' alignItems="center" justifyContent="space-between" >
                    {
                        toggle ? <IconButton
                            variant="ghost"
                            mr={'20px'}
                            aria-label="bell"
                            borderRadius={20}
                            onClick={() => toggleFunct()}
                            icon={<FiMaximize fontSize={'18px'} color="#898989" />}
                        />
                            : <IconButton
                                variant="ghost"
                                mr={'20px'}
                                aria-label="bell"
                                borderRadius={20}
                                onClick={() => toggleFunct()}
                                icon={<FiMinimize fontSize={'18px'} color="#898989" />}
                            />

                    }
                    <HStack>
                        <IconButton
                            variant="ghost"
                            mr={'20px'}
                            aria-label="bell"
                            borderRadius={20}
                            onClick={() => setIsOpen(true)}
                            icon={<BiNotification fontSize={'24px'} color="#898989" />}
                        />
                        <Avatar
                            size="sm"
                            name={`${user?.firstName} ${user?.lastName}`}
                                                                  
                        />

                        <Menu>
                            <MenuButton>
                                <HStack fontSize={13}>
                                    <Flex direction="column" alignItems="flex-end">
                                        <Box>
                                            <Text fontSize={'14px'} color={'#202020'}>
                                                {" "}
                                                {`${user?.firstName} ${user?.lastName}`}
                                            </Text>
                                           
                                        </Box>
                                    </Flex>

                                </HStack>
                            </MenuButton>
                            <MenuList fontSize={13} borderRadius={0} color="brand.bodyText">
                                <MenuItem>
                                    <HStack fontSize={13}>
                                        <Avatar
                                            size="sm"
                                            name={`${user?.firstName} ${user?.lastName}`}

                                        />
                                        <Flex direction="column" alignItems="flex-end">
                                            <Box>
                                                <Text fontSize={'14px'} color={'#202020'}>
                                                    {" "}
                                                    {`${user?.firstName} ${user?.lastName}`}
                                                </Text>
                                              
                                            </Box>
                                        </Flex>

                                    </HStack>
                                </MenuItem>

                                <MenuItem fontSize={'14px'} onClick={() => setIsOpenProfile(true)} color={'#202020'}>Profile</MenuItem>  
                                <MenuItem fontSize={'14px'} onClick={() => 
                                openChangePassword()} color={'#202020'}>Change password</MenuItem>
                                <MenuItem fontSize={'14px'} color={'red'} onClick={() => handleLogout()}>Log out</MenuItem>
                            </MenuList>
                        </Menu>
                    </HStack>
                </Flex>

            </Box>
        
        </Box>

    )
}

export default AdminDashboardHeader;