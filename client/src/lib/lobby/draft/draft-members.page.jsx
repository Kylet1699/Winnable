import { Button } from "@/lib/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/ui/card";
import { useNavigate, useLoaderData, useParams } from "react-router-dom";
import { useState } from "react";
import { useWebSocket } from "@/lib/websocket/useWebSocket";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/lib/ui/tooltip";

export function DraftMembersPage() {
  const navigate = useNavigate();
  const { user } = useLoaderData();
  const { lobbyId } = useParams();
  const [lobby, setLobby] = useState(null);
  const ws = useWebSocket({
    socketUrl: `ws://localhost:8080?lobby=${lobbyId}`,
    onMessage(e) {
      if (!e.data) {
        return;
      }

      console.log("received", JSON.parse(e.data));

      const lobbyState = JSON.parse(e.data);
      setLobby(lobbyState);
    },
  });

  function joinTeam(teamNumber) {
    ws.send(JSON.stringify({ event: "joinTeam", data: teamNumber }));
  }

  if (!lobby) return <div>Loading...</div>;

  console.log(user);

  return (
    <div className="space-y-6">
      <h1 className="text-center text-2xl font-bold ">
        Lobby {lobby.lobbyName}
      </h1>
      <div className="grid gap-2 [grid-template-areas:'btns''team1''team2'] md:grid-cols-[1fr_min-content_1fr] md:[grid-template-areas:'team1_btns_team2']">
        <Card className="flex min-h-96 flex-col [grid-area:team1]">
          <CardHeader>
            <CardTitle>Team 1</CardTitle>
          </CardHeader>
          <CardContent>
            <MemberList members={lobby.teamOne.members} />
          </CardContent>
          <CardFooter className="mt-auto self-center">
            <Button variant="team1" onClick={() => joinTeam(1)}>
              Join Team
            </Button>
          </CardFooter>
        </Card>
        <div className="flex flex-row items-center gap-2 [grid-area:btns] md:flex-col md:items-start">
          <Button>Randomize</Button>
          <TooltipProvider
            delayDuration={300}
            disableHoverableContent={
              user.id === lobby.host &&
              lobby.teamOne.members.length >= 0 &&
              lobby.teamTwo.members.length >= 0
            }
          >
            <Tooltip>
              <TooltipTrigger>
                <Button disabled={user.id !== lobby.host}>Start Game</Button>
              </TooltipTrigger>
              <TooltipContent className="space-y-2">
                {user.id !== lobby.host && (
                  <p>Only the host can start the game</p>
                )}
                {lobby.teamOne.members.length === 0 ||
                  (lobby.teamTwo.members.length === 0 && (
                    <p>Each team must have at least one player</p>
                  ))}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button variant="destructive" onClick={() => navigate("/")}>
            Leave Lobby
          </Button>
        </div>
        <Card className="flex min-h-96 flex-col [grid-area:team2]">
          <CardHeader>
            <CardTitle>Team 2</CardTitle>
          </CardHeader>
          <CardContent>
            <MemberList members={lobby.teamTwo.members} />
          </CardContent>
          <CardFooter className="mt-auto self-center">
            <Button variant="team2" onClick={() => joinTeam(2)}>
              Join Team
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

/** @param {{ members: {id: string, username: string}[] }} */
function MemberList({ members }) {
  return (
    <ul className="max-h-80 space-y-2 overflow-y-auto">
      {members.map(({ id, username }) => (
        <li key={id}>
          <Member name={username} />
        </li>
      ))}
    </ul>
  );
}

/** @param {{ name: string }} */
function Member({ name }) {
  return <div className="">{name}</div>;
}
