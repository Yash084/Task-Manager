import { useState, useContext, useEffect } from 'react'
import { doc, onSnapshot, getDocs, collection } from 'firebase/firestore'
import { db } from '../firebase'
import styled from 'styled-components'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import InputBase from '@mui/material/InputBase'
import { AppContext } from '../App'
import IconButton from '@mui/material/IconButton'
import { Link } from 'react-router-dom'
import { BsPerson, BsSearch } from 'react-icons/bs'
import { useAuth } from '../pages/auth/AuthContext'
import Avatar from '@mui/material/Avatar'

function NavTop() {


    const { menuState } = useContext(AppContext)
    const { logout, user } = useAuth()



    const [boards, setBoards] = useState([])
    const [isSearch, setIsSearch] = useState('')
    const [isProfile, setIsProfile] = useState('')
    const [profileUser, setProfileUser] = useState([])
    const [filteredContacts, setFilteredContacts] = useState([])

    useEffect(() => {
        async function getBoards() {
            const getGamesbd = await getDocs(
                collection(db, 'userBoards', user.uid, 'boards')
            )
            setBoards(
                getGamesbd.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            )
        }
        getBoards()
        async function getProfile() {
            onSnapshot(doc(db, 'usersProfile', user.uid), doc => {
                setProfileUser(doc.data())
            })
        }
        getProfile()
    }, [user.uid])

    useEffect(() => {
        setFilteredContacts(
            boards.filter(board =>
                board.name.toLowerCase().includes(isSearch.toLowerCase())
            )
        )
    }, [isSearch, boards])

    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.error(error.message)
        }
    }

    const profile = async () => {
        isProfile ? setIsProfile(false) : setIsProfile(true)
    }

    function renderSwitch(param) {
        switch (param) {
            case 1:
                return 'Boards'
            case 2:
                return 'Favourites'
            case 3:
                return 'Profile'
            default:
                return 'Start'
        }
    }

    return (
        <Block>
            <Route>{renderSwitch(menuState)}</Route>
            <RigthBlock>
                <Search>
                    <Paper
                        component='form'
                        className='paper'
                        sx={{
                            p: '2px 4px',
                            display: 'flex',
                            alignItems: 'center',
                            width: 250,
                            height: 30,
                            boxShadow: 'none',
                        }}
                    >
                        <InputBase
                            className='input-search'
                            sx={{ ml: 1, flex: 1 }}
                            onChange={e => setIsSearch(e.target.value)}
                            placeholder='Search For'
                        />
                        <IconButton
                            type='submit'
                            sx={{ p: '10px' }}
                            aria-label='search'
                        >
                            <BsSearch />
                        </IconButton>
                    </Paper>
                    <SearchFilter>
                        {isSearch ? (
                            filteredContacts.length > 0 ? (
                                filteredContacts.map(filterContact => (
                                    <Boards key={filterContact.name}>
                                        <Link className='card' to={`/project/${filterContact.name}`}>
                                            {' '}
                                            {filterContact.name}{' '}
                                        </Link>
                                    </Boards>
                                ))
                            ) : (
                                <Boards>
                                    There is no project with this name
                                </Boards>
                            )
                        ) : null}
                    </SearchFilter>
                </Search>
                <User>
                    <Avatar className='avatar' onClick={() => profile()}>
                        {user.email[0]}
                    </Avatar>
                    {isProfile ? (
                        <ProfileSettings>
                            <List>
                                <ListItem disablePadding>
                                    <BsPerson className='icon-person' />
                                    <ListItemText
                                        primary={
                                            profileUser
                                                ? profileUser.userName
                                                    ? profileUser.userName
                                                    : null
                                                : user.email
                                        }
                                    />
                                </ListItem>
                                <Divider />
                                <ListItemButton>
                                    <Button
                                        className='icon-user'
                                        onClick={handleLogout}
                                    >
                                        {' '}
                                        Sign out{' '}
                                    </Button>
                                </ListItemButton>
                            </List>
                        </ProfileSettings>
                    ) : null}
                </User>
            </RigthBlock>
        </Block>
    )
}

const Block = styled.div`
    display: flex;
    align-items: center;
    margin-left: 85px;
    height: 80px;
    background-color: #ffffff;

    .input-search {
        background-color: #f3f3f3;
        border-radius: 10px;
        height: 35px;
        text-indent: 15px;
    }

    input {
        text-indent: 15px;
    }
`

const Route = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0px 34px;
    font-size: 26px;
    font-weight: bold;
`

const RigthBlock = styled.div`
    display: flex;
    float: rigth;
    .icon-bell {
        width: 24px;
        height: 24px;
    }
`
const SearchFilter = styled.div`
    position: absolute;
    background: white;
    width: 258px;
    margin-top: 5px;
`
const Boards = styled.div`
    font-size: 17px;
    border-bottom: 1px #f1f1f1 solid;
    padding: 8px;
    a {
        text-decoration: none;
        color: #111111;
    }
`

const Search = styled.div`
    margin: 0px 60px;
`
const User = styled.div`
    display: flex;
    align-items: center;
    margin-right: 60px;
`

const ProfileSettings = styled.div`
    position: absolute;
    background: white;
    width: 180px;
    top: 70px;
    height: 100px;
    right: 21px;
    margin-top: 5px;
    text-align: center;
    .icon-person {
        width: 24px;
        height: 24px;
    }
`

const Button = styled.div`
    text-align: center;
    padding: 10px;
    cursor: pointer;
    :hover {
        background-color: #f0f0f3;
    }
`

export default NavTop
