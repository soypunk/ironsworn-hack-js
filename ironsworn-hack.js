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

let ADVENTURE_MOVE_CLASSES = ["FaceDangerMove","GatherInformation","Heal","Resupply","SecureAnAdvantage"];
let FATE_MOVE_CLASSES = ["AskTheOracleMove","PayThePriceMove"];
let MOVES = ADVENTURE_MOVE_CLASSES.concat(FATE_MOVE_CLASSES);

let ORACLES = ["OracleActionTheme", "OracleAction", "OracleTheme", "OraclePlotTwist", "PayThePriceTable"];

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
        this.title = "";
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
    
    tableDisplay() {
        return this.table.sort().join("\n");
    }
}

class NearestNumberTable {
    constructor(item_range) {
        this.title = "";    
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
    
    tableDisplay() {
        let table = this.table;
        let values = Object.keys(table).map(function(key){
            return table[key];
        });
        return values.sort().join("\n");
    }    
}

class OracleAction extends RandomTable {
    constructor() {
        super();
        this.title = "Action";        
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
        this.title = "Theme";        
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

class OracleActionTheme {
    constructor() {
        this.title = "Action & Theme";    
        this.result = "";
        this.table = null;
    }
    
    tableDisplay() {
        return "";
    }
    
    execute() {
        let OA = new OracleAction();
        OA.execute();
        let OT = new OracleAction();
        OT.execute();
        this.result = `${OA.result} ${OT.result}`;        
        return this;
    }
}

class OraclePlotTwist extends RandomTable {
    constructor() {
        super();
        this.title = "Plot Twist";        
        this.table =["It was all a diversion", "A dark secret is revealed",
            "A trap is sprung", "An assumption is revealed to be false",
            "A secret alliance is revealed",
            "Your actions benefit an enemy",
            "Someone returns unexpectedly",
            "A more dangerous foe is revealed",
            "You and an enemy share a common goal",
            "A true identity is revealed",
            "You are betrayed by someone who was trusted",
            "You are too late", "The true enemy is revealed",
            "The enemy gains new allies", "A new danger appears",
            "Someone or something goes missing",
            "The truth of a relationship is revealed",
            "Two seemingly unconnected situations are shown to be connected",
            "Unexpected powers or abilities are revealed",
            "Roll twice more on this table. Both results occur. If they are"
            + " the same result, make it more dramatic."];
    }
}

class PayThePriceTable extends NearestNumberTable {
    constructor() {
        super(100);
        this.title = "Pay The Price";        
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
        this._resultText = "";
    }
    
    get doThis() {
        // formatting of do this.
        return this._do_this;
    }
    
    get doThisHTML() {
        return this._do_this.replace(/(?:\r\n|\r|\n)/g, '<br>');
    }
    
    get resultText() {
        return this._resultText;
    }
    
    set resultText(text) {
        this._resultText = text;
    }
    
    get resultTextHTML() {
        return this._resultText.replace(/(?:\r\n|\r|\n)/g, '<br>');    
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
        this.use_bond = false;
        this.strong_hit = "";
        this.weak_hit = "";
        this.miss = "";
    }
    
    execute(mod=0) {
        let action_die = rollD6();
        action_die += mod;
        let challenge_dice = [rollD10(),rollD10()];
        
        let match_text = "";
        
        if (challenge_dice[0] == challenge_dice[1]) {
            match_text = "!!"
        }
        
        this.resultText = `(${action_die} vs. ${challenge_dice[0]}, ${challenge_dice[1]}${match_text})`;
        
        if (action_die > challenge_dice[0] && action_die > challenge_dice[1]) {
            this.resultText = `${this.resultText} ${this.strong_hit}`;
        } else if (action_die > challenge_dice[0] || action_die > challenge_dice[1]) {
            this.resultText = `${this.resultText} ${this.weak_hit}`;
        } else {
            this.resultText = `${this.resultText} ${this.miss}`;
        }
        return this;
    }
}

class AskTheOracleMove extends Move {
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
        
        let match_text = "";
        if (this.match) { match_text = "!!"; }
        this.resultText = `(${this.odds.label}) ${this._answer}${match_text}`;
        
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
    
    execute() {
        this.resultText = this.table.result;
        return this;
    }
}

class FaceDangerMove extends BasicMove {
    constructor() {
        super();
        this.title = "Face Danger";
        this.trigger = "When you attempt something risky or react to an imminent threat, envision your action and roll. If you act:";
        this._do_this = [
            "• With speed, agility, or precision: Roll +edge.",
            "• With charm, loyalty, or courage: Roll +heart.",
            "• With aggressive action, forceful defense, strength, or endurance: Roll +iron.",
            "• With deception, stealth, or trickery: Roll +shadow.",
            "• With expertise, insight, or observation: Roll +wits."                    
        ].join("\n");
        this.strong_hit = "On a strong hit, you are successful. Take +1 momentum.";
        this.weak_hit = [
            "On a weak hit, you succeed, but face a troublesome cost. Choose one.",
            "• You are delayed, lose advantage, or face a new danger: Suffer -1 momentum.",
            "• You are tired or hurt: Endure Harm (1 harm).",
            "• You are dispirited or afraid: Endure Stress (1 stress).",
            "• You sacrifice resources: Suffer -1 supply."
        ].join("\n");
        this.miss = "On a miss, you fail, or your progress is undermined by a dramaticand costly turn of events. Pay the Price.";
        this.applicable_stats = ["Edge","Heart","Iron","Shadow","Wits"];
    }
}

class SecureAnAdvantage extends BasicMove  {
    constructor() {
        super();
        this.title = "Secure an Advantage";
        this.trigger = "When you assess a situation, make preparations, or attempt to gain leverage, envision your action and roll. If you act:";
        this._do_this = [
            "• With speed, agility, or precision: Roll +edge.",
            "• With charm, loyalty, or courage: Roll +heart.",
            "• With aggressive action, forceful defense, strength, or endurance: Roll +iron.",
            "• With deception, stealth, or trickery: Roll +shadow.",
            "• With expertise, insight, or observation: Roll +wits."        
        ].join("\n");
        this.applicable_stats = ["Edge", "Heart", "Iron", "Shadow", "Wits"];
        this.strong_hit = [
            "On a strong hit, you gain advantage. Choose one.",
            "• Take control: Make another move now (not a progress move); when you do, add +1.",
            "• Prepare to act: Take +2 momentum."].join("\n");
        this.weak_hit = "On a weak hit, your advantage is short-lived. Take +1 momentum.";
        this.miss = "On a miss, you fail or your assumptions betray you. Pay the Price";
    }
}

class GatherInformation extends BasicMove  {
    constructor() {
        super();
        this.title = "Gather Information";
        this.trigger = "When you search an area, ask questions, conduct an investigation, or follow a track, roll +wits. If you act within a community or ask questions of a person with whom you share a bond, add +1.";
        this._do_this = "";
        this.applicable_stats = ["Wits"];
        this.use_bond = true;
        this.strong_hit = "On a strong hit, you discover something helpful and specific. The path you must follow or action you must take to make progress is made clear. Envision what you learn (Ask the Oracle if unsure), and take +2 momentum.";
        this.weak_hit = "On a weak hit, the information complicates your quest or introduces a new danger. Envision what you discover (Ask the Oracle if unsure), and take +1 momentum.";
        this.miss = "On a miss, your investigation unearths a dire threat or reveals an unwelcome truth that undermines your quest. Pay the Price";
    }
}

class Heal extends BasicMove  {
    constructor() {
        super();
        this.title = "Heal";
        this.trigger = "When you treat an injury or ailment, roll +wits. If you are mending your own wounds, roll +wits or +iron, whichever is lower.";
        this._do_this = "";
        this.applicable_stats = ["Iron", "Wits"];
        this.strong_hit = "On a strong hit, your care is helpful. If you (or the ally under your care) have the wounded condition, you may clear it. Then, take or give up to +2 health.";
        this.weak_hit = "On a weak hit, as above, but you must suffer -1 supply or -1 momentum (your choice).";
        this.miss = "On a miss, your aid is ineffective. Pay the Price.";
    }
}

class Resupply extends BasicMove  {
    constructor() {
        super();
        this.title = "Resupply";
        this.trigger = "When you hunt, forage, or scavenge, roll +wits.";
        this._do_this = "";
        this.applicable_stats = ["Iron", "Wits"];
        this.strong_hit = "On a strong hit, you bolster your resources. Take +2 supply.";
        this.weak_hit = "On a weak hit, take up to +2 supply, but suffer -1 momentum for each.";
        this.miss = "On a miss, you find nothing helpful. Pay the Price.";
    }
}

var IS = {
    "AskTheOracleMove": AskTheOracleMove,
    "FaceDangerMove": FaceDangerMove,
    "GatherInformation": GatherInformation,
    "Heal": Heal,    
    "PayThePriceMove": PayThePriceMove,
    "Resupply": Resupply,
    "SecureAnAdvantage": SecureAnAdvantage,
    "PayThePriceTable": PayThePriceTable,
    "OracleAction": OracleAction,
    "OracleTheme": OracleTheme,
    "OraclePlotTwist": OraclePlotTwist,    
    "OracleActionTheme": OracleActionTheme
}
