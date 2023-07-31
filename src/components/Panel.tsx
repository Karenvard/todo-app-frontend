import { styled } from '@mui/system';
import { FC } from 'react';
import { useTypedDispatch, useTypedSelector } from '../utils/hooks';
import { useNavigate } from 'react-router-dom';
import { Actions } from '../store/reducer';

const Container = styled("div")({
    width: "100vw",
    height: "10vh",
    backgroundColor: "var(--accent)",
    display: "flex",
    flexDirection: "row",
    position: "relative",
})

const SignContainer = styled("div")({
    height: "100%",
    display: "flex",
    flexDirection: "row",
    position: "relative",
    left: "55vw"
})

const SignUpInOutBtn = styled("button")({
    cursor: "pointer",
    color: "var(--text)",
    backgroundColor: "var(--primary-button)",
    borderStyle: "solid",
    borderWidth: "0",
    borderRadius: "10px",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    height: "6vh",
    width: "8vw",
    margin: "2vh 1vw",
    fontSize: "1.7em"
})

const Title = styled("span")({
    color: "var(--text)",
    fontSize: "3.5em",
    fontFamily: "'Encode Sans', sans-serif",
    fontWeight: "800",
    position: "relative",
    left: "0.5em",
    top: "5px",
    cursor: "pointer"
})

const Panel: FC = () => {
    const { authorized, user: {username} } = useTypedSelector(state => state);
    const navigate = useNavigate();
    const dispatch = useTypedDispatch();
    return (
        <Container>
           <Title onClick={_ => navigate("/")}>Tasks manager</Title>
            
            { authorized
             ? <><Title style={{marginLeft: "18vw", cursor: "default"}}>{username}</Title><SignUpInOutBtn style={{position: "absolute", right: "2vw"}} onClick={_ => dispatch(Actions.signout())}>Sign out</SignUpInOutBtn></>
             : <SignContainer>
                    <SignUpInOutBtn onClick={_ => navigate("/signin")}>Sign in</SignUpInOutBtn>
                    <SignUpInOutBtn onClick={_ => navigate("/signup")}>Sign up</SignUpInOutBtn>
                </SignContainer>}
        </Container>
    );
}

export default Panel;