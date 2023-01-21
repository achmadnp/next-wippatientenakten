import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOpt = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: {
          label: "personId",
          type: "string",
          placeholder: "123123",
        },
        password: {
          label: "password",
          type: "password",
        },
        role: {
          label: "role",
          type: "string",
        },
      },
      authorize: async (credentials) => {
        // database lookup use fetch here
        // const res = await fetch(url, {method})

        const username = credentials.id;
        const password = credentials.password;
        const role = credentials.role;

        let path;

        console.log(role);

        switch (role) {
          case "patient":
            path = "s2/patienten";
            break;
          case "arzt":
            path = "s4/arzte";
            break;
          case "assistent":
            path = "s4/assistenten";
            break;
          case "verwaltung":
            path = "s1/verwaltungsmitarbeiter";
            break;

          default:
            break;
        }

        const res = await fetch(
          `https://wippatientenakte.azure-api.net/${path}?` +
            new URLSearchParams({
              username: username,
            }),
          {
            headers: {
              "Ocp-Apim-Subscription-Key": "3591a8d3b11f4916a8a631f0936e4726",
            },
          }
        );

        const userData = await res.json();

        const user = userData[0];

        user["role"] = role;

        if (!user) {
          throw new Error("User not found");
        }

        if (user) {
          // return user;

          return signInUser({
            password: password,
            user,
          });
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    signOut: "/signin",
  },
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) {
        token.user = user;
      }
      return Promise.resolve(token);
    },

    session: async ({ session, token }) => {
      if (session) {
        session.userRole = token.user?.role;
        session.id = token.user.id;
      }

      return Promise.resolve(session);
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOpt);

const signInUser = async ({ password, user }) => {
  if (!password) {
    throw new Error("Passwort darf nicht leer sein");
  }
  const isMatch = await bcrypt.compare(password, user.passhash);

  if (!isMatch) {
    throw new Error("Ungültige username / passwort");
  }
  return Promise.resolve(user);
};
