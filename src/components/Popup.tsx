import styled from '@emotion/styled';
import { FC, PropsWithChildren } from 'react';

const Wrapper = styled("div")({
    background: "rgba(49, 49, 49, 0.7)",
    width: "100vw",
    height: "100vh",
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "100"
})

const Container = styled("div")({
    width: "fit-content",
    height: "fit-content",
    backgroundColor: "var(--accent)",
    position: "absolute",
    borderStyle: "solid",
    borderRadius: "40px",
    borderWidth: "0"
})

const CloseBtn = styled("div")({
    cursor: "pointer",
    position: "absolute",
    backgroundColor: "var(--primary-button)",
    width: "5vw",
    height: "9.4vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "solid",
    borderWidth: "0",
    borderRadius: "20px",
    right: "2vw",
    top: "3vh",
    zIndex: "10"
})

const Line = styled("div")({
    width: "4em",
    height: "0.7vh",
    backgroundColor: "var(--secondary-button)",
    position: "absolute"
})

const Line1 = styled(Line)({ transform: "rotate(45deg)" });
const Line2 = styled(Line)({ transform: "rotate(-45deg)" })

interface IProps {
    state: boolean;
    setState: (value: boolean) => void
    onClose?: Function
}

const Popup: FC<PropsWithChildren<IProps>> = ({ state, setState, children }) => {
    function close() {
        setState(false);
        document.body.style.overflowY = "auto";
    }
    if (!state) return null;
    document.body.style.overflowY = "hidden";
    return (
        <Wrapper>
            <Container>
                <CloseBtn onClick={close}>
                    <Line1 />
                    <Line2 />
                </CloseBtn>
                {children}
            </Container>
        </Wrapper>
    );
}

export default Popup;