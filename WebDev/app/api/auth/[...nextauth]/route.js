import { connectMongodb } from "@/app/api/mongodb";
import NextAuth from "next-auth/next";
import User from "@/models/user";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import { generateUniqueUsername } from "@/app/api/utils"

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials;
        console.log("LOGIN backend with:");
        console.log("email" + email);
        console.log("pass" + password);

        try{
          await connectMongodb();
        } catch (error) {
          console.log("error: " + error);
          throw new Error("Error signing In at the moment!");
        }

        try {
          const usr = await User.findOne({ email });
          console.log("checking done");

          if (!usr) {
            throw new Error("User not found! Please signup");
          }

          const passMatch = await bcrypt.compare(password, usr.password);

          if (!passMatch){
            throw new Error("Incorrect Password");
          }
          return usr;

        } catch (error) {
          console.log("error: " + error);
          throw new Error(error.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("-----signin callback-----");
      
      if (!user) {
        console.log("User logged out");
        return; 
      }

      if(!account)
      {
        console.log("next sign in");
        return;
      }

      if(account.provider){
        console.log("login with :",account.provider)
      }
      else{
        console.log("provider not found");
        return false;
      }

      if(account.provider=="credentials"){
        return true;
      }

      console.log("google login");
      try{
        await connectMongodb();
      } catch (error) {
        console.log("error: " + error);
        return false;
      }
      
      const usrEmail = user['email']
      const usrName = user['name']
      const usrImage = user['image']

      console.log('User email:', usrEmail);

      try {
        const usr = await User.findOne({ email:usrEmail });
        console.log("checking done");

        if (usr) {
          console.log("User found");
          return true;
          //return { email: usr.email, name: usr.name, image: usr.image, isDoctor: usr.isDoctor };
        }

        console.log("need to signup")

        let username = generateUniqueUsername(usrEmail);
        try {
            await User.create({ name: usrName,  username, email: usrEmail, image: usrImage, isgooglelogin:true })
        }
        catch (error) {
            console.log("error:" + error)
        }
        console.log("creating user success")
        return true;
        //return { email: usr.email, name: usr.name, image: usr.image, isDoctor: usr.isDoctor };
      } catch (error) {
        console.log("error: " + error);
        return false;
      }
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },

    // async jwt({ token, user }) {
    //   console.log("-----jwt callback-----");

    //   if (user) {
    //     token.isDoctor = user.isDoctor;
    //   }
    //   return token;
    //   },
    // async session({ session, token }) {
    //   console.log("-----session callback-----");

    //   if(token){
    //     session.user.isDoctor = token.isDoctor;
    //   }
    //   return session;
    // },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };