import styles from "./Chat.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function Chat() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1>heeeeeee</h1>
                <form id="chat-form">
                    <input type="text" id="chat-mes" />
                    <button id="send-chat">Send</button>
                </form>
            </div>
        </div>
    );
}

export default Chat;