addLayer("1", {
    name: "pikmin 1", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "1", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0)
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "pikmin 1 progress", // Name of prestige currency
    baseResource: "skill", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    base: 1000, //base multi for static
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
    doReset(resetingLayer) {
        let keptMilestones = []
        if (hasMilestone(this.layer, 2)) keptMilestones.push(2)
        player[this.layer].milestones.push(keptMilestones)
    },
    milestones: {
    0: {
        requirementDescription: "1:Find Red Onion",
        effectDescription: "Locate the Red Onion. (Unlock Red Pikmin)",
        done() {return player[this.layer].best.gte(1)}
    },
    1: {
        requirementDescription: "2:Find Main Engine",
        effectDescription: "Locate the Main Engine and be able to leave the impact site and go to The Forest of Hope. (passively gain 1% red pikmin)",
        done() {return player[this.layer].best.gte(2)}
    },
    2: {
        requirementDescription: "5:Find Yellow Onion",
        effectDescription: "Locate the Yellow Onion.",
        done() {return player[this.layer].best.gte(5)}
    },
    }
})

addLayer("r1", {
    name: "red pikmin 1", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "r1", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(1),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "pikmin 1 red pikmin", // Name of prestige currency
    baseResource: "skill", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(10)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        gain = 0
        if (hasMilestone("1", "1")) gain = gain + 0.01
        return gain
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {return hasMilestone("1", "0")},
    upgrades: {
    11: {
        title: "Learn to fight",
        description: "Throw a pikmin at an enemy to learn how to fight. (Flat Multiplier to skill)",
        cost: new Decimal(1),
        effect() {
            power = 2
            if (hasUpgrade("r1", "14")) power = power + 1
            if (hasUpgrade("r1", "24")) power = power + 0.5
            if (power < 1) power = 1
            return power;
        },
        effectDisplay() { return format(this.effect())+"x" }
    },
    12: {
        title: "Rematch fight",
        description: "Throw more pikmin at your enemies. (Flat base Multiplier to skill)",
        cost: new Decimal(5),
        effect() {
            power = 2
            if (hasUpgrade("r1", "14")) power = power + 1
            if (hasUpgrade("r1", "24")) power = power + 0.5
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
            exp = 0.5
            if (hasUpgrade("r1", "14")) exp = exp + 0.1
            if (hasUpgrade("r1", "24")) exp = exp + 0.05
            power = player[this.layer].points.pow(exp)
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
        description: "Kill your first enemy, a dwarf bulborb (Flat Exponent to base skill)",
        cost: new Decimal(500),
        effect() {
            power = 1
            if (hasUpgrade("r1", "14")) power = power + 1
            if (hasUpgrade("r1", "24")) power = power + 0.5
            if (power < 1) power = 1
            return power;
        },
        effectDisplay() { return format(this.effect())+"^" }
    },
    21: {
        title: "Fire Immunity",
        description: "Learn that red pikmin are immune to fire. (Flat Multiplier to skill)",
        cost: new Decimal(1000),
        effect() {
            power = 1.5
            if (hasUpgrade("r1", "14")) power = power + 1
            if (hasUpgrade("r1", "24")) power = power + 0.5
            if (power < 1) power = 1
            return power;
        },
        effectDisplay() { return format(this.effect())+"x" },
    },
    22: {
        title: "Extra Damage",
        description: "Learn that red pikmin do extra damage. (Flat base Multiplier to skill)",
        cost: new Decimal(5000),
        effect() {
            power = 1.5
            if (hasUpgrade("r1", "14")) power = power + 1
            if (hasUpgrade("r1", "24")) power = power + 0.5
            if (power < 1) power = 1
            return power;
        },
        effectDisplay() { return format(this.effect())+"x" },
    },
    23: {
        title: "Fire Hazards",
        description: "Teach your pikmin to deal with fire hazards. (Gain skill mult based on number of red pikmin)",
        cost: new Decimal(20000),
        effect() {
            exp = 0.25
            if (hasUpgrade("r1", "14")) exp = exp + 0.1
            if (hasUpgrade("r1", "24")) exp = exp + 0.05
            power = player[this.layer].points.pow(exp)
            if (power < 1) power = 1
            return power;
        },
        effectDisplay() { return format(this.effect())+"x" }
    },
    24: {
        title: "Flowered Friends",
        description: "Your red pikmin now have flowers. (Upgrade all red pikmin upgrades)",
        cost: new Decimal(100000),
    },
    25: {
        title: "Kill Fiery Monsters",
        description: "Kill Fire themed enemies (Flat Exponent to base skill)",
        cost: new Decimal(500000),
        effect() {
            power = 0.5
            if (hasUpgrade("r1", "14")) power = power + 1
            if (hasUpgrade("r1", "24")) power = power + 0.5
            if (power < 1) power = 1
            return power;
        },
        effectDisplay() { return format(this.effect())+"^" }
    },
    }
})

addLayer("y1", {
    name: "yellow pikmin 1", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "y1", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(1),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "pikmin 1 yellow pikmin", // Name of prestige currency
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
    passiveGeneration() {
        gain = 0
        return gain
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "y", description: "Y: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {return hasMilestone("1", "2")},
    upgrades: {
    11: {
        title: "Learn to fight",
        description: "Throw a pikmin at an enemy to learn how to fight. (Flat Multiplier to skill)",
        cost: new Decimal(1),
        effect() {
            power = 2
            if (hasUpgrade("y1", "14")) power = power + 1
            if (hasUpgrade("y1", "24")) power = power + 0.5
            if (power < 1) power = 1
            return power;
        },
        effectDisplay() { return format(this.effect())+"x" }
    },
    12: {
        title: "Rematch fight",
        description: "Throw more pikmin at your enemies. (Flat base Multiplier to skill)",
        cost: new Decimal(5),
        effect() {
            power = 2
            if (hasUpgrade("y1", "14")) power = power + 1
            if (hasUpgrade("y1", "24")) power = power + 0.5
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
            exp = 0.5
            if (hasUpgrade("y1", "14")) exp = exp + 0.1
            if (hasUpgrade("y1", "24")) exp = exp + 0.05
            power = player[this.layer].points.pow(exp)
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
        description: "Kill your first enemy, a dwarf bulborb (Flat Exponent to base skill)",
        cost: new Decimal(500),
        effect() {
            power = 1
            if (hasUpgrade("y1", "14")) power = power + 1
            if (hasUpgrade("y1", "24")) power = power + 0.5
            if (power < 1) power = 1
            return power;
        },
        effectDisplay() { return format(this.effect())+"^" }
    },
    21: {
        title: "Fire Immunity",
        description: "Learn that red pikmin are immune to fire. (Flat Multiplier to skill)",
        cost: new Decimal(1000),
        effect() {
            power = 1.5
            if (hasUpgrade("y1", "14")) power = power + 1
            if (hasUpgrade("y1", "24")) power = power + 0.5
            if (power < 1) power = 1
            return power;
        },
        effectDisplay() { return format(this.effect())+"x" },
    },
    22: {
        title: "Extra Damage",
        description: "Learn that red pikmin do extra damage. (Flat base Multiplier to skill)",
        cost: new Decimal(5000),
        effect() {
            power = 1.5
            if (hasUpgrade("y1", "14")) power = power + 1
            if (hasUpgrade("y1", "24")) power = power + 0.5
            if (power < 1) power = 1
            return power;
        },
        effectDisplay() { return format(this.effect())+"x" },
    },
    23: {
        title: "Fire Hazards",
        description: "Teach your pikmin to deal with fire hazards. (Gain skill mult based on number of red pikmin)",
        cost: new Decimal(20000),
        effect() {
            exp = 0.25
            if (hasUpgrade("y1", "14")) exp = exp + 0.1
            if (hasUpgrade("y1", "24")) exp = exp + 0.05
            power = player[this.layer].points.pow(exp)
            if (power < 1) power = 1
            return power;
        },
        effectDisplay() { return format(this.effect())+"x" }
    },
    24: {
        title: "Flowered Friends",
        description: "Your red pikmin now have flowers. (Upgrade all red pikmin upgrades)",
        cost: new Decimal(100000),
    },
    25: {
        title: "Kill Fiery Monsters",
        description: "Kill Fire themed enemies (Flat Exponent to base skill)",
        cost: new Decimal(500000),
        effect() {
            power = 0.5
            if (hasUpgrade("y1", "14")) power = power + 1
            if (hasUpgrade("y1", "24")) power = power + 0.5
            if (power < 1) power = 1
            return power;
        },
        effectDisplay() { return format(this.effect())+"^" }
    },
    }
})
