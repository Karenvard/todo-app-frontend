import { TextField, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import { FC, useEffect, useState } from 'react';
import Popup from './Popup';
import { useTypedDispatch, useTypedSelector } from '../utils/hooks';
import { Thunks } from '../store/thunks';
import Todo from './Todo';
// @ts-ignore
import plusIcon from "../utils/media/plus-icon.png";
import { ThumbDown } from '@mui/icons-material';

const Container = styled("div")({
    width: "100vw",
    height: "90vh",
    backgroundColor: "var(--background)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative"
})

const AddTaskButton = styled("button")({
    backgroundColor: "var(--primary-button)",
    fontSize: "2.5em",
    color: "var(--text)",
    borderWidth: "0",
    borderRadius: "10px",
    fontFamily: "'Encode Sans', sans-serif",
    width: "23vw",
    height: "8vh",
    marginTop: "1.5vh",
    cursor: "pointer",
    fontWeight: "600"
})

const AddTodoContainer = styled("div")({
    width: "40vw",
    height: "50vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
})

const BodyInput = styled(TextField)({
    width: "20vw",
    marginTop: "3.5vh",
})

const BulletColorInput = styled(TextField)({
    width: "20vw",
    marginTop: "3.5vh",
})

const CreateTaskBtn = styled("button")({
    backgroundColor: "var(--primary-button)",
    width: "13vw",
    height: "7vh",
    fontSize: "2.5em",
    color: "var(--text)",
    fontWeight: "600",
    borderWidth: "0",
    borderRadius: "20px",
    marginTop: "2.5vh",
})

const TasksForm = styled("div")({
    width: "50vw",
    marginTop: "2vh",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
})


const TodosPage: FC = () => {
    const [newTasksPopup, setNewTaskPopup] = useState<boolean>(false);
    const dispatch = useTypedDispatch();
    const [newTaskForm, setNewTaskForm] = useState<{ body: string, color: string }>({ body: "", color: "" })
    const { error, todos, totalTodosCount } = useTypedSelector(state => state);
    const [page, setPage] = useState<number>(1);
    const devicesWidth = {
        1024: useMediaQuery("(max-width:1024px)"),
        1366: useMediaQuery("(max-width:1366px)"),
        724: useMediaQuery("(max-width:724px)"),
        850: useMediaQuery("(max-width:850px)"),
        677: useMediaQuery("(max-width:677px)"),
    }
    const createTodoBtnResponsive = () => {
        let fontSize: string = "";
        if (devicesWidth[677]) {
            fontSize = "0.5em";
        } else if (devicesWidth[850]) {
            fontSize = "1em";
        } else if (devicesWidth[1366]) {
            fontSize = "1.5em";
        } else {
            return {};
        }
        return {fontSize}
    }
    const addTodoPopupResponsive = () => {
        let width: string = "";
        if (devicesWidth[724]) {
            width = "289px";
        } else {
            return {}
        }
        return {width}
    }
    const newTaskParametersResponsive = () => {
        let width: string = "";
        if (devicesWidth[724]) {
            width = "145px";
        } else {
            return {}
        }
        return {width}
    }
    function addTask() {
        dispatch(Thunks.addTodo({ ...newTaskForm, color: newTaskForm.color || "#000000"}));
        setNewTaskForm({body: "", color: ""});
    }


    useEffect(() => {
        dispatch(Thunks.getTodos(page));
    }, [page])
    return (
        <>
            <Popup state={newTasksPopup} setState={setNewTaskPopup}>
                <AddTodoContainer style={addTodoPopupResponsive()}>
                    <BodyInput
                        style={newTaskParametersResponsive()}
                        label="Body"
                        variant="outlined"
                        error={error.type === "body" ? true : false}
                        helperText={error.type === "body" ? error.message : null}
                        onChange={e => setNewTaskForm(prev => ({ ...prev, body: e.target.value }))}
                        value={newTaskForm.body}
                    />
                    <BulletColorInput
                        style={newTaskParametersResponsive()}
                        type="color"
                        label="Choose bullet color"
                        onChange={e => setNewTaskForm(prev => ({ ...prev, color: e.target.value }))}
                    />
                    <CreateTaskBtn style={newTaskParametersResponsive()} onClick={addTask}>Add</CreateTaskBtn>
                </AddTodoContainer>
            </Popup>
            <Container>
                <AddTaskButton style={createTodoBtnResponsive()} onClick={() => setNewTaskPopup(true)}>Create new task</AddTaskButton>
                {todos
                    ? <TasksForm>
                        {todos.map(todo => <Todo body={todo.body} color={todo.color} key={todo.id} id={todo.id} finished={todo.finished} />)}
                    </TasksForm> : null}
                    {todos.length < totalTodosCount
                        ? <img onClick={() => setPage(prev => prev + 1)} src={plusIcon} alt=""></img>
                        : null}
            </Container>
        </>
    );
}

export default TodosPage;
