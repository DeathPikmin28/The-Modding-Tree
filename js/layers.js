addLayer("1", {
    name: "pikmin 1", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "1", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "pikmin 1 progress", // Name of prestige currency
    baseResource: "skill", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    base: 1000000, //base multi for static
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
    11: {
        title: "Find Red Onion",
        description: "Locate the Red Onion",
        cost: new Decimal(1)
    }
}
})

addLayer("r1", {
    name: "red pikmin 1", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "r1", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "pikmin 1 red pikmin", // Name of prestige currency
    baseResource: "skill", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {return hasUpgrade("1", "11")},
    upgrades: {
    11: {
        title: "Learn to fight",
        description: "Throw a pikmin at an enemy to learn how to fight. (*2 skill gain)",
        cost: new Decimal(1),
        effect() {
            power = 2
            if (hasUpgrade("r1", "14")) power = power + 1
            if (power < 1) power = 1
            return power;
        },
        effectDisplay() { return format(this.effect())+"x" }
    },
    12: {
        title: "Rematch fight",
        description: "Throw more pikmin at your enemies. (*2 skill gain)",
        cost: new Decimal(5),
        effect() {
            power = 2
            if (hasUpgrade("r1", "14")) power = power + 1
            if (power < 1) power = 1
            return power;
        },
        effectDisplay() { return format(this.effect())+"x" }
    },
    13: {
        title: "Team Tactics",
        description: "Learn to fight with your pikmin. (Gain skill mult based on number of red pikmin)",
        cost: new Decimal(20),
        effect() {
            if (hasUpgrade("r1", "14")) power = player[this.layer].points.pow(0.6)
            else power = player[this.layer].points.pow(0.5)
            if (power < 1) power = 1
            return power;
        },
        effectDisplay() { return format(this.effect())+"x" }
    },
    14: {
        title: "Budded Friends",
        description: "Your red pikmin now have buds. (Upgrade all red pikmin upgrades)",
        cost: new Decimal(100),
    },
    15: {
        title: "First Kill",
        description: "Kill your first enemy, a dwarf bulborb (Gain skill mult based on number of red pikmin)",
        cost: new Decimal(500),
        effect() {
            if (hasUpgrade("r1", "14")) power = 2
            else power = 1
            if (power < 1) power = 1
            return power;
        },
        effectDisplay() { return format(this.effect())+"^" }
    },
}
})
