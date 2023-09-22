import { Link } from 'react-router-dom'

import { BsX, BsHeart, BsHeartFill, BsPlus } from 'react-icons/bs'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

import {
    Block,
    BlockBoard,
    Text,
    CardText,
    CardEmpty,
    InputModal,
    ButtonModal,
    Icon,
    style,
} from './home.style'

function Home({
    boards,
    open,
    handleOpen,
    handleClose,
    newProject,
    setNewProject,
    addTodo,
    fav,
}) {
    return (
        <>
            <Block>
                <Text>👋 Hello, start creating tasks with Task Manager!</Text>
                <BlockBoard style={{ cursor: 'pointer'}}>
                    <CardEmpty onClick={() => handleOpen()}>
                        <BsPlus className='icon-plus' />
                        <CardText>New project</CardText>
                    </CardEmpty>
                    {boards
                        ? boards.map((board, index) => (
                              <>
                                  <Link
                                      className='card'
                                      to={`/project/${board.name}`}
                                      key={index}
                                  >
                                      <CardText>{board.name}</CardText>
                                  </Link>
                                  {board.fav ? (
                                      <BsHeartFill
                                          className='heartfill iconheart'
                                          onClick={() => fav(board, false)}
                                      />
                                  ) : (
                                      <BsHeart
                                          className='iconheart'
                                          onClick={() => fav(board, true)}
                                      />
                                  )}
                              </>
                          ))
                        : null}

                    <Modal
                        open={open}
                        onClose={() => handleClose()}
                        aria-labelledby='modal-modal-title'
                        aria-describedby='modal-modal-description'
                        className='add-task'
                    >
                        <Box sx={style}>
                            <Typography
                                id='modal-modal-title'
                                variant='h6'
                                component='h2'
                            >
                                Create board
                                <Icon onClick={() => handleClose()}>
                                    <BsX  style={{cursor: 'pointer'}}/>
                                </Icon>
                            </Typography>
                            <Typography
                                id='modal-modal-description'
                                sx={{ mt: 2 }}
                            >
                                <InputModal
                                    type='text'
                                    placeholder='Title of the project'
                                    value={newProject.name}
                                    onChange={event =>
                                        setNewProject({
                                            name: event.target.value,
                                            fav: false,
                                        })
                                    }
                                />
                                <ButtonModal onClick={() => addTodo()}>
                                Create
                                </ButtonModal>
                            </Typography>
                        </Box>
                    </Modal>
                </BlockBoard>
            </Block>
        </>
    )
}

export default Home
