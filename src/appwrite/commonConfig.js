
import {Client,ID, Databases, Storage, Query} from "appwrite"
import config from "../config/config"

export class CommonConfigService{
    client = new Client();
    databases;
    bucket;
    constructor(){
      this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

      this.databases = new Databases(this.client);
      this.bucket = new Storage(this.client)
    }

    async createPost({title,slug, content, featuredImage,
        status, userId
    }){
      try {
         return  await this.databases.createDocument(config.appwriteDatabaseId, 
        config.appwriteCollectionId, slug,
        {title, content, featuredImage,
            status, userId
        } 
    )
      } catch (error) {
        throw error;
      }
    }

    async updatePost(slug, {title, content, featuredImage,
        status, userId
    }){
      try {
         return await this.databases.updateDocument(config.appwriteDatabaseId, 
        config.appwriteCollectionId, 
        slug,
        {title, content, 
         featuredImage,status, 
        } 
    )

      } catch (error) {
        console.log("Appwrite service updatePost", error);
        return false;
      }
    }


    async deletePost(slug){
      try {
          await this.databases.deleteDocument(config.appwriteDatabaseId, 
        config.appwriteCollectionId, 
        slug
    )
     return true
      } catch (error) {
        console.log("Appwrite service deletePost", error);

      }
    }

    async getPost(slug){
        try {
         return   await this.databases.getDocument(config.appwriteDatabaseId, 
          config.appwriteCollectionId, 
          slug
      )

        } catch (error) {
          console.log("Appwrite service getPost", error);
          return false
        }
      }

      async getPosts(queries = [Query.equal("status", "active")]){
        try {
         return   await this.databases.listDocuments(config.appwriteDatabaseId, 
          config.appwriteCollectionId, 
          queries
      )
        } catch (error) {
          console.log("Appwrite service getPosts", error);
          return false
        }
      }
      
    //file upload service

      async uploadFile(file){
        try {
         return   await this.bucket.createFile(
            config.appwriteBucketId, 
           ID.unique(),
           file
      )
        } catch (error) {
          console.log("Appwrite service uploadFile", error);
          return false
        }
      }

      async deleteFile(fileId){
        try {
          await this.bucket.deleteFile(
            config.appwriteBucketId, 
           fileId
      )
      return true;
        } catch (error) {
          console.log("Appwrite service deleteFile", error);
          return false
        }
      }

       getFilePreview(fileId){
         return this.bucket.getFilePreview(
            config.appwriteBucketId, 
           fileId
      )
      }

}

const commonConfigService = new CommonConfigService();

export default commonConfigService;