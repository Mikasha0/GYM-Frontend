import { Account, Client } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

  export default client;

  export const account = new Account(client);
  export {ID} from 'appwrite'