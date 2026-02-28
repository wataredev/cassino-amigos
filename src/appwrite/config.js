import conf from "../conf/conf";
import { Client, Databases, Storage, ID, Account, Functions, Query } from "appwrite";

class Service {
  client = new Client();
  databases;
  bucket;
  account;
  functions;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
    this.account = new Account(this.client);
    this.functions = new Functions(this.client);
  }

  uploadFotoPerfil(file) {
    return this.bucket.createFile(conf.bucketFotos, ID.unique(), file);
  }

  getFotoPerfil(fileId) {
    return this.bucket.getFileView(conf.bucketFotos, fileId);
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

  async uploadImageCloudinary(file, metadata) {
    try {
      const user = await this.account.get();

      const uploadedFile = await this.bucket.createFile(
        conf.bucketFotos,
        ID.unique(),
        file
      );

      const response = await this.functions.createExecution(
        conf.cloudinaryFunctionId,
        JSON.stringify({
          fileId: uploadedFile.$id,
          bucketId: conf.bucketFotos,
          userId: user.$id,
          filename: file.name,
          metadata
        })
      );

      if (!response.responseBody || response.responseBody.trim() === '') {
        throw new Error('Função retornou resposta vazia. Verifique os logs da função no Appwrite.');
      }
      
      if (response.status === 'failed') {
        throw new Error(`Função falhou: ${response.stderr || response.stdout || 'Erro desconhecido'}`);
      }
      
      const result = JSON.parse(response.responseBody);
      
      if (result.success) {
        console.log('Upload concluído!', result.cloudinaryUrl);
        return result;
      } else {
        throw new Error(result.message);
      }
      
    } catch (error) {
      console.error('Erro no upload:', error);
      throw error;
    }
  }

  async uploadMultipleImagesCloudinary(files) {
    const uploads = Array.from(files).map(file =>
      this.uploadImageCloudinary(file)
    );
    return Promise.all(uploads);
  }

  async getUserImagesCloudinary(userId) {
    try {
      const response = await this.databases.listDocuments(
        conf.database,
        conf.imagesCollectionId,
        [
          Query.equal('userId', userId),
          Query.orderDesc('uploadedAt'),
          Query.limit(100)
        ]
      );
      
      return response.documents;
    } catch (error) {
      console.error('Erro ao buscar imagens:', error);
      throw error;
    }
  }

  async getAllImages(limit = 20, offset = 0) {
    const response = await this.databases.listDocuments(
      conf.database,
      conf.imagesCollectionId,
      [
        Query.orderDesc('uploadedAt'),
        Query.limit(limit),
        Query.offset(offset)
      ]
    );

    return response.documents;
  }

  async getImagesByTagCloudinary(userId, tag) {
    try {
      const response = await this.databases.listDocuments(
        conf.database,
        conf.imagesCollectionId,
        [
          Query.equal('userId', userId),
          Query.search('tags', tag)
        ]
      );
      
      return response.documents;
    } catch (error) {
      console.error('Erro ao buscar por tag:', error);
      throw error;
    }
  }

  async deleteImageCloudinary(image) {
    await this.functions.createExecution(
      conf.deleteImageFunctionId,
      JSON.stringify({
        imageId: image.$id,
        publicId: image.publicId
      })
    );
  }

  async getAllUsers() {
    const response = await this.databases.listDocuments(
      conf.database,
      conf.tableUsuario,
      [Query.limit(100)]
    );

    return response.documents;
  }

  async getUserById(accountId) {
    try {
      const response = await this.databases.listDocuments(
        conf.database,
        conf.tableUsuario,
        [
          Query.equal("accountId", accountId)
        ]
      );

      return response.documents[0];
    } catch (error) {
      console.error("Erro ao buscar usuário por accountId:", error);
      throw error;
    }
  }

}

const service = new Service();
export default service;