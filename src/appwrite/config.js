import conf from "../conf/conf";
import { Client, Databases, Storage, ID } from "appwrite";

class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  uploadFotoPerfil(file) {
    return this.bucket.createFile(conf.bucketFotoPerfil, ID.unique(), file);
  }

  getFotoPerfil(fileId) {
    return this.bucket.getFileView(conf.bucketFotoPerfil, fileId);
  }

  updateFotoPerfil(userDocId, foto_id, foto_url) {
    return this.databases.updateDocument(
      conf.database,
      conf.tableUsuario,
      userDocId,
      {
        foto_id,
        foto_url,
      }
    );
  }
}

const service = new Service();
export default service;
