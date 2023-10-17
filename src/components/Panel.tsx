import { styled } from '@mui/system';
import { FC } from 'react';
import { useTypedDispatch, useTypedSelector } from '../utils/hooks';
import { useNavigate } from 'react-router-dom';
import { Actions } from '../store/reducer';
import { useMediaQuery } from '@mui/material';

const Container = styled("div")({
    width: "100vw",
    height: "10vh",
    backgroundColor: "var(--accent)",
    display: "flex",
    flexDirection: "row",
    position: "relative",
    justifyContent: "space-between",
    alignItems: "center"
})

const SignContainer = styled("div")({
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginLeft: "1vw"
})

const SignUpInOutBtn = styled("button")({
    cursor: "pointer",
    color: "var(--text)",
    backgroundColor: "var(--primary-button)",
    borderStyle: "solid",
    borderWidth: "0",
    borderRadius: "10px",
    justifyContent: "center",
    alignItems: "center",
    height: "6vh",
    width: "8vw",
    margin: "0 1vw",
    position: "relative",
    fontSize: "1.7em"
})

const Title = styled("span")({
    color: "var(--text)",
    fontSize: "3.5em",
    fontFamily: "'Encode Sans', sans-serif",
    fontWeight: "800",
    position: "relative",
    left: "0.5em",
    cursor: "pointer"
})

const Username = styled("span")({
    color: "var(--text)",
    fontSize: "3.5em",
    fontFamily: "'Encode Sans', sans-serif",
    fontWeight: "800",
    position: "relative",
    cursor: "pointer",
    right: "10vw"
})

const Panel: FC = () => {
    const { authorized, user: {username} } = useTypedSelector(state => state);
    const navigate = useNavigate();
    const dispatch = useTypedDispatch();
    const devicesWidth = {
        1024: useMediaQuery("(max-width:1024px)"),
        1366: useMediaQuery("(max-width:1366px)"),
        1200: useMediaQuery("(max-width:1200px)"),
        900: useMediaQuery("(max-width:900px)"),
        500: useMediaQuery("(max-width:500px)"),
        724: useMediaQuery("(max-width:724px)")
    }
    const titleResponsive = () => {
        let fontSize: string = "";
        if (devicesWidth[500]) {
            fontSize = "1em";
        } else if (devicesWidth[900]) {
            fontSize = "1.5em";
        } else if (devicesWidth[1200]) {
            fontSize = "2.5em";
        } else {
            return {}
        }
        return {fontSize}
    }
    const usernameResponsive = () => {
        let fontSize: string = "";
        if (devicesWidth[500]) {
            fontSize = "1em";
        } else if (devicesWidth[900]) {
            fontSize = "1.5em";
        } else if (devicesWidth[1200]) {
            fontSize = "2.5em";
        } else {
            return {}
        }
        return {fontSize}
    }
    const signBtnResponsive = () => {
        let fontSize: string = "";
        let width: string = "";
        if (devicesWidth[500]) {
            width = "60px";
            fontSize = "0.7em";
        } else if (devicesWidth[1024]) {
            fontSize = "0.7em";
        } else if (devicesWidth[1366]) {
            fontSize = "1.2em";
        } else {
            return {}
        }
        return {fontSize, width}
    }
    return (
        <Container>
            <Title style={titleResponsive()} onClick={_ => navigate("/")}>Tasks manager</Title>
            
            { authorized
              ? <><Username style={usernameResponsive()}>{username}</Username>
                  <SignContainer>
                      <SignUpInOutBtn style={signBtnResponsive()} onClick={_ => dispatch(Actions.signout())}>Sign out</SignUpInOutBtn>
                  </SignContainer>
              </>
              : <SignContainer>
                  <SignUpInOutBtn style={signBtnResponsive()} onClick={_ => navigate("/signin")}>Sign in</SignUpInOutBtn>
                  <SignUpInOutBtn style={signBtnResponsive()} onClick={_ => navigate("/signup")}>Sign up</SignUpInOutBtn>
              </SignContainer>}
        </Container>
    );
}

export default Panel;
