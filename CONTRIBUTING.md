# Contributing

Currently, this project is in [Phase 2](https://github.com/amjedidiah/dad/milestone/2).
To contribute, pick any item in either [#44](https://github.com/amjedidiah/dad/issues/44), or [#46](https://github.com/amjedidiah/dad/issues/46) based on your competency level.

- Before you make any changes, keep your fork in sync to avoid merge conflicts:

```bash
git remote add upstream <https://github.com/amjedidiah/dad.git>
git pull upstream develop
```

If you run into a merge conflict, resolve the conflict, or reach out to @amjedidiah for help

- After adding the upstream and checking that all files are up to date, create new branch before editing any files.

```bash
git checkout -b <branch-name>
```

Refer to the [naming conventions](#naming-conventions) for guide on how to name branches

- After making changes, add the changes with `git add`, `git commit` (write a good commit message, refer to [commit convention](#commit-conventions) for guide)
**_Never commit `yarn.lock` file_**

- Push your changes to your forked repository:

```bash
git push origin <branch-name>
```

- Go to the GitHub page of your fork, and make a pull request

- Wait until @amjedidiah or one of the maintainers merges your pull request before merging into `develop`.
If there are any conflicts, you will get a notification and be required to resolve the conflict.

> Also make sure all the required checks pass.

## Guides

### Naming Conventions

- Features: `feat/`

- Fixes: `fix/`

- Chores or other tasks: `chore/`

### Commit conventions

- Features: `feat:`

- Fixes: `fix:`

- Chores or other tasks: `chore:`

#### Important Branches

> Don't **push** to, **merge** into, or **delete** these branches

- `chore/readme-update`: This branch is for updating the readme file
- `chore/checkly`: This branch is for updating checkly tests for monitoring the website
- `main`: This is the production branch. Only @amjedidiah or one of the maintainers can merge into this branch.
