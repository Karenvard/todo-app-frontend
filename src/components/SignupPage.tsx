import { styled } from '@mui/system';
import { FC, useEffect, useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import { Checkbox, FormControlLabel, TextField, useMediaQuery } from '@mui/material';
import { useTypedDispatch, useTypedSelector } from '../utils/hooks';
import { Thunks } from '../store/thunks';
import { useNavigate } from 'react-router-dom';

const Container = styled("div")({
    width: "100vw",
    height: "90vh",
    backgroundColor: "var(--background)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "var(--text)"
})

const Form = styled("div")({
    backgroundColor: "var(--accent)",
    width: "30vw",
    height: "55vh",
    position: "relative",
    bottom: "4vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "solid",
    borderWidth: "0",
    borderRadius: "50px"
})

const SignupBtn = styled("button")({
    backgroundColor: "var(--primary-button)",
    width: "10vw",
    height: "7vh",
    borderStyle: "solid",
    borderWidth: "0",
    borderRadius: "10px",
    fontFamily: "'Encode Sans', sans-serif",
    fontSize: "2em",
    marginTop: "4vh",
    fontWeight: "500"
})


const SignupPage: FC = () => {
    const TextFieldSxProp = { color: "var(--text)", width: "15vw", margin: "1vh" };
    const [userForm, setUserForm] = useState<{username: string, email: string, password: string, isChecked: boolean}>({username: "", email: "", password: "", isChecked: false});
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();
    const { error, signupSuccess } = useTypedSelector(state => state);

    useEffect(() => {
        if (signupSuccess) {
            navigate("/signin");
        }
    }, [signupSuccess])

    function onSignup() {
        if (userForm.isChecked) {
            dispatch(Thunks.signup({...userForm}));
        }
    }

    const devicesWidth = {
        1124: useMediaQuery("(max-width:1124px)"),
        900: useMediaQuery("(max-width:900px)")
    }
    const signBtnResponsive = () => {
        let fontSize: string = "";
        let width: string = "";
        if (devicesWidth[900]) {
            fontSize = "1em";
            width = "162px";
        } else if (devicesWidth[1124]) {
            fontSize = "1em";
        } else {
            return {}
        }
        return {fontSize, width}
    }
    const formResponsive = () => {
        let width: string = "";
        if (devicesWidth[900]) {
            width = "270px"
        } else {
            return {}
        }
        return {width}
    }
    const fieldResponsive = () => {
        let width: string = "";
        if (devicesWidth[900]) {
            width = "162px";
        } else {
            return {margin: "1vh", width: "15vw", color: "var(--text)"}
        }
        return {width, margin: "1vh", color: "var(--text)"}
    }
    return (
        <Container>
            <Form style={formResponsive()}>
                <TextField
                    sx={fieldResponsive()}
                    id="input-with-icon-textfield"
                    label="Username"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                    onChange={e => setUserForm(prev => ({...prev, username: e.target.value}))}
                    variant="outlined"
                    required
                    error={error.type === "username" ? true : false}
                    helperText={error.type === "username" ? error.message : null}
                />
                <TextField
                    sx={fieldResponsive()}
                    id="input-with-icon-textfield"
                    label="Email"
                    variant="outlined"
                    required
                    onChange={e => setUserForm(prev => ({...prev, email: e.target.value}))}
                    error={error.type === "email" ? true : false}
                    helperText={error.type === "email" ? error.message : null}
                />
                <TextField
                    sx={fieldResponsive()}
                    id="input-with-icon-textfield"
                    label="Password"
                    variant="outlined"
                    type="password"
                    required
                    onChange={e => setUserForm(prev => ({...prev, password: e.target.value}))}
                    error={error.type === "password" ? true : false}
                    helperText={error.type === "password" ? error.message : null}
                />
                <FormControlLabel sx={{marginTop: "1vh"}} control={<Checkbox checked={userForm.isChecked} onChange={e => setUserForm(prev => ({...prev, isChecked: e.target.checked}))} defaultChecked />} label="I agree the privacy policy." />
                <SignupBtn style={signBtnResponsive()} disabled={!userForm.isChecked} onClick={onSignup}>Sign up</SignupBtn>
            </Form>
        </Container>
    );
}

export default SignupPage;
