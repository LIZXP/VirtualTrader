import { useState } from "react";
import { Box, Button, Checkbox, FormControl, FormControlLabel, InputAdornment, InputLabel, OutlinedInput, TextField, Typography, Link } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "../../assets/image.png";
import GoogleSvg from "../../assets/googleIcon.svg";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Box display="flex" height="100vh">
            <Box
                flexGrow={1}
                display={{ xs: 'none', md: 'flex' }}
                justifyContent="center"
                alignItems="center"
                bgcolor="#E9E9E9"
            >
                <img src={Image} alt="" style={{ width: '400px' }} />
            </Box>
            <Box flexGrow={1} display="flex" justifyContent="center" alignItems="center">
                <Box width="80%" mx="auto" display="flex" flexDirection="column" justifyContent="center" height="100%">
                    <Box textAlign="center" mb={4}>
                        <Typography variant="h2" component="h2" gutterBottom>
                            Welcome back!
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
                            label="Email"
                            type="email"
                        />
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
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
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <FormControlLabel control={<Checkbox />} label="Remember for 30 days" />
                            <Link href="#" underline="hover" variant="body2">
                                Forgot password?
                            </Link>
                        </Box>
                        <Box display="flex" flexDirection="column" gap={2} mb={2}>
                            <Button fullWidth variant="contained" color="primary">
                                Log In
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<img src={GoogleSvg} alt="Google" style={{ width: '24px' }} />}
                            >
                                Log In with Google
                            </Button>
                        </Box>
                    </form>
                    <Typography textAlign="center" variant="body2">
                        Don’t have an account? <Link href="#">Sign Up</Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginPage;