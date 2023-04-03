import {
    DetailedHTMLProps,
    HTMLAttributes,
    Key,
    ReactComponentElement,
} from 'react';

export type LoginParams = {
    [k: string]: string;
};

export interface IUser {
    id?: number;
    name: string;
}

export interface IServiceMessage {
    name: string;
    message: string;
}

export interface IMessagesProps {
    messages: IServiceMessage[];
    username: string;
}
