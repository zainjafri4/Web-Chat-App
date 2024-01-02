import { Stack } from "react-bootstrap";
import { useFetchRec } from "../../hooks/usefetchRec";
import profile from "../../assets/profile.svg"
import { useContext } from "react";
import { chatContext } from "../../context/chatContext";

const userChat = ({ chat, user }) => {

    const { recUser } = useFetchRec(chat, user);
    const {onlineUsers} = useContext(chatContext)

    const isOnline = onlineUsers?.some((user) => user?.userId === recUser?._id)

    return <Stack
        direction="horizontal" gap={3} className="user-card align-items-center p-2 justify-content-between" role="button"
    >

        <div className="d-flex">
            <div className="me-2">
                <img src={profile} height="35px" />
            </div>
            <div className="text-content">
                <div className="name">{recUser?.name}</div>
                <div className="text">Text</div>
            </div>
        </div>
        <div className="d-flex-column align-items-end">
            <div className="date">12/12/2024</div>
            <div className="this-user-notifications">2</div>
            <span className={isOnline ? "user-online" : ""}></span>
        </div>
    </Stack>;
}

export default userChat;