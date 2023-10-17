import styled from '@emotion/styled';
import { FC, useState } from 'react';
// @ts-ignore
import tickStaticIcon from "../utils/media/tick-icon.png";
// @ts-ignore
import tickActiveIcon from "../utils/media/tick-icon-active.png";
// @ts-ignore
import trashStaticIcon from "../utils/media/trash-icon.png";
// @ts-ignore
import trashActiveIcon from "../utils/media/trash-icon-active.png";
// @ts-ignore
import crossStaticIcon from "../utils/media/cross-icon.png";
// @ts-ignore
import crossActiveIcon from "../utils/media/cross-icon-active.png";
import { useTypedDispatch } from '../utils/hooks';
import { Thunks } from '../store/thunks';
import { useMediaQuery } from '@mui/material';


const Container = styled("div")({
    borderStyle: "solid",
    borderWidth: "0.5px",
    borderColor: "var(--text)",
    height: "9vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "10px 0",
    backgroundColor: "var(--accent)",
    borderRadius: "50px",
    width: "70vw",
    position: "relative"
})

const Bullet = styled("div")({
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "var(--text)",
    borderRadius: "100%",
    width: "3vmax",
    height: "3vmax",
    position: "relative",
    left: "1.5vw"
})

const TodoText = styled("span")({
    color: "var(--text)",
    fontSize: "2em",
    position: "relative",
    left: "2vw"
})

const Tools = styled("div")({
    position: "absolute",
    right: "2vw",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
})

const ToolIcon = styled("img")({
    height: "5vmax",
    margin: "0 0.2vw"
})

interface IProps {
    body: string
    color: string
    finished: boolean
    id: string
}


const Todo: FC<IProps> = ({body, color, finished, id}) => {
    const [tickIcon, setTickIcon] = useState(tickStaticIcon);
    const [trashIcon, setTrashIcon] = useState(trashStaticIcon);
    const [crossIcon, setCrossIcon] = useState(crossStaticIcon);
    const devicesWidth = {
        1024: useMediaQuery("(max-width:1024px)"),
        1366: useMediaQuery("(max-width:1366px)"),
        724: useMediaQuery("(max-width:724px)")
    }
    const todoTextResponsive = () => {
        let fontSize: string = "";
        if (devicesWidth[724]) {
            fontSize = "0.5em";
        } else if (devicesWidth[1024]) {
            fontSize = "1em";
        } else if (devicesWidth[1366]) {
            fontSize = "1.5em";
        } else {
            return {}
        }
        return {fontSize}
    }
    const dispatch = useTypedDispatch();

    function unFinishTodo() {
        dispatch(Thunks.changeTodo({id, body, color, finished: false}))
    }

    function finishTodo() {
        dispatch(Thunks.changeTodo({id, body, color, finished: true}))
    }

    function deleteTodo() {
        dispatch(Thunks.deleteTodo(id));
    }

    return (
        <>
            
            <Container>
                <Bullet style={{backgroundColor: color}}></Bullet>
                <TodoText style={todoTextResponsive()}>{ !finished ? body : <s>{body}</s>}</TodoText>
                <Tools>
                    { !finished
                        ? <ToolIcon onClick={finishTodo} src={tickIcon} onMouseEnter={() => setTickIcon(tickActiveIcon)} onMouseLeave={() => setTickIcon(tickStaticIcon)}/>
                        : <ToolIcon onClick={unFinishTodo} src={crossIcon} onMouseEnter={() => setCrossIcon(crossActiveIcon)} onMouseLeave={() => setCrossIcon(crossStaticIcon)}/>}
                    <ToolIcon onClick={deleteTodo} src={trashIcon} onMouseEnter={() => setTrashIcon(trashActiveIcon)} onMouseLeave={() => setTrashIcon(trashStaticIcon)}/>
                </Tools>
            </Container>
        </>
    );
}

export default Todo;
