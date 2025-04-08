import { IResolvers } from "@graphql-tools/utils";
import { DataSources, LoginResponse, Response, User } from "../../types";

const resolvers: IResolvers = {
  Query: {
    listUsers: async (_: unknown, __: unknown, { datasources }): Promise<Response<User[]>> => {
      try {
        return await datasources.UserService.listUsers();
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
  },

  Mutation: {
    signup: async (
      _: unknown,
      { firstName, lastName, email,phone, password },
      { dataSources }
    ): Promise<Response<User>> => {
      try {
        const roleMap = {
          "User Admin": "some_role_id", // Replace with actual role ID
        };
    
        const userPayload = {
          FirstName: firstName, 
          LastName: lastName,
          Email: email,
          Phone: phone,
          Password: password, // Ensure backend hashes the password securely
          RoleID: roleMap["User Admin"], // Dynamically assign role ID
          RoleName: "User Admin",
        };
        const data = {
          "firstName": "John",
          "lastName": "Doe",
          "email": "johndoe@example.com",
          "phone": "+1234567890",
          "password": "SecureP@ss123",
          "roleId": "some_role_id",
          "roleName": "User Admin"
        }
        console.log("Sending payload:", JSON.stringify(data)); // Debugging
    
        return await dataSources.authService.signup(data);
      } catch (error) {
        console.error("Error registering user:", error);
        return { success: false, statusCode: 500, message: "Failed to register user." };
      }
    },
    
    login: async (_: unknown, { email, password }, { dataSources }): Promise<Response<LoginResponse>> => {
      try {
        return await dataSources.authService.login(email, password);
      } catch (error) {
        console.error("Error during login:", error);
        return { success: false, statusCode: 401, message: "Invalid email or password." };
      }
    },

    refreshToken: async (_: unknown, { refresh_token }, { dataSources }): Promise<Response<LoginResponse>> => {
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
  },
};

export default resolvers;
