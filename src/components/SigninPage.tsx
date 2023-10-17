import { styled } from '@mui/system';
import { FC, useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import { Checkbox, FormControlLabel, TextField, useMediaQuery } from '@mui/material';
import { useTypedDispatch, useTypedSelector } from '../utils/hooks';
import { Thunks } from '../store/thunks';

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
    height: "50vh",
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

const SigninBtn = styled("button")({
    backgroundColor: "var(--primary-button)",
    width: "10vw",
    height: "7vh",
    borderStyle: "solid",
    borderWidth: "0",
    borderRadius: "10px",
    fontFamily: "'Encode Sans', sans-serif",
    fontSize: "2em",
    marginTop: "4vh",
    fontWeight: "500",
    cursor: "pointer"
})


const SignupPage: FC = () => {
    const TextFieldSxProp = { color: "var(--text)", width: "15vw", margin: "1vh" };
    const [userForm, setUserForm] = useState<{login: string, password: string, rememberMe: boolean}>({login: "", password: "", rememberMe: false});
    const dispatch = useTypedDispatch();
    const { error } = useTypedSelector(state => state);
    function onSignin() {
        dispatch(Thunks.signin({...userForm}));
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
            return {width: "15vw", margin: "1vh", color: "var(--text)"}
        }
        return {width, margin: "1vh", color: "var(--text)"}
    }
    return (
        <Container>
            <Form style={formResponsive()}>
                <TextField
                    sx={fieldResponsive()}
                    id="input-with-icon-textfield"
                    label="Username or email"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                    onChange={e => setUserForm(prev => ({...prev, login: e.target.value}))}
                    variant="outlined"
                    required
                    error={error.type === "signin-field" ? true : false}
                    helperText={error.type === "signin-field" ? error.message : null}
                />
                <TextField
                    sx={fieldResponsive()}
                    id="input-with-icon-textfield"
                    label="Password"
                    variant="outlined"
                    type="password"
                    required
                    onChange={e => setUserForm(prev => ({...prev, password: e.target.value}))}
                    error={error.type === "signin-field" ? true : false}
                    helperText={error.type === "signin-field" ? error.message : null}
                />
                <FormControlLabel sx={{marginTop: "1.3vh"}} control={<Checkbox checked={userForm.rememberMe} onChange={e => setUserForm(prev => ({...prev, rememberMe: e.target.checked}))} defaultChecked />} label="Remember me" />

                <SigninBtn style={signBtnResponsive()} onClick={onSignin}>Sign in</SigninBtn>
            </Form>
        </Container>
    );
}

export default SignupPage;
