---
title: "Theoretical Computer Science Cheat Sheet"
description: ""
author: "Arne Vogel"
date: 2018-01-01T17:33:55+01:00
lastModified: ""
language: "en"
ads: "no"
share: "no"
email: "no"
about: "no"
related: "no"
listed: "yes"
mathjax: "yes"
toc: "yes"
category: ["theoretical computer science", "cheat sheet"]
draft: false
---

## Automata and Formal Languages

### Formal Languages

An __alphabet__ $\Sigma$ is a finite set of symbols. For example $\\{0,1\\}$ is an alphabet and $\\{a,b,c,d\\}$ is an alphabet. An __word__ is a finite set of symbols from an alphabet $\Sigma$. One word for the alphabet $\\{a,b,c,d\\}$ would be $abc$ and another one would be $aaab$. The length of a word $w$ is defined as the number of symbols it has. So the length of the word $01010$ from the alphabet $\\{0,1\\}$ would be $5$. Every alphabet contains the __empty word__. The empty word is the word with size $0$. The set of all words that can be created from an alphabet is $\Sigma^* $. 

Words can be combined. Combining word $w = 010$ and word $v = 101$ creates a new word $wv = 010101$. Combining any for with the empty word results in the same word: $w\varepsilon = w = \varepsilon w$. 

$\Sigma^* $ is created with the _Kleene Star_ algorithm. The Kleene Star algorithm creates every possible word for an alphabet $\Sigma$.

#### Kleene Star Algorithm

Given an alphabet $V$:

$$V_0 = \\{\varepsilon\\}$$
$$V_1 = V$$

now recursively define for all i > 0:

$$V_{i+1} = \\{wv | w \in V_i, v \in V\\}$$

Example: $V = \\{ a, b \\}$ then $V_0 = \\{ \varepsilon \\}$, $V_1 = \\{ a, b \\}$, $V_2 = \\{  a, b, aa,ab,ba,bb \\}$,...

#### Formal Language

A __Formal language__ _L_ over an alphabet $\Sigma$, is a subset of $\Sigma^*$.

Example: $\Sigma = \\{a,b,c\\}$. One viable language would be $L_1 = \\{aa,ab,bb,bc,abc,cc\\}$. $L_1$ has $6$ elements. Another language for the same alphabet could be $L_2 = \\{a^n b^n c^n | n \in \mathbb{N}\\}$. $L_1$ is defined by it's elements. $L_2$ on the other hand is defined by how to build words that are in $L_2$. $L_2 = \\{abc,aabbcc,aaabbbccc, \dots\\}$.

## Automata

### Deterministic Finite Automaton DFA

DFA's are used to determine if a word $w$ is element of an language $L$. A deterministic finite automaton is defined as ${\mathfrak  {A}}=\left(Q,\,\Sigma ,\,\delta ,\,q_{0},\,F\right)$.

* $Q$ is the finite number of states of the DFA
* $\Sigma$ is an alphabet
* $\delta$ is a transition function $\delta :Q\times \Sigma \rightarrow Q$
* $q_0$ is the start state of the DFA $q_0 \in Q$
* $F$ is a set of final states $F \subseteq Q$

Example: 

![DFA](/images/theoretical-computer-science-cheat-sheet/DFA.svg)

This DFA accepts binary numbers that are multiples of 3. $Q = \\{S_0, S_1, S_2\\}$, $\Sigma = \\{0,1\\}$, 

$\delta =$

|       | $0$   | $1$   |
|-------|-------|-------|
| __$\rightarrow S_0^*$__ | $S_0$ | $S_1$ |
| __$S_1$__ | $S_2$ | $S_0$ |
| __$S_2$__ | $S_1$ | $S_2$ |

$q_0 = S_0$, $F = \\{S_0\\}$.

In the transfer table a state with $\rightarrow$ in front it means its a start state. The other symbol $^*$ means its a final state.

### Nondeterministic Finite Automaton NFA

In a NFA there can be states where you can choose from different options to "move" through the NFA. This makes the NFA non-deterministic because the "path" is not set in stone. Every DFA is automatically a NFA but not every NFA is a DFA.

![NFA](/images/theoretical-computer-science-cheat-sheet/NFA.svg)

In this example you can choose to stay in $S_0$ when you read a $1$ or you can choose to move to $S_1$. This means the NFA only accepts words that end with a $1$.

The transfer table for the NFA:

|       | 0             | 1                |
|-------|---------------|------------------|
| $\rightarrow S_0$ | $S_0$         | $\\{S_0, S_1\\}$ |
| $S_1^*$ | $\varnothing$ | $\varnothing$    |

### Converting NFA to DFA

Take the transfer table from the NFA and take the start state and look where it leads for each symbol and make a new set from them. If the set contains a final state also make the new state a final state. Repeat that for each new set until no set wasn't handled.

If you want you can rename the sets afterwards.

Example with the NFA from above:

|                    | $0$           | $1$              |
|--------------------|---------------|------------------|
| $\rightarrow S_0$              | $S_0$         | $\\{S_0, S_1\\}$ |
| $\\{S_0, S_1\\}^*$ | $S_0$         | $\\{S_0, S_1\\}$ |

The resulting DFA from the NFA:

![DNA from an NFA](/images/theoretical-computer-science-cheat-sheet/DFAfromNFA.svg)

