/* utils */
class Utils {
    constructor() {}
    rollDie(sides) {
        return Math.floor((Math.random() * sides) + 1);
    }
    rollD6() { return this.rollDie(6); }
    rollD10() { return this.rollDie(10); }
    rollD100() { return this.rollDie(100); }
    arrayToSentence(arr) {
        	if (arr.length == 1) {
        		return arr[0];
        	} else {
            let last = arr.pop();
        		return arr.join(', ') + ' and ' + last;
        	}
    }
    numberToArray(n) {
        return Array.from(String(n), Number);
        // return Array.from(n.toString()).map(Number);
    }
    getRandom(arr, n=1) {
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
    getClosestKey(arr, target, u) {
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
}

const u = new Utils();

/*
    "Brave",
    "Cool",
    "Faith",
    "Scrap",
    "Hope",
    "Quick"
*/

/* IS */
class IS {
    constructor() {
        this.STATS = [
            "Edge",
            "Iron",
            "Heart",
            "Shadow",
            "Wits"
        ];
        this.STATUSES = [
            "Health",
            "Spirit",
            "Supply",
            "Momentum"
        ];
        this.ROLES = [
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
        this.VOW_MOVES_CLASSES = ["SwearAnIronVow","ReachAMilestone","FulfillYourVow","ForsakeYourVow"];
        this.ADVENTURE_MOVE_CLASSES = ["FaceDanger","SecureAnAdvantage","GatherInformation","Compel","AidYourAlly","MakeCamp"];
        this.EXPLORATION_MOVES_CLASSES = ["UndertakeAnExpedition","ExploreAWaypoint","MakeADiscovery","ConfrontChaos","FinishYourExpedition","SetACourse"];
        this.CONNECTION_MOVE_CLASSES =  ["MakeAConnection","DevelopARelationship","ForgeABond","TestYourRelationship"];
        this.COMBAT_MOVE_CLASSES = ["EnterTheFray","GainGround","ReactUnderFire","Strike","Clash","TurnTheTide","FaceDefeat","TakeDecisiveAction","Battle"];
        this.LEGACY_MOVE_CLASSES = ["Advance","WriteYourEpilogue"];
        this.SUFFER_MOVE_CLASSES = ["LoseMomentum","EndureHarm","EndureStress","CompanionTakesAHit"];
        this.THRESHOLD_MOVE_CLASSES = ["FaceDeath","FaceDesolation","OvercomeDestruction"];
        this.RECOVER_MOVE_CLASSES = ["Heal","Hearten","Repair","Resupply","Sojourn"];
        this.FATE_MOVE_CLASSES = ["AskTheOracleMove","PayThePriceMove"];
        this.MISC_MOVE_CLASSES = ["DrawTheCircle","EndTheFight","ReachYourDestination","UndertakeAJourney","OutOfSupply","FaceASetback"]; 
        this.ORACLES = ["OracleActionTheme", "OracleAction", "OracleTheme", "OraclePlotTwist", "PayThePriceTable"].sort();
    }
    
    get MOVES() {
        return this.ADVENTURE_MOVE_CLASSES.concat(this.RELATIONSHIP_MOVE_CLASSES.concat(this.COMBAT_MOVE_CLASSES.concat(this.SUFFER_MOVE_CLASSES.concat(this.QUEST_MOVE_CLASSES.concat(this.THRESHOLD_MOVE_CLASSES.concat(this.RECOVER_MOVE_CLASSES.concat(this.FATE_MOVE_CLASSES))))))).sort();
    }
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
        this.result = u.getRandom(this.table,this.num_results);
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
        return u.arrayToSentence(this.result)
    }
    
    execute() {
        this.item_number = u.rollDie(this.item_range)
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
        this.item_number = u.rollDie(this.item_range)
        
        let itsBad = false;
        
        if (this.item_number <= 2) {
            this.item_number = u.rollDie(100);
            itsBad = true;
            if (this.item_number <= 2) {
                this.item_number = Math.max(3, this.item_number);                
            }
            this.result = this.table[u.getClosestKey(this.table ,this.item_number)];            
        } else if (this.item_number >= 99) {
            this.item_number = [Math.max(3,rollDie(98)), Math.max(3,rollDie(98))];
            this.result = [
                this.table[u.getClosestKey(this.table ,this.item_number[0])],
                this.table[u.getClosestKey(this.table ,this.item_number[1])]
            ];
            this.result = this.resultAsSentence;
        } else {
            this.result = this.table[u.getClosestKey(this.table ,this.item_number)];
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
        this.progress_move = false;
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
        this.applicable_statuses = [];
        this.use_role = false;
        this.use_bond = false;
        this.strong_hit = "";
        this.weak_hit = "";
        this.miss = "";
    }
    
    execute(mod=0) {
        let action_die = u.rollD6();
        if (this.progress_move == true) {
            action_die = mod;
        } else {
            action_die += mod;                        
        }
        let challenge_dice = [u.rollD10(),u.rollD10()];
        
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

/* FATE MOVES */

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
        let oracle_die = u.rollD100();
        let oracle_die_array = u.numberToArray(oracle_die);
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

/* ADVENTURE MOVES */

class FaceDanger extends BasicMove {
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
            "On a weak hit, you succeed, but at a troublesome cost. Make a suffer move (-1).",
            "• Delayed, Disadvanted: Lose Momentum",
            "• Physical injury/strain: Endure Harm",
            "• Mental shock/despair: Endure Stress",
            "• Vehicles: Withstand Damage",
            "• Companion Takes A Hit",
            "• Sacrifice Resources"].join("\n");
        this.miss = "On a miss, you fail, or a momentary success is undermined by a costly turn of events. Pay the Price";
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
        
        let extra_text = [
            "• Take +2 momentum.",
            "• Make another move now (not a progress move), and add +1."
            ];
        
        this.strong_hit = ["On a strong hit, take both"].concat(extra_text).join("\n");
        this.weak_hit = ["On a weak hit, take one"].concat(extra_text).join("\n");
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

class MakeCamp extends BasicMove  {
    constructor() {
        super();
        
        let extra_text = [
            "• Recuperate: Take +1 health for you and any companions.",
            "• Partake: Suffer -1 supply and take +1 health for you and any companions.",
            "• Relax: Take +1 spirit.",
            "• Focus: Take +1 momentum.",
            "• Prepare: When you break camp, add +1 if you Undertake a Journey."
        ];
        
        this.title = "Resupply";
        this.trigger = "When you rest and recover for several hours in the wild, roll +supply";
        this._do_this = "";
        this.applicable_stats = [];
        this.applicable_statuses = ["Supply"];
        this.strong_hit = [
            "On a strong hit, you and your allies may each choose two."].concat(extra_text).join("\n");
        this.weak_hit = [
            "On a weak hit, choose one."].concat(extra_text).join("\n");
        this.miss = "On a miss, you take no comfort. Pay the Price";

    }
}

class UndertakeAJourney extends BasicMove  {
    constructor() {
        super();
        this.title = "Undertake a Journey";
        this.trigger = "When you travel across hazardous or unfamiliar lands, first set the rank of your journey.";
        this._do_this = [
            "• Troublesome journey: 3 progress per waypoint.",
            "• Dangerous journey: 2 progress per waypoint.",
            "• Formidable journey: 1 progress per waypoint.",
            "• Extreme journey: 2 ticks per waypoint.",
            "• Epic journey: 1 tick per waypoint.",
            "Then, for each segment of your journey, roll +wits. If you are setting off from a community with which you share a bond, add +1 to your initial roll"
        ].join("\n");
        this.applicable_stats = ["Wits"];
        this.use_bond = true;        
        this.strong_hit = [
            "On a strong hit, you reach a waypoint. If the waypoint is unknown to you, envision it (Ask the Oracle if unsure). Then, choose one.",
            "• You make good use of your resources: Mark progress.",
            "• You move at speed: Mark progress and take +1 momentum, but suffer -1 supply"
                ].join("\n");
        this.weak_hit = "On a weak hit, you reach a waypoint and mark progress, but suffer -1 supply.";
        this.miss = "On a miss, you are waylaid by a perilous event. Pay the Price.";
    }
}

class ReachYourDestination extends BasicMove  {
    constructor() {
        super();
        this.title = "Reach Your Destination";
        this.trigger = "When your journey comes to an end, roll the challenge dice and compare to your progress. Momentum is ignored on this roll.";
        this._do_this = "";
        this.progress_move = true;
        this.strong_hit = [
            "On a strong hit, the situation at your destination favors you. Choose one.",
            "• Make another move now (not a progress move), and add +1.",
            "• Take +1 momentum."].join("\n");
        this.weak_hit = "On a weak hit, you arrive but face an unforeseen hazard or complication. Envision what you find (Ask the Oracle if unsure).";
        this.miss = "On a miss, you have gone hopelessly astray, your objective is lost to you, or you were misled about your destination. If your journey continues, clear all but one filled progress, and raise the journey’s rank by one (if not already epic).";
    }
}

/* RELATIONSHIP MOVES */

class Compel extends BasicMove  {
    constructor() {
        super();
        this.title = "Compel"; 
        this.trigger = "When you attempt to persuade someone to do something, envision your approach and roll. If you";
        this.use_bond = true;
        this._do_this = [
            "• Charm, pacify, barter, or convince: Roll +heart (add +1 if you share a bond).",
            "• Threaten or incite: Roll +iron.",
            "• Lie or swindle: Roll +shadow"
        ].join("\n");
        this.applicable_stats = ["Heart", "Iron", "Shadow"];
        this.strong_hit = "On a strong hit, they’ll do what you want or share what they know. Take +1 momentum. If you use this exchange to Gather Information, make that move now and add +1.";
        this.weak_hit = "On a weak hit, as above, but they ask something of you in return. Envision what they want (Ask the Oracle if unsure).";
        this.miss = "On a miss, they refuse or make a demand which costs you greatly. Pay the Price.";
    }
}

class Sojourn extends BasicMove {
    constructor() {
        super();
        this.title = "Sojourn";
    }
}

class DrawTheCircle extends BasicMove {
    constructor() {
        super();
        this.title = "Draw The Circle";
    }
}

class ForgeABond extends BasicMove {
    constructor() {
        super();
        this.title = "Forge a Bond";
    }
}

class TestYourRelationship extends BasicMove {
    constructor() {
        super();
    }
}

class AidYourAlly extends BasicMove {
    constructor() {
        super();
    }
}

class WriteYourEpilogue extends BasicMove {
    constructor() {
        super();
    }
}

/* COMBAT MOVES */

class Strike extends BasicMove {
    constructor() {
        super();
    }
}

class Clash extends BasicMove {
    constructor() {
        super();
    }
}

class TurnTheTide extends BasicMove {
    constructor() {
        super();
    }
}

class EnterTheFray extends BasicMove {
    constructor() {
        super();
    }
}

class EndTheFight extends BasicMove {
    constructor() {
        super();
    }
}

class Battle extends BasicMove {
    constructor() {
        super();
    }
}

/* SUFFER MOVES */

class EndureHarm extends BasicMove {
    constructor() {
        super();
    }
}

class CompanionEndureHarm extends BasicMove {
    constructor() {
        super();
    }
}

class EndureStress extends BasicMove {
    constructor() {
        super();
    }
}

class OutOfSupply extends BasicMove {
    constructor() {
        super();
    }
}

class FaceASetback extends BasicMove {
    constructor() {
        super();
    }
}

/* QUEST MOVES */

class SwearAnIronVow extends BasicMove {
    constructor() {
        super();
    }
}
class ReachAMilestone extends BasicMove {
    constructor() {
        super();
    }
}
class FulfillYourVow extends BasicMove {
    constructor() {
        super();
        this.title = "Fulfill Your Vow";
    }
}
class ForsakeYourVow extends BasicMove {
    constructor() {
        super();
        this.title = "Forsake Your Vow";
    }
}
class Advance extends BasicMove {
    constructor() {
        super();
        this.title = "Advance";
    }
}

/* THRESHOLD MOVES */

class FaceDeath extends BasicMove {
    constructor() {
        super();
    }
}

class FaceDesolation extends BasicMove {
    constructor() {
        super();
    }
}

/* RECOVER MOVES */

export { 
    Utils,IS,
    Advance,AidYourAlly,AskTheOracleMove,
    Battle,Clash,CompanionTakesAHit,Compel,
    DrawTheCircle,EndTheFight,EndureHarm,EndureStress,EnterTheFray,
    FaceASetback,FaceDanger,FaceDeath,FaceDesolation,ForgeABond,
    ForsakeYourVow,FulfillYourVow,GatherInformation,Heal,Hearten,MakeCamp,
    OutOfSupply,PayThePriceMove,ReachAMilestone,ReachYourDestination,
    Resupply,SecureAnAdvantage,Sojourn,Strike,SwearAnIronVow,TestYourRelationship,
    TurnTheTide,UndertakeAJourney,WriteYourEpilogue,
    OracleAction,OracleActionTheme,OraclePlotTwist,OracleTheme,PayThePriceTable }