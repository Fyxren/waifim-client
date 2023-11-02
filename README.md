<div align="center">
	<img src="https://i.pinimg.com/564x/0e/2f/ab/0e2fab7f1fd39d7a29be887ef425801b.jpg" width="200" alt="Logo"/>
	<h1>Waifim</h1>
    <p align="center">
        A Discord bot for random waifus using <a href="https://waifu.im">waifu.im</a>.
    </p>
</div>



## ⚙️ Setup
To install the bot, follow these steps:

1. Clone the repository
2. Install the required dependencies: `yarn`
3. Rename `.env.example` to `.env` and paste your Discord bot token
4. Update `ownerId` in `/src/config/config.js` 
5. Start the bot by running `yarn start` or start the dev server with `yarn dev` for nodemon

> [!WARNING]
> If you set `GUILD_ID` in the `.env`, the application commands will be registered in the provided guild only.
> 
> In order to have global commands, just leave it empty.

## 💡 Usage
The bot responds to the following commands:

- `/ping`: Responds with the ping.
- `/tags`: Responds with a list of the tags - Option to get information about a tag
- `/random`: Responds with a random waifu - Options for tag & nsfw
- `/autopost start`: Start autoposting a random waifu every 10 minutes in the channel
- `/autopost stop`: Stop autoposting in the channel
- `/autopost list`: [Owner Only] List all channels in the autopost list

> [!NOTE]
> There is no help command.. May or may not have forgotten it. I'll add it later..
> 
> I'm planning on adding more stuff to the bot, this was just a first 'draft'

## 💖 Contributing
Contributions are welcome! If you find a bug or have a feature request, please open an issue/PR!

**Some things I'm planning on**
- Help command (;-;)
- Change permissions for autopost _(only admins can set channels)_
- _And some other stuff I can't remember anymore..._

## 📃 License
This project is licensed under the MIT License. See the `LICENSE` file for more information.
