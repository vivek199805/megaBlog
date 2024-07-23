
import {Client, Account, ID} from "appwrite"
import config from "../config/config";

export class AuthService{
    client = new Client();
    account;
    constructor(){
      this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
        console.log("dfhhhhhhhhhhhhhhhhhhhhhh",config.appwriteUrl);
      this.account = new Account(this.client)
    }

    async createAccount({email,password, name}){
      try {
     const userAccount =    await this.account.create(ID.unique(), email, password, name)
       if (userAccount) {
          this.login({email, password})
       }else{
        return userAccount;
       }
      } catch (error) {
        throw error;
      }
    }

    async login({email,password}){
        try {
         return await this.account.createEmailPasswordSession(email, password)

        } catch (error) {
          throw error;
        }
      }

      async getCurrentUser(){
        try {
         return await this.account.get()
        } catch (error) {
          console.log("Appwrite service getCurrentUser", error);
        }

        return null;
      }

      async logout(){
        try {
         return await this.account.deleteSessions()
        } catch (error) {
          console.log("Appwrite service logout", error);
        }

        return null;
      }

}

const authService = new AuthService();

export default authService;