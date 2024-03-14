import React from 'react';
export function DraftMembersPage()
 {
  return (
    <div className="flex flex-col min-h-screen p-4 bg-gray-900">
      <div className="flex flex-1">
        {/* Sidebar for game search */}
        <div className="w-1/4 p-2">
          <input
            type="text"
            placeholder="Search Game"
            className="w-full p-2 mb-2 rounded bg-gray-800"
          />
          <textarea
            placeholder="Description/Rules"
            className="w-full p-2 mb-2 rounded h-52 bg-gray-800"
          ></textarea>
          <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Confirm
          </button>
        </div>

        {/* Selected games and members list */}
        <div className="flex flex-1 flex-col md:flex-row p-2">
          <div className="flex-1 m-2">
            <h2 className="text-lg font-semibold bg-gray-800 rounded mb-2">Selected Games</h2>
            <div className="flex justify-between bg-gray-800 rounded mb-2 items-center">
              <h3>Games Team 1</h3>
              <span className="text-sm">3/10</span>
            </div>
            {/* Placeholder for selected games for Team 1 */}
            <div className="flex flex-wrap p-2 rounded bg-gray-800 mb-4">
              {/* Mockup of game slots */}
              <div className="w-1/4 h-10 bg-pink-300 m-1 rounded flex justify-center items-center">Game 1</div>
              <div className="w-1/4 h-10 bg-pink-300 m-1 rounded flex justify-center items-center">Game 2</div>
              <div className="w-1/4 h-10 bg-pink-300 m-1 rounded flex justify-center items-center">Game 3</div>
             
              {/* More game slots */}
            </div>

            <div className="flex justify-between items-center mb-2 rounded bg-gray-800">
              <h3>Games Team 2</h3>
              <span className="text-sm">3/10</span>
            </div>
            {/* Placeholder for selected games for Team 2 */}
            <div className="flex flex-wrap mb-4 p-2 rounded bg-gray-800">
              {/* Mockup of game slots */}
              <div className="w-1/4 h-10 bg-blue-300 m-1 rounded flex justify-center items-center">Game 1</div>
              <div className="w-1/4 h-10 bg-blue-300 m-1 rounded flex justify-center items-center">Game 2</div>
              <div className="w-1/4 h-10 bg-blue-300 m-1 rounded flex justify-center items-center">Game 3</div>
              {/* More game slots */}
            </div>
          </div>

          {/* Members list */}
          <div className="flex-1 m-2">
            <div className="bg-gray-800 p-2 rounded shadow">
              <h2 className="text-lg font-semibold">Team 1 Member list</h2>
              {/* Placeholder for Team 1 members */}
              <ul className="list-disc list-inside">
                {/* Mockup list items */}
                <li>Marcus</li>
                <li>Kyle</li>
                <li>Juan</li>
                <li>Pritam</li>
                {/* More list items */}
              </ul>
            </div>
            <div className="bg-gray-800 p-2 rounded shadow mt-4">
              <h2 className="text-lg font-semibold">Team 2 Member list</h2>
              {/* Placeholder for Team 2 members */}
              <ul className="list-disc list-inside">
                {/* Mockup list items */}
                <li>Stephen</li>
                <li>Jeffery</li>
                <li>iShowMeat</li>
                <li>Epstein</li>
                {/* More list items */}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Start button */}
      <div className="w-full p-80">
        <button className="bg-yellow-400 hover:bg-yellow-500 text-white p-3 rounded w-30 mx-auto block">
          START
        </button>
      </div>
    </div>
  );
};
