import { styled } from '@mui/system';
import { FC, useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
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
    return (
        <Container>
            <Form>
                <TextField
                    sx={TextFieldSxProp}
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
                    sx={TextFieldSxProp}
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

                <SigninBtn onClick={onSignin}>Sign in</SigninBtn>
            </Form>
        </Container>
    );
}

export default SignupPage;