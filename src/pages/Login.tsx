import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  Text,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
  Link,
  HStack,
  Image,
  Stack,
  InputRightElement,
  Portal
} from "@chakra-ui/react";
import leftbg from "../img/leftLoginBackground.png";
import rightBg from "../img/rightLoginBackground.png";
import loginlogo from "../img/loginLogo.png";
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import authService from "../services/auth/auth.service";
import AdminRoutes from "./routes";
import { useFormik } from "formik";
import { LoginUser } from "../components/admin/AdminControllers";
import { FaSpinner } from "react-icons/fa";
import BackgroundImageWrapper from "../components/BackgroundImageWrapper";
const Login = () => {
  const route = useNavigate();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [isGenerate, setisGenerate] = useState(false);
  const [parameter, setParameter] = useState<any>();
  const handleClick = () => setShow(!show);

  const openGenerateCodeModal = (userId: string) => {
    setParameter(userId);
    setisGenerate(true);
  };
  const validate = (values: any) => {
    const errors: any = {};
    if (!values.email) {
      errors.email = "email is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validate,
    onSubmit: async (values) => {
      try {
        const data = {
          email: values.email,
          password: values.password
        };

        const login_user: any = await authService.login(data);

        if (login_user.statusCode === 200) {
          route(AdminRoutes.portal.dashboard);
          sessionStorage.setItem("card_user_token", login_user.data.token);
          sessionStorage.setItem(
            "card_user_user",
            JSON.stringify(login_user.data.details)
          );
          toast({
            title: "Login",
            description: `user successfully logged in`,
            status: "success"
          });
        } else if (login_user.statusCode == 230) {
          openGenerateCodeModal("");
        } else {
          toast({
            title: "Login",
            description: `${login_user.error}`,
            status: "error"
          });
        }
      } catch (error: any) {
        toast({
          title: "Login",
          description: `${error}`,
          status: "error"
        });
      }
    }
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoader(true);
    try {
      const data = await LoginUser({ email, password });
      Cookies.set("token", JSON.stringify(data.token));
      Cookies.set("user", JSON.stringify(data.user));
      
     
      const token = getToken();
      
      Swal.fire({
        title: "Login Successful",
        icon: "success",
        timer: 4000
      });
      data.user.role === "admin" && route("/admin");
      data.user.role === "teacher" && route("/teacher");
      data.user.role === "student" && route("/student");
    } catch (error: any) {
      Swal.fire({
        title: "Login Error",
        icon: "error",
        text: error.message,
        timer: 4000
      });
    }
    setLoader(false);
  };
  
  const getToken = () => {
    const token = Cookies.get('token');
    if (token) {
      return JSON.parse(token);
    } else {
      return '';
    }
  };
  

  return (
    <>
      <Box position={"relative"} width={"100%"} height={"100vh"}>
        
        <BackgroundImageWrapper />
        
        <Box
          position={"absolute"}
          top={"50%"}
          className="transform"
          left={"50%"}
          zIndex={"2"}
          px={'10px'}
        >
          <Flex justifyContent={"center"}>
            <Image width={"140px"} src={loginlogo} />
          </Flex>
          <Box
            boxShadow={"0px 4px 64px 0px rgba(0, 0, 0, 0.10)"}
            border={"1px solid"}
            borderColor={"rgba(25, 47, 89, 0.20)"}
            borderRadius={"75px"}
            bg={"white"}
            pt={"30px"}
            pb={"40px"}
            px={"60px"}
          >
            <Text
              mb={"25px"}
              fontWeight={"700"}
              fontSize={"20px"}
              color={"#3C3C3C"}
            >
              Welcome to Fountain Library
            </Text>
            <form onSubmit={handleSubmit}>
              <FormControl
                mb="15px"
                className="space-y-2 [&>*]:block"
                isInvalid={
                  formik.errors.email && formik.touched.email ? true : false
                }
              >
                <label className="text-[#3C3C3C]" htmlFor="email">
                  Email
                </label>
                <Input
                  w={["300px", "300px", "300px", "300px"]}
                  type="email"
                  id="email"
                  autoComplete="true"
                  required
                  className="py-2 px-4"
                  name="email"
                  bg={"#FDFCD6"}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  // onChange={formik.handleChange}
                  fontSize={14}
                />

                <FormErrorMessage fontSize={12}>
                  {formik.errors.email}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  formik.errors.password && formik.touched.password
                    ? true
                    : false
                }
              >
                <label className="text-[#3C3C3C]" htmlFor="password">
                  Password
                </label>
                <InputGroup>
                  {/* <InputLeftElement
                      color="#3C3C3C"
                      pointerEvents="none"
                      children={<MdLock />}
                    /> */}
                  <Input
                    w={["100%", "100%", "300px", "300px"]}
                    type={show ? "text" : "password"}
                    name="password"
                    autoComplete="true"
                    id="password"
                    required
                    className="py-2 px-4"
                    bg={"#FDFCD6"}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter  password"
                    // onChange={formik.handleChange}
                    fontSize={14}
                  />
                  <InputRightElement width="4.5rem">
                    <Center
                      cursor={"pointer"}
                      h="1.75rem"
                      onClick={handleClick}
                    >
                      {show ? <BiHide /> : <BiShow />}
                    </Center>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage fontSize={12}>
                  {formik.errors.password}
                </FormErrorMessage>
              </FormControl>
              <Flex justifyContent={"flex-start"} mb={"25px"} mt={"10px"}>
                <Center>
                  <Box
                    mb={2}
                    fontWeight={"600"}
                    alignSelf="center"
                    color="#4F4C4C"
                    fontSize={"13px"}
                  >
                    <Link
                      onClick={() => {
                        route(AdminRoutes.forgotPassword);
                      }}
                    >
                      Forgot Password? Contact your school librarian.
                    </Link>
                  </Box>
                </Center>
              </Flex>

              <Stack spacing="12px">
                <Button
                  cursor="pointer"
                  w="100%"
                  color={"white"}
                  bg={"#5629DF"}
                  type="submit"
                  className="px-4 py-2"
                  isLoading={formik.isSubmitting}
                  fontSize={14}
                >
                  {loader ? <FaSpinner className="animate-spin" /> : "Login"}
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
