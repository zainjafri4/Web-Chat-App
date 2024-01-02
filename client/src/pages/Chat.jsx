import { useContext } from "react";
import { chatContext } from "../context/chatContext";
import { AuthContext } from "../context/AuthContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/userChat";
import ChatBox from "../components/chat/ChatBox";
import PotentialChats from "../components/chat/potentialChats";


const Chat = () => {

    const { user } = useContext(AuthContext)
    const { userChats, IsUserChatsLoading, updateCurrentChat } = useContext(chatContext)

    return (
        <Container>
            <PotentialChats />
            {userChats?.length < 1 ? null : (
                <Stack direction="horizontal" gap={4} className="align-items-start">
                    <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
                        {IsUserChatsLoading && <p>Loading Chats....</p>}
                        {userChats?.map((chat, index) => {
                            return (
                                <div key={index} onClick={() => updateCurrentChat(chat)}>
                                    <UserChat chat={chat} user={user} />
                                </div>
                            );
                        })}
                    </Stack>
                    <ChatBox/>
                </Stack>
            )}
        </Container>)
}

export default Chat;