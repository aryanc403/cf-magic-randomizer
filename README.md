# CF Magic Randomizer

A userscript to randomize color of codeforces handles.
Additionally, it also allows one to randomize handles.

## Download instructions

1. Install Tampermonkey for your browser. ([Instructions](https://tampermonkey.net/)).
2. [**Click this link**](https://github.com/aryanc403/cf-magic-randomizer/raw/main/src/magic-randomizer.user.js) to install CF Magic Randomizer userscript.

3. Reload Codeforces.

## Changing colors distribution -
Change `precentCutoff` variable in `colorData` constant.

### Example when colors are randomly distributed

![Random colors](/images/random-colors.jpg)

### Example when you want to see everyone cyan

Change percent cutoff to -1 for every color, and 100 for cyan.

![Cyan colors](/images/everyone-cyan.jpg)

### Example when you want to also shuffle everyone's username

Set `permutateUsernames` variable to `true`

![Random ranklist](/images/random-ranklist.jpg)
![Shuffled usernames](/images/random-usernames.jpg)

## Thanks
[Golovanov399](https://github.com/Golovanov399) for [antimagic](https://github.com/Golovanov399/antimagic)
