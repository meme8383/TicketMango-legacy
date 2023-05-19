# TicketMango

Free Ticketing App \[In Development\]

## Developing

### Running the app

1. Clone the GitHub repository
2. Run `yarn` in both the `/client` and `/server` directories
3. Run `yarn start` in both the `/client` and `/server` directories

### Pushing changes

1. Run `yarn lint` in both directories and fix any issues found (with `yarn lint:fix` and/or manually).
2. Run `yarn format` in both directories.
3. Run `yarn lint` in both directories. If any issues arise, edit `.eslintrc.json` to ignore the rule or a specific case (or edit .prettierrc if more reasonable).
4. Run `yarn flow` and `yarn build` in the client directory.
5. Commit your changes once all of the above execute successfully.
6. Ensure that the Vercel build was successful.
