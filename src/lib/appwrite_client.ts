import { Account, Client, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

  export default client;

  export const account = new Account(client);
  export const databases = new Databases(client); // Add this for database access

  export { ID, Query } from "appwrite";
