import React, { useEffect, useRef } from 'react';
import { IMessagesProps } from '../../interfaces/chat.interface';
import styles from './messages.module.css';

const Messages = ({ messages, username }: IMessagesProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    return (
        <div className={styles.messages}>
            {messages.map(({ user }, i) => {
                const itsMe =
                    user.name.trim().toLowerCase() ===
                    username.trim().toLowerCase();
                const className = itsMe ? styles.me : styles.user;
                return (
                    <div
                        // @ts-ignore
                        key={i}
                        className={`${styles.message} ${className}`}>
                        <span className={styles.user}>{user.name}</span>
                        <div className={styles.text}>{user.message}</div>
                        <div ref={messagesEndRef}></div>
                    </div>
                );
            })}
        </div>
    );
};

export default Messages;
