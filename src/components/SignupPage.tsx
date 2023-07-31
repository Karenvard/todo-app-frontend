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
    const { error } = useTypedSelector(state => state);
    function onSignup() {
        if (userForm.isChecked) {
            dispatch(Thunks.signup({...userForm}));
        }
    }
    return (
        <Container>
            <Form>
                <TextField
                    sx={TextFieldSxProp}
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
                    sx={TextFieldSxProp}
                    id="input-with-icon-textfield"
                    label="Email"
                    variant="outlined"
                    required
                    onChange={e => setUserForm(prev => ({...prev, email: e.target.value}))}
                    error={error.type === "email" ? true : false}
                    helperText={error.type === "email" ? error.message : null}
                />
                <TextField
                    sx={TextFieldSxProp}
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
                <SignupBtn style={{cursor: userForm.isChecked ? "pointer" : "default"}} disabled={!userForm.isChecked} onClick={onSignup}>Sign up</SignupBtn>
            </Form>
        </Container>
    );
}

export default SignupPage;