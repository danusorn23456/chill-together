# Chill Together

real time messaging and music player web application with react and supabase for backed

![App Screenshot](https://github.com/danusorn23456/chill-together/blob/main/src/feature/common/assets/preview.png?raw=true)

## Structure

this proejct use feature based structure

example

```
📦src
 ┣ 📂feature
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜auth-form.tsx
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┗ 📜use-user.ts
 ┃ ┃ ┗ 📜index.ts
 ┣ 📂pages
 ┃ ┣ 📂public
 ┃ ┣ 📂user
 ┃ ┗ 📜index.ts
 ┣ 📂routes
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜router.tsx
 ┃ ┣ 📜routes-guard.tsx
 ┃ ┗ 📜type.ts
 ┣ 📜main.tsx
```

`feature directory`<br>
<sub>
separates each feature into its folder inside the "feature" directory, making it easier to identify the group of developers working on each feature and track the progress of the functions associated with that particular feature.
</sub>
<br>

`page directory`<br>
<sub>
store page file but layout of each page store in "features/layout"
</sub>

`routes`<br>
<sub>
store route feature about render , route , private route and layout provide here
</sub>

## Basic Flow Guide

<h3 style="color:green">Home Page</h3>

`sign in`<br>
<sub>usign supabase auth ui to signin after login will redirect to <span style="color:orange">/lobby</span></sub>

`sing out`<br>
<sub>signout with supabase auth function</sub>

<sub style="color:red">**important**</sub>
<sub><br>after sign in it should store user state within auth provider and authprovider need to wrapper at the root render as parent of router

```jsx
<AuthProvider>{...anyComponent}</AuthProvider>
```

<sub>auth component should subscribe supabase on auth state change and do whatever to do for setting user before render children ex setUser state in to recoil on initial</sub>

<h3 style="color:green">Lobby Page</h3>

`lobby list`<br>
<sub>render list of rooms <span style="color:orange">db table rooms</span></sub>

`join room`<br/>
<sub>join to room with id of room redirect to <span style="color:orange">room/:roomId</span></sub>

<h3 style="color:green">Room Page</h3>

<sub>after redirect to room page we need to use main hook for listener to subscribe realtime data and return data and some handleFunction</sub><br>

`useRoomListener`
<sub>
focus on subscribe <span style="color:orange">realtime onlines users</span> in room and room operation
</sub>

`useMessageListener`
<sub>
focus on subscribe <span style="color:orange">realtime messages in room</span> and messages operation
</sub>

`usePlaylistListener`
<sub>
focus on subscribe <span style="color:orange">realtime playlist in room</span> and messages operation
</sub>

<sub>
main listener hook working like this
</sub>
<br>
<br>

```jsx
const { loading, state, ...handleFunction } = useHook();
```

<sub>
that mean you can pass handleFunction to any component that need to do something with relate to hook
</sub>
<br>
<br>

```jsx
const { messages , sendMessage } = useMessagesListener(...)
//usage like this
<MessagesWidget messages={messages} onSend={sendMessage}/>
```

`playlists`
<br>
<sub>render playlist from <span style="color:orange">data table playlist</span> </sub>
<br>

`youtube player`
<br>
<sub>render youtube iframe and play current music if exists base on <span style="color:orange">data table media by room_id</span>
start at same duration from server timestamp so we need to get difference value in second from timestamp on server - current time
</sub>

`select playlist` from `playlists`
<sub>
send selected playlist information to <span style="color:orange">data table media</span> so after that when database change usePlaylistListener() will trigger so youtube will rerender and auto play
</sub>

`end playlist` from `youtube player`
<sub>similar to select playlist but this thing will reset column
<span style="color:orange">data table media to null</span></sub>

`pause playlist` from `youtube player`
<br>
<sub>in develop</sub>

`messages`
<br>
<sub>render message from <span style="color:orange">data table messages by room_id</span>
<sub>

`send message`
<br>
<sub>
send message to <span style="color:orange">data table messages by room id</span> so after that when database change useMessagesListener() will trigger so new messages will get render
</sub>

## Feature Develop Guide

<sub>
when creating a new component, it is important to consider its primary function and determine the appropriate category. Sometimes, a component may fit into multiple categories, but it should align with its main purpose. For example, an animation that plays on the playlist screen can initially be categorized under the playlist feature. However, if the animation becomes more complex, requiring additional functionality or maintenance, it is advisable to separate it from the playlist feature and create a separate category for animations.
</sub>
<br>
<br>
<sub>
ui component should primarily focus on rendering the content provided through props. It is acceptable to pass some props to a depth of 1 or 2 levels, but the goal is to create pure function components. The data handling functions should be placed in the page component, and the resulting data should be passed to the feature component as props. This approach ensures that we can trace the origin of all data back to the page component.
</sub>
