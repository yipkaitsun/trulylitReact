import { createContext } from 'react';

const UserContext = createContext();

export const UserConsumer = UserContext.Consumer
export default UserContext;