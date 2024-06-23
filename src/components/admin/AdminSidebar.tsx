import { useEffect, useState } from "react";
import {
  Avatar,
  AvatarBadge,
  Box,
  Collapse,
  Flex,
  HStack,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../img/logo.png";

import { MdDashboard, MdKeyboardArrowDown } from "react-icons/md";
import { BsBook, BsBriefcase, BsClipboard, BsCreditCard, BsCreditCard2Front, BsFillGiftFill, BsLayoutTextSidebar, BsWallet } from "react-icons/bs";
import AdminRoutes from "../../pages/routes";
import { BiSolidDetail, BiUser } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";

const AdminSidebar = () => {
  let location = useLocation();
  const { isOpen: isOpenBoard, onToggle: onToggleBoard } = useDisclosure();
  const { isOpen: isOpenGift, onToggle: onToggleGift } = useDisclosure();


  useEffect(() => {
    const userLogged = sessionStorage.getItem('UserFromToken')
    if (userLogged) {
      const parsedUser = JSON.parse(userLogged)
    }
  }, []);

  const activeLink = (link: string) => {
    let style = {

      bgColor: "081C4D",
      textColor: "#D6D6D6",
    };

    if (link === location.pathname) {

      style.bgColor = "#FAFAFA";
      style.textColor = "#081C4D";
    }

    return style;
  };

  return (
    <Box
      bg="#081C4D"
      px="10px"
      borderRight="1px solid"
      minH="100vh"
      borderColor="lightgray"
    >
      <Flex ml="5px" pt="15px" mb="25px" alignItems="center">
        <Box as="span" height={'36px'} width={'99px'}>
          <Image src={logo} height="36px" />
        </Box>
      </Flex>

      <HStack pl={'10px'} spacing="10px" bg={activeLink(AdminRoutes.portal.dashboard).bgColor}
        color={activeLink(AdminRoutes.portal.dashboard).textColor}
        mb="7px">
        <Box as="span" pb="3px">
          <RiAdminLine />
        </Box>
        <Box
          mb='3px' mt='4px'
          pb="5px"
          pt={'2px'}
          fontSize="13px"
          width="100%"
        >
          <Link to={AdminRoutes.portal.dashboard}>Users</Link>
        </Box>
      </HStack>
      <HStack pl={'10px'} spacing="10px" bg={activeLink(AdminRoutes.portal.clients).bgColor}
        color={activeLink(AdminRoutes.portal.clients).textColor}
        mb="7px">
        <Box as="span" pb="3px">
          <FaUsers />
        </Box>
        <Box
          mb='3px' mt='4px'
          pb="5px"
          pt={'2px'}

          fontSize="13px"
          width="100%"
        >
          <Link to={AdminRoutes.portal.clients}>Clients</Link>
        </Box>
      </HStack>

      <Box>
        <HStack pl={'10px'} cursor={'pointer'} spacing={'30px'} mb='5px' onClick={onToggleBoard} color={'#9F9C9C'} borderColor={'lightgray'} pt={'10px'} fontSize={'14px'}>
          <Flex alignItems={'center'}>
            <Box as="span" pb="3px">
              <BsCreditCard color={'white'} />
            </Box>
            <Text color={'white'} fontSize={'13px'} ml={'10px'} >
              Cards Management
            </Text>

          </Flex>
          <Box as="span">
            {" "}
            <MdKeyboardArrowDown fontSize={18} />
          </Box>
        </HStack>
        <Collapse in={isOpenBoard}>
          <HStack pl={'30px'} spacing="10px" bg={activeLink(AdminRoutes.portal.cards).bgColor}
            color={activeLink(AdminRoutes.portal.cards).textColor} mb="7px">
            <Box as="span" pb="3px">
              <BsCreditCard />
            </Box>
            <Box
              mb='3px' mt='4px'
              pb="5px"
              pt={'2px'}
              fontSize="12px"
              width="100%"

            >
              <Link to={AdminRoutes.portal.cards}>Cards </Link>
            </Box>
          </HStack>
          <HStack pl={'30px'} spacing="10px" bg={activeLink(AdminRoutes.portal.cardsType).bgColor}
            color={activeLink(AdminRoutes.portal.cardsType).textColor} mb="7px">
            <Box as="span" pb="3px">
              <BsCreditCard2Front />
            </Box>
            <Box
              mb='3px' mt='4px'
              pb="5px"
              pt={'2px'}
              fontSize="12px"
              width="100%"

            >
              <Link to={AdminRoutes.portal.cardsType}>Cards  Type</Link>
            </Box>
          </HStack>
          <HStack pl={'30px'} spacing="10px" bg={activeLink(AdminRoutes.portal.giftCard).bgColor}
            color={activeLink(AdminRoutes.portal.giftCard).textColor} mb="7px">
            <Box as="span" pb="3px">
              <BsFillGiftFill />
            </Box>
            <Box
              mb='3px' mt='4px'
              pb="5px"
              pt={'2px'}
              fontSize="12px"
              width="100%"
            >
              <Link to={AdminRoutes.portal.giftCard}>Gift Cards</Link>
            </Box>
          </HStack>
        </Collapse>
      </Box>
    
      <HStack pl={'10px'} spacing="10px" bg={activeLink(AdminRoutes.portal.roles).bgColor}
        color={activeLink(AdminRoutes.portal.roles).textColor}
        mb="7px">
        <Box as="span" pb="3px">
          <BsLayoutTextSidebar />
        </Box>
        <Box
          mb='3px' mt='4px'
          pb="5px"
          pt={'2px'}
          fontSize="13px"
          width="100%"
        >
          <Link to={AdminRoutes.portal.roles}>Roles</Link>
        </Box>
      </HStack>









    </Box>
  );
};

export default AdminSidebar;
