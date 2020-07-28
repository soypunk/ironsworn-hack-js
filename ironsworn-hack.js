let STATS = [
    "Edge",
    "Iron",
    "Heart",
    "Shadow",
    "Wits"
];

/*
    "Brave",
    "Cool",
    "Faith",
    "Scrap",
    "Hope",
    "Quick"
*/

let ROLES = [
    "Bounty Hunter",
    "Diplomat",
    "Entertainer",
    "Jedi Knight",    
    "Jedi Padawan",
    "Medic",
    "Merchant",
    "Noble",
    "Pilot",    
    "Pirate",    
    "Officer",
    "Scout",
    "Slicer",
    "Smuggler",
    "Solider",
    "Squad Leader"
];

/* utils */

function rollDie(sides) {
    return Math.floor((Math.random() * sides) + 1);
}

function rollD6() {
    return rollDie(6);
}

function rollD10() {
    return rollDie(10);
}

function rollD100() {
    return rollDie(100);
}

function arrayToSentence(arr) {
	if (arr.length == 1) {
		return arr[0];
	} else {
        let last = arr.pop();
    		return arr.join(', ') + ' and ' + last;
    	}
}

function numberToArray(n) {
    return Array.from(String(n), Number);
    // return Array.from(n.toString()).map(Number);
}

function getRandom(arr, n=1) {
    let result = new Array(n);
    let len = arr.length;
    let taken = new Array(len);
    if (n > len) {
        throw new RangeError("getRandom: more elements taken than available");
    }
    while (n--) {
        let x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result
}
    
function getClosestKey(arr, target, u) {
    if (arr.hasOwnProperty(target)) {
        return target;
    }
    let keys = Object.keys(arr);
    keys.sort(function(a,b){ return a-b; });

    for(var i = 0, prev; i < keys.length; i++){
        if (Number(keys[i]) > target) {
            return prev === u ? u : +prev;
        }
        prev = keys[i];
    }
    return +keys[i - 1];
}

/* RANDOM TABLES */

class RandomTable {
    constructor(num = 1) {
        this.table = [];
        this.num_results = num;
        this.result = "";
    }
    
    get resultAsSentence() {
        return arrayToSentence(this.result)
    }
    
    execute() {
        this.result = getRandom(this.table,this.num_results);
        return this;
    }
}

class NearestNumberTable {
    constructor(item_range) {
        this.table = {};
        this.item_range = item_range;
        this.item_number = null;
        this.num_results = 1;
        this.result = "";
    }
    
    get resultAsSentence() {
        return arrayToSentence(this.result)
    }
    
    execute() {
        this.item_number = rollDie(this.item_range)
        this.result = this.table[getClosestKey(this.table ,this.item_number)];
        return this;
    }
}

class OracleAction extends RandomTable {
    constructor() {
        super();
        this.table = ["Scheme", "Clash", "Weaken", "Initiate", "Create", "Swear",
            "Avenge", "Guard", "Defeat", "Control", "Break", "Risk",
            "Surrender", "Inspect", "Raid", "Evade", "Assualt", "Deflect",
            "Threaten", "Attack", "Leave", "Preserve", "Manipulate",
            "Remove", "Eliminate", "Withdraw", "Abandon", "Investigate",
            "Hold", "Focus", "Uncover", "Breach", "Aid", "Uphold", "Falter",
            "Suppress", "Hunt", "Share", "Destroy", "Avoid", "Reject",
            "Demand", "Explore", "Bolster", "Seize", "Mourn", "Reveal",
            "Gather", "Defy", "Transform", "Persevere", "Serve", "Begin",
            "Move", "Coordinate", "Resist", "Await", "Impress", "Take",
            "Oppose", "Capture", "Overwhelm", "Challenge", "Acquire",
            "Protect", "Finish", "Strengthen", "Restore", "Advance",
            "Command", "Refuse", "Find", "Deliver", "Hide", "Fortify",
            "Betray", "Secure", "Arrive", "Affect", "Change", "Defend",
            "Debate", "Support", "Follow", "Construct", "Locate", "Endure",
            "Release", "Lose", "Reduce", "Escalate", "Distract", "Journey",
            "Escort", "Learn", "Communicate", "Depart", "Search", "Charge",
            "Summon"];
    }
}

class OracleTheme extends RandomTable {
    constructor() {
        super();
        this.table = ["Risk", "Ability", "Price", "Ally", "Battle", "Safety",
            "Survival", "Weapon", "Wound", "Shelter", "Leader", "Fear",
            "Time", "Duty", "Secret", "Innocence", "Renown", "Direction",
            "Death", "Honor", "Labor", "Solution", "Tool", "Balance", "Love",
            "Barrier", "Creation", "Decay", "Trade", "Bond", "Hope",
            "Superstition", "Peace", "Deception", "History", "World",
            "Vow", "Protection", "Nature", "Opinion", "Burden", "Vengeance",
            "Opportunity", "Faction", "Danger", "Corruption", "Freedom",
            "Debt", "Hate", "Possession", "Stranger", "Passage", "Land",
            "Creature", "Disease", "Advantage", "Blood", "Language", "Rumor",
            "Weakness", "Greed", "Family", "Resource", "Structure", "Dream",
            "Community", "War", "Portent", "Prize", "Destiny", "Momentum",
            "Power", "Memory", "Ruin", "Mysticism", "Rival", "Problem",
            "Idea", "Revenge", "Health", "Fellowship", "Enemy", "Religion",
            "Spirit", "Fame", "Desolation", "Strength", "Knowledge", "Truth",
            "Quest", "Pride", "Loss", "Law", "Path", "Warning",
            "Relationship", "Wealth", "Home", "Strategy", "Supply"];
    }
}

class PayThePriceTable extends NearestNumberTable {
    constructor() {
        super(100);
        this.table = {
          "1": "Roll again and apply that result but make it worse",
          "3": "A person or community you trusted loses faith in you or acts against you",
          "6": "A person or community you care about is exposed to danger",
          "10": "You are separated from something or someone",
          "17": "Your action has an unintended effect",
          "24": "Something of value is lost or destroyed",
          "33": "The current situation worsens",
          "42": "A new danger or foe is revealed",
          "51": "It causes a delay or puts you at a disadvantage",
          "60": "It is harmful",
          "69": "It is stressful",
          "78": "A surprising development complicates your quest",
          "86": "It wastes resources",
          "91": "It forces you to act against your best intentions",
          "95": "A friend, companion or ally is put in harm's way (or you are, if alone)",
          "99": "Roll twice more on this table. Both results occur"
        }
    }
    
    execute() {
        this.item_number = rollDie(this.item_range)
        
        let itsBad = false;
        
        if (this.item_number <= 2) {
            this.item_number = rollDie(100);
            itsBad = true;
            if (this.item_number <= 2) {
                this.item_number = Math.max(3, this.item_number);                
            }
            this.result = this.table[getClosestKey(this.table ,this.item_number)];            
        } else if (this.item_number >= 99) {
            this.item_number = [Math.max(3,rollDie(98)), Math.max(3,rollDie(98))];
            this.result = [
                this.table[getClosestKey(this.table ,this.item_number[0])],
                this.table[getClosestKey(this.table ,this.item_number[1])]
            ];
            this.result = this.resultAsSentence;
        } else {
            this.result = this.table[getClosestKey(this.table ,this.item_number)];
        }
        if (itsBad) {
            this.result = `!! ${this.result} !!`;
        }
        return this;
    }
}

/* MOVES */

class Move {
    constructor() {
        this.title = "";
        this.trigger = "";
        this._do_this = "";
    }
    
    get doThis() {
        // formatting of do this.
        return this._do_this;
    }
    
    get doThisHTML() {
        return this._do_this.replace(/(?:\r\n|\r|\n)/g, '<br>');;
    }
    
    execute() {
        return this;
    }
}

class BasicMove extends Move {
    constructor() {
        super();
        this.applicable_stats = [];
        this.use_role = false;
        this.strong_hit = "";
        this.weak_hit = "";
        this.miss = "";
        this._resultText = "";
    }
    
    get resultText() {
        return this._resultText;
    }
    
    execute() {
        let action_die = rollD6();
        let challenge_dice = [rollD10(),rollD10()];        
        return this;
    }
}

class OracleMove extends Move {
    constructor(odds = "Likely") {
        super();
        this.title = "Ask the Oracle";
        this.trigger = "When you seek to resolve questions, discover details in the world, determine how other characters respond, or trigger encounters or events, you may:";
        this._do_this = ["• Draw a conclusion: Decide the answer based on the most interesting and obvious result.",
            "• Ask a yes/no question: Decide the odds of a ‘yes’, and roll on the table below to check the answer.",
            "• Pick two: Envision two options. Rate one as ‘likely’, and roll on the table below to see if it is true. If not, it is the other.",
            "• Spark an idea: Brainstorm or use a random prompt."].join("\n");
        this._odds = odds
        this.oddsLabels = [
            "Almost Certain",
            "Likely",
            "50/50",
            "Unlikely",
            "Small Chance",
        ];
        this.oddsValues = [
            "11",
            "26",
            "51",
            "76",
            "91"
        ];
        this.match = false;
        this._answer = "";
        this._resultText = "";
    }
    
    get odds() {
        let oddsLabelIndex = this.oddsLabels.indexOf(this._odds);
        return {
            "value": this.oddsValues[oddsLabelIndex],
            "label": this._odds
        }
    }
    
    get answer() {
        return this._answer;
    }
    
    set answer(answer_text) {
        this._answer = answer_text;
    }
    
    get resultText() {
        let match_text = "";
        if (this.match) { match_text = "!!"; }
        return `(${this.odds.label}) ${this._answer}${match_text}`;
    }
    
    execute() {
        let oracle_die = rollD100();
        let oracle_die_array = numberToArray(oracle_die);
        if (oracle_die_array[0] == oracle_die_array[1]) {
            this.match = true;
        }
        
        let odds = this.odds;
        
        if (oracle_die >= odds.value) {
            this.answer = "Yes"
        } else {
            this.answer = "No"        
        }
        
        return this;
    }
}

class PayThePriceMove extends Move {
    constructor() {
        super();
        this.title = "Pay The Price";
        this.trigger = "When you suffer the outcome of a move, choose one:";
        this._do_this = [
          "• Make the most obvious negative outcome happen.",
          "• Envision two negative outcomes. Rate one as ‘likely’, and Ask the Oracle using the yes/no table. On a ‘yes’, make that outcome happen. Otherwise, make it the other.",
          "• Roll on the following table. If you have difficulty interpreting the result to fit the current situation, roll again"].join("\n");
        this.table = new PayThePriceTable();
        this.table.execute();
    }
    
    get resultText() {
        return this.table.result;
    }    
    
    execute() {
        return this;
    }    
}