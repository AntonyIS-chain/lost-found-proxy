import { IResolvers } from "@graphql-tools/utils";
import { SessionResponse, Response, User, IDDocument } from "../../types";

const resolvers: IResolvers = {
  Query: {
    listUsers: async (_: unknown, __: unknown, { dataSources }): Promise<Response<User[]>> => {
      try {
        return await dataSources.UserService.listUsers();
      } catch (error) {
        console.error("Error fetching users:", error);
        return { success: false, statusCode: 500, message: "Failed to fetch users." };
      }
    },
        
    getUserByID: async (_: any, { userID }: { userID: string }, { datasources }): Promise<Response<User>> => {
      try {
        return await datasources.UserService.getUserByID(userID);
      } catch (error) {
        console.error(`Error fetching user with ID ${userID}:`, error);
        return { success: false, statusCode: 500, message: "Failed to fetch user." };
      }
    },

    getUserByEmail: async (_: any, { email }: { email: string }, { datasources }): Promise<Response<User>> => {
      try {
        return await datasources.UserService.getUserByEmail(email);
      } catch (error) {
        console.error(`Error fetching user with email ${email}:`, error);
        return { success: false, statusCode: 500, message: "Failed to fetch user." };
      }
    },

    GetIDDocuments: async (_: unknown, { IDType }: { IDType: string }, { dataSources }): Promise<Response<IDDocument[]>> => {
      try {
        return await dataSources.matchingService.GetIDDocuments(IDType);
      } catch (error) {
        console.error("Error fetching ID documents:", error);
        return { success: false, statusCode: 500, message: "Failed to fetch ID documents." };
      }
    },

    GetIDDocument: async (_: unknown, { IDType, id }: { IDType: string, id: string }, { dataSources }): Promise<Response<IDDocument>> => {
      try {
        return await dataSources.matchingService.GetIDDocument(IDType, id);
      } catch (error) {
        console.error("Error fetching ID document:", error);
        return { success: false, statusCode: 500, message: "Failed to fetch ID document." };
      }
    },
  },

  Mutation: {
    signup: async ( _: unknown,{  email,role_name,role_id,password, phone_number},{ dataSources }): Promise<Response<User>> => {
      try {

        const user:User =  {
          email,
          role_name, 
          role_id,
          phone_number,
          password
        }
        
       
        console.log("Sending payload:", JSON.stringify(user));      
        const response = await dataSources.authService.signup(user);
        console.log("Response", response)
        return response
      } catch (error) {
        console.log("ERROR", error)

        console.error("Error registering user:", error);
        return { success: false, statusCode: 500, message: "Failed to register user." };
      }
    },
    
    login: async (_: unknown, { email, password }, { dataSources }): Promise<Response<SessionResponse>> => {
      
      try {
        return await dataSources.authService.login(email, password);
      } catch (error) {
        console.error("Error during login:", error);
        return { success: false, statusCode: 401, message: "Invalid email or password." };
      }
    },

    refreshToken: async (_: unknown, { refresh_token }, { dataSources }): Promise<Response<SessionResponse>> => {
      try {
        return await dataSources.authService.refreshToken(refresh_token);
      } catch (error) {
        console.error("Error refreshing token:", error);
        return { success: false, statusCode: 500, message: "Failed to refresh token." };
      }
    },

    validateToken: async (_: unknown, { access_token }, { dataSources }): Promise<Response<Response>> => {
      try {
        return await dataSources.authService.validateToken(access_token);
      } catch (error) {
        console.error("Error refreshing token:", error);
        return { success: false, statusCode: 500, message: "Failed to refresh token." };
      }
    },

    logout: async (_: unknown, { refresh_token }, { dataSources }): Promise<Response<Response>> => {
      try {
        return await dataSources.authService.logout(refresh_token);
      } catch (error) {
        console.error("Error refreshing token:", error);
        return { success: false, statusCode: 500, message: "Failed to refresh token." };
      }
    },

    updateUser: async (_: any, { userID, updates }: { userID: string; updates: Partial<User> }, { datasources }): Promise<Response<User>> => {
      try {
        return await datasources.UserService.updateUser(userID, updates);
      } catch (error) {
        console.error("Error updating user:", error);
        return { success: false, statusCode: 500, message: "Failed to update user." };
      }
    },

    deleteUser: async (_: any, { adminID, userID }: { adminID: string; userID: string }, { datasources }): Promise<Response<Boolean>> => {
      try {
        await datasources.UserService.deleteUser(adminID, userID);
        return { success: true, statusCode: 200, message: "User deleted successfully.", results: true };
      } catch (error) {
        console.error("Error deleting user:", error);
        return { success: false, statusCode: 500, message: "Failed to delete user.", results: false };
      }
    },

    deactivateUser: async (_: any, { userID }: { userID: string }, { datasources }): Promise<Response<Boolean>> => {
      try {
        await datasources.UserService.deactivateUser(userID);
        return { success: true, statusCode: 200, message: "User deactivated successfully.", results: true };
      } catch (error) {
        console.error("Error deactivating user:", error);
        return { success: false, statusCode: 500, message: "Failed to deactivate user.", results: false };
      }
    },

    activateUser: async (_: any, { userID }: { userID: string }, { datasources }): Promise<Response<Boolean>> => {
      try {
        await datasources.UserService.activateUser(userID);
        return { success: true, statusCode: 200, message: "User activated successfully.", results: true };
      } catch (error) {
        console.error("Error activating user:", error);
        return { success: false, statusCode: 500, message: "Failed to activate user.", results: false };
      }
    },

    assignRole: async (_: any, { userID, roleID }: { userID: string; roleID: number }, { datasources }): Promise<Response<Boolean>> => {
      try {
        await datasources.UserService.assignRole(userID, roleID);
        return { success: true, statusCode: 200, message: "Role assigned successfully.", results: true };
      } catch (error) {
        console.error("Error assigning role:", error);
        return { success: false, statusCode: 500, message: "Failed to assign role.", results: false };
      }
    },

    changePassword: async (_: any, { userID, oldPassword, newPassword }: { userID: string; oldPassword: string; newPassword: string }, { datasources }): Promise<Response<Boolean>> => {
      try {
        await datasources.UserService.changePassword(userID, oldPassword, newPassword);
        return { success: true, statusCode: 200, message: "Password changed successfully.", results: true };
      } catch (error) {
        console.error("Error changing password:", error);
        return { success: false, statusCode: 500, message: "Failed to change password.", results: false };
      }
    },

    forgotPassword: async (_: any, { email }: { email: string }, { datasources }): Promise<Response<Boolean>> => {
      try {
        await datasources.UserService.forgotPassword(email);
        return { success: true, statusCode: 200, message: "Password reset email sent.", results: true };
      } catch (error) {
        console.error("Error processing forgot password:", error);
        return { success: false, statusCode: 500, message: "Failed to process request.", results: false };
      }
    },

    resetPassword: async (_: any, { token, newPassword }: { token: string; newPassword: string }, { datasources }): Promise<Response<Boolean>> => {
      try {
        await datasources.UserService.resetPassword(token, newPassword);
        return { success: true, statusCode: 200, message: "Password reset successfully.", results: true };
      } catch (error) {
        console.error("Error resetting password:", error);
        return { success: false, statusCode: 500, message: "Failed to reset password.", results: false };
      }
    },

    verifyEmail: async (_: any, { token }: { token: string }, { datasources }): Promise<Response<Boolean>> => {
      try {
        await datasources.UserService.verifyEmail(token);
        return { success: true, statusCode: 200, message: "Email verified successfully.", results: true };
      } catch (error) {
        console.error("Error verifying email:", error);
        return { success: false, statusCode: 500, message: "Failed to verify email.", results: false };
      }
    },

    ReportID: async ( _: unknown,{ doc, idType }: { doc: IDDocument; idType: string }, { dataSources }): Promise<Response> => {
      try {
        console.log("doc>>>>",doc)
        return await dataSources.matchingService.ReportID(doc, idType);
      } catch (error) {
        console.error("Error reporting ID document:", error);
        return {
          success: false,
          statusCode: 500,
          message: "Failed to report ID document.",
        };
      }
    },
  
    DeleteIDDocument: async (_: unknown,{ id, IDType }: { id: string; IDType: string }, { dataSources }): Promise<Response> => {
      try {
        return await dataSources.matchingService.deleteIDDocument(id, IDType);
      } catch (error) {
        console.error(`Error deleting ID document with ID ${id}:`, error);
        return {
          success: false,
          statusCode: 500,
          message: "Failed to delete ID document.",
        };
      }
    },
  
  //   SaveMatch: async (_: unknown,{ input }: { input: MatchIDInput },{ dataSources }): Promise<BooleanResponse> => {
  //     try {
  //       return await dataSources.matchingService.saveMatch(input);
  //     } catch (error) {
  //       console.error("Error saving match:", error);
  //       return {
  //         success: false,
  //         statusCode: 500,
  //         message: "Failed to save match.",
  //       };
  //     }
  //   },
  },
};

export default resolvers;
