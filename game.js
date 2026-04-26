const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const askQuestion = (query) =>
  new Promise((resolve) => rl.question(query, resolve));
let inventory = [];
let purse = 0
let armor = 0
const names = [""];
let health = 100;
let goblinHealth = 40
let robbersHealth = 100
let dragonHealth = 150
const weapons = [""];
const states = [];
robberDamage = 20

startGame();

async function startGame() {
  console.log("Welcome to The Sword of Neramar!");
  console.log(
    "Your choices will effect your life! Do you have the will to prevail and attain the Sword of Neramar?",
  );
  instructions();
}

async function endGame() {
    const choice = await askQuestion('Do you really want to quit? (yes/no) ')
    if (choice === 'yes') {
        console.log('Thank you for playing The Sword of Neramar!')
        rl.close()
    } else if (choice === 'no') {
        console.log('Your adventure awaits!')
        const previousState = states.pop();
        await previousState();
    } else {
        console.log('Please make a choice')
        endGame()
    }
}

async function instructions() {
  console.log("Instructions:");
  console.log(
    "1. You will be faced with a choice in every scene. Every choice has a consequence, so choose wisely!",
  );
  console.log(
    "2. If you need help at any time, simply type 'help' and you will be returned to this screen. Don't worry, your progress will not be lost!",
  );
  console.log(
    "3. You have a chance to regain health by choosing to 'camp' or 'rest' when the option is available!",
  );
  console.log("4. You can quit the game at anytime by typing 'quit'!");
  const choice = await askQuestion(
    "Do you understand these instructions? (yes/no) ",
  );
  if (choice === "yes") {
    console.log("Great!");
    name();
  } else if (choice === "no") {
    console.log("Lets go over the instructions again");
    instructions();
  } else {
    console.log("Invalid choice");
    instructions();
  }
}

async function help() {
  console.log("Instructions:");
  console.log(
    "1. You will be faced with a choice in every scene. Every choice has a consequence, so choose wisely!",
  );
  console.log(
    "2. If you need help at any time, simply type 'help' and you will be returned to this screen. Don't worry, your progress will not be lost!",
  );
  console.log(
    "3. You have a chance to regain health by choosing to 'camp' or 'rest' when the option is available!",
  );
  console.log("4. You can quit the game at anytime by typing 'quit'!");

  if (states.length === 0) {
    console.log("No previous state to return to.");
    return;
  }

  const answer = await askQuestion("Do you understand everything? (yes/no) ");
  if (answer === "yes") {
    console.log(`Good. Lets return to your adventure, ${names.at(-1)}`);
    const previousState = states.pop();
    await previousState();
  } else if (answer === "no") {
    console.log("Lets go over the instructions once more.");
    await help();
  } else {
    console.log("Invalid answer!");
    await help();
  }
}

async function name() {
  const name = await askQuestion("What is your name, brave adventurer? ");
  names.push(name);
  console.log(`Hello ${names.at(-1)}`);
  weaponChoice();
}

async function weaponChoice() {
  const choice = await askQuestion(
    "Please choose your weapon (sword, spear, bow or mace) ",
  );
  if (choice === "sword") {
    console.log("You have chosen the Sword!");
    weapons.push("Sword");
    console.log(`Your weapons inventory: ${weapons.at(-1)}`);
    forest();
  } else if (choice === "spear") {
    console.log("You have chosen the Spear!");
    weapons.push("Spear");
    console.log(`Your weapons inventory: ${weapons.at(-1)}`);
    forest();
  } else if (choice === "bow") {
    console.log("You have chosen the Bow!");
    weapons.push("Bow");
    console.log(`Your weapons inventory: ${weapons.at(-1)}`);
    forest();
  } else if (choice === "mace") {
    console.log("You have chosen the Mace!");
    weapons.push("Mace");
    console.log(`Your weapons inventory: ${weapons.at(-1)}`);
    forest();
  } else if (choice === 'quit') {
    states.push(weaponChoice)
    await endGame()
  } else if (choice === "help") {
    states.push(weaponChoice);
    await help();
  } else {
    console.log("Invalid choice! Please choose again!");
    weaponChoice();
  }
}

async function forest() {
  console.log(
    "You start your adventure at a lush forest full of life and greenery.",
  );
  const choice = await askQuestion(
    "There are two paths that you can choose from. Which way will you go? (left, right, camp) ",
  );
  if (choice === "left") {
    console.log(
      "You decide to go down the left path after some consideration, bringing you deeper into the forest",
    );
    goblins();
  } else if (choice === "right") {
    console.log(
      "You decide to go down the right path, confident that going towards the rocky outcropping will be safer",
    );
    cave();
  } else if (choice === "camp") {
    console.log(
      "You decide to make camp while you decide between going left and going deeper into the forest,",
    );
    console.log("or going right towards a rocky outcropping");
    health = 100;
    console.log("Current Health: ", health);
    forest();
  } else if (choice === "help") {
    states.push(forest);
    await help();
  } else if (choice === 'quit') {
    states.push(forest)
    await endGame()
  } else {
    console.log(
      `You must make a choice, ${names.at(-1)}. Your journey is not yet at its end.`,
    );
    forest();
  }
}

async function cave() {
    console.log('You approach the rocky outcropping and notice something in the side of it.')
    const choice = await askQuestion('It appears to be a small cave entrance! What do you do? (enter/continue/camp) ')
    if (choice === 'enter') {
        console.log('You squeeze throught the entrance before straightening up and see an abandoned underground city in the distance.')
        undergroundCity()
    } else if (choice === 'continue') {
        console.log('You decide to pass it up, though a nagging feeling tries to pull you back')
        plains()
    } else if (choice === 'camp') {
        console.log('You decide to set up camp and rest while you decide what to do')
        health = 100
        console.log('Current Health: ', health)
    } else if (choice === 'help') {
        states.push(cave)
        await help()
    } else if (choice === 'quit') {
        states.push(cave)
        await endGame()
    } else {
        console.log('It is peaceful here, but a decision needs to be made!')
        cave()
    }
}

async function undergroundCity() {
    console.log('You approach the city cautiously, ready for whatever may come')
    console.log('Once you get to it, you realize that its empty!')
    const choice = await askQuestion('Should you explore or find a way around? (explore/ignore/camp) ')
    if (choice === 'explore') {
        console.log('You find fabulous treasure! You pocket as much as you can before leaving through a small exit.')
        newPurse = purse + 100
        purse = newPurse
        console.log("You currently have: ", purse, ' Gold Coins')
        plains()
    } else if (choice === 'ignore') {
        console.log("You bypass the city warily and find an exit, though you feel like you've missed out on something")
        plains()
    } else if (choice === 'camp') {
        console.log("You decide to make camp and prepare yourself to make the choice when you wake up")
        health = 100
        console.log('Your current health: ', health)
    } else if (choice === 'help') {
        states.push(undergroundCity)
        await help()
    } else if (choice === 'quit') {
        states.push(undergroundCity)
        await endGame()
    } else {
        console.log(`You need to make a choice, ${names.at(-1)}`)
        undergroundCity()
    }
}

async function goblins() {
    console.log('You walk along the path for and hour before hearing a rustling in the bushes beside you.',
        'Suddenly, three Goblins jump out from the bushes ready to fight!')
    const choice = await askQuestion('What do you do? (fight/run/surrender) ')
    if (choice === 'fight') {
        console.log(`Prepare yourself, ${names.at(-1)}!`)
        goblinFight()
    } else if (choice === 'run') {
        console.log('You decide to run, barely escaping with your life')
        currentHealth = health - 20;
        health = currentHealth
        console.log('Your new health level', currentHealth);
        forest()
    } else if (choice === 'surrender') {
        console.log('The Goblins are ruthless and only accept your death!')
        death()
    } else if (choice === 'help') {
        states.push(goblins)
        await help()
    } else if (choice === 'quit') {
        states.push(goblins)
        await endGame()
    } else {
        console.log('Now is not the time for indecision!')
        goblins()
    }
}

async function death() {
    console.log('You have tragically died!')
    const choice = await askQuestion('Would you like to try again? (yes/no) ')
    if (choice === 'yes') {
        startGame()
        weapons.clear()
        inventory.clear()
        names.clear()
    } else if (choice ==='no') {
        console.log('Thank you for playing The Sword of Neramar!')
        rl.close()
    }
}

async function goblinFight() {
    if (goblinHealth <= 0) {
        console.log('You are victorious! You collect the loot from their slain bodies!')
        newPurse = purse + 20
        purse = newPurse
        console.log(`Your purse contains: ${purse} Gold Coins`)
        plains()
    } else if (health <= 0) {
        death()
    } else {
    const choice = await askQuestion(`The Goblins look fierce! What will you do, ${names.at(-1)}? (attack/defend/run) `)
    if (choice === 'attack') {
        console.log('Great hit! They counter attacked!')
        newGoblin = goblinHealth - 20
        goblinHealth = newGoblin
        newHealth = health - 10
        health = newHealth
        console.log('Health: ', health)
        console.log('Goblin Health: ', goblinHealth)
        goblinFight()
    } else if (choice === 'defend') {
        console.log("They lash out viciously! You're able to block most of it")
        newHealth = health - 5
        health = newHealth
        console.log('health: ', health)
        goblinFight()
    } else if (choice === 'run') {
        console.log('You make it away with only a scratch!')
        newHealth = health - 10
        health = newHealth
        forest()
    } else {
        console.log('Quick! Make a choice!')
        goblinFight()
    }
}
}

async function plains() {
    const choice = await askQuestion('You emerge from the forest to see beautiful plains. Theirs a small village in the distance. What do you do? (village/ignore/camp) ')
    if (choice === 'village') {
        console.log("You approach the small village and see that it's bustling with activity")
        smallVillage()
    } else if (choice === 'ignore') {
        console.log('You choose to travel onwards in search of more interesting things')
        ruins()
    } else if (choice === 'camp') {
        console.log('You decide to make camp and put some serious thought into what to do next')
        health = 100
        console.log('Current Health: ', health)
        plains()
    } else if (choice === 'help') {
        states.push(plains)
        await help()
    } else if (choice === 'quit') {
        states.push(plains)
        await endGame()
    }
     else {
        console.log(`You must make a choice, ${names.at(-1)}!`)
        plains()
    }
}

async function smallVillage() {
    innCost = 10
    const choice = await askQuestion('You enter the village and are nearly overwhelmed by the activity. What should you do? (explore/shop/rest) ')
    if (choice === 'explore') {
        console.log('You walk around the village, taking in the sights before noticing a panicked looking villager approaching you')
        robberQuest()
    } else if (choice === 'shop') {
        console.log('You approach a shop that seems to have everything that an adventurer needs.')
        villageShop()
    } else if (choice === 'rest' && purse <= innCost) {
        console.log('You enter an inn and buy a room for the night to rest your weary body.')
        health = 100
        newPurse = purse - 10
        purse = newPurse
        console.log(`Your health is now: ${health} and your purse now has ${purse} Gold Coins`)
        smallVillage()
    } else if (choice === 'help') {
        states.push(smallVillage)
        await help()
    } else if (choice === 'quit') {
        states.push(smallVillage)
        await endGame()
    }
}

async function villageShop() {
    priceArmor = 50
    pricePotion = 20
    console.log('Prices for the items are 20 Gold Coins for some health and 50 Gold Coins for armor')
    const choice = await askQuestion('You approach the shop and see that it has several items. Would you like to buy something? (health/armor/leave) ')
    if (choice === 'health' && pricePotion <= purse) {
        console.log('You just bought some health! You feel refreshed.')
        health = 100
        console.log(`Your health is now: ${health}`)
        newPurse = purse - 20
        purse = newPurse
        console.log(`Your purse now contains: ${purse} Gold Coins`)
        villageShop()
    } else if (choice === 'armor' && priceArmor <= purse) {
        console.log('You just purchased some armor!')
        newArmor = armor + 50
        armor = newArmor
        newPurse = purse - 50
        purse = newPurse
        console.log(`Your armor level is now: ${armor}.`)
        console.log(`Your purse now contains: ${purse} Gold Coins`)
        villageShop()
    } else if (choice === 'leave') {
        console.log('You finish up and continue on your way.')
        smallVillage()
    } else if (choice === 'help') {
        states.push(villageShop)
        await help()
    } else if (choice === 'quit') {
        states.push(villageShop)
        await endGame()
    } else {
        console.log("Don't waste the shopkeepers time!")
        villageShop()
    }
}

async function robberQuest() {
    console.log('You get the villager calmed down before he tells you that there are robbers on the outskirts of town!')
    const choice = await askQuestion('He says that he will offer you 100 Gold Coins to clear them out. Do you accept this quest? (yes/no) ')
    if (choice === 'yes') {
        console.log(`The villager looks visibly relieved. You continue toward the area that he pointed out with you ${weapons.at(-1)} ready`)
        villageQuest()
    } else if (choice === 'no') {
        console.log('The villager looks very angry and spits at your feet before stomping away')
        smallVillageCoward()
    } else if (choice === 'help') {
        states.push(robberQuest)
        await help()
    } else if (choice === 'quit') {
        states.push(robberQuest)
        await endGame()
    } else {
        console.log('The villager begs you to make a decision')
        robberQuest()
    }
}

async function villageQuest() {
    const newDamage = 20
    console.log('You approach a hastily built barricade with four robbers guarding it.')
    const choice = await askQuestion('They look ready to defend their barricade. What do you do? (fight/run/surrender) ')
    if (choice === 'fight') {
        console.log(`Prepare yourself, ${names.at(-1)}!`)
        robbersFight()
    } else if (choice === 'run') {
        console.log('You get away somewhat safely, but you have to face the villagers')
        if (armor >= 20) {
            newArmor = armor - 20
            armor = newArmor
            console.log(`Your armor is now ${armor}.`)
            smallVillageRun()
        } else if (newDamage > armor) {
            let remainingDamage = newDamage - armor;
            armor = 0
            health -= newDamage
            console.log(`Your health and armor are: ${health} and ${armor}.`)
            smallVillageRun()
        } else {
            newHealth = health - 20
            health = newHealth
            console.log(`Your health is: ${health}.`)
            smallVillageRun()
        }
    } else if (choice === 'surrender') {
        console.log("The Robbers don't offer mercy. You're killed ruthlessly.")
        endGame()
    } else if (choice = 'help') {
        states.push(villageQuest)
        await help()
    } else if (choice === 'quit') {
        states.push(villageQuest)
        await endGame()
    } else {
        console.log('Hurry and make a choice before they attack!')
        villageQuest()
    }
}

async function robbersFight() {
     if (robbersHealth <= 0) {
        console.log('You are victorious! You collect the loot from their slain bodies!')
        newPurse = purse + 40
        purse = newPurse
        console.log(`Your purse contains: ${purse} Gold Coins`)
        smallVillageWin()
    } else if (health <= 0) {
        death()
    } else {
    const choice = await askQuestion("You've decided to fight as honorably as you can. What will you do? (attack/defend/run) ")
    if (choice === 'attack') {
        console.log('You did some damage! They counter attack!')
        newRobbers = robbersHealth - 20
        robbersHealth = newRobbers
        console.log(`The Robbers health is ${robbersHealth}`)
        if (armor >= 20) {
            newArmor = armor - 20
            armor = newArmor
            console.log(`Armor and Health is now ${armor} ${health}`)
            robbersFight()
        } else if (robberDamage > armor) {
            let remainingDamage = robberDamage - armor
            armor = 0
            health -= remainingDamage
            console.log(`Armor and Health are ${armor} ${health}`)
            robbersFight()
        } else if (armor <= 0) {
            newHealth = health - 20
            health = newHealth
            console.log(`Armor and Health are now ${armor} ${health}`)
        } else {
            newHealth = health - 20
            health = newHealth
            console.log(`Armor and Health are ${armor} ${health}`)
            robbersFight()
        }
    } else if (choice === 'defend') {
        console.log('You block most of the incoming attacks')
        if (armor >= 10) {
          newArmor = armor - 10;
          armor = newArmor;
          console.log(`Armor and Health is now ${armor} ${health}`);
          robbersFight()
        } else if (robberDamage > armor) {
          let remainingDamage = robberDamage - armor
          armor = 0
          health -= remainingDamage
          console.log(`Armor and Health are ${armor} ${health}`);
          robbersFight()
        } else if (armor <= 0) {
            newHealth = health - 10
            health = newHealth
            console.log(`Armor and Health are now ${armor} ${health}`)
        } else {
          newHealth = health - 10;
          health = newHealth
          console.log(`Armor and Health are ${armor} ${health}`);
          robbersFight()
        }
    } else if (choice === 'run') {
        console.log('You run like a coward and have to face the village in shame.')
        if (armor >= 20) {
          newArmor = armor - 20;
          armor = newArmor;
          console.log(`Armor and Health is now ${armor} ${health}`);
          smallVillageRun()
        } else if (robberDamage > armor) {
          let remainingDamage = robberDamage - armor;
          armor = 0;
          health -= remainingDamage;
          console.log(`Armor and Health are ${armor} ${health}`);
          smallVillageRun()
        } else if (armor <= 0) {
            newHealth = health - 20
            health = newHealth
            console.log(`Armor and Health are now ${armor} ${health}`)
        } else {
          newHealth = health - 20;
          health = newHealth
          console.log(`Armor and Health are ${armor} ${health}`);
          smallVillageRun()
        }
    } else {
        console.log('Make a decision quickly! They want your head!')
        robbersFight()
    }
}
}

async function smallVillageWin() {
    console.log(`You make your way back into the village to the sounds of cheers. The villager who approached you before happily pays you.`)
    newPurse = purse + 100
    purse = newPurse
    console.log(`Your purse now has: ${purse} Gold Coins`)
    smallVillageContinue()
}

async function smallVillageRun() {
  console.log(
    `You make your way back into the village with your head hung low. The villagers refuse to speak to you.`,
  );
  smallVillageCoward();
}

async function smallVillageCoward() {
    const choice = await askQuestion('You only have one choice. You must leave the village before they decide to run you off. (leave) ')
    if (choice === 'leave') {
        console.log('You quickly leave the village behind before things get worse.')
        ruins()
    }
}

async function smallVillageContinue() {
    const choice = await askQuestion('The celebration dies down and your left to choose where to go from here. What will you do? (leave/shop/rest) ')
    if (choice === 'leave') {
        console.log('You decide to leave the village to explore further.')
        ruins()
    } else if (choice === 'shop') {
        console.log('You approach the shop in search of supplies')
        villageShopWin()
    } else if (choice === 'rest') {
        console.log('You go to the Inn and pay the Innkeeper before going to a room and resting your weary body.')
        newPurse = purse - 10
        purse = newPurse
        health = 100
        console.log(`Your purse now has: ${purse} Gold Coins and you now have ${health} Health`)
        smallVillageContinue()
    } else if (choice === 'help') {
        states.push(smallVillageContinue)
        await help()
    } else if (choice === 'quit') {
        states.push(smallVillageContinue)
        await endGame()
    } else {
        console.log('Wanting to celebrate is understandable, but you still need to make a choice')
        smallVillageContinue()
    }
}

async function villageShopWin() {
  priceArmor = 50;
  pricePotion = 20;
  console.log(
    "Prices for the items are 20 Gold Coins for some health and 50 Gold Coins for armor",
  );
  const choice = await askQuestion(
    "You approach the shop and see that it has several items. Would you like to buy something? (health/armor/leave) ",
  );
  if (choice === "health" && pricePotion <= purse) {
    console.log(
      "You just bought some health! You feel refreshed!",
    );
    health = 100
    console.log(`Your health is now: ${health}`)
    newPurse = purse - 20;
    purse = newPurse;
    console.log(`Your purse now contains: ${purse} Gold Coins`);
    villageShopWin();
  } else if (choice === "armor" && priceArmor <= purse) {
    console.log("You just purchased some armor!");
    newArmor = armor + 50;
    armor = newArmor;
    newPurse = purse - 50;
    purse = newPurse;
    console.log(`Your armor level is now: ${armor}.`);
    console.log(`Your purse now contains: ${purse} Gold Coins`);
    villageShopWin();
  } else if (choice === "leave") {
    console.log("You finish up and continue on your way.");
    smallVillageContinue();
  } else if (choice === "help") {
    states.push(villageShopWin);
    await help();
  } else if (choice === "quit") {
    states.push(villageShopWin);
    await endGame();
  } else {
    console.log("Don't waste the shopkeepers time!");
    villageShopWin();
  }
}

async function ruins() {
    console.log('You make your way down a winding road before spotting some dark ruins.')
    const choice = await askQuestion('Do you enter and explore, or do you go around and play it safe? (enter/continue/camp) ')
    if (choice === 'enter') {
        console.log('You enter the ruins and immediately find 40 Gold Coins!')
        newPurse = purse + 40
        purse = newPurse
        console.log(`Your purse now has: ${purse} Gold Coins.`)
        dragon()
    } else if (choice === 'continue') {
        console.log('You decide to play it safe and go around the ruins to join the road on the other side.')
        pathMerchant()
    } else if (choice === 'camp') {
        console.log('You decide to make camp with this decision weighing heavily on your mind.')
        ruins()
    } else if (choice === 'help') {
        states.push(ruins)
        await help()
    } else if (choice === 'quit') {
        states.push(ruins)
        await endGame()
    } else {
        console.log('You must make a choice!')
        ruins()
    }
}

async function dragon() {
    console.log('You carefully explore the ruins until stumbling across a Dragon!')
    const choice = await askQuestion('Do you sneak away, or fight the Dragon? (fight/run) ')
    if (choice === 'fight') {
        console.log(`Prepare yourself, ${names.at(-1)}!`)
        dragonFight()
    } else if (choice === 'run') {
        console.log("The Dragon doesn't seem to notice you as you silently slip away.")
        pathMerchant()
    } else if (choice === 'help') {
        states.push(dragon)
        await help()
    } else if (choice === 'quit') {
        states.push(dragon)
        await endGame()
    } else {
        console.log('Hurry and make a choice! The Dragon could notice you at any moment!')
        dragon()
    }
}

async function dragonFight() {
    const dragonDamage = 30
     if (dragonHealth <= 0) {
        console.log('You are victorious! You collect the loot from their slain bodies!')
        newPurse = purse + 60
        purse = newPurse
        console.log(`Your purse contains: ${purse} Gold Coins`)
        pathMerchantWin()
    } else if (health <= 0) {
        death()
    } else {
    const choice = await askQuestion("You've decided to fight as honorably as you can. What will you do? (attack/defend/run) ")
    if (choice === 'attack') {
        console.log('You did some damage! The massive Dragon does a counter attack!')
        newDragon = dragonHealth - 20
        dragonHealth = newDragon
        console.log(`The Dragons health is ${dragonHealth}`)
        if (armor >= 30) {
            newArmor = armor - 30
            armor = newArmor
            console.log(`Armor and Health is now ${armor} ${health}`)
            dragonFight()
        } else if (dragonDamage > armor) {
            let remainingDamage = dragonDamage - armor
            armor = 0
            health -= remainingDamage
            console.log(`Armor and Health are ${armor} ${health}`)
            dragonFight()
        } else if (armor <= 0) {
            newHealth = health - 30
            health = newHealth
            console.log(`Armor and Health are now ${armor} ${health}`)
            dragonFight()
        } else {
            newHealth = health - 30
            health = newHealth
            console.log(`Armor and Health are ${armor} ${health}`)
            dragonFight()
        }
    } else if (choice === 'defend') {
        console.log('You block most of the incoming attacks')
        if (armor >= 20) {
          newArmor = armor - 20;
          armor = newArmor;
          console.log(`Armor and Health is now ${armor} ${health}`);
          dragonFight()
        } else if (dragonDamage > armor) {
          let remainingDamage = dragonDamage - armor
          armor = 0
          health -= remainingDamage
          console.log(`Armor and Health are ${armor} ${health}`);
          dragonFight()
        } else if (armor <= 0) {
            newHealth = health - 20
            health = newHealth
            console.log(`Armor and Health are now ${armor} ${health}`)
            dragonFight()
        } else {
          newHealth = health - 20;
          health = newHealth
          console.log(`Armor and Health are ${armor} ${health}`);
          dragonFight()
        }
    } else if (choice === 'run') {
        console.log('You run like hell and narrowly escape the mighty Dragon!')
        pathMerchant()
    } else {
        console.log('Make a decision quickly! The Dragon looks hungry!')
        dragonFight()
    }
}
}

async function pathMerchant() {
    console.log('You walk down the road past the ruins before coming across a Merchant.')
    const choice = await askQuestion('He seems to be friendly and looks as if he has something on his mind. (talk/shop/leave) ')
    if (choice === 'talk') {
        const answer = await askQuestion('He mentions a Dragon in the ruins you passed and he wants you to slay it for 200 Gold Coins. (yes/no) ')
        if (answer === 'yes') {
            console.log('The merchants face lights up with happiness before sending you on your way')
            dragon()
        } else if (answer === 'no') {
            console.log('The merchant looks disappointed, but is understanding. It is a Dragon after all.')
            pathMerchant()
        } else {
            console.log('You mumble incoherently')
            pathMerchant()
        }
    } else if (choice === 'shop') {
        pathShop()
    } else if (choice === 'leave') {
        console.log('You leave abruptly as the Merchant stares after you.')
        mountainPass()
    } else if (choice === 'help') {
        states.push(pathMerchant)
        await help()
    } else if (choice === 'quit') {
        states.push(pathMerchant)
        await help()
    } else {
        console.log('Say something to him!')
        pathMerchant()
    }
}

async function pathShop() {
  priceArmor = 50;
  pricePotion = 20;
  console.log(
    "Prices for the items are 20 Gold Coins for some health and 50 Gold Coins for armor",
  );
  const choice = await askQuestion(
    "You look at what the merchant has to offer. Would you like to buy something? (health/armor/leave) ",
  );
  if (choice === "health" && pricePotion <= purse) {
    console.log(
      "You just bought some health! You feel refreshed!",
    );
    health = 100
    console.log(`Your health is now: ${health}`)
    newPurse = purse - 20;
    purse = newPurse;
    console.log(`Your purse now contains: ${purse} Gold Coins`);
    pathShop();
  } else if (choice === "armor" && priceArmor <= purse) {
    console.log("You just purchased some armor!");
    newArmor = armor + 50;
    armor = newArmor;
    newPurse = purse - 50;
    purse = newPurse;
    console.log(`Your armor level is now: ${armor}.`);
    console.log(`Your purse now contains: ${purse} Gold Coins`);
    pathShop();
  } else if (choice === "leave") {
    console.log("You finish up and continue on your way.");
    pathMerchant();
  } else if (choice === "help") {
    states.push(pathShop);
    await help();
  } else if (choice === "quit") {
    states.push(pathShop);
    await endGame();
  } else {
    console.log("Don't waste the merchants time!");
    pathShop();
  }
}

async function pathMerchantWin() {
  console.log(
    "He smiles and waves before giving you 200 Gold Coins for defeating the Dragon!",
  );
  const choice = await askQuestion(
    "He seems to be friendly and looks as if he has something on his mind. (shop/leave) ",
  );
   if (choice === "shop") {
    pathShopWin();
  } else if (choice === "leave") {
    console.log("You leave abruptly as the Merchant stares after you gratefully.");
    mountainPass()
  } else if (choice === "help") {
    states.push(pathMerchantWin);
    await help();
  } else if (choice === "quit") {
    states.push(pathMerchantWin);
    await help();
  } else {
    console.log("Say something to him!");
    pathMerchantWin();
}
}

async function pathShopWin() {
  console.log(
    "Everything is free!",
  );
  const choice = await askQuestion(
    "You look at what the merchant has to offer. Would you like to buy something? (health/armor/leave) ",
  );
  if (choice === "health") {
    console.log(
      "You just bought some health! You feel refreshed!",
    );
    health = 100
    console.log(`Your health is now: ${health}`)
    pathShopWin();
  } else if (choice === "armor") {
    console.log("You just purchased some armor!");
    newArmor = armor + 50;
    armor = newArmor;
    console.log(`Your armor level is now: ${armor}.`);
    pathShopWin();
  } else if (choice === "leave") {
    console.log("You finish up and continue on your way.");
    pathMerchantWin();
  } else if (choice === "help") {
    states.push(pathShopWin);
    await help();
  } else if (choice === "quit") {
    states.push(pathShopWin);
    await endGame();
  } else {
    console.log("Don't waste the merchants time!");
    pathShopWin();
  }
}

async function mountainPass() {
    console.log('You travel onwards until getting to the base of some treacherous mountains. There seems to be a pass, so you take it.')
    const choice = await askQuestion('You get well into the pass before discovering a cave entrance. What will you do? (enter/continue/camp) ')
    if (choice === 'enter') {
        console.log('You enter the cave to see it lit up with magic runes that seem to float throught the air.')
        magicCave()
    } else if (choice === 'continue') {
        console.log('You ignore the cave and continue on towards a distant city.')
        cityLose()
    } else if (choice === 'camp') {
        console.log('You set up camp while you ponder your decision')
        health = 100;
        console.log(`Your health is: ${health}.`);
        mountainPass()
    } else if (choice === 'help') {
        states.push(mountainPass)
        await help()
    } else if (choice === 'quit') {
        states.push(mountainPass)
        await endGame()
    } else {
        console.log('Its cold! Make a decision!')
        mountainPass()
    }
}

async function magicCave() {
    const choice = await askQuestion('You look around in wonder at the cave. Will you explore or pass through to the exit? (explore/continue/camp) ')
    if (choice === 'explore') {
        console.log('You come across a sword sticking out of a rock. You grasp its hilt before pulling it out.')
        console.log('You immediatly feel an ancieant power flow through you as you give the blade a test swing.')
        weapons.push('Sword of Neramar')
        console.log(`You toss away your old weapon in favor of ${weapons.at(-1)}!`)
        cityWin()
    } else if (choice === 'continue') {
        console.log('You make it out of the cave exit quickly to see a city in the distance.')
        cityLose()
    } else if (choice === 'camp') {
        console.log('You set up camp as you watch the floating runes and think about your decision.')
        health = 100
        console.log(`Your health is: ${health}.`)
        magicCave()
    } else if (choice === 'help') {
        states.push(magicCave)
        await help()
    } else if (choice === 'quit') {
        states.push(magicCave)
        await help()
    } else {
        console.log(`You must make a choice, ${names.at(-1)}!`)
        magicCave()
    }
}

async function cityWin() {
    console.log(`You enter the city with the ${weapons.at(-1)} swinging proudly on your hip.`)
    console.log("Before you know it, people are bowing before you as you walk while a procession of knights ")
    console.log("begin following you. You are directed to the castle where you are crowned as ruler of the kingdom!")
    console.log("You live out the rest of your days on the throne and are known as a wise and fair ruler.")
    const choice = await askQuestion('Thank you for playing The Sword of Neramar and congratulations! Would you like to play again? (yes/no) ')
    if (choice === 'yes') {
        startGame()
    } else if (choice === 'no') {
        rl.close()
    } else {
        console.log("I didn't quite understand that, my lord.")
        cityWin()
    }
}

async function cityLose() {
    console.log("You enter the city without so much as a glance towards you. The people look at you with indifference if they ")
    console.log("do notice you. To them, you're just another foolish adventurer. You decide to settle down in the city.")
    console.log("You live your days in poverty and tell everyone who will listen about your glory days until your death.")
    const choice = await askQuestion("Thank you for playing The Sword of Neramar! Would you like to play again? (yes/no) ")
    if (choice === 'yes') {
        startGame()
    } else if (choice === 'no') {
        rl.close()
    } else {
        console.log("Speak up, peasant!")
        cityLose()
    }
}
