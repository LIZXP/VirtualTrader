import { useState } from "react";
import { Box, Button, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField, Typography, Link } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AuthPicture from "../../assets/AuthPicture.svg";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfigFrontend";
import CircularWithResultMessage from "../BaseComponents/CircularWithResultMessage";
import SetLoadingAndResultMessage from "../../customHooks/SetLoadingAndResultMessage";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [createUserModel, SetCreateUserModel] = useState({
        firstname: '',
        lastname: '',
        useremail: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        firstnameError: "",
        lastnameError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: "",
    });

    const { isLoading, setIsLoading, resultMessageModel, setResultMessageModel } = SetLoadingAndResultMessage()

    const navigate = useNavigate();

    const emailValidation = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email)
    }

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const validateConfirmPassword = (password, confirmPassword) => {
        return password === confirmPassword;
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setResultMessageModel({
            boolResult: true,
            resultMessage: ""
        });

        SetCreateUserModel((prev) => ({
            ...prev,
            [name]: value
        }))

        switch (name) {
            case "firstname":
                setErrors((prev) => ({
                    ...prev,
                    firstnameError: value ? "" : "First name is required"
                }));
                break;
            case "lastname":
                setErrors((prev) => ({
                    ...prev,
                    lastnameError: value ? "" : "Last name is required"
                }));
                break;
            case "useremail":
                setErrors((prev) => ({
                    ...prev,
                    emailError: emailValidation(value) ? "" : "Invalid email format"
                }));
                break;
            case "password":
                setErrors((prev) => ({
                    ...prev,
                    passwordError: validatePassword(value) ? "" : "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character, and be at least 8 characters long",
                    confirmPasswordError: validateConfirmPassword(value, createUserModel.confirmPassword) ? "" : "Passwords do not match"
                }));
                break;
            case "confirmPassword":
                setErrors((prev) => ({
                    ...prev,
                    confirmPasswordError: validateConfirmPassword(createUserModel.password, value) ? "" : "Passwords do not match"
                }));
                break;
            default:
                break;
        }
    }

    const createUser = () => {
        const auth = getAuth();
        if (Object.values(errors).some((value) => { return value !== "" })) {
            setResultMessageModel({
                boolResult: false,
                resultMessage: "Please fix all the fields before submit"
            });
            return;
        } else {
            setIsLoading(true);
            createUserWithEmailAndPassword(auth, createUserModel.useremail, createUserModel.confirmPassword)
                .then(userCredential => {
                    const uid = userCredential.user.uid
                    const userDocRef = doc(db, "user", uid)

                    setDoc(userDocRef, {
                        firstname: createUserModel.firstname,
                        lastname: createUserModel.lastname,
                        email: createUserModel.useremail
                    })
                })
                .catch(e => {
                    setResultMessageModel({
                        boolResult: false,
                        resultMessage: e.message
                    });
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }

    return (
        <Box display="flex" height="100vh">
            <Box
                flex="1 1 50%"
                display={{ xs: 'none', md: 'flex' }}
                justifyContent="center"
                alignItems="center"
                bgcolor="#E9E9E9"
            >
                <img src={AuthPicture} alt="" style={{ width: '400px' }} />
            </Box>
            <Box
                flex={{ xs: '1 1 100%', md: '1 1 50%' }}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Box width="80%" mx="auto" display="flex" flexDirection="column" justifyContent="center" height="100%">
                    <Box textAlign="center" mb={4}>
                        <Typography variant="h2" component="h2" gutterBottom>
                            Welcome to our website!
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Please enter your details
                        </Typography>
                    </Box>
                    <form>
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            label="FirstName"
                            type="text"
                            name="firstname"
                            value={createUserModel.firstname}
                            error={!!errors.firstnameError}
                            helperText={errors.firstnameError}
                            required
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            label="Lastname"
                            type="text"
                            name="lastname"
                            value={createUserModel.lastname}
                            error={!!errors.lastnameError}
                            helperText={errors.lastnameError}
                            required
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            label="Email"
                            type="email"
                            name="useremail"
                            value={createUserModel.useremail}
                            error={!!errors.emailError}
                            helperText={errors.emailError}
                            required
                            onChange={handleInputChange}
                        />
                        <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.passwordError}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={createUserModel.password}
                                required
                                endAdornment={
                                    <InputAdornment position="end">
                                        {showPassword ? (
                                            <VisibilityOff onClick={handleClickShowPassword} style={{ cursor: 'pointer' }} />
                                        ) : (
                                            <Visibility onClick={handleClickShowPassword} style={{ cursor: 'pointer' }} />
                                        )}
                                    </InputAdornment>
                                }
                                label="Password"
                                onChange={handleInputChange}
                            />
                            <Typography variant="caption" color="error">{errors.passwordError}</Typography>
                        </FormControl>
                        <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.confirmPasswordError}>
                            <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                            <OutlinedInput
                                id="confirm-password"
                                type={showPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                required
                                value={createUserModel.confirmPassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        {showPassword ? (
                                            <VisibilityOff onClick={handleClickShowPassword} style={{ cursor: 'pointer' }} />
                                        ) : (
                                            <Visibility onClick={handleClickShowPassword} style={{ cursor: 'pointer' }} />
                                        )}
                                    </InputAdornment>
                                }
                                label="Confirm Password"
                                onChange={handleInputChange}
                            />
                            <Typography variant="caption" color="error">{errors.confirmPasswordError}</Typography>
                        </FormControl>
                        <Box display="flex" flexDirection="column" gap={2} mb={2}>
                            <Button fullWidth variant="contained" color="primary" onClick={createUser}>
                                Sign Up
                            </Button>
                        </Box>
                        <Box display="flex" justifyContent="center" paddingBottom="10px">
                            <CircularWithResultMessage isLoadingProp={isLoading} boolResultProp={resultMessageModel.boolResult} resultMessageProp={resultMessageModel.resultMessage} />
                        </Box >
                    </form>
                    <Typography textAlign="center" variant="body2">
                        Already have an account? <Link component={RouterLink} to="/login">Login</Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default SignUpPage;
