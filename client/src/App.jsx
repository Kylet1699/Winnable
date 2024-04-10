import "./App.css";
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { HomePage } from "./lib/lobby/home/home.page";
import { DraftMembersPage } from "./lib/lobby/draft/draft-members.page";
import { DraftGamesPage } from "./lib/lobby/draft/draft-games.page";
import { GamePage } from "./lib/lobby/game/game.page";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/ui/dropdown-menu";
import { useLoaderData, useRevalidator, useNavigate } from "react-router-dom";
import {
  initializeWebSocket,
  // sendMessage,
  // closeWebSocket,
  updateLobby,
} from "./lib/websocket/websocket";
import { AuthProvider } from "./lib/auth/provider";
// import uniqid from "uniqid";
import { fetchUser } from "./lib/auth/api";
import { SERVER_URL } from "./lib/common/constants";
import { Button } from "./lib/ui/button";
import { Toaster } from "@/lib/ui/sonner";

// font
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import '@fontsource/fira-sans-extra-condensed/300.css';
import '@fontsource/fira-sans-extra-condensed/400.css';
import '@fontsource/fira-sans-extra-condensed/500.css';
import '@fontsource/fira-sans-extra-condensed/700.css';

// mui
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: fetchUser,
    id: "root",
    children: [
      {
        path: "", // Lobby
        element: <HomePage />,
        loader: fetchUser,
      },
      {
        path: ":lobbyId/draft-members",
        element: <DraftMembersPage />,
        loader: fetchUser,
      },
      {
        path: ":lobbyId/draft-games",
        element: <DraftGamesPage />,
        loader: fetchUser,
      },
      {
        path: ":lobbyId/game",
        element: <GamePage />,
        loader: fetchUser,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
}

function Root() {
  return (
    <AuthProvider>
      <Base>
        <Header />
        <Outlet />
      </Base>
      <Toaster />
    </AuthProvider>
  );
}

/**
 * @param {{ children: React.ReactNode }} props
 */
function Base({ children }) {
  return (
    <div className="mx-auto max-w-screen-lg space-y-4 p-4">{children}</div>
  );
}

function Header() {
  const loginUrl = `${SERVER_URL}/api/auth/login`;
  const testLoginUrl = `${SERVER_URL}/api/auth/login-test`;
  const { user } = useLoaderData();
  const revalidator = useRevalidator();
  async function handleSignout() {
    try {
      await fetch(`${SERVER_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      revalidator.revalidate();
    } catch (error) {
      console.error(error);
    }
  }

  // async function login() {
  //   try {
  //     const response = await fetch(loginUrl, {
  //       method: "GET",
  //       credentials: "include",
  //     });
  //     window.href = response.url;
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // async function loginAsTest() {
  //   try {
  //     const response = await fetch (testLoginUrl, {
  //       method: "GET",
  //       credentials: "include",
  //     });
  //     console.log(response.user);
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  return (
    <header className="flex justify-between">
      <div className="flex flex-col justify-center">
        <span className="font-logo text-lg py-0 my-0">WINNABLE</span>
        <span className="font-slogan py-0 my-0 text-right text-sm" style={{lineHeight: 0.5}}>it&apos;s winnable</span>
      </div>
      
      {!user && (
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link to={testLoginUrl}><Button>Login as Test User</Button></Link>
          <Link to={loginUrl}><Button>Login</Button></Link>
          {/* <Button onClick={() => loginAsTest()}>Login as Test User</Button>
          <Button onClick={() => login()}>Login</Button> */}
        </div>
      )}
      {user && <UserDropdown name={user.username} signOut={handleSignout} />}
      {/* <Button onClick={() => initializeWebSocket()}>Connect Websocket</Button>
      <Button onClick={() => sendMessage("this is a test")}>
        Send message
      </Button>
      <Button
        onClick={() =>
          updateLobby({ id: "65fa26c5e0f19bd948896b78", lobbyName: uniqid() })
        }
      >
        Update lobby
      </Button> */}
    </header>
  );
}

function UserDropdown({ name, signOut }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Hello, {name}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default App;
