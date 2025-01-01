class DFA {
    constructor(states, inputSymbols, transitions, initialState, acceptingStates) {
        this.states = states;
        this.inputSymbols = inputSymbols;
        this.transitions = transitions;
        this.initialState = initialState;
        this.acceptingStates = acceptingStates;
    }

    accepts(string) {
        let currentState = this.initialState;

        for (let symbol of string) {
            if (!this.inputSymbols.includes(symbol)) {
                return false; // Reject if symbol is not in the input alphabet
            }
            currentState = this.transitions[currentState][symbol];
        }

        return this.acceptingStates.includes(currentState);
    }
}

// DFA definition based on given problem
function dfa1() {
    const states = [1, 2, 3, 4];
    const inputSymbols = ['a', 'b'];
    const transitions = {
        1: { 'a': 2, 'b': 3 },
        2: { 'a': 1, 'b': 4 },
        3: { 'a': 4, 'b': 1 },
        4: { 'a': 3, 'b': 2 }
    };
    const initialState = 1;
    const acceptingStates = [2];

    return new DFA(states, inputSymbols, transitions, initialState, acceptingStates);
}

// Testcase 1: String over 0 and 1 where every 0 is immediately followed by 11
function testcase1(string) {
    const pattern = /^(1|011)*$/;
    return pattern.test(string);
}

// Testcase 2: String over a, b, c and ends with the same letter
function testcase2(string) {
    if (string.length < 2 || !/^[abc]+$/.test(string)) {
        return false;
    }
    return string[0] === string[string.length - 1];
}

// Testcase 3: String over lowercase alphabets and digits, starts with alphabets only
function testcase3(string) {
    if (!string || !/^[a-z]/.test(string[0])) {
        return false;
    }
    return /^[a-z0-9]+$/.test(string);
}

// Main execution
function main() {
    // DFA Testing
    const dfa = dfa1();
    const testStringsDFA = ["aab", "abba", "bbaa", "aa"];
    console.log("DFA Testing Results:");
    for (let s of testStringsDFA) {
        console.log(`String '${s}' accepted by DFA? ${dfa.accepts(s)}`);
    }

    // Testcase 1 Testing
    console.log("\nTestcase 1 Results:");
    const testStringsTC1 = ["011", "1011", "111", "011011"];
    for (let s of testStringsTC1) {
        console.log(`String '${s}' valid? ${testcase1(s)}`);
    }

    // Testcase 2 Testing
    console.log("\nTestcase 2 Results:");
    const testStringsTC2 = ["ab", "aa", "bccb", "abcba"];
    for (let s of testStringsTC2) {
        console.log(`String '${s}' valid? ${testcase2(s)}`);
    }

    // Testcase 3 Testing
    console.log("\nTestcase 3 Results:");
    const testStringsTC3 = ["abc123", "123abc", "a1b2c3", "abc"];
    for (let s of testStringsTC3) {
        console.log(`String '${s}' valid? ${testcase3(s)}`);
    }
}

// Run main
main();
