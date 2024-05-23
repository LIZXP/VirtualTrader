import { useState } from "react";
import { Box, Button, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField, Typography, Link } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AuthPicture from "../../assets/AuthPicture.svg";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

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
                            label="Name"
                            type="text"
                            name="name"
                            required
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            label="Lastname"
                            type="text"
                            name="lastname"
                            required
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            label="Email"
                            type="email"
                            name="email"
                            required
                        />
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
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
                            />
                        </FormControl>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                            <OutlinedInput
                                id="confirm-password"
                                type={showPassword ? 'text' : 'password'}
                                name="confirmPassword"
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
                                label="Confirm Password"
                            />
                        </FormControl>
                        <Box display="flex" flexDirection="column" gap={2} mb={2}>
                            <Button fullWidth variant="contained" color="primary">
                                Sign Up
                            </Button>
                        </Box>
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
